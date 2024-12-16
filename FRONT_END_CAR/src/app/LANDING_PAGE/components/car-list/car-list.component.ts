import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarService } from '../../../Shared/service/car.service';
import { BrandService } from '../../../Shared/service/brand.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../../../Shared/models/customer';
import { CustomerService } from '../../../Shared/service/customer.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: any[] = [];
  brands: any[] = [];
  page: number = 1;
  @Output() singleCar: any = new EventEmitter();

  pickUpDate: string | undefined;
  dropOffDate: string | undefined;
  minPickUpDate: string = '';
  minDropOffDate: string = '';

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private router: Router,
    private toastr: ToastrService,
    private customerService: CustomerService
  ) {}

  viewCarDetails(carId: number): void {
    if (this.pickUpDate && this.dropOffDate) {
      this.router.navigate([
        '/car-details',
        carId,
        this.pickUpDate,
        this.dropOffDate,
      ]);
    } else {
      this.toastr.warning(
        'Please select both pickup and return dates before viewing car details.'
      );
    }
  }

  ngOnInit(): void {
    this.getAllBrands();
    this.setMinPickUpDate();
  }

  // Set today's date as the minimum pickup date
  setMinPickUpDate(): void {
    const today = new Date();
    this.minPickUpDate = today.toISOString().split('T')[0];
  }

  // Update minimum dropoff date when pickup date changes
  onPickUpDateChange(): void {
    if (this.pickUpDate) {
      const pickUp = new Date(this.pickUpDate);
      const nextDay = new Date(pickUp);
      nextDay.setDate(pickUp.getDate());
      this.minDropOffDate = nextDay.toISOString().split('T')[0];
    } else {
      this.minDropOffDate = '';
    }
  }

  onRentNow(): void {
    const customerId = localStorage.getItem('CustomerId');
    if (!customerId) {
      this.toastr.error('No customer logged in. Please log in first.');
      this.router.navigate(['/login']);
      return;
    }

    this.customerService.getCustomerById(customerId).subscribe({
      next: (customer: Customer) => {
        if (customer.status === 2) {
          if (!this.pickUpDate || !this.dropOffDate) {
            this.toastr.warning('Please select both pickup and return dates.');
            return;
          }

          this.carService
            .getAvailableCars(this.pickUpDate, this.dropOffDate)
            .subscribe({
              next: (data) => {
                this.cars = data;
                this.cars.forEach((car) => {
                  car.image = `http://localhost:5096/images/${car.carImages[0]}`;
                });
                this.toastr.success('Available cars loaded successfully!');
              },
              error: (error) => {
                console.error('Error fetching available cars:', error);
                this.toastr.error('No available cars. Please try again later.');
              },
            });
        } else {
          this.toastr.info(
            'Your account status does not allow renting. Please update your profile in your dashboard.'
          );
          this.router.navigate(['/Profile']);
        }
      },
      error: (error) => {
        console.error('Error fetching customer details:', error);
        this.toastr.error('An error occurred. Please try again.');
      },
    });
  }

  // Fetch all brands
  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      (data) => {
        this.brands = data;
        this.toastr.success('Brands loaded successfully!');
      },
      (error) => {
        console.error('Error fetching brands:', error);
        this.toastr.error('Error loading brands. Please try again.');
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
        this.toastr.success('Cars loaded successfully!');
      },
      (error) => {
        console.error('Error fetching cars:', error);
        this.toastr.error('Error loading cars. Please try again.');
      }
    );
  }

  // Get brand name by brandId
  getBrandName(brandId: string): string {
    const brand = this.brands.find((b) => b.brandId === brandId);
    return brand ? brand.brandName : 'Unknown';
  }
}
