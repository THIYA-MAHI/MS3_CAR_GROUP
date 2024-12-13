using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;

namespace CAR_RENTAL_API.IServices
{
    public interface INotificationService
    {
        Task<NotificationResponseDTO> AddNotificationAsync(NotificationRequestDTO request);
        Task<NotificationResponseDTO> GetNotificationByIdAsync(Guid notificationId);
        Task<List<NotificationResponseDTO>> GetNotificationsByUserIdAsync(Guid userId);
        Task<NotificationResponseDTO> MarkAsReadAsync(Guid notificationId);
        Task<bool> DeleteNotificationAsync(Guid notificationId);
    }
}
