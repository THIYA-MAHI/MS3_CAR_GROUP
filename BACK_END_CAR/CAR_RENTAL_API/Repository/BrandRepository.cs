using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using Microsoft.EntityFrameworkCore;

namespace CAR_RENTAL_API.Repository
{
    public class BrandRepository: IBrandRepository
    {
        private readonly CarDbContext _dbContext;

        public BrandRepository(CarDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Brand> AddBrandAsync(Brand brand)
        {
            await _dbContext.Brands.AddAsync(brand);
            await _dbContext.SaveChangesAsync();
            return brand;
        }

        public async Task<Brand> GetBrandByIdAsync(Guid brandId)
        {
            return await _dbContext.Brands.SingleOrDefaultAsync(b => b.Id == brandId);
        }

        public async Task<List<Brand>> GetAllBrandsAsync()
        {
            return await _dbContext.Brands.ToListAsync();
        }

        public async Task<Brand> UpdateBrandAsync(Brand brand)
        {
            _dbContext.Brands.Update(brand);
            await _dbContext.SaveChangesAsync();
            return brand;
        }
        public async Task<bool> DeleteBrandAsync(Guid brandId)
        {
            var brand = await _dbContext.Brands.SingleOrDefaultAsync(b => b.Id == brandId);
            if (brand == null) return false;

            _dbContext.Brands.Remove(brand);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}

