import { Component, OnInit } from '@angular/core';
import { Customer } from '../../Shared/models/customer';
import { RentalRequest } from '../../Shared/models/rental-request';
import { CustomerService } from '../../Shared/service/customer.service';
import { RentalRequestService } from '../../Shared/service/rental-request.service';
import { RentalService } from '../../Shared/service/rental.service';
import { Rental } from '../../Shared/models/rental';
import { Payment } from '../../Shared/models/payment';
import { PaymentService } from '../../Shared/service/payment.service';

@Component({
  selector: 'app-cus-payment',
  templateUrl: './cus-payment.component.html',
  styleUrls: ['./cus-payment.component.css'],
})
export class CusPaymentComponent implements OnInit {
  currentCustomer: Customer[] = [];
  rentalRequest: RentalRequest[] = [];
  rentals: Rental[] = [];
  payments: Payment[] = [];
  paymentDetails: Payment[] = [];

  constructor(
    private customerService: CustomerService,
    private rentalRequestService: RentalRequestService,
    private rentalService: RentalService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId');
    if (customerId) {
      this.getCustomerData(customerId);
      this.getRentalRequests(customerId); // Fetch rental requests for customer
    }
  }

  // Get current customer data
  getCustomerData(customerId: string): void {
    this.customerService.getCustomerById(customerId).subscribe(
      (data: Customer) => {
        this.currentCustomer.push(data);
      },
      (error) => {
        console.error('Error fetching customer data', error);
      }
    );
  }

  // Get all rental requests for the current customer
  getRentalRequests(customerId: string): void {
    this.rentalRequestService.getAllRentalRequests().subscribe(
      (data: RentalRequest[]) => {
        this.rentalRequest = data.filter(
          (request) => request.customerId === customerId
        );
        this.loadRentals(); // Once rental requests are fetched, load rentals
      },
      (error) => {
        console.error('Error fetching rental requests', error);
      }
    );
  }

  // Load rentals based on the rental requests
  loadRentals(): void {
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentals = data.filter((rental) =>
          this.rentalRequest.some(
            (rentalRequest) =>
              rentalRequest.rentalRequestId === rental.rentalRequestId
          )
        );
        this.loadPayments(); // After loading rentals, fetch payments
      },
      error: (err) => {
        console.error('Error fetching rentals', err);
      },
    });
  }

  // Get payments for rentals
  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        // Filter payments by rental ID matching rentals
        this.paymentDetails = data.filter((payment) =>
          this.rentals.some((rental) => rental.rentalId === payment.rentalId)
        );
        console.log('Matched Payments:', this.paymentDetails); // For debugging
      },
      error: (err) => {
        console.error('Error fetching payments', err);
      },
    });
  }

  // Calculate total payment for each payment record
  calculateTotalPayment(payment: Payment): number {
    return (
      payment.rentalPayment +
      payment.advancePayment +
      payment.inspectionPayment +
      payment.overduePayment +
      payment.overagePayment
    );
  }

  // Method to trigger print dialog
  printPage(): void {
    window.print();
  }
}
