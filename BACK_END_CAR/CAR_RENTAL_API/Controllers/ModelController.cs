using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly IModelService _service;

        public ModelController(IModelService service)
        {
            _service = service;
        }

        [HttpPost("AddModel")]
        public async Task<IActionResult> AddModel([FromBody] ModelRequestDTO request)
        {
            var result = await _service.AddModelAsync(request);
            return Ok(result);
        }

        [HttpGet("{modelId}")]
        public async Task<IActionResult> GetModel(Guid modelId)
        {
            var result = await _service.GetModelByIdAsync(modelId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("AllModels")]
        public async Task<IActionResult> GetAllModels()
        {
            var result = await _service.GetAllModelsAsync();
            return Ok(result);
        }

        [HttpPut("UpdateModel/{modelId}")]
        public async Task<IActionResult> UpdateModel(Guid modelId, [FromBody] ModelRequestDTO request)
        {
            var result = await _service.UpdateModelAsync(modelId, request);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("DeleteModel/{modelId}")]
        public async Task<IActionResult> DeleteModel(Guid modelId)
        {
            var success = await _service.DeleteModelAsync(modelId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
