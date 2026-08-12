import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

export interface Product {
  id: number;
  code: string;
  name: string;
  brand: string;
  catalog: string;
  price: number;
  sizes: string[];
  isActive: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CurrencyPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  importJson = '';
  importMessage = '';
  isEditing = false;

  form: ProductForm = this.createEmptyForm();

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.refreshProducts();
  }

  saveProduct(): void {
    const product = this.mapFormToProduct();

    if (this.isEditing && this.form.id) {
      this.productService.updateProduct({
        ...product,
        id: this.form.id,
        createdAt:
          this.products.find((item) => item.id === this.form.id)?.createdAt ??
          new Date().toISOString().slice(0, 10)
      });
    } else {
      this.productService.createProduct(product);
    }

    this.cancelEdit();
    this.refreshProducts();
  }

  editProduct(product: Product): void {
    this.isEditing = true;

    this.form = {
      id: product.id,
      code: product.code,
      name: product.name,
      brand: product.brand,
      catalog: product.catalog,
      price: product.price,
      sizesText: product.sizes.join(', '),
      isActive: product.isActive
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  deleteProduct(id: number): void {
    const confirmDelete = window.confirm(
      'Deseja realmente remover este produto?'
    );

    if (!confirmDelete) {
      return;
    }

    this.productService.deleteProduct(id);
    this.refreshProducts();
  }

  importProducts(): void {
    const result =
      this.productService.importProductsFromJson(this.importJson);

    this.importMessage = result.message;
    this.refreshProducts();
  }

  resetMock(): void {
    this.productService.resetMock();

    this.importJson = '';
    this.importMessage = 'Mock restaurado.';

    this.cancelEdit();
    this.refreshProducts();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.form = this.createEmptyForm();
  }

  private refreshProducts(): void {
    this.products = this.productService.getProducts({
      onlyActive: false
    });
  }

  private createEmptyForm(): ProductForm {
    return {
      code: '',
      name: '',
      brand: 'Esmeral',
      catalog: 'catalogo1',
      price: 300,
      sizesText: 'P, M, G',
      isActive: true
    };
  }

  private mapFormToProduct(): Omit<Product, 'id' | 'createdAt'> {
    return {
      code: this.form.code.trim(),
      name: this.form.name.trim(),
      brand: this.form.brand.trim(),
      catalog: this.form.catalog.trim(),
      price: Number(this.form.price),
      sizes: this.form.sizesText
        .split(',')
        .map((size) => size.trim())
        .filter(Boolean),
      isActive: this.form.isActive
    };
  }
}