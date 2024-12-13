namespace CAR_RENTAL_API.Entities
{
    public class Modeltb
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string ModelName { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;
        public DateTime? UpdateDate { get; set; }

        public ICollection<Car> Cars { get; set; }
    }
}
