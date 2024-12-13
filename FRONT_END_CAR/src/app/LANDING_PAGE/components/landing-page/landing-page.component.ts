import { AfterViewInit, Component } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements AfterViewInit {
  slides = [
    {
      src: 'caro1.jpg',
      alt: 'First slide',
      caption: 'Experience Freedom on the Road with Quick Spin!',
    },
    {
      src: 'caro2.jpg',
      alt: 'Second slide',
      caption: 'Experience Freedom on the Road with Quick Spin!',
    },
    {
      src: 'caro3.jpg',
      alt: 'Third slide',
      caption: 'Experience Freedom on the Road with Quick Spin!',
    },
    {
      src: 'caro4.jpg',
      alt: 'Fourth slide',
      caption: 'Experience Freedom on the Road with Quick Spin!',
    },
  ];

  //service
  services = [
    {
      id: '01',
      title: 'Daily and Weekly Rentals',
      image: '1.jpg',
    },
    {
      id: '02',
      title: 'Vehicle Customization Options',
      image: '2.jpg',
    },
    {
      id: '03',
      title: 'Eco-Friendly Vehicle Rentals',
      image: '3.jpg',
    },
    {
      id: '04',
      title: 'Luxury Car Rental',
      image: '4.jpg',
    },
    {
      id: '05',
      title: 'Accessibility Features',
      image: '5.jpg',
    },
    {
      id: '06',
      title: 'Kids and Family-Friendly Rentals',
      image: '6.jpg',
    },
  ];

  // rental process
  rentalProcesses = [
    {
      title: 'Choose Your Car',
      description:
        'Select the car model and type that fits your needs. We offer a wide variety of vehicles.',
      image: 'choose.jpg',
    },
    {
      title: 'Reserve the Car',
      description:
        'Reserve the car online using our simple booking system. Choose your dates and pickup location.',
      image: 'reserve.jpg',
    },
    {
      title: 'Drive & Enjoy',
      description:
        'Drive your rental car wherever you want, with full insurance and 24/7 customer support.',
      image: 'img6.jpg',
    },
    {
      title: 'Return the Car',
      description:
        'Return the car to the rental office or drop it off at an alternative location for your convenience.',
      image: 'return.jpg',
    },
  ];

  constructor() {}

  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.rentalcard');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bounce-up');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  CarTypes = [
    {
      title: 'Mercedes S-Class',
      image: 'type1.jpg',
    },
    {
      title: 'BMW 7 Series',
      image: 'typ2.jpg',
    },
    {
      title: 'Ferrari 488',
      image: 'type6.jpg',
    },
    {
      title: 'Audi A8',
      image: 'type3.jpg',
    },
    {
      title: 'Lexus LS',
      image: 'type4.jpg',
    },
    {
      title: 'Porsche 911',
      image: 'type5.jpg',
    }  
  ];

  currentSlide = 0;

  chunk(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  }
  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
