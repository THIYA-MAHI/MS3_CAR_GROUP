import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../../Shared/service/rental.service';
import { Rental } from '../../../Shared/models/rental';
import { ReturnCarRequest } from '../../../Shared/models/return'; // Import the model

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

  returnForm = {
    odometerEnd: null,
    returnDate: null,
    inspectionStatus: 'Good',
    overagePayment: null,
    overduePayment: null,
    inspectionPayment: null,
  };

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getAllRentals().subscribe({
      next: (data: Rental[]) => {
        this.rentals = data.filter(
          (rental) => rental.rentalStatus === 'Rented'
        );
      },
      error: (err) => {
        console.error('Error fetching rentals', err);
      },
    });
  }

  openOverviewModal(record: Rental): void {
    this.selectedRecord = record;
    this.showOverviewModal = true;
  }

  openReturnFormModal(record: Rental): void {
    this.selectedRecord = record;
    this.showReturnFormModal = true;
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
          this.loadRentals(); 
        },
        error: (err) => {
          console.error('Error updating rental return', err);
        },
      });

      // Reset form
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
