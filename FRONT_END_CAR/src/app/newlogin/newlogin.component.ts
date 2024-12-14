import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Shared/service/customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest } from '../Shared/models/login-request';

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrl: './newlogin.component.css',
})
export class NewloginComponent implements OnInit {
  login: LoginRequest;

  constructor(
    private userService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.login = { email: '', password: '' };
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService.login(this.login).subscribe(
      (data) => {
        localStorage.setItem('Token', data);

        const userDetails: any = jwtDecode(data);

        console.log(userDetails);

        localStorage.setItem('Name', userDetails.Name);
        localStorage.setItem('Role', userDetails.Role);
        localStorage.setItem('CustomerId', userDetails.CustomerId);

        this.router.navigate(['/home']);
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }
}
