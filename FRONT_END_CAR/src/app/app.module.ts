import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './LANDING_PAGE/components/contact-us/contact-us.component';
import { LandingPageComponent } from './LANDING_PAGE/components/landing-page/landing-page.component';
import { LandingPageLayoutComponent } from './Layouts/landing-page-layout/landing-page-layout.component';
import { RentalCarsComponent } from './CustomerDashboard/components/rental-cars/rental-cars.component';
import { AboutusComponent } from './LANDING_PAGE/components/aboutus/aboutus.component';
import { CarListComponent } from './LANDING_PAGE/components/car-list/car-list.component';
import { GalleryComponent } from './LANDING_PAGE/components/gallery/gallery.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './CustomerDashboard/components/booking/booking.component';
import { DashoardComponent } from './ManagerDashBoard/components/dashoard/dashoard.component';
import { CustomerDashboardLayoutComponent } from './Layouts/customer-dashboard-layout/customer-dashboard-layout.component';
import { ManagerDashboardLayoutComponent } from './Layouts/manager-dashboard-layout/manager-dashboard-layout.component';
import { HomeComponent } from './CustomerDashboard/components/home/home.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SafeUrlPipe } from './Shared/pipes/safe-url.pipe';
import { FilterPipe } from './Shared/pipes/filter.pipe';
import { CarDetailsComponent } from './LANDING_PAGE/components/car-details/car-details.component';
import { BrandComponent } from './ManagerDashBoard/BRAND/brand/brand.component';
import { RentalRequestComponent } from './ManagerDashBoard/components/rental-request/rental-request.component';
import { ReturnedComponent } from './ManagerDashBoard/components/returned/returned.component';
import { RentalCarComponent } from './ManagerDashBoard/components/rental-car/rental-car.component';
import { CompanyComponent } from './ManagerDashBoard/components/company/company.component';
import { ProfileUpdateComponent } from './LANDING_PAGE/components/profile-update/profile-update.component';
import { IdFormatterPipe } from './Shared/pipes/id-formatter.pipe';
import { VideoGalleryComponent } from './LANDING_PAGE/components/video-gallery/video-gallery.component';
import { FAQComponent } from './LANDING_PAGE/components/faq/faq.component';
import { GridViewComponent } from './LANDING_PAGE/components/grid-view/grid-view.component';
import { NotificationComponent } from './ManagerDashBoard/components/notification/notification.component';
import { ContactusComponent } from './ManagerDashBoard/components/contactus/contactus.component';
import { CarsComponent } from './ManagerDashBoard/CAR/cars/cars.component';
import { NewloginComponent } from './newlogin/newlogin.component';
import { CustomerComponent } from './ManagerDashBoard/components/customer/customer.component';
import { HasRoleDirective } from './Shared/Directives/has-role.directive';
import { CarModelComponent } from './ManagerDashBoard/car-model/car-model.component';
import { PaymentComponent } from './ManagerDashBoard/components/payment/payment.component';
import { CusPaymentComponent } from './CustomerDashboard/cus-payment/cus-payment.component';
import { SearchPipe } from './Shared/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ContactUsComponent,
    LandingPageLayoutComponent,
    RentalCarsComponent,
    AboutusComponent,
    CarListComponent,
    GalleryComponent,
    RegisterComponent,
    BookingComponent,
    DashoardComponent,
    CustomerDashboardLayoutComponent,
    ManagerDashboardLayoutComponent,
    HomeComponent,
    SafeUrlPipe,
    FilterPipe,
    CarDetailsComponent,
    BrandComponent,
    RentalRequestComponent,
    ReturnedComponent,
    CompanyComponent,
    RentalCarComponent,
    ProfileUpdateComponent,
    IdFormatterPipe,
    VideoGalleryComponent,
    FAQComponent,
    GridViewComponent,
    NotificationComponent,
    ContactusComponent,
    CarsComponent,
    NewloginComponent,
    CustomerComponent,
    HasRoleDirective,
    CarModelComponent,
    PaymentComponent,
    CusPaymentComponent,
    SearchPipe,
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BsDatepickerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,

    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    
  
   ],

  providers: [BsModalService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
