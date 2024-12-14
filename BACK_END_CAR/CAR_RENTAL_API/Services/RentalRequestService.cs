using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Enum;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using CAR_RENTAL_API.Repositories;

namespace CAR_RENTAL_API.Services
{
    public class RentalRequestService : IRentalRequestService
    {
        private readonly IRentalRequestRepository _repository;


        public RentalRequestService(IRentalRequestRepository repository)
        {
            _repository = repository;
        }

        public async Task<RentalRequestResponseDTO> AddRentalRequestAsync(RentalRequestRequestDTO request)
        {
            var rentalRequest = new RentalRequest
            {
                CustomerId = request.CustomerId,
                CarId = request.CarId,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Status = RentalRequestStatus.Pending,
                CreateDate = DateTime.Now,
                RequestDate = DateTime.Now
            };

            var addedRequest = await _repository.AddRentalRequestAsync(rentalRequest);

            var rentalRequestBy = await _repository.GetRentalRequestByIdAsync(addedRequest.RentalRequestId);

            rentalRequestBy.Status = RentalRequestStatus.Pending;
            await _repository.UpdateRentalRequestAsync(rentalRequestBy);
            return MapToResponse(addedRequest);
        }

        public async Task<RentalRequestResponseDTO> GetRentalRequestByIdAsync(Guid rentalRequestId)
        {
            var rentalRequest = await _repository.GetRentalRequestByIdAsync(rentalRequestId);
            return rentalRequest == null ? null : MapToResponse(rentalRequest);
        }

        public async Task<List<RentalRequestResponseDTO>> GetAllRentalRequestsAsync()
        {
            var rentalRequests = await _repository.GetAllRentalRequestsAsync();
            return rentalRequests.Select(MapToResponse).ToList();
        }

        public async Task<RentalRequestResponseDTO> UpdateRentalRequestStatusAsync(Guid rentalRequestId, RentalRequestUpdateDTO request)
        {
            var rentalRequest = await _repository.GetRentalRequestByIdAsync(rentalRequestId);
            if (rentalRequest == null) return null;

            rentalRequest.Status = request.Status;
            rentalRequest.UpdateDate = DateTime.Now;

            var updatedRequest = await _repository.UpdateRentalRequestAsync(rentalRequest);
            return MapToResponse(updatedRequest);
        }

        public async Task<bool> DeleteRentalRequestAsync(Guid rentalRequestId)
        {
            return await _repository.DeleteRentalRequestAsync(rentalRequestId);
        }

        private static RentalRequestResponseDTO MapToResponse(RentalRequest request)
        {
            return new RentalRequestResponseDTO
            {
                RentalRequestId = request.RentalRequestId,
                CustomerId = request.CustomerId,
                CarId = request.CarId,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Status = request.Status,
                CreateDate = request.CreateDate,
                RequestDate = request.RequestDate,
                UpdateDate = request.UpdateDate
            };
        }
    }
}
