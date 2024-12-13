using CAR_RENTAL_API.Entities;
using CAR_RENTAL_API.IServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAR_RENTAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
 
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        // Add a payment
        [HttpPost]
        public async Task<ActionResult<Payment>> AddPaymentAsync(Payment payment)
        {
            var createdPayment = await _paymentService.AddPaymentAsync(payment);
            return CreatedAtAction(nameof(GetPaymentByIdAsync), new { paymentId = createdPayment.PaymentId }, createdPayment);
        }

        // Update a payment
        [HttpPut("{paymentId}")]
        public async Task<ActionResult<Payment>> UpdatePaymentAsync(Guid paymentId, Payment payment)
        {
            if (paymentId != payment.PaymentId)
            {
                return BadRequest();
            }

            var updatedPayment = await _paymentService.UpdatePaymentAsync(payment);
            return Ok(updatedPayment);
        }

        [HttpGet("totalincome/{rentalId}")]
        public IActionResult GetTotalIncome(Guid rentalId)
        {
            var totalIncome = _paymentService.GetTotalIncome(rentalId);
            return Ok(totalIncome);
        }

        // Get a payment by ID
        [HttpGet("{paymentId}")]
        public async Task<ActionResult<Payment>> GetPaymentByIdAsync(Guid paymentId)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(paymentId);
            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }

        // Get all payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetAllPaymentsAsync()
        {
            var payments = await _paymentService.GetAllPaymentsAsync();
            return Ok(payments);
        }
    }

}
