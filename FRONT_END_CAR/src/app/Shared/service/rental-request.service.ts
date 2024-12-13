import { Injectable } from '@angular/core';
import { RentalRequest } from '../models/rental-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalRequestService {
  private apiUrl = 'http://localhost:5096/api/rentalrequest';

  constructor(private http: HttpClient) {}

  // Fetch all rental requests
  getAllRentalRequests(): Observable<RentalRequest[]> {
    return this.http.get<RentalRequest[]>(`${this.apiUrl}/AllRentalRequests`);
  }

  // Add a new rental request
  addRentalRequest(request: RentalRequest): Observable<RentalRequest> {
    return this.http.post<RentalRequest>(
      `${this.apiUrl}/AddRentalRequest`,
      request
    );
  }

  // Fetch a single rental request by ID
  getRentalRequestById(rentalRequestId: string): Observable<RentalRequest> {
    return this.http.get<RentalRequest>(`${this.apiUrl}/${rentalRequestId}`);
  }

  // Update the status of a rental request
  updateRentalRequestStatus(
    rentalRequestId: string,
    status: number
  ): Observable<any> {
    const payload = { status };
    return this.http.patch(
      `${this.apiUrl}/UpdateStatus/${rentalRequestId}`,
      payload
    );
  }

  // Delete a rental request by ID
  deleteRentalRequest(rentalRequestId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/DeleteRentalRequest/${rentalRequestId}`
    );
  }
}
