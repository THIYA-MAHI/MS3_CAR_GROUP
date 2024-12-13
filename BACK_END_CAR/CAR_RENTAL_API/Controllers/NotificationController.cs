using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _service;

        public NotificationController(INotificationService service)
        {
            _service = service;
        }

        [HttpPost("AddNotification")]
        public async Task<IActionResult> AddNotification([FromBody] NotificationRequestDTO request)
        {
            var result = await _service.AddNotificationAsync(request);
            return Ok(result);
        }

        [HttpGet("{notificationId}")]
        public async Task<IActionResult> GetNotification(Guid notificationId)
        {
            var result = await _service.GetNotificationByIdAsync(notificationId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetNotificationsByUserId(Guid userId)
        {
            var result = await _service.GetNotificationsByUserIdAsync(userId);
            return Ok(result);
        }

        [HttpPatch("MarkAsRead/{notificationId}")]
        public async Task<IActionResult> MarkAsRead(Guid notificationId)
        {
            var result = await _service.MarkAsReadAsync(notificationId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("DeleteNotification/{notificationId}")]
        public async Task<IActionResult> DeleteNotification(Guid notificationId)
        {
            var success = await _service.DeleteNotificationAsync(notificationId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
