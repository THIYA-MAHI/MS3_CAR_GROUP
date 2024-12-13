import { Component } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent {
  galleryImages: string[] = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg', // Add more images as needed
  ];

  isModalOpen: boolean = false;
  currentImage: string = '';

  openModal(image: string): void {
    this.isModalOpen = true;
    this.currentImage = image;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentImage = '';
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

  toggleFaq(faqList: any[], faq: any) {
    faqList.forEach((item) => {
      if (item !== faq) {
        item.open = false;
      }
    });
    faq.open = !faq.open;
  }
}
