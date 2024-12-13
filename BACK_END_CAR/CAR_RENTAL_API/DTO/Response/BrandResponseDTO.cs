namespace CAR_RENTAL_API.DTO.Response
{
    public class BrandResponseDTO
    {
        public Guid BrandId { get; set; } 
        public string BrandName { get; set; } 
        public DateTime CreationDate { get; set; }
        public DateTime? UpdateDate { get; set; } 
    }
}
