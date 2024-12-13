using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using Microsoft.EntityFrameworkCore;
using System;

namespace CAR_RENTAL_API.Repository
{
    public class ContactUsRepository : IContactUsRepository
    {
        private readonly CarDbContext _dbContext;

        public ContactUsRepository(CarDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ContactUs> AddContactAsync(ContactUs contact)
        {
            await _dbContext.Contacts.AddAsync(contact);
            await _dbContext.SaveChangesAsync();
            return contact;
        }

        public async Task<ContactUs> GetContactByIdAsync(Guid contactId)
        {
            return await _dbContext.Contacts.SingleOrDefaultAsync(c => c.ContactId == contactId);
        }

        public async Task<List<ContactUs>> GetAllContactsAsync()
        {
            return await _dbContext.Contacts.ToListAsync();
        }

        public async Task<bool> DeleteContactAsync(Guid contactId)
        {
            var contact = await _dbContext.Contacts.SingleOrDefaultAsync(c => c.ContactId == contactId);
            if (contact == null) return false;

            _dbContext.Contacts.Remove(contact);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}

