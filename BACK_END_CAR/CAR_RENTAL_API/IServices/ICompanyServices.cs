using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IServices
{
    public interface ICompanyServices
    {
        Task<CompanyResponseDTO> AddCompanyAsync(CompanyRequestDTO request);
        Task<CompanyResponseDTO> GetCompanyByIdAsync(int companyId);
        Task<List<CompanyResponseDTO>> GetAllCompaniesAsync();
        Task<CompanyResponseDTO> EditCompanyAsync(int companyId, CompanyRequestDTO request);
        Task<CompanyResponseDTO> UpdateCompanyStatusAsync(int companyId, string newStatus);
    }
}
