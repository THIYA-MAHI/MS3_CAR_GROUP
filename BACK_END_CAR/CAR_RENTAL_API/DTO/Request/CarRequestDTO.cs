using CAR_RENTAL_API.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace CAR_RENTAL_API.DTO.Request
{
    public class CarRequestDTO
    {
        public string Description { get; set; } 
        public decimal PricePerDay { get; set; }
        public int ModalYear { get; set; }
        public int SeatingCapacity { get; set; }
        public string FuelType { get; set; }
        public int Bags { get; set; }
        public string Transmission { get; set; }
        public int Doors { get; set; }
        public List<IFormFile> CarImages { get; set; }  
        public Guid BrandId { get; set; }  
        public Guid ModelId { get; set; }
    }
}
