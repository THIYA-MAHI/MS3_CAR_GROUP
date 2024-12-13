using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly IContactUsServices _service;

        public ContactUsController(IContactUsServices service)
        {
            _service = service;
        }

        [HttpPost("AddContact")]
        public async Task<IActionResult> AddContact([FromBody] ContactUsRequestDTO request)
        {
            try
            {
                var result = await _service.AddContactAsync(request);
                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{contactId}")]
        public async Task<IActionResult> GetContact(Guid contactId)
        {
            var result = await _service.GetContactByIdAsync(contactId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("AllContacts")]
        public async Task<IActionResult> GetAllContacts()
        {
            var result = await _service.GetAllContactsAsync();
            return Ok(result);
        }

        [HttpDelete("DeleteContact/{contactId}")]
        public async Task<IActionResult> DeleteContact(Guid contactId)
        {
            var success = await _service.DeleteContactAsync(contactId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
