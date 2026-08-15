import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product, ProductColor } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CatalogService, CatalogState } from '../../services/catalog.service';

interface ProductForm {
  id?: number;
  code: string;
  name: string;
  brand: string;
  catalog: string;
  price: number;
  sizesText: string;
  imageCount: number;
  colorsText: string;
  isActive: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CurrencyPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  brands: string[] = [];
  newCatalogName = '';
  catalogBrand = '';
  catalogMessage = '';
  productSearchTerm = '';
  isEditing = false;
  form: ProductForm = this.createEmptyForm();

  private catalogState: CatalogState = { brands: [], catalogs: [] };
  private catalogSubscription?: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.refreshProducts();
    this.catalogSubscription = this.catalogService.state$.subscribe((state: CatalogState) => {
      this.catalogState = state;
      this.brands = [...state.brands];
      this.syncSelectedBrandsAndCatalogs();
    });
  }

  ngOnDestroy(): void {
    this.catalogSubscription?.unsubscribe();
  }

  get filteredProducts(): Product[] {
    const search = this.normalize(this.productSearchTerm);
    if (!search) return this.products;
    return this.products.filter((product) => this.normalize(product.name).includes(search));
  }

  get generatedImagePaths(): string[] {
    return this.createImagePaths(this.form.imageCount);
  }

  get generatedSlug(): string {
    return this.createSlug(this.form.name);
  }

  get generatedDescription(): string {
    const name = this.form.name.trim();
    const catalog = this.form.catalog.trim();
    return name && catalog ? `${name} do catálogo ${catalog}.` : '';
  }

  saveProduct(): void {
    const product = this.mapFormToProduct();

    if (this.isEditing && this.form.id) {
      const currentProduct = this.products.find((item) => item.id === this.form.id);
      if (!currentProduct) return;

      this.productService.updateProduct({
        ...currentProduct,
        ...product,
        id: currentProduct.id,
        createdAt: currentProduct.createdAt
      });
    } else {
      this.productService.createProduct(product);
    }

    this.catalogService.addCatalog(product.brand, product.catalog);
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
      imageCount: product.images.length || 1,
      colorsText: product.colors.map((color) => color.name).join(', '),
      isActive: product.isActive
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProduct(id: number): void {
    if (!window.confirm('Deseja realmente remover este produto?')) return;
    this.productService.deleteProduct(id);
    this.refreshProducts();
  }

  addCatalog(): void {
    const brand = this.catalogBrand.trim();
    const catalogName = this.newCatalogName.trim();

    if (!brand) {
      this.catalogMessage = 'Selecione uma marca para o catálogo.';
      return;
    }

    if (!catalogName) {
      this.catalogMessage = 'Informe um nome para o catálogo.';
      return;
    }

    const created = this.catalogService.addCatalog(brand, catalogName);
    if (!created) {
      this.catalogMessage = 'Este catálogo já existe para a marca selecionada.';
      return;
    }

    this.form.brand = brand;
    this.form.catalog = catalogName;
    this.newCatalogName = '';
    this.catalogMessage = 'Catálogo criado com sucesso e selecionado no cadastro de produto.';
  }

  deleteCatalog(brand: string, catalog: string): void {
    const productsFromCatalog = this.products.filter(
      (product) =>
        this.normalize(product.brand) === this.normalize(brand) &&
        this.normalize(product.catalog) === this.normalize(catalog)
    );

    const message = productsFromCatalog.length > 0
      ? `Deseja realmente excluir o catálogo "${catalog}" da marca "${brand}" e todos os ${productsFromCatalog.length} produto(s) vinculados a ele?`
      : `Deseja realmente excluir o catálogo "${catalog}" da marca "${brand}"?`;

    if (!window.confirm(message)) return;

    this.productService.deleteProductsByCatalog(brand, catalog);
    this.catalogService.deleteCatalog(brand, catalog);
    this.refreshProducts();

    if (
      this.normalize(this.form.brand) === this.normalize(brand) &&
      this.normalize(this.form.catalog) === this.normalize(catalog)
    ) {
      const availableCatalogs = this.getCatalogsForBrand(this.form.brand);
      this.form.catalog = availableCatalogs[0] ?? '';
    }

    this.catalogMessage = productsFromCatalog.length > 0
      ? 'Catálogo e produtos vinculados removidos com sucesso.'
      : 'Catálogo removido com sucesso.';
  }

  onProductBrandChange(): void {
    const catalogs = this.getCatalogsForBrand(this.form.brand);
    if (!catalogs.some((catalog) => this.normalize(catalog) === this.normalize(this.form.catalog))) {
      this.form.catalog = catalogs[0] ?? '';
    }
  }

  onCatalogBrandChange(): void {
    this.catalogMessage = '';
  }

  getCatalogsForBrand(brand: string): string[] {
    const normalizedBrand = this.normalize(brand);
    return this.catalogState.catalogs
      .filter((item) => this.normalize(item.brand) === normalizedBrand)
      .map((item) => item.catalog)
      .sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.form = this.createEmptyForm();
    this.syncSelectedBrandsAndCatalogs();
  }

  private refreshProducts(): void {
    this.products = this.productService.getProducts({ onlyActive: false });
  }

  private syncSelectedBrandsAndCatalogs(): void {
    if (!this.catalogBrand || !this.hasBrand(this.catalogBrand)) {
      this.catalogBrand = this.brands[0] ?? '';
    }
    if (!this.form.brand || !this.hasBrand(this.form.brand)) {
      this.form.brand = this.brands[0] ?? '';
    }
    this.onProductBrandChange();
  }

  private createEmptyForm(): ProductForm {
    return {
      code: '',
      name: '',
      brand: '',
      catalog: '',
      price: 300,
      sizesText: 'P, M, G',
      imageCount: 1,
      colorsText: 'Única',
      isActive: true
    };
  }

  private mapFormToProduct(): Omit<Product, 'id' | 'createdAt'> {
    const existingProduct = this.form.id
      ? this.products.find((product) => product.id === this.form.id)
      : undefined;

    const name = this.form.name.trim();
    const catalog = this.form.catalog.trim();

    return {
      code: this.form.code.trim(),
      name,
      slug: this.createSlug(name),
      brand: this.form.brand.trim(),
      catalog,
      category: existingProduct?.category ?? '',
      price: Number(this.form.price),
      description: `${name} do catálogo ${catalog}.`,
      composition: existingProduct?.composition ?? '',
      images: this.createImagePaths(this.form.imageCount),
      colors: this.parseColors(this.form.colorsText),
      sizes: this.form.sizesText
        .split(',')
        .map((size) => size.trim())
        .filter(Boolean),
      stock: existingProduct?.stock ?? 0,
      isActive: this.form.isActive
    };
  }

  private createImagePaths(count: number): string[] {
    const total = Math.max(1, Math.floor(Number(count) || 1));
    const brandFolder = this.createPathSegment(this.form.brand);
    const code = this.createFileCode(this.form.code);

    if (!brandFolder || !code) return [];

    return Array.from(
      { length: total },
      (_, index) => `assets/${brandFolder}/${code}-${index + 1}.jpg`
    );
  }

  private parseColors(colorsText: string): ProductColor[] {
    const names = colorsText
      .split(',')
      .map((color) => color.trim())
      .filter(Boolean);

    return (names.length ? names : ['Única']).map((name) => ({
      name,
      hex: this.colorNameToHex(name)
    }));
  }

  private colorNameToHex(colorName: string): string {
    const colors: Record<string, string> = {
      'amarelo': '#F4D03F', 'amarelo claro': '#FFF3A6', 'amarelo pastel': '#F8E58C',
      'azul': '#4A90E2', 'azul bebe': '#A7C7E7', 'azul marinho': '#1F3A5F', 'azul royal': '#4169E1',
      'bege': '#D8C3A5', 'branco': '#FFFFFF', 'bordo': '#800020', 'caramelo': '#C68E5B',
      'cinza': '#808080', 'coral': '#FF7F50', 'creme': '#FFFDD0', 'dourado': '#D4AF37',
      'fucsia': '#FF00FF', 'laranja': '#F28C28', 'lilas': '#C8A2C8', 'marrom': '#6B3F2A',
      'menta': '#BFEAD8', 'mostarda': '#D4A017', 'nude': '#D8B5A5', 'off': '#F8F3EA',
      'off white': '#F8F3EA', 'preto': '#111111', 'rosa': '#F5B6C8', 'rosa bebe': '#F4C2C2',
      'roxo': '#800080', 'terracota': '#C66B4E', 'verde': '#90B255', 'verde militar': '#556B2F',
      'vermelho': '#C62828', 'vinho': '#722F37', 'unica': '#D9D9D9'
    };

    return colors[this.normalize(colorName)] ?? '#D9D9D9';
  }

  private createPathSegment(value: string): string {
    return this.normalize(value)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private createFileCode(value: string): string {
    return value
      .trim()
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private createSlug(value: string): string {
    return this.normalize(value)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private hasBrand(brand: string): boolean {
    return this.brands.some((item) => this.normalize(item) === this.normalize(brand));
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
