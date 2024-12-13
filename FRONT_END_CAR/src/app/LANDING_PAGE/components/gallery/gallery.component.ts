import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  searchText: string = '';
  items = [
    { name: 'Toyota Corolla', image: 'ToyotaCorolla.jpg' },
    { name: 'Toyota Camry', image: 'toyotacarmy.jpg' },
    { name: 'Ford Mustang', image: 'FordMustang.jpg' },
    { name: 'Ford F-150', image: 'FordF-150.jpg' },
    { name: 'Honda Civic', image: 'HondaCivic.jpg' },
    { name: 'Honda Accord', image: 'HondaAccord.jpg' },
    { name: 'Hyundai Elantra', image: 'HyundaiElantra.jpg' },
    { name: 'Nissan Sentra', image: 'NissanSentra.jpg' },
    { name: 'Nissan Altima', image: 'NissanAltima.jpg' },
    { name: 'Chevrolet Malibu', image: 'ChevroletMalibu.jpg' },
    { name: 'Chevrolet Spark', image: 'ChevroletSpark.jpg' },
    { name: 'Kia Forte', image: 'KiaForte.jpeg' },
    { name: 'Kia Rio', image: 'KiaRio.jpg' },
    { name: 'Ford Focus', image: 'FordFocus.jpg' },
    { name: 'Ford Fusion', image: 'FordFusion.jpg' },
    { name: 'Mazda 3', image: 'Mazda3.jpg' },
    { name: 'Mazda 6', image: 'Mazda6.jpg' },
    { name: 'Subaru Impreza', image: 'SubaruImpreza.jpg' },
    { name: 'Volkswagen Jetta', image: 'VolkswagenJetta.jpg' },
    { name: 'Volkswagen Passat', image: 'Volkswagen Passat.jpg' },
    { name: 'Mitsubishi Mirage', image: 'MitsubishiMirage.jpg' },
  ];

  filteredItems = [...this.items];

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
