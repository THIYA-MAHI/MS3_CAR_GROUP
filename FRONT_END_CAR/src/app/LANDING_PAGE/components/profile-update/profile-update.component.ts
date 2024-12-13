import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      nic: [
        '',
        [Validators.required, Validators.pattern(/^(\d{9}[vV]|\d{12})$/)],
      ],
      address: ['', Validators.required],
      proofType: ['', Validators.required],
      proofNumber: ['', Validators.required],
      licenseNumber: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]\d{7,9}$/)],
      ],
      licenseExpiry: ['', Validators.required],
      licenseFrontImage: ['', Validators.required],
      licenseBackImage: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
