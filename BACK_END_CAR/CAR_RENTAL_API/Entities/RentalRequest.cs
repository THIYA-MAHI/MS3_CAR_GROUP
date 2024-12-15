using CAR_RENTAL_API.Enum;
using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.Entities
{
    public class RentalRequest
    {
        [Key]
        public Guid RentalRequestId { get; set; } = Guid.NewGuid();

        [Required]
        public Guid CustomerId { get; set; }

        [Required]
        public Guid CarId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public RentalRequestStatus? Status { get; set; }

        [Required]
        public DateTime RequestDate { get; set; } = DateTime.Now;


        public DateTime CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }
    }
}

