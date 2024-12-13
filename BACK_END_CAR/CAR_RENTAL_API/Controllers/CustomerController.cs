using CAR_RENTAL_API.DTO.Request;
using CAR_RENTAL_API.DTO.Response;
using CAR_RENTAL_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AuthToken.Database; // Importing the Role enum
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/customers")]
    [ApiController]
    
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        // Register a new customer
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDTO>> RegisterCustomer([FromBody] CustomerRequestDTO customerRequest)
        {
            try
            {
                var response = await _customerService.RegisterCustomer(customerRequest);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error registering customer", error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDTO>> LoginCustomer([FromBody] LoginRequestDTO loginRequest)
        {
            try
            {
                if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
                {
                    return BadRequest(new { message = "Email and password are required." });
                }

                var response = await _customerService.LoginCustomer(loginRequest.Email, loginRequest.Password);

                return Ok(response);
            }
            catch (InvalidCredentialsException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        // Update customer details
        [HttpPut("UpdateCustomer/{id}")]
        public async Task<ActionResult<bool>> UpdateCustomerDetails(Guid id, [FromForm] CustomerUpdateDetailsDTO customerUpdate)
        {
            try
            {
                var result = await _customerService.UpdateCustomerDetails(id, customerUpdate);

                if (result == null)
                {
                    return NotFound("Customer not found or update failed");
                }

                return Ok(true); // Return success response
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating customer details", error = ex.Message });
            }
        }

        // Get all customers
        [HttpGet("AllCustomerData")]
        public async Task<ActionResult<IList<CustomerResponseDTO>>> GetAllCustomerData()
        {
            try
            {
                var customers = await _customerService.GetAllCustomers();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching customer data", error = ex.Message });
            }
        }

        // Get a customer by ID
        [HttpGet("CustomerById/{id}")]
        public async Task<ActionResult<CustomerResponseDTO>> GetCustomerById(Guid id)
        {
            try
            {
                var customer = await _customerService.GetCustomerById(id);
                if (customer == null) return NotFound("Customer not found");
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching customer by ID", error = ex.Message });
            }
        }

        [HttpPut("UpdateCustomerStatus/{id}")]
        public async Task<IActionResult> UpdateCustomerStatus(Guid id, [FromBody] CustomerStatusRequestDTO statusRequest)
        {
            try
            {
                // Validate the statusRequest object to ensure it's not null
                if (statusRequest == null)
                {
                    return BadRequest(new { message = "Invalid status request." });
                }

                var updatedCustomer = await _customerService.UpdateCustomerStatus(id, statusRequest.Status);

                if (updatedCustomer == null)
                {
                    return NotFound(new { message = "Customer not found" });
                }

                return Ok(updatedCustomer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating customer status", error = ex.Message });
            }
        }

        [HttpGet("check")]
        public async Task<IActionResult> CheckAPI()
        {
            try
            {
                // Find the role from the JWT token
                var roleClaim = User.FindFirst("Role");

                // Check if the role claim is found
                if (roleClaim == null)
                {
                    return BadRequest("Role claim not found.");
                }

                var role = roleClaim.Value;
                return Ok(new { Role = role });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}

