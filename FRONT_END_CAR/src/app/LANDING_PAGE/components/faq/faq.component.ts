import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {


  faqsLeft = [
    {
      id: 1,
      title: 'Required Documents',
      content: 'To rent a car, you will need a valid driver’s license and proof of identity (such as a passport or national ID).',
      open: false,
    },
    {
      id: 2,
      title: ' Minimum Age',
      content: 'The minimum age to rent a car is typically 21 years old. However, drivers under 25 may incur a young driver surcharge.',
      open: false,
    },
    {
      id: 3,
      title: 'Car Types Available',
      content: 'We offer a wide range of Cars, including economy, compact, luxury, SUVs, and more. Check our website or contact us for specific models available at your location.',
      open: false,
    },
    {
      id: 4,
      title: 'Mileage Limits',
      content: 'Many rental cars come with unlimited mileage, but some may have daily or total mileage limits. Check the rental terms for specific mileage restrictions.',
      open: false,
    }
  ];

  // FAQs for the right column
  faqsRight = [
  
    {
      id: 5,
      title: 'Returning the Car Early',
      content: 'Returning the car earlier than the scheduled time may not result in a refund, and in some cases, an early return fee may apply.',
      open: false,
    },
    {
      id: 6,
      title: 'Late Returns',
      content: 'If you return the car late, you may be charged an additional fee, typically calculated per hour or day depending on the rental agreement.',
      open: false,
    },
    {
      id: 7,
      title: 'Advance Payment',
      content: 'Some rentals require a payment when you book. It’s usually part of the total cost or a deposit. Check the booking terms for details.',
      open: false,
    },
    {
      id: 8,
      title: 'Can I Extend My Rental Period?',
      content: 'Yes, you can typically extend your rental period, subject to availability and additional fees. Contact the rental company before your rental period expires to extend the rental.',
      open: false,
    },
  ];

  // Toggle an FAQ and close all others in the same column
  toggleFaq(faqList: any[], faq: any) {
    faqList.forEach((item) => {
      if (item !== faq) {
        item.open = false; // Close other FAQs
      }
    });
    faq.open = !faq.open; // Toggle the clicked FAQ
  }
}