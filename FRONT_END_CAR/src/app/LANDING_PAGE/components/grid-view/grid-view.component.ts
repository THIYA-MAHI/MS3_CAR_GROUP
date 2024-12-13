import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent {
  galleryItems = [
    { src: '3.jpg', title: 'Bugatti Mistral W16' },
    { src: '2.jpg', title: 'Lamborghini Urus Yellow' },
    { src: '6.jpg', title: 'Lamborghini Urus Orange' },
    { src: '4.jpg', title: 'Bentley Bentayga' },
    { src: '2.jpg', title: 'Rolls Royce Cullinan' },
    { src: '1.jpg', title: 'Bentley Continental GT' },
    { src: '4.jpg', title: 'Audi Q8' },
    { src: '3.jpg', title: 'McLaren 720S' },
    { src: '5.jpg', title: 'Audi RS6'},
 ];
}