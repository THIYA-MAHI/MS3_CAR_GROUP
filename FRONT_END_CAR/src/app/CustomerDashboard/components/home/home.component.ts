import { Component } from '@angular/core';
import { Customer } from '../../../Shared/models/customer';
import { CustomerService } from '../../../Shared/service/customer.service';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';
import { RentalRequest } from '../../../Shared/models/rental-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentCustomer: Customer[] = [];
  rentalRequest: RentalRequest[] = [];

  constructor(
    private customerService: CustomerService,
    private rentalRequestService: RentalRequestService
  ) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId');
    if (customerId) {
      this.getCustomerData(customerId);
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
}
