import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from '../../../Shared/service/car.service';
import { BrandService } from '../../../Shared/service/brand.service';
import { CustomerService } from '../../../Shared/service/customer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.css'],
})
export class DashoardComponent implements OnInit {
  totalBrands: number = 0;
  totalCars: number = 0;
  totalCustomers: number = 0; 
  monthlyIncome: number = 25000; 
 
  cards = [
    {
      title: 'Total Brands',
      icon: 'bi bi-substack',
      value: this.totalBrands,
      link: '/brand',
      bgColor: '#ec5858' 
    },
    {
      title: 'Total Cars',
      icon: 'bi bi-car-front',
      value: this.totalCars,
      link: '/car',
      bgColor: '#f33636' 
    },
    {
      title: 'Total Customers',
      icon: 'bi bi-people-fill',
      value: this.totalCustomers,
      link: '/users',
      bgColor: '#d51c1c' 
    },
    {
      title: 'Monthly Income',
      icon: 'bi bi-cash-stack',
      value: `Rs ${this.monthlyIncome}`,
      link: '',
      bgColor: '#d20a0a' 
    }
  ];

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.getBrandsCount();
    this.getCarsCount();
    this.getCustomersCount();
    
  }


  // Fetch the total number of brands
  getBrandsCount() {
    this.brandService.getAllBrands().subscribe(
      (data) => {
        this.totalBrands = data.length; 
        this.updateCardValue('Total Brands', this.totalBrands);
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  // Fetch the total number of cars
  getCarsCount() {
    this.carService.getAllCars().subscribe(
      (data) => {
        this.totalCars = data.length; 
        this.updateCardValue('Total Cars', this.totalCars);
      },  
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  // Fetch the total number of customers
  getCustomersCount() {
    this.customerService.getAllCustomers().subscribe(
      (data) => {
        this.totalCustomers = data.filter(customer => customer.isVerified).length;
        this.updateCardValue('Total Customers', this.totalCustomers);
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  // Update specific card value
  updateCardValue(title: string, value: string | number) {
    const card = this.cards.find(c => c.title === title);
    if (card) {
      card.value = value;
    }
  }
}
