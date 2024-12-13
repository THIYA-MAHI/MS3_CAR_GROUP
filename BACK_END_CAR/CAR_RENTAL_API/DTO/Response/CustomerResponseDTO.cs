using AuthToken.Database;
using CAR_RENTAL_API.Enum;

namespace CAR_RENTAL_API.DTO.Response
{
    public class CustomerResponseDTO
    {
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string NIC { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string DrivingLicenceNumber { get; set; }
        public DateTime LicenceExpiryDate { get; set; }
        public string LicenceFrontImage { get; set; }
        public string LicenceBackImage { get; set; }
        public string Proof { get; set; }
        public string ProofNumber { get; set; }
        public CustomerStatus Status { get; set; }
        public DateTime? LastUpdated { get; set; }
        public Role Role { get; set; }

    }
}
