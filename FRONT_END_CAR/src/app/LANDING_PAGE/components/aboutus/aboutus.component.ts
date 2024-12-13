import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css',
})
export class AboutusComponent {
  videoUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  openVideoModal(videoLink: string) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${videoLink}?autoplay=1`
    );
  }

  closeVideoModal() {
    this.videoUrl = null;
  }

  // Show the video section
  isVideoVisible: boolean = false;

  playVideo(): void {
    this.isVideoVisible = true;
    const promoVideo: HTMLVideoElement | null =
      document.querySelector('#promoVideo');
    if (promoVideo) {
      promoVideo.play();
    }
  }

  closeVideo(): void {
    this.isVideoVisible = false;
    const promoVideo: HTMLVideoElement | null =
      document.querySelector('#promoVideo');
    if (promoVideo) {
      promoVideo.pause();
      promoVideo.currentTime = 0;
    }
  }

  testimonials = [
    {
      name: 'Emily Martin',
      role: 'Customer',
      image: 'team.jpg',
      message:
        '"Quick Spin made my road trip so easy and enjoyable! The booking process was seamless, and the car was in perfect condition. Highly recommend for anyone looking for hassle-free rentals!"',
      rating: 5,
    },
    {
      name: 'Dan Martin',
      role: 'Customer',
      image: 'team2.jpg',
      message:
        "Exceptional service from start to finish! Quick Spin offered the best prices, and their cars are always clean and reliable. I'll definitely be renting again!",
      rating: 5,
    },
    {
      name: 'Olivia Brown',
      role: 'Customer',
      image: 'team3.jpg',
      message:
        'I had a last-minute business trip, and Quick Spin saved the day! The staff was super helpful, and the car pickup process was incredibly fast. Great experience!',
      rating: 5,
    }
    
  ];
  getStars(rating: number) {
    return Array(rating);
  }



}
