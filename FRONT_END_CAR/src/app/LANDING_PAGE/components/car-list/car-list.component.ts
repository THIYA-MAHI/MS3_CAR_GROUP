import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarService } from '../../../Shared/service/car.service';
import { BrandService } from '../../../Shared/service/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})

export class CarListComponent implements OnInit {
  cars: any[] = [];
  brands: any[] = [];
  page: number = 1;
  @Output() singleCar:any = new EventEmitter();


  pickUpDate: string | undefined; 
  dropOffDate: string | undefined; 

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private router: Router
  ) {
  }
  viewCarDetails(carId: number): void {
    this.router.navigate(['car-details', carId]);
  }
  

  ngOnInit(): void {
    this.getAllBrands();
  }
  onRentNow(): void {
    if (!this.pickUpDate || !this.dropOffDate) {
      alert('Please select both pickup and return dates.');
      return;
    }

    // Call API to fetch available cars
    this.carService.getAvailableCars(this.pickUpDate, this.dropOffDate).subscribe({
      next: (data) => {
        this.cars = data; 
        this.cars.forEach((car) => {
          car.image = `http://localhost:5096/images/${car.carImages[0]}`;
        });
      },
      error: (error) => {
        console.error('Error fetching available cars:', error);
        alert('Not available cars. Please try again later.');
      },
    });
  }
  // Fetch all brands
  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      (data) => {
        this.brands = data;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  // Get all cars
  getCars() {
    this.carService.getAllCars().subscribe(
      (data) => {
        this.cars = data;
        this.cars.forEach((car) => {
          car.image = `http://localhost:5096/images/${car.carImages[0]}`;
        });
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  // Get brand name by brandId
  getBrandName(brandId: string): string {
    const brand = this.brands.find((b) => b.brandId === brandId);
    return brand ? brand.brandName : 'Unknown';
  }
}

