import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../Shared/models/customer';
import { CustomerService } from '../../../Shared/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  isModalVisible: boolean = false; // To handle modal visibility

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
      this.customers.forEach((customer) => {
        if (!customer.isVerified) {
          customer.status = customer.status || 'Pending';
        }
        // Ensure image URLs are correctly formatted
        if (customer.licenceFrontImage) {
          customer.licenceFrontImage = `http://localhost:5096${customer.licenceFrontImage}`;
        }
        if (customer.licenceBackImage) {
          customer.licenceBackImage = `http://localhost:5096${customer.licenceBackImage}`;
        }
      });
    });
  }

  viewCustomerDetails(customer: Customer) {
    this.selectedCustomer = customer;
    this.isModalVisible = true; // Show the modal
  }

  closeModal() {
    this.isModalVisible = false; // Hide the modal
  }

  areAllDetailsPresent(customer: Customer): boolean {
    return !!(
      customer.licenceFrontImage &&
      customer.licenceBackImage &&
      customer.nic &&
      customer.customerName &&
      customer.phoneNumber &&
      customer.address &&
      customer.proof &&
      customer.proofNumber &&
      customer.email
    );
  }

  approveCustomer(customer: Customer) {
    this.customerService
      .updateCustomerStatus(customer.customerId, 1)
      .subscribe(() => {
        customer.isVerified = true;
        customer.status = 'Verified'; // Set status to Verified
        this.loadCustomers(); // Reload the customer data from the server
      });
  }

  rejectCustomer(customer: Customer) {
    this.customerService.updateCustomerStatus(customer.customerId, 0).subscribe(
      () => {
        customer.isVerified = false;
        customer.status = 'Rejected'; // Set status to Rejected
        this.loadCustomers(); // Reload the customer data from the server
      },
      (error) => {
        console.error('Error rejecting customer:', error);
      }
    );
  }
}
