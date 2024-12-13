using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IServices
{
    public interface IModelService
    {
        Task<ModelResponseDTO> AddModelAsync(ModelRequestDTO request);
        Task<ModelResponseDTO> GetModelByIdAsync(Guid modelId);
        Task<List<ModelResponseDTO>> GetAllModelsAsync();
        Task<ModelResponseDTO> UpdateModelAsync(Guid modelId, ModelRequestDTO request);
        Task<bool> DeleteModelAsync(Guid modelId);
    }
}
