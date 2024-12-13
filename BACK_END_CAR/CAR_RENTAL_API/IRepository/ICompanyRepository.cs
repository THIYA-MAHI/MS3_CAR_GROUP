using CAR_RENTAL_API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.IRepository
{
    public interface ICompanyRepository
    {
        Task<Company> AddCompanyAsync(Company company);
        Task<Company> GetCompanyByIdAsync(int companyId);
        Task<List<Company>> GetAllCompaniesAsync();
        Task<Company> EditCompanyAsync(Company company);
    }
}
