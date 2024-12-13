using CAR_RENTAL_API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IRepository
{
    public interface ICarRepository
    {
        Task<Car> AddCarAsync(Car car);
        Task<Car> GetCarByIdAsync(Guid carId);
        Task<List<Car>> GetAllCarsAsync();
        Task<Car> EditCarAsync(Car car);
        Task DeleteCarAsync(Guid carId);
        Task<List<RentalRequest>> GetRentalRequestsByDateRangeAsync(DateTime pickUpDate, DateTime dropOffDate);
    }
}
