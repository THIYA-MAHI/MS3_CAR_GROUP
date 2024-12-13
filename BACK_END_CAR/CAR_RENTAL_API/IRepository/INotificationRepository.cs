using CAR_RENTAL_API.Entities;

namespace CAR_RENTAL_API.IRepository
{
    public interface INotificationRepository
    {
        Task<Notification> AddNotificationAsync(Notification notification);
        Task<Notification> GetNotificationByIdAsync(Guid notificationId);
        Task<List<Notification>> GetNotificationsByUserIdAsync(Guid userId);
        Task<Notification> MarkAsReadAsync(Guid notificationId);
        Task<bool> DeleteNotificationAsync(Guid notificationId);
    }
}
