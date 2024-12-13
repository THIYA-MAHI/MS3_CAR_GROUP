import { Component } from '@angular/core';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.css'
})
export class VideoGalleryComponent {

    images = [
      {
        src: 'v1.jpg',
        alt: 'Image 1',
        link: 'https://youtu.be/ba7JNTI17uo?si=qu7h7yiSrsS0_Guc'
      },
      {
        src: 'v2.jpg',
        alt: 'Image 2',
        link: 'https://youtu.be/XKRaJl2Vyfc?si=76Z-tBwLHSIM2mxa'
      },
      {
        src: 'v3.jpg',
        alt: 'Image 3',
        link: 'https://youtu.be/K4D0dAkUMpo?si=6FV6ht0igsIlKy1P'
      },
      {
        src: 'v4.jpg',
        alt: 'Image 4',
        link: 'https://youtu.be/Kfj1SJBaeuQ?si=b9gknEo3AjjxQgUh'
      },
      {
        src: 'v5.jpg',
        alt: 'Image 5',
        link: 'https://youtu.be/D-6-pTL_NOI?si=2NPwsoGh1YO5CuXf'
      },
      {
        src: 'v6.jpg',
        alt: 'Image 5',
        link: 'https://youtu.be/33crJ6BiJ20?si=7SW-n1cOI2qsTPof'
      },{
        src: 'v7.jpg',
        alt: 'Image 1',
        link: 'https://youtu.be/ba7JNTI17uo?si=qu7h7yiSrsS0_Guc'
      },
      {
        src: 'v8.jpg',
        alt: 'Image 2',
        link: 'https://youtu.be/XKRaJl2Vyfc?si=76Z-tBwLHSIM2mxa'
      },
      {
        src: 'v9.jpg',
        alt: 'Image 3',
        link: 'https://youtu.be/K4D0dAkUMpo?si=6FV6ht0igsIlKy1P'
      }
    ];
    openVideo(link: string): void {
      window.open(link, '_blank'); 
    }
  }
