using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using System.IO;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Services
{
    public class CompanyService : ICompanyServices
    {
        private readonly ICompanyRepository _repository;

        public CompanyService(ICompanyRepository repository)
        {
            _repository = repository;
        }

        public async Task<CompanyResponseDTO> AddCompanyAsync(CompanyRequestDTO request)
        {
            string logoPath = null, profilePath = null;

            try
            {
                // Ensure the directories exist
                var logoDirectory = Path.Combine("wwwroot", "logos");
                var profileDirectory = Path.Combine("wwwroot", "profiles");

                if (!Directory.Exists(logoDirectory))
                {
                    Directory.CreateDirectory(logoDirectory);
                }

                if (!Directory.Exists(profileDirectory))
                {
                    Directory.CreateDirectory(profileDirectory);
                }

                // Save Logo Image
                if (request.LogoImage != null)
                {
                    logoPath = Path.Combine(logoDirectory, Guid.NewGuid() + Path.GetExtension(request.LogoImage.FileName));
                    using (var stream = new FileStream(logoPath, FileMode.Create))
                    {
                        await request.LogoImage.CopyToAsync(stream);
                    }
                }

                // Save Profile Image
                if (request.ProfileImage != null)
                {
                    profilePath = Path.Combine(profileDirectory, Guid.NewGuid() + Path.GetExtension(request.ProfileImage.FileName));
                    using (var stream = new FileStream(profilePath, FileMode.Create))
                    {
                        await request.ProfileImage.CopyToAsync(stream);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error saving images. Details: " + ex.Message);
            }

            // Create the company object
            var company = new Company
            {
                CompanyName = request.CompanyName,
                Address = request.Address,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                ManagerName = request.ManagerName,
                LogoImage = logoPath != null ? "/logos/" + Path.GetFileName(logoPath) : null,
                ProfileImage = profilePath != null ? "/profiles/" + Path.GetFileName(profilePath) : null,
            };

            var addedCompany = await _repository.AddCompanyAsync(company);
            return MapToResponse(addedCompany);
        }

        public async Task<CompanyResponseDTO> EditCompanyAsync(int companyId, CompanyRequestDTO request)
        {
            var company = await _repository.GetCompanyByIdAsync(companyId);
            if (company == null) return null;

            try
            {
                company.CompanyName = request.CompanyName;
                company.Address = request.Address;
                company.Email = request.Email;
                company.PhoneNumber = request.PhoneNumber;
                company.ManagerName = request.ManagerName;

                if (request.LogoImage != null)
                {
                    var logoDirectory = Path.Combine("wwwroot", "logos");
                    if (!Directory.Exists(logoDirectory)) Directory.CreateDirectory(logoDirectory);

                    var logoPath = Path.Combine(logoDirectory, Guid.NewGuid() + Path.GetExtension(request.LogoImage.FileName));
                    using (var stream = new FileStream(logoPath, FileMode.Create))
                    {
                        await request.LogoImage.CopyToAsync(stream);
                    }

                    company.LogoImage = "/logos/" + Path.GetFileName(logoPath);
                }

                if (request.ProfileImage != null)
                {
                    var profileDirectory = Path.Combine("wwwroot", "profiles");
                    if (!Directory.Exists(profileDirectory)) Directory.CreateDirectory(profileDirectory);

                    var profilePath = Path.Combine(profileDirectory, Guid.NewGuid() + Path.GetExtension(request.ProfileImage.FileName));
                    using (var stream = new FileStream(profilePath, FileMode.Create))
                    {
                        await request.ProfileImage.CopyToAsync(stream);
                    }

                    company.ProfileImage = "/profiles/" + Path.GetFileName(profilePath);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating images. Details: " + ex.Message);
            }

            var updatedCompany = await _repository.EditCompanyAsync(company);
            return MapToResponse(updatedCompany);
        }

        public async Task<CompanyResponseDTO> GetCompanyByIdAsync(int companyId)
        {
            var company = await _repository.GetCompanyByIdAsync(companyId);
            return company == null ? null : MapToResponse(company);
        }

        public async Task<List<CompanyResponseDTO>> GetAllCompaniesAsync()
        {
            var companies = await _repository.GetAllCompaniesAsync();
            return companies.Select(MapToResponse).ToList();
        }

        public async Task<CompanyResponseDTO> UpdateCompanyStatusAsync(int companyId, string newStatus)
        {
            var company = await _repository.GetCompanyByIdAsync(companyId);
            if (company == null) return null;

            var updatedCompany = await _repository.EditCompanyAsync(company);
            return MapToResponse(updatedCompany);
        }

        private static CompanyResponseDTO MapToResponse(Company company)
        {
            return new CompanyResponseDTO
            {
                CompanyId = company.CompanyId,
                CompanyName = company.CompanyName,
                Address = company.Address,
                Email = company.Email,
                PhoneNumber = company.PhoneNumber,
                ManagerName = company.ManagerName,
                LogoImage = company.LogoImage,
                ProfileImage = company.ProfileImage,
            };
        }
    }
}
