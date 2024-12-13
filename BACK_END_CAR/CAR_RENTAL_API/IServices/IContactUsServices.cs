using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;

namespace CAR_RENTAL_API.IServices
{
    public interface IContactUsServices
    {
        Task<ContactUsResponseDTO> AddContactAsync(ContactUsRequestDTO request);
        Task<ContactUsResponseDTO> GetContactByIdAsync(Guid contactId);
        Task<List<ContactUsResponseDTO>> GetAllContactsAsync();
        Task<bool> DeleteContactAsync(Guid contactId);
    }
}
