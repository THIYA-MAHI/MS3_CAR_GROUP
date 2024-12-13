using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Enum;
using CAR_RENTAL_API.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Repositories  // Ensure namespace matches folder
{
    public class CarRepository : ICarRepository
    {
        private readonly CarDbContext _dbContext;  // Correctly initialized field

        public CarRepository(CarDbContext context)
        {
            _dbContext = context;  // Initialize dbContext
        }

        public async Task<Car> AddCarAsync(Car car)
        {
            await _dbContext.Cars.AddAsync(car);
            await _dbContext.SaveChangesAsync();
            return car;
        }

        public async Task<Car> GetCarByIdAsync(Guid carId)
        {
            return await _dbContext.Cars
                                   .Include(c => c.Brand)
                                   .FirstOrDefaultAsync(c => c.Id == carId);
        }
        public async Task<List<RentalRequest>> GetRentalRequestsByDateRangeAsync(DateTime pickUpDate, DateTime dropOffDate)
        {
            // Example query to get rental requests within the specified date range
            return await _dbContext.RentalRequests
                .Where(r => r.StartDate < dropOffDate && r.EndDate > pickUpDate && r.Status != RentalRequestStatus.Reject)
                .ToListAsync();
        }
        public async Task<List<Car>> GetAllCarsAsync()
        {
            return await _dbContext.Cars
                                   .Include(c => c.Brand)
                                   .Where(c => !c.IsDeleted)
                                   .ToListAsync();
        }

        public async Task<Car> EditCarAsync(Car car)
        {
            _dbContext.Cars.Update(car);
            await _dbContext.SaveChangesAsync();
            return car;
        }

        public async Task DeleteCarAsync(Guid carId)
        {
            var car = await _dbContext.Cars.FindAsync(carId);
            if (car != null)
            {
                car.IsDeleted = true;
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
