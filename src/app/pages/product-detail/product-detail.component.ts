import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterLink, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {
  product?: Product;
  selectedImage = '';
  selectedColor = '';
  selectedSize = '';
  isAddedToCart = false;

  private addToCartTimeout?: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  goToPreviousPage(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }

    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);

    if (this.product) {
      this.selectedImage = this.product.images[0];
      this.selectedColor = this.product.colors[0]?.name ?? '';
      this.selectedSize = this.product.sizes[0] ?? '';
    }
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.cartService.addToCart(this.product, this.selectedColor, this.selectedSize);

    this.isAddedToCart = true;

    if (this.addToCartTimeout) {
      window.clearTimeout(this.addToCartTimeout);
    }

    this.addToCartTimeout = window.setTimeout(() => {
      this.isAddedToCart = false;
    }, 2200);
  }
}