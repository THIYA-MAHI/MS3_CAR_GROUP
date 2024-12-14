using CAR_RENTAL_API.Enum;
using System;
using System.Collections.Generic;

namespace CAR_RENTAL_API.DTO.Response
{
    public class CarResponseDTO
    {
        public Guid CarId { get; set; }
        public string Description { get; set; }
        public decimal PricePerDay { get; set; }
        public int ModalYear { get; set; }
        public int SeatingCapacity { get; set; }
        public string FuelType { get; set; }
        public int Bags { get; set; }
        public string Transmission { get; set; }
        public int Doors { get; set; }
        public List<string> CarImages { get; set; }
        public Guid BrandId { get; set; }
        public Guid ModelId { get; set; }

    }
}
