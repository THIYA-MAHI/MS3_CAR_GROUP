import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnCarRequest } from '../models/return';
import { Rental, RentalTableRequestDTO } from '../models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = 'http://localhost:5096/api/Rental'; // Your API URL

  constructor(private http: HttpClient) {}

  // Add Rental Request
  addRental(rentalData: RentalTableRequestDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddRentalRequest`, rentalData); // Send data to correct API
  }

  // Update Rental to Return
  updateRentalToReturn(returnCarRequest: ReturnCarRequest): Observable<Rental> {
    return this.http.post<Rental>(
      `${this.apiUrl}/update-rental-to-Return`,
      returnCarRequest
    );
  }

  // Get Rental by ID
  getRentalById(id: string): Observable<Rental> {
    return this.http.get<Rental>(`${this.apiUrl}/${id}`);
  }

  // Get All Rentals
  getAllRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/all-rentals`);
  }
}
