export interface ReturnCarRequest {
  rentalId: string;
  paymentId: string;
  requestId: string;
  returnDate: string;
  inspectionStatus: string;
  odometerEnd: number;
  advancePayment: number;
  inspectionPayment: number;
  overduePayment: number;
  overagePayment: number;
}
