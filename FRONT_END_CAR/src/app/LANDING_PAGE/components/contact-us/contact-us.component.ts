import { Component } from '@angular/core';
import { ContactUsService } from '../../../Shared/service/contact-us.service';
import { ContactUs } from '../../../Shared/models/contact-us-details';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  cards = [
    { icon: 'bi bi-envelope-fill', title: 'Email us', text: 'quickspin@gmail.com' },
    {
      icon: 'bi bi-geo-alt',
      title: 'Our Address',
      text: 'tower House lane, jaffna',
    },
    {
      icon: 'bi bi-clock',
      title: 'Opening Hours',
      text: 'Mon-Sun: 8 AM - 7 PM',
    },
    {
      icon: 'bi bi-telephone-fill',
      title: 'Call us',
      text: '+94 77 2579 029',
    },
  ];

  formFields = [
    { key: 'name', type: 'text', placeholder: 'Your Name *' },
    { key: 'email', type: 'email', placeholder: 'Your Email *' },
    { key: 'phone', type: 'tel', placeholder: 'Your Number *' },
    { key: 'message', type: 'text', placeholder: 'Message *' },
  ];


  contact: any = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  constructor(private contactUsService: ContactUsService) {}

  onSubmit() {
    this.contactUsService.addContact(this.contact).subscribe(
      (response) => {
        console.log('Contact submitted successfully', response);
        alert('Your message has been sent!');
        this.contact = { name: '', email: '', phone: '', message: '' }; // Reset form
      },
      (error) => {
        console.error('Error submitting contact form', error);
        alert('Failed to send message. Please try again later.');
      }
    );
  }
}
