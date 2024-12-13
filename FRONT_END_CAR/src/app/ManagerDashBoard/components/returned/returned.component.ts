import { Component } from '@angular/core';

@Component({
  selector: 'app-returned',
  templateUrl: './returned.component.html',
  styleUrl: './returned.component.css',
})
export class ReturnedComponent {
  returnRecords = [
    {
      returnId: 1,
      rentalId: 101,
      dropoffDate: new Date(),
      totalPayment: 150.0,
      status: 'Pending',
      customerId: 201,
      customerName: 'John Doe',
      carId: 'C001',
      pickupDate: new Date('2024-11-01'),
      odometerStart: 10000,
      odometerEnd: null,
      overagePayment: null,
      overduePayment: null,
      inspectionPayment: null,
      inspectionStatus: 'Pending',
    },
  ];

  showOverviewModal = false;
  showReturnFormModal = false;
  selectedRecord: any = null;

  returnForm = {
    odometerEnd: null,
    returnDate: null,
    inspectionStatus: 'Good',
    overagePayment: null,
    overduePayment: null,
    inspectionPayment: null,
  };

  openOverviewModal(record: any) {
    this.selectedRecord = record;
    this.showOverviewModal = true;
  }

  openReturnFormModal(record: any) {
    this.selectedRecord = record;
    this.showReturnFormModal = true;
  }

  closeModal() {
    this.showOverviewModal = false;
    this.showReturnFormModal = false;
  }

  submitReturnForm() {
    this.selectedRecord.odometerEnd = this.returnForm.odometerEnd;
    this.selectedRecord.inspectionStatus = this.returnForm.inspectionStatus;
    this.selectedRecord.overagePayment = this.returnForm.overagePayment;
    this.selectedRecord.overduePayment = this.returnForm.overduePayment;
    this.selectedRecord.inspectionPayment =
      this.returnForm.inspectionStatus !== 'Good'
        ? this.returnForm.inspectionPayment
        : null;
    this.selectedRecord.status = 'Returned';

    alert('Return submitted successfully!');
    this.closeModal();

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
