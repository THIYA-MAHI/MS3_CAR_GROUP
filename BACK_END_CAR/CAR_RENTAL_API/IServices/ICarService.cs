using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IServices
{
    public interface ICarService
    {
        Task<CarResponseDTO> AddCarAsync(CarRequestDTO request, int seatingCapacity);
        Task<CarResponseDTO> GetCarByIdAsync(Guid carId);
        Task<List<CarResponseDTO>> GetAllCarsAsync();
        Task<CarResponseDTO> EditCarAsync(Guid carId, CarRequestDTO request);
        Task<List<CarResponseDTO>> GetAvailableCarsByDatesAsync(DateTime pickUpDate, DateTime dropOffDate);
        Task DeleteCarAsync(Guid carId);
        int GetSeatingCapacity();
    }
}
