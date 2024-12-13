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
import { EditCarComponent } from './ManagerDashBoard/CAR/edit-car/edit-car.component';
import { AddCarComponent } from './ManagerDashBoard/CAR/add-car/add-car.component';
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

const routes: Routes = [
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
        path: 'carList',
        component: CarListComponent,
      },
      {
        path: 'details',
        component: CarDetailsComponent,
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
        path: 'login',
        component: NewloginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'Profile',
        component: ProfileUpdateComponent,
      },
    ],
  },

  {
    path: '',
    component: ManagerDashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashoardComponent,
      },
      {
        path: 'car',
        component: CarsComponent,
      },
      {
        path: 'EditCar/:id',
        component: EditCarComponent,
      },
      {
        path: 'addCar',
        component: AddCarComponent,
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
      }
    ],
  },

  {
    path: '',
    component: CustomerDashboardLayoutComponent,
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
