using CAR_RENTAL_API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IRepository
{
    public interface IModelRepository
    {
        Task<Modeltb> AddModelAsync(Modeltb model);
        Task<Modeltb> GetModelByIdAsync(Guid modelId);
        Task<List<Modeltb>> GetAllModelsAsync();
        Task<Modeltb> UpdateModelAsync(Modeltb model);
        Task<bool> DeleteModelAsync(Guid modelId);
    }
}
