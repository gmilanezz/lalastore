import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductColor } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

interface ProductForm {
  id?: number;
  code: string;
  name: string;
  slug: string;
  brand: string;
  catalog: string;
  category: string;
  price: number;
  description: string;
  composition: string;
  imagesText: string;
  colorsText: string;
  sizesText: string;
  stock: number;
  isActive: boolean;
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
        createdAt: this.products.find((item) => item.id === this.form.id)?.createdAt ?? new Date().toISOString().slice(0, 10)
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
      slug: product.slug,
      brand: product.brand,
      catalog: product.catalog,
      category: product.category,
      price: product.price,
      description: product.description,
      composition: product.composition ?? '',
      imagesText: product.images.join('\n'),
      colorsText: product.colors.map((color) => color.hex ? `${color.name}:${color.hex}` : color.name).join(', '),
      sizesText: product.sizes.join(', '),
      stock: product.stock,
      isActive: product.isActive
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProduct(id: number): void {
    const confirmDelete = window.confirm('Deseja realmente remover este produto?');

    if (!confirmDelete) {
      return;
    }

    this.productService.deleteProduct(id);
    this.refreshProducts();
  }

  importProducts(): void {
    const result = this.productService.importProductsFromJson(this.importJson);
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

  generateSlug(): void {
    this.form.slug = this.form.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private refreshProducts(): void {
    this.products = this.productService.getProducts({ onlyActive: false });
  }

  private createEmptyForm(): ProductForm {
    return {
      code: '',
      name: '',
      slug: '',
      brand: 'Esmeralda',
      catalog: 'catalogo1',
      category: 'Vestidos',
      price: 0,
      description: '',
      composition: '',
      imagesText: 'assets/index/desktop/teste1.jpg',
      colorsText: 'Única',
      sizesText: 'P, M, G',
      stock: 0,
      isActive: true
    };
  }

  private mapFormToProduct(): Omit<Product, 'id' | 'createdAt'> {
    return {
      code: this.form.code.trim(),
      name: this.form.name.trim(),
      slug: this.form.slug.trim(),
      brand: this.form.brand.trim(),
      catalog: this.form.catalog.trim(),
      category: this.form.category.trim(),
      price: Number(this.form.price),
      description: this.form.description.trim(),
      composition: this.form.composition.trim(),
      images: this.form.imagesText
        .split(/\n|,/)
        .map((image) => image.trim())
        .filter(Boolean),
      colors: this.parseColors(this.form.colorsText),
      sizes: this.form.sizesText
        .split(',')
        .map((size) => size.trim())
        .filter(Boolean),
      stock: Number(this.form.stock),
      isActive: this.form.isActive
    };
  }

  private parseColors(colorsText: string): ProductColor[] {
    return colorsText
      .split(',')
      .map((rawColor) => rawColor.trim())
      .filter(Boolean)
      .map((rawColor) => {
        const [name, hex] = rawColor.split(':').map((value) => value.trim());
        return hex ? { name, hex } : { name };
      });
  }
}
