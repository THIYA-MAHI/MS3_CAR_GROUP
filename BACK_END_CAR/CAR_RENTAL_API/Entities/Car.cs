using AuthToken.Database;
using CAR_RENTAL_API.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.Entities
{
    public class Car
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Brand Brand { get; set; }
        public Guid BrandId { get; set; }
        public Modeltb Model { get; set; }
        public Guid ModelId { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal PricePerDay { get; set; }
        public int ModalYear { get; set; }
        public int SeatingCapacity { get; set; }
        public string FuelType { get; set; }
        public List<string> CarImages { get; set; } = new List<string>();
        public int Bags { get; set; }
        public string Transmission { get; set; }
        public int Doors { get; set; }
        public int MileageLimit { get; set; } = 100;

        public bool IsDeleted { get; set; } = false;
    }
}
