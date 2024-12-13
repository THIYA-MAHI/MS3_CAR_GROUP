using CAR_RENTAL_API.Entities;

namespace CAR_RENTAL_API.IRepository
{
    public interface IRentalRequestRepository
    {
        Task<RentalRequest> AddRentalRequestAsync(RentalRequest request);
        Task<RentalRequest> GetRentalRequestByIdAsync(Guid rentalRequestId);
        Task<List<RentalRequest>> GetAllRentalRequestsAsync();
        Task<RentalRequest> UpdateRentalRequestAsync(RentalRequest request);
        Task<bool> DeleteRentalRequestAsync(Guid rentalRequestId);
        Task<List<RentalRequest>> GetRentalRequestsByDateRangeAsync(DateTime pickUpDate, DateTime dropOffDate);
    }
}
