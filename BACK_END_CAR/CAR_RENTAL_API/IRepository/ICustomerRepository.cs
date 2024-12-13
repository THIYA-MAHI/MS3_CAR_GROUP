using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Enum;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Repositories
{
    public interface ICustomerRepository
    {
        Task<Customer> AddCustomer(Customer customer); // Add a new customer
        Task<Customer> GetCustomerByEmail(string email); // Get a customer by email
        Task<Customer> GetCustomerById(Guid customerId); // Get a customer by ID
        Task<IList<Customer>> GetAllCustomers(); // Get all customers
        Task<Customer> UpdateCustomer(Customer customer); // Update customer details
        Task<bool> DeleteCustomer(Guid customerId); // Delete a customer by ID
        Task<Customer> UpdateCustomerStatus(Guid customerId, CustomerStatus status);
    }
}
