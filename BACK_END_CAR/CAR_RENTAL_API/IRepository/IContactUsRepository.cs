using CAR_RENTAL_API.Entities;

namespace CAR_RENTAL_API.IRepository
{
    public interface IContactUsRepository
    {
        Task<ContactUs> AddContactAsync(ContactUs contact);
        Task<ContactUs> GetContactByIdAsync(Guid contactId);
        Task<List<ContactUs>> GetAllContactsAsync();
        Task<bool> DeleteContactAsync(Guid contactId);
    }
}
