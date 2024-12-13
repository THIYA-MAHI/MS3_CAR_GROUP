namespace CAR_RENTAL_API.DTO.Response
{
    public class ContactUsResponseDTO
    {
        public Guid ContactId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
