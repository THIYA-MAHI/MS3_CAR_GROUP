using CAR_RENTAL_API.Entities;
using System;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IRepository
{
    public interface IRentalRepository
    {
        Task<Rental> AddRentalAsync(Rental rental);
        Task<Rental> UpdateRentalAsync(Rental rental);
        Task<Rental> GetRentalByIdAsync(Guid rentalId);
        Task<List<Rental>> GetAllRentalsAsync();
    }
}
