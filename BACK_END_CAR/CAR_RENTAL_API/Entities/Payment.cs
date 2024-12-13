using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CAR_RENTAL_API.Entities
{
    public class Payment
    {
        [Key]
        public Guid PaymentId { get; set; }

        public Guid RentalId { get; set; }
        public Rental Rental { get; set; }
        public decimal RentalPayment { get; set; }
        public decimal AdvancePayment { get; set; }
        public decimal? InspectionPayment { get; set; }
        public decimal? OverduePayment { get; set; }
        public decimal? OveragePayment { get; set; }

        // Method to calculate total income
        public decimal TotalGetIncome()
        {
            decimal total = RentalPayment + AdvancePayment;

            if (InspectionPayment.HasValue)
                total += InspectionPayment.Value;

            if (OverduePayment.HasValue)
                total += OverduePayment.Value;

            if (OveragePayment.HasValue)
                total += OveragePayment.Value;

            return total;
        }
    }
}
