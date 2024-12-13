import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../Shared/models/brand';
import { BrandService } from '../../../Shared/service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  newBrand: Brand = new Brand({});
  selectedBrand: Brand = new Brand({});
  isAddModalOpen = false;
  isEditModalOpen = false;

  constructor(
    private toastr: ToastrService,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.getBrands();
  }

  // Toastr options for common use
  toastrOptions = {
    timeOut: 2000,
    closeButton: true,
    easing: 'ease-in',
    progressBar: true,
  };

  // Get all brands using the BrandService
  getBrands() {
    this.brandService.getAllBrands().subscribe(
      (brands) => {
        this.brands = brands.sort((a, b) => {
          return (
            new Date(a.creationDate).getTime() -
            new Date(b.creationDate).getTime()
          );
        });
      },
      (error) => {
        this.toastr.error('Failed to load brands', 'Error', this.toastrOptions);
      }
    );
  }

  // Open the modal to add a new brand
  openAddBrandModal() {
    this.isAddModalOpen = true;
  }

  // Close the Add Brand modal
  closeAddBrandModal() {
    this.isAddModalOpen = false;
    this.newBrand = new Brand({});
  }

  // Add a new brand using the BrandService
  addBrand(form: any) {
    if (form.valid) {
      this.brandService.addBrand(this.newBrand).subscribe(
        (response) => {
          // Add the new brand to the local array immediately
          this.brands.push(response); // Assuming the API returns the created brand
          this.toastr.success(
            'Brand added successfully!',
            'Success',
            this.toastrOptions
          );
          this.closeAddBrandModal();
        },
        (error) => {
          this.toastr.error('Failed to add brand', 'Error', this.toastrOptions);
        }
      );
    }
  }

  // Open the modal for editing the selected brand
  openEditBrandModal(brand: Brand) {
    this.selectedBrand = { ...brand };
    this.isEditModalOpen = true;
  }

  // Close the Edit Brand modal
  closeEditBrandModal() {
    this.isEditModalOpen = false;
    this.selectedBrand = new Brand({});
  }

  // Update the brand using the BrandService
  updateBrand(form: any) {
    if (form.valid) {
      this.brandService
        .updateBrand(this.selectedBrand.brandId, this.selectedBrand)
        .subscribe(
          (response) => {
            // Find the updated brand in the local array and replace it
            const index = this.brands.findIndex(
              (brand) => brand.brandId === this.selectedBrand.brandId
            );
            if (index !== -1) {
              this.brands[index] = response; // Replace the brand with the updated one
            }

            this.toastr.success(
              'Brand updated successfully!',
              'Success',
              this.toastrOptions
            );
            this.closeEditBrandModal();
          },
          (error) => {
            this.toastr.error(
              'Failed to update brand',
              'Error',
              this.toastrOptions
            );
          }
        );
    }
  }

  // Delete a brand using the BrandService
  deleteBrand(brand: Brand) {
    if (
      confirm(`Are you sure you want to delete the brand "${brand.brandName}"?`)
    ) {
      this.brandService.deleteBrand(brand.brandId).subscribe(
        (response) => {
          // Remove the deleted brand from the local array
          this.brands = this.brands.filter((b) => b.brandId !== brand.brandId);
          this.toastr.warning(
            `Brand "${brand.brandName}" deleted.`,
            'Deleted',
            this.toastrOptions
          );
        },
        (error) => {
          this.toastr.error(
            'Failed to delete brand',
            'Error',
            this.toastrOptions
          );
        }
      );
    }
  }
}
