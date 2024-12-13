import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../Shared/service/car.service';
import { BrandService } from '../../../Shared/service/brand.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: any[] = [];
  brands: any[] = [];
  selectedCar: any = null;
  newCar: any = {
    brandId: '',
    brandName: '',
    modelName: '',
    pricePerDay: 0,
    description: '',
    modalYear: new Date().getFullYear(),
    seatingCapacity: 0,
    bags: 0,
    doors: 0,
    fuelType: '',
    transmission: '',
    carImages: [],
  };

  currentImageInputIndex: number = 0;
  maxImageInputs: number = 5;

  showViewModal = false;
  showAddModal = false;
  showEditModal = false;

  constructor(
    private carService: CarService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getCars();
    this.getAllBrands();
  }

  // Fetch all brands
  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      (data) => {
        this.brands = data;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  // Get all cars
  getCars() {
    this.carService.getAllCars().subscribe(
      (data) => {
        this.cars = data;
        this.cars.forEach((car) => {
          car.carImages = (car.carImages as string[]).map(
            (img: string) => `http://localhost:5096${img}`
          );
          this.getBrandNameById(car.brandId, car);
        });
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  // Fetch brand name by brandId
  getBrandNameById(brandId: string, car: any) {
    this.brandService.getBrand(brandId).subscribe(
      (brand) => {
        car.brandName = brand.brandName;
      },
      (error) => {
        console.error('Error fetching brand:', error);
      }
    );
  }

  // Open Add Modal
  openAddModal() {
    this.newCar = {
      carId: '',
      brandId: '',
      brandName: '',
      modelName: '',
      pricePerDay: 0,
      description: '',
      modalYear: new Date().getFullYear(),
      seatingCapacity: 0,
      bags: 0,
      doors: 0,
      fuelType: '',
      transmission: '',
      carImages: [],
    };
    this.currentImageInputIndex = 0;
    this.showAddModal = true;
  }

  // Open Edit Modal
  openEditModal(car: any) {
    this.selectedCar = { ...car };
    this.showEditModal = true;
  }

  // Open View Modal
  openViewModal(car: any) {
    this.selectedCar = car;
    this.showViewModal = true;
  }

  // Close Modal
  closeModal(type: string) {
    if (type === 'add') this.showAddModal = false;
    if (type === 'edit') this.showEditModal = false;
    if (type === 'view') this.showViewModal = false;
  }

  // Add file input for another image
  addImageInput() {
    if (this.currentImageInputIndex < this.maxImageInputs) {
      this.currentImageInputIndex++;
    }
  }

  // Handle file change (for multiple images)
  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.newCar.carImages[index] = imageUrl;
    }
  }

  // Remove an image
  removeImage(index: number) {
    this.newCar.carImages.splice(index, 1);
    this.currentImageInputIndex--;
  }

  // Add a new car
  addCar() {
    this.carService.addCar(this.newCar).subscribe(
      (data) => {
        this.cars.push(data);
        this.closeModal('add');
      },
      (error) => {
        console.error('Error adding car:', error);
      }
    );
  }

  // Edit an existing car
  editCar() {
    if (this.selectedCar) {
      this.carService.updateCar(this.selectedCar).subscribe(
        (data) => {
          // Find the car in the list and update it
          const index = this.cars.findIndex((car) => car.carId === data.carId);
          if (index !== -1) {
            this.cars[index] = data; // Update the car in the array
          }
          this.closeModal('edit'); // Close the modal after saving changes
        },
        (error) => {
          console.error('Error updating car:', error);
        }
      );
    }
  }

  // Delete a car
  deleteCar(carId: string) {
    this.carService.deleteCar(carId).subscribe(
      () => {
        this.cars = this.cars.filter((car) => car.carId !== carId);
      },
      (error) => {
        console.error('Error deleting car:', error);
      }
    );
  }
}
