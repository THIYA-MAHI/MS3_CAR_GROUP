using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public async Task<Payment> AddPaymentAsync(Payment payment)
        {
            return await _paymentRepository.AddPaymentAsync(payment);
        }

        public async Task<Payment> UpdatePaymentAsync(Payment payment)
        {
            return await _paymentRepository.UpdatePaymentAsync(payment);
        }

        public decimal GetTotalIncome(Guid rentalId)
        {
            var payments = _paymentRepository.GetPaymentsByRentalId(rentalId);
            decimal totalIncome = 0;

            foreach (var payment in payments)
            {
                totalIncome += payment.TotalGetIncome();
            }

            return totalIncome;
        }
        public async Task<Payment> GetPaymentByIdAsync(Guid paymentId)
        {
            return await _paymentRepository.GetPaymentByIdAsync(paymentId);
        }

        // Get all payments
        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _paymentRepository.GetAllPaymentsAsync();
        }
    }

}
