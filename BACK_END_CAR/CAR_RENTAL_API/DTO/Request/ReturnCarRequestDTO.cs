using CAR_RENTAL_API.Entities;

namespace CAR_RENTAL_API.DTO.Request
{
    public class ReturnCarRequestDTO
    {
        public Guid RentalId { get; set; } // Add RentalId to uniquely identify the rental
        public Guid PaymentId { get; set; }
        public Guid RequestId { get; set; }
        public DateTime ReturnDate { get; set; }
        public string InspectionStatus { get; set; }
        public int OdometerEnd { get; set; }
        public decimal AdvancePayment { get; set; }
        public decimal InspectionPayment { get; set; }
        public decimal OverduePayment { get; set; }
        public decimal OveragePayment { get; set; }
    }


}
