import { Component } from '@angular/core';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';
import { RentalRequest } from '../../../Shared/models/rental-request';
import { RentalService } from '../../../Shared/service/rental.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Reactive Forms

@Component({
  selector: 'app-rental-car',
  templateUrl: './rental-car.component.html',
  styleUrls: ['./rental-car.component.css'],
})
export class RentalCarComponent {
  today: string = new Date().toISOString().split('T')[0];
  selectedRental: any = null;
  rentalForm: FormGroup; // Declare the form group

  rentalCar: RentalRequest[] = [];
  rentals: any[] = [];

  constructor(
    private rentalRequestService: RentalRequestService,
    private rentalService: RentalService,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    // Initialize the form group with form controls
    this.rentalForm = this.fb.group({
      rentalDate: [this.today, Validators.required],
      odometerStart: ['', Validators.required],
      advancePayment: ['', [Validators.required, Validators.min(1)]],
      rentalPayment: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadRentalRequests();
    this.loadRentals();
  }

  loadRentalRequests(): void {
    this.rentalRequestService.getAllRentalRequests().subscribe({
      next: (data) => {
        this.rentalCar = data.filter((rental: RentalRequest) =>
          [2, 4, 5].includes(rental.status)
        );
      },
      error: (err) => {
        console.error('Error fetching rental requests', err);
      },
    });
  }

  loadRentals(): void {
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentals = data.filter((rental) =>
          this.rentalCar.some(
            (rentalRequest) =>
              rentalRequest.rentalRequestId === rental.rentalRequestId
          )
        );
        console.log('Matched Rentals:', this.rentals); // For debugging purposes
      },
      error: (err) => {
        console.error('Error fetching rentals', err);
      },
    });
  }

  isRentalButtonDisabled(rentedDate: string): boolean {
    const rentalDate = new Date(rentedDate);
    const currentDate = new Date();
    const differenceInHours =
      (currentDate.getTime() - rentalDate.getTime()) / (1000 * 60 * 60);
    return differenceInHours > 24;
  }

  openRentalForm(rental: any): void {
    console.log('openRentalForm called with rental:', rental);  // Debugging log
    this.selectedRental = rental; // Set the selected rental
    // Set the rental details into the form
    this.rentalForm.patchValue({
      rentalDate: this.today,
      odometerStart: '',
      advancePayment: '',
      rentalPayment: '',
    });
    this.rentalForm.get('rentalDate')?.disable();
  }

  submitRental(): void {
    if (this.rentalForm.valid) {
      const formData = this.rentalForm.value;
      // Add the form data to the selected rental object
      this.selectedRental.rentedDate = formData.rentalDate;
      this.selectedRental.odometerStart = formData.odometerStart;
      this.selectedRental.advancePayment = formData.advancePayment;
      this.selectedRental.rentalPayment = formData.rentalPayment;

      // Send the rental data to the service to be added to the database
      this.rentalService.addRental(this.selectedRental).subscribe(
        (data) => {
          // Add the newly added rental to the rentals array
          this.rentals.push(data);
          alert('Rental data submitted successfully!');
          this.cancelRentalForm();
        },
        (error) => {
          console.error('Error submitting rental:', error);
          alert('There was an error submitting the rental.');
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

  cancelRentalForm(): void {
    this.selectedRental = null;
    this.rentalForm.reset();
  }
}
