using CAR_RENTAL_API.Entities;

namespace CAR_RENTAL_API.IRepository
{
    public interface IBrandRepository
    {
        Task<Brand> AddBrandAsync(Brand brand);
        Task<Brand> GetBrandByIdAsync(Guid brandId);
        Task<List<Brand>> GetAllBrandsAsync();
        Task<Brand> UpdateBrandAsync(Brand brand);
        Task<bool> DeleteBrandAsync(Guid brandId);
    }
}
