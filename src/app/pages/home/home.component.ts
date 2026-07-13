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
      image: 'assets/index/desktop/teste1.jpg', 
      alt: 'Lançamento moda feminina 1',
      link: '/produto/1' 
    },
    { 
      image: 'assets/index/desktop/teste2.jpg', 
      alt: 'Lançamento moda feminina 2', 
      link: '/produto/2'
    },
    { 
      image: 'assets/index/desktop/teste3.jpg', 
      alt: 'Lançamento moda feminina 3', 
      link: '/produto/3'
    }
  ];

  private readonly heroImages = [
    'assets/index/mobile/teste1.jpg',
    'assets/index/mobile/teste2.jpg',
    'assets/index/mobile/teste3.jpg',
    'assets/index/mobile/teste2.jpg',
    'assets/index/mobile/teste1.jpg',
    'assets/index/mobile/teste3.jpg',
    'assets/index/mobile/teste2.jpg'
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