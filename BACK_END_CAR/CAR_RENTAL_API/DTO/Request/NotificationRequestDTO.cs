namespace CAR_RENTAL_API.DTO.Request
{
    public class NotificationRequestDTO
    {
        public Guid CustomerId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string NotificationType { get; set; }
        public Guid? RelatedEntityId { get; set; }
        public string NotificationPriority { get; set; }
    }
}
