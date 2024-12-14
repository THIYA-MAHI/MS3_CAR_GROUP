import { Payment } from "./payment";

export interface Rental {
  rentalId: string;
  rentalRequestId: string;
  rentalStatus: string;
  rentalDate: string;
  odometerStart: number;
  returnDate: string | null;
  odometerEnd: number | null;
  inspectionStatus: string | null;
  payment: Payment;
  paymentId: string;
}