import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard-layout',
  templateUrl: './customer-dashboard-layout.component.html',
  styleUrl: './customer-dashboard-layout.component.css'
})
export class CustomerDashboardLayoutComponent {
  menuItems = [
    { name: 'Home', link: '/home', icon: 'bi bi-house-check' },
    { name: 'Dashboard', link: '/CDashboard', icon: 'bi bi-house-fill' },
    { name: 'Booked', link: '/booked', icon: 'bi bi-bookmark-plus-fill' },
    { name: 'Requested', link: '/requested', icon: 'bi bi-car-front-fill' },
    { name: 'Payment', link: '/CusPayment', icon: 'bi bi-cash' },
  ];

  isSidebarCollapsed: boolean = false;
  isSidebarHidden: boolean = true;
  isSmallScreen: boolean = false;

  constructor(private router: Router,) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  // Toggle sidebar visibility/collapsing
  toggleSidebar(): void {
    if (this.isSmallScreen) {
      this.isSidebarHidden = !this.isSidebarHidden;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  // Handle screen size change and adjust sidebar behavior accordingly
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 576;
  }

  // Hide sidebar on menu click (for small screens)
  onMenuClick(): void {
    if (this.isSmallScreen) {
      this.isSidebarHidden = true;
    }
  }

  logout(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('CustomerId');
    localStorage.removeItem('Name');
    localStorage.removeItem('Role');
    this.router.navigate(['/login']);
  }

}
