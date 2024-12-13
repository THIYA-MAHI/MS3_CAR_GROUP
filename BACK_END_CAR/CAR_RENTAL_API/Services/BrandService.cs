using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;

namespace CAR_RENTAL_API.Services
{
    public class BrandService: IBrandServices
    {
        private readonly IBrandRepository _repository;

        public BrandService(IBrandRepository repository)
        {
            _repository = repository;
        }

        public async Task<BrandResponseDTO> AddBrandAsync(BrandRequestDTO request)
        {
            var brand = new Brand
            {
                BrandName = request.BrandName,
                CreationDate = DateTime.Now
            };

            var addedBrand = await _repository.AddBrandAsync(brand);
            return MapToResponse(addedBrand);
        }

        public async Task<BrandResponseDTO> GetBrandByIdAsync(Guid brandId)
        {
            var brand = await _repository.GetBrandByIdAsync(brandId);
            return brand == null ? null : MapToResponse(brand);
        }

        public async Task<List<BrandResponseDTO>> GetAllBrandsAsync()
        {
            var brands = await _repository.GetAllBrandsAsync();
            return brands.Select(MapToResponse).ToList();
        }

        public async Task<BrandResponseDTO> UpdateBrandAsync(Guid brandId, BrandRequestDTO request)
        {
            var brand = await _repository.GetBrandByIdAsync(brandId);
            if (brand == null) return null;

            brand.BrandName = request.BrandName;
            brand.UpdateDate = DateTime.Now;

            var updatedBrand = await _repository.UpdateBrandAsync(brand);
            return MapToResponse(updatedBrand);
        }

        public async Task<bool> DeleteBrandAsync(Guid brandId)
        {
            return await _repository.DeleteBrandAsync(brandId);
        }

        private static BrandResponseDTO MapToResponse(Brand brand)
        {
            return new BrandResponseDTO
            {
                BrandId = brand.Id,
                BrandName = brand.BrandName,
                CreationDate = brand.CreationDate,
                UpdateDate = brand.UpdateDate
            };
        }
    }
}