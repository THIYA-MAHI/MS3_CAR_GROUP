namespace CAR_RENTAL_API.Entities
{
    public class Company
    {
        public int CompanyId { get; set; } 
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ManagerName { get; set; }
        public string? LogoImage { get; set; } 
        public string ProfileImage { get; set; } 
    }
}
