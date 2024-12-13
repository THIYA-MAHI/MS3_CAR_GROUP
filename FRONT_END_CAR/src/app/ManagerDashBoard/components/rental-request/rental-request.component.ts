import { Component, OnInit } from '@angular/core';
import { RentalRequest } from '../../../Shared/models/rental-request';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';

@Component({
  selector: 'app-rental-request',
  templateUrl: './rental-request.component.html',
  styleUrls: ['./rental-request.component.css'],
})
export class RentalRequestComponent implements OnInit {
  rentalRequests: RentalRequest[] = [];

  constructor(private rentalRequestService: RentalRequestService) {}

  ngOnInit(): void {
    // Fetch all rental requests when the component is initialized
    this.loadRentalRequests();
  }

  loadRentalRequests(): void {
    this.rentalRequestService.getAllRentalRequests().subscribe({
      next: (data) => {
        this.rentalRequests = data; // Store the fetched data
        // Sort rental requests with the latest ones first (by createDate)
        this.sortRentalRequests();
      },
      error: (err) => {
        console.error('Error fetching rental requests', err);
      },
    });
  }

  // Sort rental requests by createDate (latest first)
  sortRentalRequests(): void {
    this.rentalRequests.sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
  }

  approveRentalRequest(rentalRequestId: string): void {
    this.updateRentalRequestStatus(rentalRequestId, 2); // 2 for "approved"
  }

  rejectRentalRequest(rentalRequestId: string): void {
    this.updateRentalRequestStatus(rentalRequestId, 3); // 3 for "rejected"
  }

  private updateRentalRequestStatus(
    rentalRequestId: string,
    status: number
  ): void {
    this.rentalRequestService
      .updateRentalRequestStatus(rentalRequestId, status)
      .subscribe({
        next: (response) => {
          // Find the rental request in the local list
          const rentalRequest = this.rentalRequests.find(
            (request) => request.rentalRequestId === rentalRequestId
          );
          if (rentalRequest) {
            // Update the status
            rentalRequest.status = status;
            if (status === 2) {
              // Set the approval date when approved
              rentalRequest.updateDate = new Date().toISOString(); // Store the approval date in updateDate
            }
            // Re-sort after status update
            this.sortRentalRequests();
          }
        },
        error: (err) => {
          console.error('Error updating rental request status', err);
        },
      });
  }
}
