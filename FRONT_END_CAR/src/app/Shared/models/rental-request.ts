export interface RentalRequest {
  rentalRequestId: string;
  customerId: string;
  carId: string;
  startDate: string;
  endDate: string;
  status: number;
  createDate: string;
  requestDate: string;
  updateDate: string | null;
}
