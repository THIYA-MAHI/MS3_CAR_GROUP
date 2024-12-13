using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Enum;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using CAR_RENTAL_API.Repository;
using System;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Services
{
    public class RentalService : IRentalService
    {
        private readonly IRentalRepository _rentalRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IRentalRequestRepository _repository;



        public RentalService(IRentalRepository rentalRepository, IPaymentRepository paymentRepository, IRentalRequestRepository rentalRequestRepository)
        {
            _rentalRepository = rentalRepository;
            _paymentRepository = paymentRepository;
            _repository = rentalRequestRepository;

        }

        public async Task<RentalTableResponseDTO> AddRentalAsync(RentalTableRequestDTO rentalRequest)
        {
            try
            {
                // 1. Create and save the rental entry
                var rental = new Rental
                {
                    RentalId = Guid.NewGuid(),
                    RentalRequestId = rentalRequest.RequestId,
                    RentalStatus = "Rented",  // Status is set to Rented
                    RentalDate = rentalRequest.RentalDate,
                    OdometerStart = rentalRequest.OdometerStart
                };

                var addedRental = await _rentalRepository.AddRentalAsync(rental);

                var rentalRequestBy = await _repository.GetRentalRequestByIdAsync(rentalRequest.RequestId);

                rentalRequestBy.Status = RentalRequestStatus.Rented;
                await _repository.UpdateRentalRequestAsync(rentalRequestBy);  

                var payment = new Payment
                {
                    PaymentId = Guid.NewGuid(),
                    RentalId = addedRental.RentalId,
                    RentalPayment = rentalRequest.RentalPayment,
                    AdvancePayment = rentalRequest.AdvancePayment
                };

                var addedPayment = await _paymentRepository.AddPaymentAsync(payment);

                addedRental.PaymentId = addedPayment.PaymentId;
                await _rentalRepository.UpdateRentalAsync(addedRental);

                return MapRentalToDTO(addedRental);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding rental", ex);
            }
        }
        private RentalTableResponseDTO MapRentalToDTO(Rental rental)
        {
            return new RentalTableResponseDTO
            {
                RentalId = rental.RentalId,
                RequestId = rental.RentalRequestId,
                RentalDate = rental.RentalDate,
                PaymentId = rental.PaymentId,
                OdometerStart = rental.OdometerStart,
                RentalPayment = rental.Payment?.RentalPayment, 
                AdvancePayment = rental.Payment?.AdvancePayment  
            };
        }

        public async Task<Rental> GetRentalByIdAsync(Guid id)
        {
            return await _rentalRepository.GetRentalByIdAsync(id);
        }

        public async Task<Rental> UpdateRentalAsync(ReturnCarRequestDTO returnCarRequest)
        {
            var rental = await _rentalRepository.GetRentalByIdAsync(returnCarRequest.RentalId);
            if (rental == null) throw new Exception("Rental not found");

            rental.RentalStatus = "Return";
            rental.ReturnDate = returnCarRequest.ReturnDate;
            rental.OdometerEnd = returnCarRequest.OdometerEnd;
            rental.InspectionStatus = returnCarRequest.InspectionStatus;

            var payment = rental.Payment ?? new Payment { RentalId = rental.RentalId }; 

            payment.InspectionPayment = returnCarRequest.InspectionPayment;
            payment.OverduePayment = returnCarRequest.OverduePayment; 
            payment.OveragePayment = returnCarRequest.OveragePayment;
            payment.AdvancePayment -= returnCarRequest.AdvancePayment;

            await _rentalRepository.UpdateRentalAsync(rental);
            await _paymentRepository.UpdatePaymentAsync(payment);

            var rentalRequestBy = await _repository.GetRentalRequestByIdAsync(returnCarRequest.RequestId);

            rentalRequestBy.Status = RentalRequestStatus.Return;
            await _repository.UpdateRentalRequestAsync(rentalRequestBy);


         
            return rental;
        }
        public async Task<List<Rental>> GetAllRentalsAsync()
        {
            return await _rentalRepository.GetAllRentalsAsync();
        }


    }
}
