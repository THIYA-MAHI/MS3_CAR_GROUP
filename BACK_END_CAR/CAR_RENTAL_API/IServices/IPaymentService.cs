using CAR_RENTAL_API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IServices
{
    public interface IPaymentService
    {
        decimal GetTotalIncome(Guid rentalId);
        Task<Payment> AddPaymentAsync(Payment payment);
        Task<Payment> UpdatePaymentAsync(Payment payment);
        Task<Payment> GetPaymentByIdAsync(Guid paymentId);
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
    }

}
