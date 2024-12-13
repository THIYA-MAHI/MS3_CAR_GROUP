using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using CAR_RENTAL_API.Repository;

namespace CAR_RENTAL_API.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repository;

        public NotificationService(INotificationRepository repository)
        {
            _repository = repository;
        }

        public async Task<NotificationResponseDTO> AddNotificationAsync(NotificationRequestDTO request)
        {
            var notification = new Notification
            {
                CustomerId = request.CustomerId,
                Title = request.Title,
                Message = request.Message,
                NotificationType = request.NotificationType,
                RelatedEntityId = request.RelatedEntityId,
                NotificationPriority = request.NotificationPriority,
                CreatedAt = DateTime.Now
            };

            var addedNotification = await _repository.AddNotificationAsync(notification);
            return MapToResponse(addedNotification);
        }

        public async Task<NotificationResponseDTO> GetNotificationByIdAsync(Guid notificationId)
        {
            var notification = await _repository.GetNotificationByIdAsync(notificationId);
            return notification == null ? null : MapToResponse(notification);
        }

        public async Task<List<NotificationResponseDTO>> GetNotificationsByUserIdAsync(Guid userId)
        {
            var notifications = await _repository.GetNotificationsByUserIdAsync(userId);
            return notifications.Select(MapToResponse).ToList();
        }

        public async Task<NotificationResponseDTO> MarkAsReadAsync(Guid notificationId)
        {
            var notification = await _repository.MarkAsReadAsync(notificationId);
            return notification == null ? null : MapToResponse(notification);
        }

        public async Task<bool> DeleteNotificationAsync(Guid notificationId)
        {
            return await _repository.DeleteNotificationAsync(notificationId);
        }

        private static NotificationResponseDTO MapToResponse(Notification notification)
        {
            return new NotificationResponseDTO
            {
                NotificationId = notification.Id,
                CustomerId = notification.Id,
                Title = notification.Title,
                Message = notification.Message,
                CreatedAt = notification.CreatedAt,
                ReadAt = notification.ReadAt,
                IsRead = notification.IsRead,
                NotificationType = notification.NotificationType,
                RelatedEntityId = notification.RelatedEntityId,
                NotificationPriority = notification.NotificationPriority
            };
        }
    }
}
