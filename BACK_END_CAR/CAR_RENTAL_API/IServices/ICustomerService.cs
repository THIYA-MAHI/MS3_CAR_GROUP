using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Enum;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Services
{
    public interface ICustomerService
    {
        Task<Customer> RegisterCustomer(CustomerRequestDTO customerRequest);
        Task<Customer> GetCustomerByEmail(string email);
        Task<string> LoginCustomer(string email, string password);
        Task<Customer> UpdateCustomerDetails(Guid customerId, CustomerUpdateDetailsDTO customerUpdate);
        Task<IList<CustomerResponseDTO>> GetAllCustomers();
        Task<CustomerResponseDTO> GetCustomerById(Guid customerId);
        Task<Customer> UpdateCustomerStatus(Guid customerId, CustomerStatus status);

    }
}
