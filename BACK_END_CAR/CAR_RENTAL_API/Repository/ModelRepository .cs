using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Repository
{
    public class ModelRepository : IModelRepository
    {
        private readonly CarDbContext _dbContext;

        public ModelRepository(CarDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Modeltb> AddModelAsync(Modeltb model)
        {
            await _dbContext.Models.AddAsync(model);
            await _dbContext.SaveChangesAsync();
            return model;
        }

        public async Task<Modeltb> GetModelByIdAsync(Guid modelId)
        {
            return await _dbContext.Models.SingleOrDefaultAsync(m => m.Id == modelId);
        }

        public async Task<List<Modeltb>> GetAllModelsAsync()
        {
            return await _dbContext.Models.ToListAsync();
        }

        public async Task<Modeltb> UpdateModelAsync(Modeltb model)
        {
            _dbContext.Models.Update(model);
            await _dbContext.SaveChangesAsync();
            return model;
        }

        public async Task<bool> DeleteModelAsync(Guid modelId)
        {
            var model = await _dbContext.Models.SingleOrDefaultAsync(m => m.Id == modelId);
            if (model == null) return false;

            _dbContext.Models.Remove(model);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
