import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink, TitleCasePipe, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit, OnDestroy {
  brand = '';
  catalog = '';
  searchTerm = '';
  selectedCategory = '';
  products: Product[] = [];
  categories: string[] = [];

  private routeSubscription?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categories = this.productService.getCategories();

    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.brand = params.get('brand') ?? '';
      this.catalog = params.get('catalog') ?? '';
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  applyFilters(): void {
    this.products = this.productService.getProducts({
      brand: this.brand,
      catalog: this.catalog,
      search: this.searchTerm,
      category: this.selectedCategory,
      onlyActive: true
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.applyFilters();
  }

  trackByProductId(_: number, product: Product): number {
    return product.id;
  }
}
