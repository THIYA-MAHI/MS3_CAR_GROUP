using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly CarDbContext _dbContext;

        public CompanyRepository(CarDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Company> AddCompanyAsync(Company company)
        {
            await _dbContext.Companys.AddAsync(company);
            await _dbContext.SaveChangesAsync();
            return company;
        }

        public async Task<Company> GetCompanyByIdAsync(int companyId)
        {
            return await _dbContext.Companys.SingleOrDefaultAsync(c => c.CompanyId == companyId);
        }

        public async Task<List<Company>> GetAllCompaniesAsync()
        {
            return await _dbContext.Companys.ToListAsync();
        }

        public async Task<Company> EditCompanyAsync(Company company)
        {
            _dbContext.Companys.Update(company);
            await _dbContext.SaveChangesAsync();
            return company;
        }
    }
}
