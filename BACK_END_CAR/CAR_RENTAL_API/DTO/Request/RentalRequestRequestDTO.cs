using CAR_RENTAL_API.Enum;
using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.DTO.Request
{
    public class RentalRequestRequestDTO
    {

        [Required]
        public Guid CustomerId { get; set; }

        [Required]
        public Guid CarId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

    }
}
