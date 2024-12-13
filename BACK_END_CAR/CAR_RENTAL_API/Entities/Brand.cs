namespace CAR_RENTAL_API.Entities
{
    public class Brand
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string BrandName { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdateDate { get; set; }

        public ICollection<Car> Cars { get; set; }
    }
}
