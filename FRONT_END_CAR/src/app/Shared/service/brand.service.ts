import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private url: string = 'http://localhost:5096/api/Brand';  

  constructor(private http: HttpClient) {}

  // Get all brands
  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.url + '/AllBrands').pipe(
      map((res: any) => res.map((brand: any) => new Brand(brand)))
    );
  }

  // Get a single brand by ID
  getBrand(brandId: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.url}/${brandId}`);
  }

  // Add a new brand
  addBrand(newBrand: Brand): Observable<any> {
    return this.http.post(this.url + '/AddBrand', newBrand);
  }

  // Update an existing brand
  updateBrand(brandId: string, updatedBrand: Brand): Observable<any> {
    return this.http.put(`${this.url}/UpdateBrand/${brandId}`, updatedBrand);
  }

  // Delete a brand
  deleteBrand(brandId: string): Observable<any> {
    return this.http.delete(`${this.url}/DeleteBrand/${brandId}`);
  }
}