using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;

namespace CAR_RENTAL_API.IServices
{
    public interface IRentalRequestService
    {
        Task<RentalRequestResponseDTO> AddRentalRequestAsync(RentalRequestRequestDTO request);
        Task<RentalRequestResponseDTO> GetRentalRequestByIdAsync(Guid rentalRequestId);
        Task<List<RentalRequestResponseDTO>> GetAllRentalRequestsAsync();
        Task<RentalRequestResponseDTO> UpdateRentalRequestStatusAsync(Guid rentalRequestId, RentalRequestUpdateDTO request);
        Task<bool> DeleteRentalRequestAsync(Guid rentalRequestId);
    }
}
