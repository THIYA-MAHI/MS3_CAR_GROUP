import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactUs } from '../models/contact-us-details';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private apiUrl = 'http://localhost:5096/api/ContactUs'; 

  constructor(private http: HttpClient) {}

  //submit a contact form
  addContact(contact: ContactUs): Observable<ContactUs> {
    return this.http.post<ContactUs>(`${this.apiUrl}/AddContact`, contact);
  }

  //  get all contacts for manager dashboard
  getAllContacts(): Observable<ContactUs[]> {
    return this.http.get<ContactUs[]>(`${this.apiUrl}/AllContacts`);
  }

  
}
