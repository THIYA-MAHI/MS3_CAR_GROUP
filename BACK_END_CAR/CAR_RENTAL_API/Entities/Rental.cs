using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.Entities
{
    public class Rental
    {
        [Key]
        public Guid RentalId { get; set; }
        public Guid RentalRequestId { get; set; }
        public string RentalStatus { get; set; }
        public DateTime RentalDate { get; set; }
        public double OdometerStart { get; set; }
        public DateTime? ReturnDate { get; set; }  
        public double? OdometerEnd { get; set; }  
        public string? InspectionStatus { get; set; }
        public Payment Payment { get; set; }
        public Guid? PaymentId { get; set; }
    }

}
