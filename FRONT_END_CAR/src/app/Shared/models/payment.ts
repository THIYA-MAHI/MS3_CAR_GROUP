export interface Payment {
  paymentId: string;
  rentalId: string;
  rentalPayment: number;
  advancePayment: number;
  inspectionPayment: number;
  overduePayment: number;
  overagePayment: number;
}
