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
      desktopImage: 'assets/index/desktop/img1.jpg',
      mobileImage: 'assets/index/mobile/img1.jpg',
      alt: 'A Summer with Nat Bars',
      link: '/catalogo/esmeral/A Summer with Nat Bars'
    },
    {
      desktopImage: 'assets/index/desktop/img2.jpg',
      mobileImage: 'assets/index/mobile/img2.jpg',
      alt: 'A Summer with Nat Bars',
      link: '/catalogo/esmeral/A Summer with Nat Bars'
    },
    {
      desktopImage: 'assets/index/desktop/img3.jpg',
      mobileImage: 'assets/index/mobile/img3.jpg',
      alt: 'A Summer with Nat Bars',
      link: '/catalogo/esmeral/A Summer with Nat Bars'
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

  constructor(private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.featuredProducts = this.productService
      .getProducts()
      .filter((product) =>
        product.brand?.trim().toLowerCase() === 'esmeral' &&
        product.catalog?.trim().toLowerCase() === 'a summer with nat bars' &&
        product.isActive
      )
      .slice(0, 8);

    console.log('Produtos A Summer with Nat Bars:', this.featuredProducts);

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