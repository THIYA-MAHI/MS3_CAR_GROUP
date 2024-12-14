export interface Car {
  carId: string;
  modelName: string;
  description: string;
  pricePerDay: number;
  modalYear: number;
  seatingCapacity: number;
  fuelType: string;
  status: string;
  bags: number;
  transmission: string;
  doors: number;
  carImages: string[];
  brandId: string;
  modelId:string;
  brandName: string;
}

export class Car {

  carImages: string[];
  image: string;

  constructor() {
    this.carImages = [];
    this.image = '';
  }
}