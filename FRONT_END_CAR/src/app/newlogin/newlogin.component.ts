import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Shared/service/customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest } from '../Shared/models/register';

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrl: './newlogin.component.css'
})
export class NewloginComponent implements OnInit {
  login: LoginRequest;

  constructor(private userService: CustomerService, private router: Router, private toastr: ToastrService) {
    this.login = { email: '', password: '' };
  }

  ngOnInit(): void {

  }

  onSubmit() {
    const loginRequest = { email: this.login.email, password: this.login.password };
    this.userService.login(loginRequest).subscribe(data => {

      localStorage.setItem("Token", data);

      const userDetails: any = jwtDecode(data);

      console.log(userDetails);

      localStorage.setItem("Name", userDetails.Name);
    

      this.router.navigate(['/dashboard']);
    }, error => {
      this.toastr.error(error.error);
    });
  }
}



