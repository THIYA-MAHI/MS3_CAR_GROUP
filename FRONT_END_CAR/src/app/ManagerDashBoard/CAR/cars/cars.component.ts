import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../Shared/service/car.service';
import { BrandService } from '../../../Shared/service/brand.service';
import { ModelService } from '../../../Shared/service/model.service';
import { Car } from '../../../Shared/models/car';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: any[] = [];
  brands: any[] = [];
  models: any[] = [];
  carImageFiles: any[] = [];
  selectedCar: any = null;
  newCar: any = {
    brandId: '',
    brandName: '',
    modelId: '',
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

  addForm: FormGroup;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private modelService: ModelService,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      pricePerDay: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      modalYear: [new Date().getFullYear(), Validators.required],
      seatingCapacity: [0, [Validators.required, Validators.min(1)]],
      bags: [0, [Validators.required, Validators.min(0)]],
      doors: [0, [Validators.required, Validators.min(0)]],
      fuelType: ['', Validators.required],
      transmission: ['', Validators.required],
      carImages: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCars();
    this.getAllBrands();
    this.getAllModels();
  }

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

  getAllModels() {
    this.modelService.getAllModels().subscribe(
      (data) => {
        this.models = data;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  getCars() {
    this.carService.getAllCars().subscribe(
      (data) => {
        this.cars = data;
        const promises = this.cars.map((car) => {
          return new Promise((resolve, reject) => {
            this.getBrandNameById(car.brandId, car);
            this.getModelNameById(car.modelId, car);
            resolve(car);
          });
        });

        Promise.all(promises)
          .then(() => {
            this.cars.forEach((car) => {
              car.carImages = (car.carImages as string[]).map(
                (img: string) => `http://localhost:5096${img}`
              );
            });
          })
          .catch((error) => {
            console.error('Error resolving promises:', error);
          });
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  getModelNameById(modelId: string, car: Car) {
    this.modelService.getModelById(modelId).subscribe(
      (model) => {
        if (model && model.modelName) {
          car.modelName = model.modelName;
        } else {
          console.error('Model name not found in the response');
        }
      },
      (error) => {
        console.error('Error fetching model:', error);
      }
    );
  }

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

  openAddModal() {
    this.addForm.reset({
      brandId: '',
      modelId: '',
      pricePerDay: 0,
      description: '',
      modalYear: new Date().getFullYear(),
      seatingCapacity: 0,
      bags: 0,
      doors: 0,
      fuelType: '',
      transmission: '',
      carImages: [],
    });
    this.carImageFiles = [];
    this.currentImageInputIndex = 0;
    this.showAddModal = true;
  }

  openEditModal(car: any) {
    this.selectedCar = { ...car };
    this.showEditModal = true;
  }

  openViewModal(car: any) {
    this.selectedCar = car;
    this.showViewModal = true;
  }

  closeModal(type: string) {
    if (type === 'add') this.showAddModal = false;
    if (type === 'edit') this.showEditModal = false;
    if (type === 'view') this.showViewModal = false;
  }

  addImageInput() {
    if (this.currentImageInputIndex < this.maxImageInputs) {
      this.currentImageInputIndex++;
    }
  }

  onFileChange(event: any, index: number) {
    const input = event.target as HTMLInputElement;

    if (!this.carImageFiles) {
      this.carImageFiles = [];
    }

    if (input?.files?.length) {
      this.carImageFiles[index] = input.files[0];
    }

    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.addForm.controls['carImages'].setValue([
        ...this.addForm.value.carImages,
        imageUrl,
      ]);
    }
  }

  removeImage(index: number) {
    const updatedImages = [...this.addForm.value.carImages];
    updatedImages.splice(index, 1);
    this.addForm.controls['carImages'].setValue(updatedImages);
    this.currentImageInputIndex--;
  }

  addCar() {
    if (this.addForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.addForm.value).forEach((key) => {
      if (key === 'carImages') {
        this.carImageFiles.forEach((file) => {
          formData.append('carImages', file, file.name);
        });
      } else {
        formData.append(key, this.addForm.get(key)?.value);
      }
    });

    this.carService.addCar(formData).subscribe(
      (data) => {
        this.cars.push(data);
        this.closeModal('add');
      },
      (error) => {
        console.error('Error adding car:', error);
      }
    );
  }

  editCar() {
    if (this.selectedCar) {
      const formData = new FormData();
      Object.keys(this.addForm.value).forEach((key) => {
        if (key === 'carImages') {
          this.carImageFiles.forEach((file) => {
            formData.append('carImages', file, file.name);
          });
        } else {
          formData.append(key, this.addForm.get(key)?.value);
        }
      });

      this.carService.updateCar(formData).subscribe(
        (data) => {
          const index = this.cars.findIndex((car) => car.carId === data.carId);
          if (index !== -1) {
            this.cars[index] = data;
          }
          this.closeModal('edit');
        },
        (error) => {
          console.error('Error updating car:', error);
        }
      );
    }
  }

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
