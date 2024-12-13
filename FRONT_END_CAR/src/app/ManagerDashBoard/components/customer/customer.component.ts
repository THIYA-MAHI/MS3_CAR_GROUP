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
    // Load customers either from the service cache or API
    if (this.customerService.customers.length > 0) {
      this.customers = this.customerService.customers;
    } else {
      this.getCustomers();
    }
  }

  getCustomers() {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
      this.customerService.customers = data;

      this.customers.forEach((customer) => {
        // Ensure the image URLs are correctly formatted
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
      customer.nic
    );
  }

  approveCustomer(customer: Customer) {
    this.customerService
      .updateCustomerStatus(customer.customerId, 1)
      .subscribe(() => {
        customer.isVerified = true;
        // Update the service data with the new status
        this.customerService.customers = [...this.customers];
      });
  }

  rejectCustomer(customer: Customer) {
    this.customerService.updateCustomerStatus(customer.customerId, 0).subscribe(
      () => {
        customer.isVerified = false;
        customer.status = 'Rejected'; // Update status column to "Rejected"
        // Update the service data with the new status
        this.customerService.customers = [...this.customers];
      },
      (error) => {
        console.error('Error rejecting customer:', error);
      }
    );
  }
}
