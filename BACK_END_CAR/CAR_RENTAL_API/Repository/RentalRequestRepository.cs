using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Enum;
using CAR_RENTAL_API.IRepository;
using Microsoft.EntityFrameworkCore;
using System;

namespace CAR_RENTAL_API.Repository
{
    public class RentalRequestRepository : IRentalRequestRepository
    {
        private readonly CarDbContext _dbContext;

        public RentalRequestRepository(CarDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<RentalRequest> AddRentalRequestAsync(RentalRequest request)
        {
            await _dbContext.RentalRequests.AddAsync(request);
            await _dbContext.SaveChangesAsync();
            return request;
        }

        public async Task<RentalRequest> GetRentalRequestByIdAsync(Guid rentalRequestId)
        {
            return await _dbContext.RentalRequests.SingleOrDefaultAsync(r => r.RentalRequestId == rentalRequestId);
        }

        public async Task<List<RentalRequest>> GetAllRentalRequestsAsync()
        {
            return await _dbContext.RentalRequests.ToListAsync();
        }

        public async Task<RentalRequest> UpdateRentalRequestAsync(RentalRequest request)
        {
            _dbContext.RentalRequests.Update(request);
            await _dbContext.SaveChangesAsync();
            return request;
        }

        public async Task<bool> DeleteRentalRequestAsync(Guid rentalRequestId)
        {
            var rentalRequest = await _dbContext.RentalRequests.SingleOrDefaultAsync(r => r.RentalRequestId == rentalRequestId);
            if (rentalRequest == null) return false;

            _dbContext.RentalRequests.Remove(rentalRequest);
            await _dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<List<RentalRequest>> GetRentalRequestsByDateRangeAsync(DateTime pickUpDate, DateTime dropOffDate)
        {
            return await _dbContext.RentalRequests
                .Where(r => r.StartDate < dropOffDate && r.EndDate > pickUpDate && r.Status != RentalRequestStatus.Reject)
                .ToListAsync();
        }
    }
}
