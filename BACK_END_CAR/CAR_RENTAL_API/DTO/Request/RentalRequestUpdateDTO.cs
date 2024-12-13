using CAR_RENTAL_API.Enum;
using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.DTO.Request
{
    public class RentalRequestUpdateDTO
    {
        [Required]
        public RentalRequestStatus Status { get; set; }
    }
}
