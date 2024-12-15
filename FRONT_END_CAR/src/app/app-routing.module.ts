import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { LandingPageLayoutComponent } from './Layouts/landing-page-layout/landing-page-layout.component';
import { LandingPageComponent } from './LANDING_PAGE/components/landing-page/landing-page.component';
import { ContactUsComponent } from './LANDING_PAGE/components/contact-us/contact-us.component';
import { AboutusComponent } from './LANDING_PAGE/components/aboutus/aboutus.component';
import { CarListComponent } from './LANDING_PAGE/components/car-list/car-list.component';
import { GalleryComponent } from './LANDING_PAGE/components/gallery/gallery.component';
import { RegisterComponent } from './register/register.component';
import { ManagerDashboardLayoutComponent } from './Layouts/manager-dashboard-layout/manager-dashboard-layout.component';
import { DashoardComponent } from './ManagerDashBoard/components/dashoard/dashoard.component';
import { CustomerDashboardLayoutComponent } from './Layouts/customer-dashboard-layout/customer-dashboard-layout.component';
import { HomeComponent } from './CustomerDashboard/components/home/home.component';
import { BookingComponent } from './CustomerDashboard/components/booking/booking.component';
import { RentalCarsComponent } from './CustomerDashboard/components/rental-cars/rental-cars.component';
import { CarDetailsComponent } from './LANDING_PAGE/components/car-details/car-details.component';
import { BrandComponent } from './ManagerDashBoard/BRAND/brand/brand.component';
import { RentalRequestComponent } from './ManagerDashBoard/components/rental-request/rental-request.component';
import { ReturnedComponent } from './ManagerDashBoard/components/returned/returned.component';
import { CompanyComponent } from './ManagerDashBoard/components/company/company.component';
import { RentalCarComponent } from './ManagerDashBoard/components/rental-car/rental-car.component';
import { ProfileUpdateComponent } from './LANDING_PAGE/components/profile-update/profile-update.component';
import { VideoGalleryComponent } from './LANDING_PAGE/components/video-gallery/video-gallery.component';
import { FAQComponent } from './LANDING_PAGE/components/faq/faq.component';
import { GridViewComponent } from './LANDING_PAGE/components/grid-view/grid-view.component';
import { ContactusComponent } from './ManagerDashBoard/components/contactus/contactus.component';
import { CarsComponent } from './ManagerDashBoard/CAR/cars/cars.component';
import { CustomerComponent } from './ManagerDashBoard/components/customer/customer.component';
import { NewloginComponent } from './newlogin/newlogin.component';
import { CarModelComponent } from './ManagerDashBoard/car-model/car-model.component';
import { PaymentComponent } from './ManagerDashBoard/components/payment/payment.component';
import { CusPaymentComponent } from './CustomerDashboard/cus-payment/cus-payment.component';
import { NotificationComponent } from './ManagerDashBoard/components/notification/notification.component';
import { AuthGuard } from './Shared/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: NewloginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LandingPageLayoutComponent,

    children: [
      {
        path: 'home',
        component: LandingPageComponent,
      },
      {
        path: 'about',
        component: AboutusComponent,
      },
      {
        path: 'cars',
        component: CarListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'car-details/:id/:pickUpDate/:dropOffDate',
        component: CarDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contactUs',
        component: ContactUsComponent,
      },
      {
        path: 'Gallery',
        component: GalleryComponent,
      },
      {
        path: 'grid',
        component: GridViewComponent,
      },
      {
        path: 'FAQ',
        component: FAQComponent,
      },
      {
        path: 'Video',
        component: VideoGalleryComponent,
      },
      {
        path: 'Profile',
        component: ProfileUpdateComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  {
    path: '',
    component: ManagerDashboardLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashoardComponent,
      },
      {
        path: 'model',
        component: CarModelComponent,
      },
      {
        path: 'car',
        component: CarsComponent,
      },
      {
        path: 'users',
        component: CustomerComponent,
      },
      {
        path: 'brand',
        component: BrandComponent,
      },
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'request',
        component: RentalRequestComponent,
      },
      {
        path: 'rentals',
        component: RentalCarComponent,
      },
      {
        path: 'return',
        component: ReturnedComponent,
      },
      {
        path: 'contact',
        component: ContactusComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      { path: 'notifications/:id',
        component: NotificationComponent,
       },
    ],
  },

  {
    path: '',
    component: CustomerDashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'CDashboard',
        component: HomeComponent,
      },
      {
        path: 'booked',
        component: BookingComponent,
      },
      {
        path: 'CusPayment',
        component: CusPaymentComponent,
      },
      {
        path: 'requested',
        component: RentalCarsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
