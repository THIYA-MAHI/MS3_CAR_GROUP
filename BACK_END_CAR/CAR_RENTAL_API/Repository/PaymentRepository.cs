using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly CarDbContext _context;

        public PaymentRepository(CarDbContext context)
        {
            _context = context;
        }

        public async Task<Payment> AddPaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<Payment> UpdatePaymentAsync(Payment payment)
        {
            _context.Payments.Update(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public IEnumerable<Payment> GetPaymentsByRentalId(Guid rentalId)
        {
            return _context.Payments.Where(p => p.RentalId == rentalId).ToList();
        }

        public async Task<Payment> GetPaymentByIdAsync(Guid paymentId)
        {
            return await _context.Payments
                                 .FirstOrDefaultAsync(p => p.PaymentId == paymentId);
        }

        // Get all payments
        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _context.Payments.ToListAsync();
        }
    }


}
