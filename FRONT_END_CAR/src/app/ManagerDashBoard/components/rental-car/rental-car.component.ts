import { Component, OnInit } from '@angular/core';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';
import { RentalRequest } from '../../../Shared/models/rental-request';
import { RentalService } from '../../../Shared/service/rental.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalTableRequestDTO } from '../../../Shared/models/rental';
import { CarService } from '../../../Shared/service/car.service';
import { Car } from '../../../Shared/models/car';

@Component({
  selector: 'app-rental-car',
  templateUrl: './rental-car.component.html',
  styleUrls: ['./rental-car.component.css'],
})
export class RentalCarComponent implements OnInit {
  today: string = new Date().toISOString().split('T')[0];
  selectedRental: any = null;
  rentalForm: FormGroup;
  rentalCar: RentalRequest[] = []; // Store rental requests
  rentals: any[] = []; // Store matched rentals
  car: Car | null = null;
  totalRentPayment: number = 0; // Variable to store total rent payment

  constructor(
    private rentalRequestService: RentalRequestService,
    private rentalService: RentalService,
    private carService: CarService,
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

  // Disable rental button if the rental date exceeds 24 hours from now
  isRentalButtonDisabled(rentedDate: string): boolean {
    const rentalDate = new Date(rentedDate);
    const currentDate = new Date();
    const differenceInHours =
      (currentDate.getTime() - rentalDate.getTime()) / (1000 * 60 * 60);
    return differenceInHours > 24;
  }

  // Open the rental form modal and set values
  openRentalForm(rental: any): void {
    this.selectedRental = rental; // Set the selected rental

    // Assuming each rental has a carId, pass it to getCarDetails
    const carId = rental.carId; // Get the carId associated with this rentalRequestId

    // Fetch the car details by carId
    this.getCarDetails(carId);

    // Set the rental details into the form
    this.rentalForm.patchValue({
      rentalDate: this.today,
      odometerStart: '',
      advancePayment: '',
      rentalPayment: '',
    });

    // Disable rentalDate field
    this.rentalForm.get('rentalDate')?.disable();

    // Calculate the total rent payment
    this.calculateTotalRentPayment(rental);
  }

  // Fetch car details by carId
  getCarDetails(carId: string): void {
    this.carService.getCarById(carId).subscribe(
      (carData) => {
        if (carData) {
          this.car = carData; // Assign fetched car data to the `car` variable
          if (this.car.carImages && this.car.carImages.length > 0) {
            this.car.image = `http://localhost:5096/images/${this.car.carImages[0]}`; // Set car image if available
          }
          console.log('Car details fetched successfully:', this.car);
        } else {
          console.warn('No car data returned for ID:', carId);
        }
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }

  // Calculate total rent payment
  calculateTotalRentPayment(rental: any): void {
    if (this.car && rental.startDate && rental.endDate) {
      const startDate = new Date(rental.startDate);
      const endDate = new Date(rental.endDate);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const timeDiffInDays = timeDiff / (1000 * 3600 * 24); // Convert time difference to days

      if (this.car.pricePerDay && timeDiffInDays > 0) {
        this.totalRentPayment = this.car.pricePerDay * timeDiffInDays;
        console.log('Total Rent Payment:', this.totalRentPayment);
      } else {
        this.totalRentPayment = 0;
      }
    }
  }

  submitRental(): void {
    if (this.rentalForm.valid) {
      const formData = this.rentalForm.value; // Get form values
  
      // Create DTO for rental data
      const rentalData: RentalTableRequestDTO = {
        requestId: this.selectedRental.rentalRequestId,
        rentalDate: new Date().toISOString(), // Parse current date to ISO string format
        odometerStart: formData.odometerStart,
        rentalPayment: this.totalRentPayment, // Use totalRentPayment here
        advancePayment: formData.advancePayment,
      };
  
      // Send the rental data to the service to be added to the database
      this.rentalService.addRental(rentalData).subscribe(
        (data) => {
          this.rentals.push(data);
          alert('Rental data submitted successfully!');
          this.cancelRentalForm();
        },
        (error) => {
          console.error('Error submitting rental:', error);
          alert(`There was an error submitting the rental: ${error}`);
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
  
  // Cancel the rental form and reset values
  cancelRentalForm(): void {
    this.selectedRental = null;
    this.rentalForm.reset();
    this.rentalForm.get('rentalDate')?.enable(); // Re-enable rental date if necessary
  }
}
