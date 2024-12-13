using CAR_RENTAL_API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IRepository
{
    public interface IPaymentRepository
    {
        IEnumerable<Payment> GetPaymentsByRentalId(Guid rentalId);
        Task<Payment> AddPaymentAsync(Payment payment);
        Task<Payment> UpdatePaymentAsync(Payment payment);
        Task<Payment> GetPaymentByIdAsync(Guid paymentId);  
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();  
    }


}
