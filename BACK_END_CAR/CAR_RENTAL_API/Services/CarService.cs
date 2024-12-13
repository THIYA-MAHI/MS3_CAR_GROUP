using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Enum;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _carRepository;
        private readonly IBrandRepository _brandRepository;
        private readonly IRentalRequestRepository _repository;


        public int SeatingCapacity { get; private set; }

        public CarService(ICarRepository carRepository, IBrandRepository brandRepository, IRentalRequestRepository repository)
        {
            _carRepository = carRepository;
            _brandRepository = brandRepository;
            _repository = repository;
        }

        public int GetSeatingCapacity()
        {
            return SeatingCapacity;
        }

        public async Task<CarResponseDTO> AddCarAsync(CarRequestDTO request, int seatingCapacity)
        {
            var car = new Car
            {
                Description = request.Description,
                PricePerDay = request.PricePerDay,
                ModalYear = request.ModalYear,
                SeatingCapacity = request.SeatingCapacity,
                FuelType = request.FuelType,
                Bags = request.Bags,
                Transmission = request.Transmission,
                Doors = request.Doors,
                BrandId = request.BrandId,
                ModeltbId = request.ModeltbId
            };

            if (request.CarImages != null && request.CarImages.Any())
            {
                car.CarImages = request.CarImages.Select(file =>
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine("wwwroot/carimages", fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return "/carimages/" + fileName;
                }).ToList();
            }

            var addedCar = await _carRepository.AddCarAsync(car);
            return MapToResponse(addedCar);
        }

        public async Task<CarResponseDTO> GetCarByIdAsync(Guid carId)
        {
            var car = await _carRepository.GetCarByIdAsync(carId);
            return car == null ? null : MapToResponse(car);
        }
        public async Task<List<CarResponseDTO>> GetAvailableCarsByDatesAsync(DateTime pickUpDate, DateTime dropOffDate)
        {
            var rentalRequests = await _repository.GetRentalRequestsByDateRangeAsync(pickUpDate, dropOffDate);

            var bookedCarIds = rentalRequests
                .Where(r => r.StartDate < dropOffDate && r.EndDate > pickUpDate && r.Status != RentalRequestStatus.Reject || r.Status != RentalRequestStatus.Pending || r.Status != RentalRequestStatus.Return)
                .Select(r => r.CarId)
                .ToList();

            var allCars = await _carRepository.GetAllCarsAsync();
            var availableCars = allCars
                .Where(car => !bookedCarIds.Contains(car.Id)  && !car.IsDeleted)
                .ToList();

            return availableCars.Select(MapToResponse).ToList();
        }

        public async Task<List<CarResponseDTO>> GetAllCarsAsync()
        {
            var cars = await _carRepository.GetAllCarsAsync();
            return cars.Select(MapToResponse).ToList();
        }

        public async Task<CarResponseDTO> EditCarAsync(Guid carId, CarRequestDTO request)
        {
            var car = await _carRepository.GetCarByIdAsync(carId);
            if (car == null) return null;

            car.Description = request.Description;
            car.PricePerDay = request.PricePerDay;
            car.ModalYear = request.ModalYear;
            car.SeatingCapacity = request.SeatingCapacity;
            car.FuelType = request.FuelType;
            car.Bags = request.Bags;
            car.Transmission = request.Transmission;
            car.Doors = request.Doors;
            car.BrandId= request.BrandId;
            car.ModeltbId = request.ModeltbId;

            if (request.CarImages != null && request.CarImages.Any())
            {
                car.CarImages = request.CarImages.Select(file =>
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine("wwwroot/carimages", fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return "/carimages/" + fileName;
                }).ToList();
            }

            var updatedCar = await _carRepository.EditCarAsync(car);
            return MapToResponse(updatedCar);
        }

        public async Task DeleteCarAsync(Guid carId)
        {
            await _carRepository.DeleteCarAsync(carId);
        }

        private CarResponseDTO MapToResponse(Car car)
        {
            return new CarResponseDTO
            {
                CarId = car.Id,
                Description = car.Description,
                PricePerDay = car.PricePerDay,
                ModalYear = car.ModalYear,
                SeatingCapacity = car.SeatingCapacity,
                FuelType = car.FuelType,
                Bags = car.Bags,
                Transmission = car.Transmission,
                Doors = car.Doors,
                CarImages = car.CarImages,
                BrandId=car.BrandId,
                ModeltbId = car.ModeltbId
            };
        }
    }
}
