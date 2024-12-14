import { Component, OnInit } from '@angular/core';
import { Car } from '../../../Shared/models/car';
import { CarService } from '../../../Shared/service/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null;
  galleryImages: string[] = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', // Example images
  ];

  isModalOpen: boolean = false;
  currentImage: string = '';

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

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const carId = this.activatedRoute.snapshot.paramMap.get('id');
    if (carId) {
      this.getCarDetails(carId);
    }
  }

  getCarDetails(carId: string): void {
    this.carService.getCarById(carId).subscribe(
      (carData) => {
        this.car = carData;
        if (this.car && this.car.carImages && this.car.carImages.length > 0) {
          this.car.image = `http://localhost:5096/images/${this.car.carImages[0]}`;

        }
      },
      (error) => {
        console.error('Error fetching car details:', error);
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

  toggleFaq(faqList: any[], faq: any) {
    faqList.forEach((item) => {
      if (item !== faq) {
        item.open = false;
      }
    });
    faq.open = !faq.open;
  }
}
