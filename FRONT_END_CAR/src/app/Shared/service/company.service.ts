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

  // Edit a company
  editCompany(companyId: number, companyData: any): Observable<any> {
    const url = `${this.apiUrl}/EditCompany/${companyId}`;
    // Assuming you're sending JSON data (and not actual file data in this case)
    return this.http.put(url, companyData);
  }

  // Delete a company
  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteCompany/${companyId}`);
  }

  // Upload file method (if you need a separate endpoint for file upload)
  uploadFile(formData: FormData, headers: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiUrl}/UploadFile`, formData, { headers });
  }
}
