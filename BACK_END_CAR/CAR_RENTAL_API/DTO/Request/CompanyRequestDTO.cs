namespace CAR_RENTAL_API.DTO.Request
{
    public class CompanyRequestDTO
    {
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ManagerName { get; set; } 
        public IFormFile LogoImage { get; set; } 
        public IFormFile ProfileImage { get; set; }
    }
}
