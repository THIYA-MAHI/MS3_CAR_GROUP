import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../../Shared/service/rental.service';
import { Rental } from '../../../Shared/models/rental';
import { RentalRequestService } from '../../../Shared/service/rental-request.service';
import { ReturnCarRequest } from '../../../Shared/models/return';

@Component({
  selector: 'app-returned',
  templateUrl: './returned.component.html',
  styleUrls: ['./returned.component.css'],
})
export class ReturnedComponent implements OnInit {
  rentals: Rental[] = [];
  showOverviewModal = false;
  showReturnFormModal = false;
  selectedRecord: Rental | null = null;
  overduePay: number | null = null; // Variable for overdue payment

  returnForm = {
    odometerEnd: null as number | null,
    returnDate: null as string | null,
    inspectionStatus: 'Good',
    overagePayment: null as number | null,
    overduePayment: null as number | null, // Updated to allow null or number
    inspectionPayment: null as number | null,
  };

  constructor(
    private rentalService: RentalService,
    private rentalRequestService: RentalRequestService // Inject the RentalRequestService
  ) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getAllRentals().subscribe({
      next: (data: Rental[]) => {
        this.rentals = data.filter(
          (rental) =>
            rental.rentalStatus === 'Rented' || rental.rentalStatus === 'Return'
        );
      },
      error: (err) => {
        console.error('Error fetching rentals', err);
      },
    });
  }

  openReturnFormModal(record: Rental): void {
    this.selectedRecord = record;
    this.calculateOveragePayment(); // Initial calculation when modal opens
    this.showReturnFormModal = true; // Open the modal
  }

  calculateOveragePayment(): void {
    if (this.selectedRecord && this.returnForm.odometerEnd !== null) {
      const odometerStart = this.selectedRecord.odometerStart;
      const odometerEnd = this.returnForm.odometerEnd;

      // Calculate the overage payment when odometerEnd is provided
      if (odometerStart !== null && odometerEnd !== null) {
        const odometerDifference = odometerEnd - odometerStart;
        const overageMillage = odometerDifference > 0 ? odometerDifference : 0; // Make sure the overage is not negative

        // Calculate the difference between rentalDate and currentDate (overdue)
        const rentalDate = new Date(this.selectedRecord.rentalDate);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - rentalDate.getTime();
        const daysOverdue = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Get the number of overdue days

        // Formula for overage payment (your calculation seems to involve days)
        this.returnForm.overagePayment =
          (overageMillage - daysOverdue * 100) * 1000; // Adjust the formula as needed
      }
    }
  }

  openOverviewModal(record: Rental): void {
    this.selectedRecord = record;
    this.showOverviewModal = true;
  }

  closeModal(): void {
    this.showOverviewModal = false;
    this.showReturnFormModal = false;
    this.selectedRecord = null;
  }

  submitReturnForm(): void {
    if (this.selectedRecord) {
      const returnRequest: ReturnCarRequest = {
        rentalId: this.selectedRecord.rentalId,
        paymentId: this.selectedRecord.paymentId,
        requestId: this.selectedRecord.rentalRequestId,
        returnDate: new Date().toISOString(),
        inspectionStatus: this.returnForm.inspectionStatus,
        odometerEnd: this.returnForm.odometerEnd ?? 0,
        advancePayment: 0,
        inspectionPayment: this.returnForm.inspectionPayment ?? 0,
        overduePayment: this.returnForm.overduePayment ?? 0,
        overagePayment: this.returnForm.overagePayment ?? 0,
      };

      // Call the service to update the rental return
      this.rentalService.updateRentalToReturn(returnRequest).subscribe({
        next: (updatedRental) => {
          console.log('Rental updated successfully', updatedRental);
          alert('Return submitted successfully!');
          this.closeModal();
          this.loadRentals(); // Reload rentals after submitting return
        },
        error: (err) => {
          console.error('Error updating rental return', err);
        },
      });

      // Reset form after submission
      this.returnForm = {
        odometerEnd: null,
        returnDate: null,
        inspectionStatus: 'Good',
        overagePayment: null,
        overduePayment: null,
        inspectionPayment: null,
      };
    }
  }
}
