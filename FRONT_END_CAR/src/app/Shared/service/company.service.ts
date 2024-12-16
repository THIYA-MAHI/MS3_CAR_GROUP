import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'https://localhost:5096/api/Company';

  constructor(private http: HttpClient) {}

  // Get all companies
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/AllCompanies`);
  }

  // Add a company
  addCompany(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddCompany`, formData);
  }

  // Get a company by ID
  getCompanyById(companyId: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${companyId}`);
  }

  // Edit a company
  editCompany(companyId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/EditCompany/${companyId}`, formData);
  }

  // Update company status
  updateStatus(companyId: number, newStatus: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/UpdateStatus/${companyId}`,
      JSON.stringify(newStatus),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Upload a file (logo/profile image)
  uploadFile(formData: FormData, headers: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiUrl}/UploadFile`, formData, {
      headers,
      reportProgress: true,
      observe: 'events',
    });
  }

  // Delete a company
  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteCompany/${companyId}`);
  }
}
