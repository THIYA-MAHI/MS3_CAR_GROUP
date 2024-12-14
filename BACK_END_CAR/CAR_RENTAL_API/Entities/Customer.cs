using AuthToken.Database;
using CAR_RENTAL_API.Enum;
using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.Entities
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(100)]
        public string CustomerName { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string NIC { get; set; }

        [MinLength(6)]
        public string PasswordHash { get; set; }

        public string? Address { get; set; }

        public string? PostalCode { get; set; }

        public string? DrivingLicenceNumber { get; set; }

        public DateTime? LicenceExpiryDate { get; set; }

        public string? LicenceFrontImage { get; set; }

        public string? LicenceBackImage { get; set; }

        public string? Proof { get; set; }

        public string? ProofNumber { get; set; }

        [Required]
        public CustomerStatus Status { get; set; } 

        public Role Role { get; set; }= Role.Admin;

        // New field to track the last update timestamp
        public DateTime? LastUpdated { get; set; }
    }
}
