import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { AuthResponse } from '../models/auth-response';
import { LoginRequest } from '../models/login-request';

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
  updateCustomerDetails(id: string, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateCustomer/${id}`, data);
  }

  // Update customer status
  updateCustomerStatus(id: string, status: number): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.apiUrl}/UpdateCustomerStatus/${id}`,
      { status }
    );
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(this.apiUrl + '/login', loginRequest, {
      responseType: 'text',
    });
  }

  isLoggedIn() {
    if (localStorage.getItem('Token')) {
      return true;
    } else {
      return false;
    }
  }

  // Register a new customer
  register(registerRequest: Customer): Observable<Customer> {
    // Changed to return Customer
    return this.http.post<Customer>(
      `${this.apiUrl}/register`,
      registerRequest,
      {
        headers: { accept: 'application/json' }, // Set your headers as required
      }
    );
  }
}
