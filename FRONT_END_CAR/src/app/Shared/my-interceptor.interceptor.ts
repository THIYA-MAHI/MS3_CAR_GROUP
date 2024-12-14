import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const myInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Inject Router
  const toastr = inject(ToastrService); // Inject ToastrService

  // Retrieve the token from localStorage
  const token = localStorage.getItem('Token');

  // Clone the request to add the Authorization header
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', token ? `Bearer ${token}` : ''),
  });

  // Handle the request and add error handling
  return next(modifiedReq).pipe(
    catchError((error) => {
      // Add specific error handling logic
      if (error.status === 403) {
        toastr.error('You are not allowed to view this data.');
      }
      if (error.status === 500) {
        toastr.error('Internal server error. Try again later.');
      }
      if (error.status === 401) {
        toastr.error('Unauthorized access. Redirecting to login.');
        router.navigate(['/login']);
        localStorage.clear(); // Clear storage on 401
      }

      // Pass the error down
      return throwError(() => error);
    })
  );
};
