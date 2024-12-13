using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpPost("AddCar")]
        public async Task<IActionResult> AddCar([FromForm] CarRequestDTO request)
        {
            var result = await _carService.AddCarAsync(request, _carService.GetSeatingCapacity());
            if (result == null) return BadRequest("Error adding car.");
            return CreatedAtAction(nameof(GetCarById), new { carId = result.CarId }, result);
        }

        [HttpGet("AllCars")]
        public async Task<IActionResult> GetAllCars()
        {
            var result = await _carService.GetAllCarsAsync();
            return Ok(result);
        }

        [HttpGet("{carId}")]
        public async Task<IActionResult> GetCarById(Guid carId)
        {
            var result = await _carService.GetCarByIdAsync(carId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("availableCar")]
        public async Task<IActionResult> GetAvailableCarsByDatesAsync([FromQuery] DateTime pickUpDate, [FromQuery] DateTime dropOffDate)
        {
            try
            {
                var availableCars = await _carService.GetAvailableCarsByDatesAsync(pickUpDate, dropOffDate);
                if (availableCars == null || availableCars.Count == 0)
                {
                    return NotFound("No available cars for the given dates.");
                }

                return Ok(availableCars);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("EditCar/{carId}")]
        public async Task<IActionResult> EditCar(Guid carId, [FromForm] CarRequestDTO request)
        {
            var result = await _carService.EditCarAsync(carId, request);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("DeleteCar/{carId}")]
        public async Task<IActionResult> DeleteCar(Guid carId)
        {
            await _carService.DeleteCarAsync(carId);
            return NoContent();
        }
    }
}
