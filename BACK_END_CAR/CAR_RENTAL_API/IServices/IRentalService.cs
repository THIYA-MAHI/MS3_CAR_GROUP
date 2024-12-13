using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using System;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IServices
{
    public interface IRentalService
    {
        Task<RentalTableResponseDTO> AddRentalAsync(RentalTableRequestDTO rentalRequest);
        Task<Rental> UpdateRentalAsync(ReturnCarRequestDTO returnCarRequest);

        // Add this method to the interface
        Task<Rental> GetRentalByIdAsync(Guid rentalId);

        Task<List<Rental>> GetAllRentalsAsync();
    }
}
