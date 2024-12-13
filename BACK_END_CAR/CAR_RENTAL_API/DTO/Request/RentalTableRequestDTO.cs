namespace CAR_RENTAL_API.DTO.Request
{
    public class RentalTableRequestDTO
    {
        public Guid RequestId { get; set; }  // Rental Request ID
        public DateTime RentalDate { get; set; }  // Date when the rental starts
        public int OdometerStart { get; set; }  // Odometer reading at the start of the rental
        public decimal RentalPayment { get; set; }  // Rental payment amount
        public decimal AdvancePayment { get; set; }  // Advance payment amount
    }
}
