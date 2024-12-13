import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../../../Shared/service/contact-us.service';
import { ContactUs } from '../../../Shared/models/contact-us-details';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent implements OnInit {
  contacts: ContactUs[] = [];

  constructor(private contactUsService: ContactUsService) {}

  ngOnInit(): void {
    this.contactUsService.getAllContacts().subscribe(
      (data) => {
        this.contacts = data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      },
      (error) => {
        console.error('Error fetching contact details', error);
      }
    );
  }
}
