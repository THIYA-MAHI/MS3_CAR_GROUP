using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using CAR_RENTAL_API.Repository;
using System.ComponentModel.DataAnnotations;

namespace CAR_RENTAL_API.Services
{
    public class ContactUsService : IContactUsServices
    {
        private readonly IContactUsRepository _repository;

        public ContactUsService(IContactUsRepository repository)
        {
            _repository = repository;
        }

        public async Task<ContactUsResponseDTO> AddContactAsync(ContactUsRequestDTO request)
        {
            // Validate the DTO
            ValidateRequest(request);

            var contact = new ContactUs
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Message = request.Message,
                CreatedAt = DateTime.Now
            };

            var addedContact = await _repository.AddContactAsync(contact);
            return MapToResponse(addedContact);
        }

        public async Task<ContactUsResponseDTO> GetContactByIdAsync(Guid contactId)
        {
            var contact = await _repository.GetContactByIdAsync(contactId);
            return contact == null ? null : MapToResponse(contact);
        }

        public async Task<List<ContactUsResponseDTO>> GetAllContactsAsync()
        {
            var contacts = await _repository.GetAllContactsAsync();
            return contacts.Select(MapToResponse).ToList();
        }

        public async Task<bool> DeleteContactAsync(Guid contactId)
        {
            return await _repository.DeleteContactAsync(contactId);
        }

        private static ContactUsResponseDTO MapToResponse(ContactUs contact)
        {
            return new ContactUsResponseDTO
            {
                ContactId = contact.ContactId,
                Name = contact.Name,
                Email = contact.Email,
                Phone = contact.Phone,
                Message = contact.Message,
                CreatedAt = contact.CreatedAt
            };
        }

        private void ValidateRequest(ContactUsRequestDTO request)
        {
            var validationContext = new ValidationContext(request, null, null);
            var validationResults = new List<ValidationResult>();

            if (!Validator.TryValidateObject(request, validationContext, validationResults, true))
            {
                var errors = validationResults.Select(vr => vr.ErrorMessage).ToList();
                throw new ValidationException(string.Join("; ", errors));
            }
        }
    }
}
