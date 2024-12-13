namespace CAR_RENTAL_API.DTO.Response
{
    public class ModelResponseDTO
    {
        public Guid ModelId { get; set; }
        public string ModelName { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
