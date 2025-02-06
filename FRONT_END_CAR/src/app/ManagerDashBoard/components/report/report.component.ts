import { Component, OnInit } from '@angular/core';
import { RentalRequest } from '../../../Shared/models/rental-request';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  rentalRequests: RentalRequest[] = [];

  constructor(private rentalRequestService: RentalRequestService) {}

  ngOnInit(): void {
    this.loadRentalRequests();
  }

  // Method to load all rental requests
  loadRentalRequests(): void {
    this.rentalRequestService.getAllRentalRequests().subscribe(
      (data: RentalRequest[]) => {
        this.rentalRequests = data;
      },
      (error) => {
        console.error('Error fetching rental requests', error);
      }
    );
  }

  // Method to convert status number to text
  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }
  printReport(): void {
    window.print();
  }
}
