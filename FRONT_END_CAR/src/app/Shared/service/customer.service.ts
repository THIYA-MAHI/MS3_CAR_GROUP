import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/register';
import { Customer } from '../models/customer';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:5096/api/customers'; // API endpoint
  customers: Customer[] = [];
  constructor(private http: HttpClient) {}

  // Get all customers
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/AllCustomerData`);
  }

  // Get customer by ID
  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/CustomerById/${id}`);
  }

  // Update customer details
  updateCustomerDetails(
    id: string,
    customer: Partial<Customer>
  ): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.apiUrl}/UpdateCustomer/${id}`,
      customer
    );
  }

  // Update customer status
  updateCustomerStatus(id: string, status: number): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.apiUrl}/UpdateCustomerStatus/${id}`,
      { status }
    );
  }

  // Customer login
  login(loginRequest: LoginRequest): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/login`,
      loginRequest,
      { responseType: 'text' as 'json' } // Handling the response as plain text (token)
    );
  }

  // Check if user is logged in by checking token
  isLoggedIn(): boolean {
    return !!localStorage.getItem('Token');
  }

  // Register a new customer
  register(registerRequest: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${this.apiUrl}/register`,
      registerRequest,
      { headers: { accept: 'application/json' } } // Set headers as required
    );
  }
}
