import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:5096/api/Car';

  constructor(private http: HttpClient) {}

  // Fetch all cars
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/AllCars`);
  }
  getCarById(carId: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${carId}`);
  }
  // Add a new car
  addCar(car: any): Observable<any> {
    const formData = new FormData();
    Object.keys(car).forEach((key) => {
      if (key === 'carImages') {
        car.carImages.forEach((file: File, index: number) => {
          formData.append(`carImages[${index}]`, file);
        });
      } else {
        formData.append(key, car[key]);
      }
    });

    return this.http.post<any>(`${this.apiUrl}/AddCar`, formData);
  }

  // Update an existing car
  updateCar(car: any): Observable<any> {
    const formData = new FormData();
    Object.keys(car).forEach((key) => {
      if (key === 'carImages') {
        car.carImages.forEach((file: File, index: number) => {
          formData.append(`carImages[${index}]`, file);
        });
      } else {
        formData.append(key, car[key]);
      }
    });

    return this.http.put<any>(`${this.apiUrl}/EditCar/${car.carId}`, formData);
  }

  // Delete a car
  deleteCar(carId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteCar/${carId}`);
  }

  getAvailableCars(pickUpDate: string, dropOffDate: string): Observable<Car[]> {
    const url = `${this.apiUrl}/availableCar?pickUpDate=${encodeURIComponent(pickUpDate)}&dropOffDate=${encodeURIComponent(dropOffDate)}`;
    return this.http.get<Car[]>(url);
  }
}
