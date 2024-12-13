using CAR_RENTAL_API.Enum;

namespace CAR_RENTAL_API.DTO.Response
{
    public class RentalRequestResponseDTO
    {
        public Guid RentalRequestId { get; set; }

        public Guid CustomerId { get; set; }

        public Guid CarId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public RentalRequestStatus Status { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime RequestDate { get; set; }

        public DateTime? UpdateDate { get; set; }
    }
}
