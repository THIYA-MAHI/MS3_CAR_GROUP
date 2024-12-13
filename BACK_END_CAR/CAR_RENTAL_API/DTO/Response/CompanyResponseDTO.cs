namespace CAR_RENTAL_API.DTO.Response
{
    public class CompanyResponseDTO
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ManagerName { get; set; }
        public string LogoImage { get; set; } // URL for logo image
        public string ProfileImage { get; set; } // URL for profile image
    }
}
