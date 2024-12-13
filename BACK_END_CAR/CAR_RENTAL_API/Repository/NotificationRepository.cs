using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using Microsoft.EntityFrameworkCore;
using System;

namespace CAR_RENTAL_API.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly CarDbContext _dbContext;

        public NotificationRepository(CarDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Notification> AddNotificationAsync(Notification notification)
        {
            await _dbContext.Notifications.AddAsync(notification);
            await _dbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<Notification> GetNotificationByIdAsync(Guid notificationId)
        {
            return await _dbContext.Notifications.SingleOrDefaultAsync(n => n.Id == notificationId);
        }

        public async Task<List<Notification>> GetNotificationsByUserIdAsync(Guid customerId)
        {
            return await _dbContext.Notifications
                .Where(n => n.CustomerId == customerId)
                .ToListAsync();
        }

        public async Task<Notification> MarkAsReadAsync(Guid notificationId)
        {
            var notification = await _dbContext.Notifications.SingleOrDefaultAsync(n => n.Id == notificationId);
            if (notification == null) return null;

            notification.IsRead = true;
            notification.ReadAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<bool> DeleteNotificationAsync(Guid notificationId)
        {
            var notification = await _dbContext.Notifications.SingleOrDefaultAsync(n => n.Id == notificationId);
            if (notification == null) return false;

            _dbContext.Notifications.Remove(notification);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
