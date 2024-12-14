import { Component } from '@angular/core';
import { Customer } from '../../../Shared/models/customer';
import { RentalRequest } from '../../../Shared/models/rental-request';
import { CustomerService } from '../../../Shared/service/customer.service';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';

@Component({
  selector: 'app-rental-cars',
  templateUrl: './rental-cars.component.html',
  styleUrl: './rental-cars.component.css',
})
export class RentalCarsComponent {
  currentCustomer: Customer[] = [];
  rentalRequest: RentalRequest[] = [];

  constructor(
    private customerService: CustomerService,
    private rentalRequestService: RentalRequestService
  ) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('customerId'); // Retrieve customerId from localStorage

    if (customerId) {
      this.getCustomerData(customerId);
      this.getRentalRequests(customerId);
    }
  }

  // Get current customer data
  getCustomerData(customerId: string): void {
    this.customerService.getCustomerById(customerId).subscribe(
      (data: Customer) => {
        this.currentCustomer.push(data); // Push data to currentCustomer array
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
        ); // Filter rental requests by customerId
      },
      (error) => {
        console.error('Error fetching rental requests', error);
      }
    );
  }

  // Map status to human-readable format
  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      case 4:
        return 'Rented';
      case 5:
        return 'Return';
      default:
        return 'block';
    }
  }
}
