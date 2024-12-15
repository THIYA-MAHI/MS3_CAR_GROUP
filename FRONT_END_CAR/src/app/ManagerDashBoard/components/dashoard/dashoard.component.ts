import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from '../../../Shared/service/car.service';
import { BrandService } from '../../../Shared/service/brand.service';
import { CustomerService } from '../../../Shared/service/customer.service';
import { DatePipe } from '@angular/common';
import { PaymentService } from '../../../Shared/service/payment.service';
import Chart from 'chart.js/auto';
import { Customer } from '../../../Shared/models/customer';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.css'],
})
export class DashoardComponent implements OnInit {
  totalBrands: number = 0;
  totalCars: number = 0;
  totalCustomers: number = 0;
  totalPayments: number = 0;
  public chart: any;

  cards = [
    {
      title: 'Total Brands',
      icon: 'bi bi-substack',
      value: this.totalBrands,
      link: '/brand',
      bgColor: '#ec5858',
    },
    {
      title: 'Total Cars',
      icon: 'bi bi-car-front',
      value: this.totalCars,
      link: '/car',
      bgColor: '#f33636',
    },
    {
      title: 'Total Customers',
      icon: 'bi bi-people-fill',
      value: this.totalCustomers,
      link: '/users',
      bgColor: '#d51c1c',
    },
    {
      title: 'Total Payments',
      icon: 'bi bi-wallet2',
      value: `Rs-${this.totalPayments}`,
      link: '/payment',
      bgColor: '#d20a0a',
    },
  ];

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private customerService: CustomerService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getBrandsCount();
    this.getCarsCount();
    this.getCustomersCount();
    this.getTotalPayments();
    this.createChart();
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
      (data: Customer[]) => {
        this.totalCustomers = data.length; // Directly count all customers
        console.log('Total Customers:', this.totalCustomers);
        this.updateCardValue('Total Customers', this.totalCustomers);
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }
  
  getTotalPayments() {
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        // Sum up the total of all payment amounts
        this.totalPayments = data.reduce(
          (sum, payment) =>
            sum +
            payment.rentalPayment +
            payment.advancePayment +
            payment.inspectionPayment +
            payment.overduePayment +
            payment.overagePayment,
          0
        );
        this.updateCardValue('Total Payments', this.totalPayments); // Update the card with the total payment value
      },
      (error) => {
        console.error('Error fetching payments:', error);
      }
    );
  }
  // Update specific card value
  updateCardValue(title: string, value: string | number) {
    const card = this.cards.find((c) => c.title === title);
    if (card) {
      card.value = value;
    }
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', // This denotes the type of chart

      data: {
        // Values on X-Axis
        labels: ['Total Cars', 'Total Customers'],
        datasets: [
          {
            label: 'Count',
            data: [this.totalCars, this.totalCustomers], // Use current values of totalCars and totalCustomers
            backgroundColor: ['white', 'red'],
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
