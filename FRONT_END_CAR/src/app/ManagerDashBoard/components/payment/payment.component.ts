import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../Shared/models/payment';
import { PaymentService } from '../../../Shared/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit{
  payments: Payment[] = [];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    // Fetch all payments on component load
    this.paymentService.getAllPayments().subscribe((data) => {
      this.payments = data;
    });
  }

  // Calculate total payment for each payment record
  calculateTotalPayment(payment: Payment): number {
    return (
      payment.rentalPayment +
      payment.advancePayment +
      payment.inspectionPayment +
      payment.overduePayment +
      payment.overagePayment
    );
  }
}
