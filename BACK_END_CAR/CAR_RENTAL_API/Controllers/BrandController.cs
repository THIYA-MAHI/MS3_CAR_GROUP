using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandServices _service;

        public BrandController(IBrandServices service)
        {
            _service = service;
        }

        [HttpPost("AddBrand")]
        public async Task<IActionResult> AddBrand([FromBody] BrandRequestDTO request)
        {
            var result = await _service.AddBrandAsync(request);
            return Ok(result);
        }

        [HttpGet("{brandId}")]
        public async Task<IActionResult> GetBrand(Guid brandId)
        {
            var result = await _service.GetBrandByIdAsync(brandId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("AllBrands")]
        public async Task<IActionResult> GetAllBrands()
        {
            var result = await _service.GetAllBrandsAsync();
            return Ok(result);
        }

        [HttpPut("UpdateBrand/{brandId}")]
        public async Task<IActionResult> UpdateBrand(Guid brandId, [FromBody] BrandRequestDTO request)
        {
            var result = await _service.UpdateBrandAsync(brandId, request);
            if (result == null) return NotFound();
            return Ok(result);
        }
        [HttpDelete("DeleteBrand/{brandId}")]
        public async Task<IActionResult> DeleteBrand(Guid brandId)
        {
            var success = await _service.DeleteBrandAsync(brandId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
