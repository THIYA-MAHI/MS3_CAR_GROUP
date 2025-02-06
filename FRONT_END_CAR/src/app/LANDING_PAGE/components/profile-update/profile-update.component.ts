import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../Shared/service/customer.service';
import { Customer } from '../../../Shared/models/customer';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  profileForm: FormGroup;
  customerId!: string;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService ,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      customerName: [{ value: '', disabled: true }, Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      phoneNumber: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)],
      ],
      nic: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern(/^(\d{9}[vV]|\d{12})$/)],
      ],
      address: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      proof: ['', Validators.required],
      proofNumber: ['', Validators.required],
      drivingLicenceNumber: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]\d{7,9}$/)],
      ],
      licenceExpiryDate: ['', Validators.required],
      licenceFrontImage: [Validators.required],
      licenceBackImage: [Validators.required],
    });
  }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('CustomerId') || '';
    if (this.customerId) {
      this.getCustomerDetails(this.customerId);
    }
  }

  getCustomerDetails(id: string): void {
    this.customerService.getCustomerById(id).subscribe({
      next: (customer: Customer) => {
        this.profileForm.patchValue({
          customerName: customer.customerName,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          nic: customer.nic,
          address: customer.address,
          postalCode: customer.postalCode,
          proof: customer.proof,
          proofNumber: customer.proofNumber,
          drivingLicenceNumber: customer.drivingLicenceNumber,
          licenceExpiryDate: customer.licenceExpiryDate,
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching customer details:', error.message);
        this.toastr.error('Error fetching customer details', 'Error');
      },
    });
  }

  onFileChange(event: Event, imageType: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (imageType === 'licenceFrontImage') {
        this.profileForm.patchValue({ licenceFrontImage: file });
      } else if (imageType === 'licenceBackImage') {
        this.profileForm.patchValue({ licenceBackImage: file });
      }
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('address', this.profileForm.value.address);
      formData.append('postalCode', this.profileForm.value.postalCode);
      formData.append('proof', this.profileForm.value.proof);
      formData.append('proofNumber', this.profileForm.value.proofNumber);
      formData.append(
        'drivingLicenceNumber',
        this.profileForm.value.drivingLicenceNumber
      );
      formData.append(
        'licenceExpiryDate',
        this.profileForm.value.licenceExpiryDate
      );

      const licenceBackImage = this.profileForm.get('licenceBackImage')?.value;
      if (licenceBackImage instanceof File) {
        formData.append(
          'licenceBackImage',
          licenceBackImage,
          licenceBackImage.name
        );
      }

      const licenceFrontImage =
        this.profileForm.get('licenceFrontImage')?.value;
      if (licenceFrontImage instanceof File) {
        formData.append(
          'licenceFrontImage',
          licenceFrontImage,
          licenceFrontImage.name
        );
      }

      this.customerService
        .updateCustomerDetails(this.customerId, formData)
        .subscribe({
          next: (response) => {
            console.log('Profile updated successfully:', response);
            this.toastr.success('Profile updated successfully!', 'Success');

            // Navigate to CDashboard after success
            this.router.navigate(['/CDashboard']); // Update the route to your dashboard route
          },
          error: (error: HttpErrorResponse) => {
            console.error(
              'Error updating profile:',
              error.error?.message || error.message
            );
            this.toastr.error(
              error.error?.message || 'Unknown error occurred.',
              'Error'
            );
          },
        });
    } else {
      Object.keys(this.profileForm.controls).forEach((key) => {
        const control = this.profileForm.get(key);
        if (control?.invalid) {
          console.log(`${key} is invalid`, control.errors);
        }
      });

      console.log('Form is invalid, please check the input fields.');
    }
  }
}
