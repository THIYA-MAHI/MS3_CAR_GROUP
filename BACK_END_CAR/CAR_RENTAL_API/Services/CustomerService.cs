using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Authentication;
using CAR_RENTAL_API.Enum;

namespace CAR_RENTAL_API.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IConfiguration _configuration;
        private readonly string _imagePath;

        public CustomerService(ICustomerRepository customerRepository, IConfiguration configuration)
        {
            _customerRepository = customerRepository;
            _configuration = configuration;
            _imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "customer-images");

            if (!Directory.Exists(_imagePath))
            {
                Directory.CreateDirectory(_imagePath);
            }
        }

        public async Task<Customer> RegisterCustomer(CustomerRequestDTO customerRequest)
        {
            try
            {
                var passwordHash = BCrypt.Net.BCrypt.HashPassword(customerRequest.Password);

                var customer = new Customer
                {
                    Id = Guid.NewGuid(),
                    CustomerName = customerRequest.CustomerName,
                    PhoneNumber = customerRequest.PhoneNumber,
                    Email = customerRequest.Email,
                    NIC = customerRequest.NIC,
                    PasswordHash = passwordHash,
                    Status = CustomerStatus.Pending
                };

                var addedCustomer = await _customerRepository.AddCustomer(customer);
                return addedCustomer;
            }
            catch (Exception ex)
            {
                throw new Exception("Error during customer registration", ex);
            }
        }

        public async Task<string> LoginCustomer(string email, string password)
        {
            try
            {
                var customer = await _customerRepository.GetCustomerByEmail(email);

                if (customer == null || !BCrypt.Net.BCrypt.Verify(password, customer.PasswordHash))
                    throw new InvalidCredentialsException("Invalid credentials");

                var token = CreateToken(customer);
                return token;
            }
            catch (Exception ex)
            {
                throw new Exception("Error during customer login", ex);
            }
        }

        private string CreateToken(Customer customer)
        {
            var claims = new List<Claim>
            {
                new Claim("CustomerId", customer.Id.ToString()),
                new Claim("Name", customer.CustomerName),
                new Claim("Email", customer.Email),
                new Claim("Nic", customer.NIC),
                new Claim("Role", customer.Role.ToString()),
                new Claim("CustomerStatus", customer.Status.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"],
                claims, expires: DateTime.Now.AddHours(1), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<Customer> UpdateCustomerDetails(Guid customerId, CustomerUpdateDetailsDTO customerUpdate)
        {
            try
            {
                var customer = await _customerRepository.GetCustomerById(customerId);
                if (customer == null)
                {
                    return null;
                }

                customer.Address = customerUpdate.Address ?? customer.Address;
                customer.PostalCode = customerUpdate.PostalCode ?? customer.PostalCode;
                customer.DrivingLicenceNumber = customerUpdate.DrivingLicenceNumber ?? customer.DrivingLicenceNumber;
                customer.LicenceExpiryDate = customerUpdate.LicenceExpiryDate ?? customer.LicenceExpiryDate;
                customer.Proof = customerUpdate.Proof ?? customer.Proof;
                customer.ProofNumber = customerUpdate.ProofNumber ?? customer.ProofNumber;

                if (customerUpdate.LicenceFrontImage != null)
                {
                    customer.LicenceFrontImage = await SaveImageAsync(customerUpdate.LicenceFrontImage);
                }

                if (customerUpdate.LicenceBackImage != null)
                {
                    customer.LicenceBackImage = await SaveImageAsync(customerUpdate.LicenceBackImage);
                }

                customer.LastUpdated = DateTime.Now;
                var updateResult = await _customerRepository.UpdateCustomer(customer);

                return customer;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating customer details", ex);
            }
        }

        private async Task<string> SaveImageAsync(IFormFile file)
        {
            try
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(_imagePath, fileName);

                // Save the image file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Return the web-accessible path
                return $"/customer-images/{fileName}";
            }
            catch (Exception ex)
            {
                throw new Exception("Error saving image", ex);
            }
        }

        public async Task<IList<CustomerResponseDTO>> GetAllCustomers()
        {
            try
            {
                var customers = await _customerRepository.GetAllCustomers();
                var customerResponses = new List<CustomerResponseDTO>();

                foreach (var customer in customers)
                {
                    customerResponses.Add(new CustomerResponseDTO
                    {
                        CustomerId = customer.Id,
                        CustomerName = customer.CustomerName,
                        PhoneNumber = customer.PhoneNumber,
                        Email = customer.Email,
                        NIC = customer.NIC,
                        Status = customer.Status,
                        Address = customer.Address,
                        PostalCode = customer.PostalCode,
                        DrivingLicenceNumber = customer.DrivingLicenceNumber,
                        LicenceExpiryDate = customer.LicenceExpiryDate ?? DateTime.MinValue,
                        LicenceFrontImage = customer.LicenceFrontImage,
                        LicenceBackImage = customer.LicenceBackImage,
                        Proof = customer.Proof,
                        ProofNumber = customer.ProofNumber,
                        LastUpdated = customer.LastUpdated,
                        Role = customer.Role,
                    });
                }

                return customerResponses;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching all customers", ex);
            }
        }

        public async Task<CustomerResponseDTO> GetCustomerById(Guid customerId)
        {
            try
            {
                var customer = await _customerRepository.GetCustomerById(customerId);
                if (customer == null) return null;

                return new CustomerResponseDTO
                {
                    CustomerId = customer.Id,
                    CustomerName = customer.CustomerName,
                    PhoneNumber = customer.PhoneNumber,
                    Email = customer.Email,
                    NIC = customer.NIC,
                    Status = customer.Status,
                    LastUpdated = customer.LastUpdated,
                    Role = customer.Role,
                };
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching customer by ID", ex);
            }
        }

        public async Task<Customer> UpdateCustomerStatus(Guid customerId, CustomerStatus status)
        {
            try
            {
                var customer = await _customerRepository.GetCustomerById(customerId);

                if (customer == null)
                {
                    return null;
                }

                customer.Status = status;
                customer.LastUpdated = DateTime.Now;

                return await _customerRepository.UpdateCustomer(customer);
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating customer status", ex);
            }
        }
    }
}
