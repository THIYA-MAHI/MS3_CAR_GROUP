import { DatePipe } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard-layout',
  templateUrl: './manager-dashboard-layout.component.html',
  styleUrls: ['./manager-dashboard-layout.component.css'],
})
export class ManagerDashboardLayoutComponent  implements OnInit , OnDestroy{
  // Sidebar menu items
  menuItems = [
    { name: 'Dashboard', link: '/dashboard', icon: 'bi bi-house-fill' },
    { name: 'Brand', link: '/brand', icon: 'bi bi-bookmark-plus-fill' },
    { name: 'model', link: '/model', icon: 'bi bi-patch-plus' },
    { name: 'Cars', link: '/car', icon: 'bi bi-car-front-fill' },
    { name: 'Customers', link: '/users', icon: 'bi bi-person-lines-fill' },
    { name: 'Request', link: '/request', icon: 'bi bi-envelope-arrow-down-fill',},
    { name: 'Rentals', link: '/rentals', icon: 'bi bi-check-circle-fill' },
    { name: 'Returns', link: '/return', icon: 'bi bi-arrow-return-left' },
    { name: 'payment', link: '/payment', icon: 'bi bi-coin' },
    { name: 'Contact', link: '/contact', icon: 'bi bi-person-rolodex' },
  ];

  isSidebarCollapsed: boolean = false;
  isSidebarHidden: boolean = true;
  isSmallScreen: boolean = false;
  currentDate: string = '';
  currentTime: string = '';
  timeInterval: any;
  searchTerm: string = ''; 
  constructor(private router: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.updateTime();
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  
  ngOnDestroy(): void {
    clearInterval(this.timeInterval); 
  }

  updateTime() {
    const now = new Date();
    this.currentDate = this.datePipe.transform(now, 'yyyy-MM-dd') || 'No date available';
    this.currentTime = this.datePipe.transform(now, 'HH:mm:ss') || 'No time available';
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

  logout() {
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
}
