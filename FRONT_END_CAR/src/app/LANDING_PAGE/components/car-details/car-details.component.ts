import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../../Shared/service/car.service';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';
import { Car } from '../../../Shared/models/car';
import { RentalRequest1 } from '../../../Shared/models/rental-request'; // Importing the updated interface
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null;
  galleryImages: string[] = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
  isModalOpen: boolean = false;
  currentImage: string = '';
  startDate: string | null = null;
  endDate: string | null = null;
  customerId: string | null = null;

  private lastRequest: {
    carId: string;
    startDate: string;
    endDate: string;
  } | null = null;
  private isRequestInProgress: boolean = false;

  constructor(
    private carService: CarService,
    private rentalRequestService: RentalRequestService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService // Inject ToastrService here
  ) {}

  ngOnInit(): void {
    const carId = this.activatedRoute.snapshot.paramMap.get('id');
    this.startDate = this.activatedRoute.snapshot.paramMap.get('pickUpDate');
    this.endDate = this.activatedRoute.snapshot.paramMap.get('dropOffDate');
    this.customerId = localStorage.getItem('CustomerId');

    if (carId) {
      this.getCarDetails(carId);
    } else {
      console.error('Car ID is missing in the route.');
    }

    console.log('Car ID:', carId);
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);
    console.log('Customer ID:', this.customerId);
  }

  getCarDetails(carId: string): void {
    this.carService.getCarById(carId).subscribe(
      (carData) => {
        if (carData) {
          this.car = carData;
          if (this.car.carImages && this.car.carImages.length > 0) {
            this.car.image = `http://localhost:5096/images/${this.car.carImages[0]}`;
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

  rentNow(): void {
    if (!this.car || !this.startDate || !this.endDate || !this.customerId) {
      console.error('Missing required data for rental request:', {
        car: this.car,
        startDate: this.startDate,
        endDate: this.endDate,
        customerId: this.customerId,
      });
      this.toastr.error(
        'Please ensure all booking details are filled.',
        'Error'
      ); // Toastr error
      return;
    }

    // Check if a similar request is already made
    const currentRequest = {
      carId: this.car.carId,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    if (
      this.lastRequest &&
      this.lastRequest.carId === currentRequest.carId &&
      this.lastRequest.startDate === currentRequest.startDate &&
      this.lastRequest.endDate === currentRequest.endDate
    ) {
      console.warn('Duplicate rental request detected. Request ignored.');
      this.toastr.info(
        'This rental request has already been submitted.',
        'Info'
      ); // Toastr info
      return;
    }

    if (this.isRequestInProgress) {
      console.warn('Request is already in progress.');
      this.toastr.warning(
        'Please wait. Your request is being processed.',
        'Warning'
      ); // Toastr warning
      return;
    }

    // Mark the request as in progress
    this.isRequestInProgress = true;

    const rentalRequest: RentalRequest1 = {
      customerId: this.customerId,
      carId: this.car.carId,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.rentalRequestService.addRentalRequest(rentalRequest).subscribe(
      (response) => {
        this.isRequestInProgress = false;
        this.lastRequest = currentRequest; // Store the last successful request
        console.log('Rental request submitted successfully:', response);
        this.toastr.success(
          'Rental request submitted successfully!',
          'Success'
        ); // Toastr success
      },
      (error) => {
        this.isRequestInProgress = false; // Reset the flag on error
        console.error('Error submitting rental request:', error);
        this.toastr.error(
          'Failed to submit rental request. Please try again.',
          'Error'
        ); // Toastr error
      }
    );
  }

  openModal(image: string): void {
    this.isModalOpen = true;
    this.currentImage = image;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentImage = '';
  }

  toggleFaq(faqList: any[], faq: any): void {
    faqList.forEach((item) => {
      if (item !== faq) {
        item.open = false;
      }
    });
    faq.open = !faq.open;
  }

  faqsLeft = [
    {
      id: 1,
      title: 'Age and responsibility',
      content:
        'Driver must be 25+ years old to drive economy, luxury cars and supercars.',
      open: false,
    },
    {
      id: 2,
      title: 'Deposit',
      content:
        '500 USD will be blocked on your card for 24 days. Cash deposits are also accepted.',
      open: false,
    },
    {
      id: 3,
      title: 'Documents',
      content: 'Valid ID, Driving license, and address proof are required.',
      open: false,
    },
    {
      id: 4,
      title: 'Car Delivery',
      content: 'Cars can be delivered to your location for an additional fee.',
      open: false,
    },
    {
      id: 5,
      title: 'Enquire Now',
      content:
        'You can contact us for a quotation & our team will assist you with the booking process.',
      open: false,
    },
    {
      id: 6,
      title: 'Payment Methods',
      content: 'We accept credit cards, debit cards, and cash.',
      open: false,
    },
  ];
}
