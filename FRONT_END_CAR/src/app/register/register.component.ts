import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerService } from '../Shared/service/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Use the non-null assertion operator

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        nic: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{9}[Vv]$|^[0-9]{12}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        isChecked: [false, [Validators.requiredTrue]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (hasUppercase && hasLowercase && hasDigit && hasSpecialChar) {
      return null;
    }
    return { passwordStrength: true };
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    if (group.get('password')?.value !== group.get('confirmPassword')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  disableCopy(event: ClipboardEvent): void {
    event.preventDefault();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      // Use UserService for registration
      this.customerService.register(formData).subscribe(
        (response: any) => {
          // Define response type here
          this.toastr.success('Registration successful!', 'Success', {
            timeOut: 5000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
            closeButton: true,
            tapToDismiss: true,
          });

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        (error: any) => {
          // Define error type here
          this.toastr.error('Registration failed. Please try again.', 'Error', {
            timeOut: 7000,
            progressBar: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-top-right',
            closeButton: true,
            tapToDismiss: true,
          });
        }
      );
    } else {
      this.toastr.error('Please fill all required fields correctly.', 'Error', {
        timeOut: 7000,
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass: 'toast-top-right',
        closeButton: true,
        tapToDismiss: true,
      });
    }
  }
}
