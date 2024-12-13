using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Services
{
    public class ModelService : IModelService
    {
        private readonly IModelRepository _repository;

        public ModelService(IModelRepository repository)
        {
            _repository = repository;
        }

        public async Task<ModelResponseDTO> AddModelAsync(ModelRequestDTO request)
        {
            var model = new Modeltb
            {
                ModelName = request.ModelName,
                CreationDate = DateTime.Now
            };

            var addedModel = await _repository.AddModelAsync(model);
            return MapToResponse(addedModel);
        }

        public async Task<ModelResponseDTO> GetModelByIdAsync(Guid modelId)
        {
            var model = await _repository.GetModelByIdAsync(modelId);
            return model == null ? null : MapToResponse(model);
        }

        public async Task<List<ModelResponseDTO>> GetAllModelsAsync()
        {
            var models = await _repository.GetAllModelsAsync();
            return models.Select(MapToResponse).ToList();
        }

        public async Task<ModelResponseDTO> UpdateModelAsync(Guid modelId, ModelRequestDTO request)
        {
            var model = await _repository.GetModelByIdAsync(modelId);
            if (model == null) return null;

            model.ModelName = request.ModelName;
            model.UpdateDate = DateTime.Now;

            var updatedModel = await _repository.UpdateModelAsync(model);
            return MapToResponse(updatedModel);
        }

        public async Task<bool> DeleteModelAsync(Guid modelId)
        {
            return await _repository.DeleteModelAsync(modelId);
        }

        private static ModelResponseDTO MapToResponse(Modeltb model)
        {
            return new ModelResponseDTO
            {
                ModelId = model.Id,
                ModelName = model.ModelName,
                CreationDate = model.CreationDate,
                UpdateDate = model.UpdateDate
            };
        }
    }
}
