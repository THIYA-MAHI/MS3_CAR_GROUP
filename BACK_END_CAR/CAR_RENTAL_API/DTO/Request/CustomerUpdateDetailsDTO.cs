// CustomerUpdateDetailsDTO.cs
using Microsoft.AspNetCore.Http;
using System;

namespace CAR_RENTAL_API.DTO.Request
{
    public class CustomerUpdateDetailsDTO
    {
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string DrivingLicenceNumber { get; set; }
        public DateTime? LicenceExpiryDate { get; set; }

        public string Proof { get; set; }
        public string ProofNumber { get; set; }

        // Image file fields to accept the images
        public IFormFile LicenceFrontImage { get; set; }
        public IFormFile LicenceBackImage { get; set; }
    }

}
