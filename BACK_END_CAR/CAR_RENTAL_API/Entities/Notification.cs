using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.Entities
{
    public class Notification
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Customer customer { get; set; }
        public Guid CustomerId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ReadAt { get; set; }

        [Required]
        public bool IsRead { get; set; } = false;

        [Required]
        public string NotificationType { get; set; } // Type of notification (e.g., "Car Alert")

        public Guid? RelatedEntityId { get; set; } // Related entity (e.g., CarId)

        [Required]
        public string NotificationPriority { get; set; }
    }
}
