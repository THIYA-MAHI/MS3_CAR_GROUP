// CustomerRequestDTO.cs
using AuthToken.Database;
using CAR_RENTAL_API.Enum;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.DTO.Request
{
    public class CustomerRequestDTO
    {
        
        [MaxLength(100)]
        public string CustomerName { get; set; } 
        [Phone]
        public string PhoneNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string NIC { get; set; }
        [MinLength(6)]
        public string Password { get; set; }

       

    }
}
