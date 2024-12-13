import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:5096/api/customers'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Login function to communicate with the backend API
  login(loginRequest: LoginRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, loginRequest);
  }

  // Check if the user is logged in based on token in localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('Token');
  }

  // Register a new customer
  register(registerRequest: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, registerRequest, {
      headers: { accept: 'text/plain' }, // Set your headers as required
    });
  }

  // Update customer details
  updateCustomerDetails(
    customerId: string,
    customerUpdate: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/UpdateCustomer/${customerId}`,
      customerUpdate
    );
  }

  // Fetch all customers
  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/AllCustomerData`);
  }

  // Fetch customer by ID
  getCustomerById(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/CustomerById/${customerId}`);
  }
}
