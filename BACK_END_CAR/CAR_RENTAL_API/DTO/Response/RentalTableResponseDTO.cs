namespace CAR_RENTAL_API.DTO.Response
{
    public class RentalTableResponseDTO
    {
        public Guid RentalId { get; set; }

        public Guid RequestId { get; set; }

        public DateTime RentalDate { get; set; }

        public Guid? PaymentId { get; set; }

        public double OdometerStart { get; set; }

        public decimal? AdvancePayment { get; set; }

        public decimal? RentalPayment { get; set; }
    }
}
