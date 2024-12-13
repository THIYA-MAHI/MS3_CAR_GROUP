using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly IRentalService _rentalService;

        public RentalController(IRentalService rentalService)
        {
            _rentalService = rentalService;
        }

        [HttpPost("add-rental")]
        public async Task<IActionResult> AddRentalAsync([FromBody] RentalTableRequestDTO rentalRequest)
        {
            if (rentalRequest == null)
                return BadRequest("Invalid data");

            var rental = await _rentalService.AddRentalAsync(rentalRequest);

            return Ok(rental); 
        }

        [HttpPost("update-rental-to-Return")]
        public async Task<IActionResult> UpdateRentalAsync([FromBody] ReturnCarRequestDTO returnCarRequest)
        {
            if (returnCarRequest == null)
                return BadRequest("Invalid data");

            var rental = await _rentalService.UpdateRentalAsync(returnCarRequest);
            return Ok(rental);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRentalAsync(Guid id)
        {
            var rental = await _rentalService.GetRentalByIdAsync(id);
            if (rental == null)
                return NotFound();

            return Ok(rental); 
        }

        [HttpGet("all-rentals")]
        public async Task<IActionResult> GetAllRentalsAsync()
        {
            var rentals = await _rentalService.GetAllRentalsAsync();
            if (rentals == null || rentals.Count == 0)
                return NotFound("No rentals found.");

            return Ok(rentals);
        }
    }
}
