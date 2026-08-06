import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('productTrack') productTrack?: ElementRef<HTMLDivElement>;

  featuredProducts: Product[] = [];
  activeSlide = 0;
  activeAccordion: string | null = null;

  readonly slides = [
    { 
      image: 'assets/mysk/11012-2.jpg', 
      alt: 'Travels - Laura Dellagnese',
      link: '/catalogo/mysk/Travels - Laura Dellagnese' 
    },
    { 
      image: 'assets/aurore/AURORE-097-3.jpg', 
      alt: 'The Meeting', 
      link: '/catalogo/aurore/The Meeting'
    },
    { 
      image: 'assets/esmeral/summer-dream/38789-3.jpg', 
      alt: 'Summer Dream', 
      link: '/catalogo/esmeral/Summer Dream'
    }
  ];

  private readonly heroImages = [
    'assets/kaele/8077-2.jpg',
    'assets/kaele/8078-3.jpg',
    'assets/kaele/8098-3.jpg',
    'assets/kaele/8123-3.jpg',
    'assets/kaele/8104-3.jpg',
    'assets/kaele/8176-5.jpg',
    'assets/kaele/8095-2.jpg'
  ];

  readonly heroSlides = [...this.heroImages, ...this.heroImages];

  private intervalId: number | undefined;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.featuredProducts = this.productService.getFeaturedProducts(8);
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  goToSlide(index: number): void {
    this.activeSlide = index;
  }

  scrollProducts(direction: 'prev' | 'next'): void {
    const track = this.productTrack?.nativeElement;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector('app-product-card') as HTMLElement | null;
    const gap = Number.parseInt(window.getComputedStyle(track).gap || '25', 10) || 25;
    const scrollAmount = (firstCard?.offsetWidth ?? 280) + gap;

    track.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }

  toggleAccordion(key: string): void {
    this.activeAccordion = this.activeAccordion === key ? null : key;
  }

  trackByProductId(_: number, product: Product): number {
    return product.id;
  }

  trackByHeroImage(index: number, image: string): string {
    return `${image}-${index}`;
  }

  private startCarousel(): void {
    this.intervalId = window.setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    }, 4500);
  }
}