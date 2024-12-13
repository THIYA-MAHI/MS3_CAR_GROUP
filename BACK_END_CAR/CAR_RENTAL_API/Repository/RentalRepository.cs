using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CAR_RENTAL_API.Database;

namespace CAR_RENTAL_API.Repository
{
    public class RentalRepository : IRentalRepository
    {
        private readonly CarDbContext _context;

        public RentalRepository(CarDbContext context)
        {
            _context = context;
        }

        public async Task<Rental> AddRentalAsync(Rental rental)
        {
            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();
            return rental;
        }

        public async Task<Rental> UpdateRentalAsync(Rental rental)
        {
            _context.Rentals.Update(rental);
            await _context.SaveChangesAsync();
            return rental;
        }

        public async Task<Rental> GetRentalByIdAsync(Guid rentalId)
        {
            return await _context.Rentals.Include(r => r.Payment).FirstOrDefaultAsync(r => r.RentalId == rentalId);
        }
        public async Task<List<Rental>> GetAllRentalsAsync()
        {
            return await _context.Rentals.Include(r => r.Payment)  
                                         .ToListAsync();
        }
    }
}
