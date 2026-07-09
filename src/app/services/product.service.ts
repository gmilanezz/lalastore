import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductFilters } from '../models/product.model';
import { MOCK_PRODUCTS } from '../mocks/products.mock';

const STORAGE_KEY = 'lalastorevip_products';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productsSubject = new BehaviorSubject<Product[]>(this.loadInitialProducts());
  readonly products$: Observable<Product[]> = this.productsSubject.asObservable();

  getProducts(filters: ProductFilters = {}): Product[] {
    const normalizedSearch = this.normalize(filters.search ?? '');

    return this.productsSubject.value.filter((product) => {
      const matchesActive = filters.onlyActive === false ? true : product.isActive;
      const matchesBrand = filters.brand ? this.normalize(product.brand) === this.normalize(filters.brand) : true;
      const matchesCatalog = filters.catalog ? this.normalize(product.catalog) === this.normalize(filters.catalog) : true;
      const matchesCategory = filters.category ? this.normalize(product.category) === this.normalize(filters.category) : true;
      const matchesSearch = normalizedSearch
        ? this.normalize(`${product.name} ${product.code} ${product.category} ${product.brand}`).includes(normalizedSearch)
        : true;
      const matchesSize = filters.size ? product.sizes.includes(filters.size) : true;
      const matchesColor = filters.color
        ? product.colors.some((color) => this.normalize(color.name) === this.normalize(filters.color ?? ''))
        : true;

      return matchesActive && matchesBrand && matchesCatalog && matchesCategory && matchesSearch && matchesSize && matchesColor;
    });
  }

  getProductById(id: number): Product | undefined {
    return this.productsSubject.value.find((product) => product.id === id);
  }

  getFeaturedProducts(limit = 6): Product[] {
    return this.getProducts({ onlyActive: true }).slice(0, limit);
  }

  getCategories(): string[] {
    return Array.from(new Set(this.productsSubject.value.map((product) => product.category))).sort();
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.productsSubject.value;
    const nextId = products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1;

    const newProduct: Product = {
      ...product,
      id: nextId,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    this.saveProducts([...products, newProduct]);
    return newProduct;
  }

  updateProduct(product: Product): void {
    const updatedProducts = this.productsSubject.value.map((item) => (item.id === product.id ? product : item));
    this.saveProducts(updatedProducts);
  }

  deleteProduct(id: number): void {
    const updatedProducts = this.productsSubject.value.filter((product) => product.id !== id);
    this.saveProducts(updatedProducts);
  }

  importProductsFromJson(rawJson: string): { success: boolean; message: string } {
    try {
      const parsed = JSON.parse(rawJson) as Product[] | { products: Product[] };
      const importedProducts = Array.isArray(parsed) ? parsed : parsed.products;

      if (!Array.isArray(importedProducts)) {
        return { success: false, message: 'O JSON precisa ser uma lista de produtos ou um objeto com a propriedade products.' };
      }

      this.saveProducts(importedProducts.map((product) => this.normalizeImportedProduct(product)));
      return { success: true, message: `${importedProducts.length} produto(s) importado(s) com sucesso.` };
    } catch {
      return { success: false, message: 'Não foi possível ler o JSON informado.' };
    }
  }

  resetMock(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.productsSubject.next([...MOCK_PRODUCTS]);
  }

  private loadInitialProducts(): Product[] {
    const storedProducts = localStorage.getItem(STORAGE_KEY);

    if (!storedProducts) {
      return [...MOCK_PRODUCTS];
    }

    try {
      return JSON.parse(storedProducts) as Product[];
    } catch {
      return [...MOCK_PRODUCTS];
    }
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    this.productsSubject.next(products);
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private normalizeImportedProduct(product: Product): Product {
    return {
      ...product,
      isActive: product.isActive ?? true,
      stock: product.stock ?? 0,
      createdAt: product.createdAt ?? new Date().toISOString().slice(0, 10),
      images: product.images?.length ? product.images : ['assets/index/desktop/teste1.jpg'],
      colors: product.colors?.length ? product.colors : [{ name: 'Única' }],
      sizes: product.sizes?.length ? product.sizes : ['Único']
    };
  }
}
