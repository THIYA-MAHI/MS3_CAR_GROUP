using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Enum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly CarDbContext _context;

        public CustomerRepository(CarDbContext context)
        {
            _context = context;
        }

        // Add a new customer
        public async Task<Customer> AddCustomer(Customer customer)
        {
            try
            {
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
                return customer; // Return the added customer
            }
            catch (Exception ex)
            {
                // Log and throw exception for error handling
                throw new Exception("Error adding customer", ex);
            }
        }

        // Get a customer by email
        public async Task<Customer> GetCustomerByEmail(string email)
        {
            try
            {
                return await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching customer by email", ex);
            }
        }

        // Get a customer by ID
        public async Task<Customer> GetCustomerById(Guid customerId)
        {
            try
            {
                return await _context.Customers.FindAsync(customerId);
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching customer by ID", ex);
            }
        }

        // Get all customers
        public async Task<IList<Customer>> GetAllCustomers()
        {
            try
            {
                return await _context.Customers.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching all customers", ex);
            }
        }

        // Update customer details
        public async Task<Customer> UpdateCustomer(Customer customer)
        {
            try
            {
                var existingCustomer = await _context.Customers.FindAsync(customer.Id);
                if (existingCustomer == null)
                {
                    return null; // Customer not found
                }

                _context.Customers.Update(customer);
                await _context.SaveChangesAsync();
                return customer; // Return updated customer
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating customer", ex);
            }
        }

        // Delete customer by ID
        public async Task<bool> DeleteCustomer(Guid customerId)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(customerId);
                if (customer == null) return false;

                _context.Customers.Remove(customer);
                var result = await _context.SaveChangesAsync();
                return result > 0; // Return true if deletion is successful
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting customer", ex);
            }
        }

        // Update customer status (additional method based on your service)
        public async Task<Customer> UpdateCustomerStatus(Guid customerId, CustomerStatus status)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(customerId);
                if (customer == null)
                {
                    return null; // Customer not found
                }

                customer.Status = status;
                customer.LastUpdated = DateTime.UtcNow; // Update the LastUpdated timestamp
                await _context.SaveChangesAsync();

                return customer;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating customer status", ex);
            }
        }
    }
}
