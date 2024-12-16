import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from '../../../Shared/service/car.service';
import { BrandService } from '../../../Shared/service/brand.service';
import { CustomerService } from '../../../Shared/service/customer.service';
import { DatePipe } from '@angular/common';
import { PaymentService } from '../../../Shared/service/payment.service';
import Chart from 'chart.js/auto';
import { Customer } from '../../../Shared/models/customer';
import { Payment } from '../../../Shared/models/payment';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';
import { RentalRequest } from '../../../Shared/models/rental-request';

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
  payments: Payment[] = [];
  rentalsPerDay: { [key: string]: number } = {}; 

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
    private paymentService: PaymentService,
    private rentalRequestService: RentalRequestService,
  ) {}

  ngOnInit(): void {
    this.getBrandsCount();
    this.getCarsCount();
    this.getCustomersCount();
    this.getTotalPayments();
    this.paymentService.getAllPayments().subscribe(
      (data: Payment[]) => {
        this.payments = data;
        this.createPieChart();
      },
      (error) => {
        console.error('Error fetching payments:', error);
      }
    );
    this.createDailyChart();
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


  createPieChart(): void {
    // Initialize the totals for each payment type
    let rentalPaymentTotal = 0;
    let advancePaymentTotal = 0;
    let inspectionPaymentTotal = 0;
    let overduePaymentTotal = 0;
    let overagePaymentTotal = 0;

    // Loop through the payments and sum the values
    this.payments.forEach((payment) => {
      rentalPaymentTotal += payment.rentalPayment;
      advancePaymentTotal += payment.advancePayment;
      inspectionPaymentTotal += payment.inspectionPayment;
      overduePaymentTotal += payment.overduePayment;
      overagePaymentTotal += payment.overagePayment;
    });

    // Data to display in the pie chart
    const paymentData = [
      rentalPaymentTotal,
      advancePaymentTotal,
      inspectionPaymentTotal,
      overduePaymentTotal,
      overagePaymentTotal,
    ];

    this.chart = new Chart('paymentChart', {
      type: 'pie',
      data: {
        labels: ['Rental Payment', 'Advance Payment', 'Inspection Payment', 'Overdue Payment', 'Overage Payment'],
        datasets: [
          {
            data: paymentData,
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#8E44AD'],
            hoverBackgroundColor: ['#FF6F61', '#6BFF6D', '#446BFF', '#FFCC00', '#9B59B6'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: $${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }

  createDailyChart() {
    // Fetch rental requests data and process it
    this.rentalRequestService.getAllRentalRequests().subscribe(
      (rentalRequests: RentalRequest[]) => {
        rentalRequests.forEach((rentalRequest) => {
          const rentalDate = rentalRequest.requestDate.split('T')[0]; // Assuming date format is ISO (YYYY-MM-DD)
          this.rentalsPerDay[rentalDate] = (this.rentalsPerDay[rentalDate] || 0) + 1;
        });

        // Prepare chart data
        const rentalDates = Object.keys(this.rentalsPerDay);
        const rentalCounts = rentalDates.map((date) => this.rentalsPerDay[date]);

        this.chart = new Chart('dailyChart', {
          type: 'bar',
          data: {
            labels: rentalDates,
            datasets: [
              {
                label: 'Rental Requests',
                data: rentalCounts,
                backgroundColor: '#f53434',
              },
            ],
          },
          options: {
            responsive: true,
            aspectRatio: 2.5,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.raw}`;
                  },
                },
              },
            },
          },
        });
      },
      (error) => {
        console.error('Error fetching rental requests:', error);
      }
    );
  }
  
}
