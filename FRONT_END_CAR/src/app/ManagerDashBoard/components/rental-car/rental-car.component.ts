import { Component } from '@angular/core';

@Component({
  selector: 'app-rental-car',
  templateUrl: './rental-car.component.html',
  styleUrl: './rental-car.component.css',
})
export class RentalCarComponent {
  today: string = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  selectedRental: any = null;
  viewMoreData: any = null;
  form = {
    odometerStart: '',
    advancePayment: '',
    rentalPayment: '',
  };

  rentals = [
    {
      rentalId: 1,
      requestId: 'REQ001',
      carId: 'CAR001',
      customerId: 'CUST001',
      customerName: 'John Doe',
      phone: '123-456-7890',
      pickupDate: '2024-11-20',
      dropoffDate: '2024-11-25',
      rentedDate: '',
      odometerStart: '',
      advancePayment: '',
      rentalPayment: '',
    },
    {
      rentalId: 2,
      requestId: 'REQ002',
      carId: 'CAR002',
      customerId: 'CUST002',
      customerName: 'Jane Smith',
      phone: '987-654-3210',
      pickupDate: '2024-11-18',
      dropoffDate: '2024-11-24',
      rentedDate: '',
      odometerStart: '',
      advancePayment: '',
      rentalPayment: '',
    },
  ];

  isRentalButtonDisabled(rentedDate: string): boolean {
    const rentalDate = new Date(rentedDate);
    const currentDate = new Date();
    const differenceInHours =
      (currentDate.getTime() - rentalDate.getTime()) / (1000 * 60 * 60);
    return differenceInHours > 24;
  }

  openRentalForm(rental: any): void {
    this.selectedRental = rental;
    this.form = {
      odometerStart: '',
      advancePayment: '',
      rentalPayment: '',
    };
  }

  submitRental(): void {
    if (
      this.form.odometerStart &&
      this.form.advancePayment &&
      this.form.rentalPayment
    ) {
      this.selectedRental.rentedDate = this.today;
      this.selectedRental.odometerStart = this.form.odometerStart;
      this.selectedRental.advancePayment = this.form.advancePayment;
      this.selectedRental.rentalPayment = this.form.rentalPayment;
      this.selectedRental = null;
      alert('Rental data submitted successfully!');
    } else {
      alert('Please fill out all fields before submitting.');
    }
  }

  cancelRentalForm(): void {
    this.selectedRental = null;
  }

  openViewMoreModal(rental: any): void {
    this.viewMoreData = rental;
  }

  closeViewMoreModal(): void {
    this.viewMoreData = null;
  }
}
