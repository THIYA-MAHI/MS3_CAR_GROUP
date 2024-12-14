import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:5096/api/Payment';

  constructor(private http: HttpClient) {}

  // Get all payments
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  // Get payment by ID
  getPaymentById(paymentId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${paymentId}`);
  }

  // Add a new payment
  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  // Update a payment
  updatePayment(paymentId: string, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${paymentId}`, payment);
  }

  // Get total income for a rental
  getTotalIncome(rentalId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalincome/${rentalId}`);
  }
}
