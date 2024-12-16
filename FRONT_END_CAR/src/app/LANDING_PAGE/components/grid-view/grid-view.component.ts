import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css',
})
export class GridViewComponent {
  galleryItems = [
    //building
    { src: 'KiaRio.jpg', title: 'MASERATI' },
    { src: '4.jpg', title: 'MERCEDES BENZ' },
    { src: 'Mazda6.jpg', title: 'MAZDA' },
    { src: 'MitsubishiMirage.jpg', title: 'SUBARU' },
    { src: 'VolkswagenJetta.jpg', title: 'VOLKSWANGEN' },
    { src: 'a560b8b2-cad3-42f3-9d98-d14d0b9d54a3.jpeg', title: 'BMW' },

    //DESERT
    { src: '11.jpg', title: 'KIA' },
    { src: '7 (1).jpg', title: 'KIA' },
    { src: 'blog2.jpg', title: 'HONDA' },
    { src: 'head.jpg', title: 'SKODA' },
    { src: 'pho.jpg', title: 'AUDI' },

    { src: 'v1.jpg', title: 'MERCEDES' },
    { src: 'v2.jpg', title: 'MERCEDES' },
    { src: 'v3.jpg', title: 'MERCEDES' },
    { src: 'v4.jpg', title: 'MERCEDES' },
    { src: 'v5.jpg', title: 'ROLLS ROYCE' },
    { src: 'v6.jpg', title: 'MERCEDES' },
    { src: 'v7.jpg', title: 'AUDI' },
    { src: 'v8.jpg', title: 'AUDI' },
    { src: 'v9.jpg', title: 'LAMBORGHINI' },
    //ROAD
    { src: '73508c03-cbb5-4c18-872a-c3ed4de34926.jpeg', title: 'MG' },
    { src: 'back.jpg', title: 'AUDI' },

    { src: 'type4.jpg', title: 'VOLVO' },
    { src: 'img4.jpg', title: 'MAZDA' },

    { src: 'type5.jpg', title: 'MAZDA' },

    { src: 'gallery1.jpg', title: 'TOYOTA' },
    { src: 'dc.jpg', title: 'MERCEDES BENZ' },
    { src: '123.jpg', title: 'MERCEDES BENZ' },
    { src: '2157d6b9-fb4a-49ca-a5bf-7b7cc498bdb8.jpeg', title: 'BMW' },

    { src: 'NissanAltima.jpg', title: 'VOLVO' },
    { src: '410fa692-c5a3-40d0-9c78-ae7e64653e88.png', title: 'MERCEDES BENZ' },
    { src: 'FordFusion.jpg', title: 'FORD' },

    { src: 'img3.jpg', title: 'MERCEDES BENZ' },

    //FPOREST
    { src: '16f3fdfc-3f21-4d78-8f38-f54d942063a4.jpg', title: 'SUBARU' },
    { src: 'HondaAccord.jpg', title: 'HONDA' },
    { src: 'HyundaiElantra.jpg', title: 'FORD' },
    { src: 'video.jpg', title: 'LAMBORGHINI' },
    { src: 'update.jpg', title: 'LAMBORGHINI' },
    { src: 'type6.jpg', title: 'LAMBORGHINI' },
  ];

  
  currentPage = 1;
  itemsPerPage = 12;

  constructor() {}

  ngOnInit(): void {}

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.galleryItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  totalPages(): number {
    return Math.ceil(this.galleryItems.length / this.itemsPerPage);
  }
}

