using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyServices _service;

        public CompanyController(ICompanyServices service)
        {
            _service = service;
        }

        [HttpPost("AddCompany")]
        public async Task<IActionResult> AddCompany([FromForm] CompanyRequestDTO request)
        {
            var result = await _service.AddCompanyAsync(request);
            return Ok(result);
        }

        [HttpGet("{companyId}")]
        public async Task<IActionResult> GetCompany(int companyId)
        {
            var result = await _service.GetCompanyByIdAsync(companyId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("AllCompanies")]
        public async Task<IActionResult> GetAllCompanies()
        {
            var result = await _service.GetAllCompaniesAsync();
            return Ok(result);
        }

        [HttpPut("EditCompany/{companyId}")]
        public async Task<IActionResult> EditCompany(int companyId, [FromForm] CompanyRequestDTO request)
        {
            var result = await _service.EditCompanyAsync(companyId, request);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPut("UpdateStatus/{companyId}")]
        public async Task<IActionResult> UpdateStatus(int companyId, [FromBody] string newStatus)
        {
            var result = await _service.UpdateCompanyStatusAsync(companyId, newStatus);
            if (result == null) return NotFound();
            return Ok(result);
        }
    }
}
