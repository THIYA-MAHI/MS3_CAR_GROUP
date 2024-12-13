using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalRequestController : ControllerBase
    {
        private readonly IRentalRequestService _service;

        public RentalRequestController(IRentalRequestService service)
        {
            _service = service;
        }

        [HttpPost("AddRentalRequest")]
        public async Task<IActionResult> AddRentalRequest([FromBody] RentalRequestRequestDTO request)
        {
            var result = await _service.AddRentalRequestAsync(request);
            return Ok(result);
        }

        [HttpGet("{rentalRequestId}")]
        public async Task<IActionResult> GetRentalRequest(Guid rentalRequestId)
        {
            var result = await _service.GetRentalRequestByIdAsync(rentalRequestId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("AllRentalRequests")]
        public async Task<IActionResult> GetAllRentalRequests()
        {
            var result = await _service.GetAllRentalRequestsAsync();
            return Ok(result);
        }

        [HttpPatch("UpdateStatus/{rentalRequestId}")]
        public async Task<IActionResult> UpdateRentalRequestStatus(Guid rentalRequestId, [FromBody] RentalRequestUpdateDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _service.UpdateRentalRequestStatusAsync(rentalRequestId, request);
            if (result == null) return NotFound(new { message = "Rental request not found." });

            return Ok(result);
        }

        [HttpDelete("DeleteRentalRequest/{rentalRequestId}")]
        public async Task<IActionResult> DeleteRentalRequest(Guid rentalRequestId)
        {
            var success = await _service.DeleteRentalRequestAsync(rentalRequestId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}

