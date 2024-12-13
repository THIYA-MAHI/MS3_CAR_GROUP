using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;

namespace CAR_RENTAL_API.IServices
{
    public interface IBrandServices
    {
        Task<BrandResponseDTO> AddBrandAsync(BrandRequestDTO request);
        Task<BrandResponseDTO> GetBrandByIdAsync(Guid brandId);
        Task<List<BrandResponseDTO>> GetAllBrandsAsync();
        Task<BrandResponseDTO> UpdateBrandAsync(Guid brandId, BrandRequestDTO request);
        Task<bool> DeleteBrandAsync(Guid brandId);
    }
}
