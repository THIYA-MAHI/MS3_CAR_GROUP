namespace CAR_RENTAL_API.DTO.Response
{
    public class NotificationResponseDTO
    {
        public Guid NotificationId { get; set; }
        public Guid CustomerId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
        public bool IsRead { get; set; }
        public string NotificationType { get; set; }
        public Guid? RelatedEntityId { get; set; }
        public string NotificationPriority { get; set; }
    }
}
