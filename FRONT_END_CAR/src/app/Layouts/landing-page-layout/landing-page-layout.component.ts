import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-landing-page-layout',
  templateUrl: './landing-page-layout.component.html',
  styleUrls: ['./landing-page-layout.component.css'],
})
export class LandingPageLayoutComponent implements OnInit, OnDestroy {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollOffset > 10; 
  }

  // Datepicker Configurations
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private router: Router) {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange' });
  }

  // Rental Options Form Variables
  carType: string = '';
  pickupDate: Date | undefined;
  returnDate: Date | undefined;

  // Carousel for Logos
  logos = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
  ];
  displayedLogos: string[] = [];
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.displayedLogos = this.logos.slice(0, 5);
    this.startCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.updateDisplayedLogos();
    }, 3000); 
  }

  updateDisplayedLogos(): void {
    this.currentIndex = (this.currentIndex + 1) % this.logos.length;
    this.displayedLogos.shift(); 
    this.displayedLogos.push(this.logos[this.currentIndex]); 
  }

  // Navbar Collapse Logic
  toggleNavbar(): void {
    const navbar = document.getElementById('navbarContent');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show'); 
    }
  }
  logout(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('CustomerId');
    localStorage.removeItem('Name');
    localStorage.removeItem('Role');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('Token') !== null;
  }
}
