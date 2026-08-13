import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

interface ProductForm {
  id?: number;
  code: string;
  name: string;
  brand: string;
  catalog: string;
  price: number;
  sizesText: string;
  isActive: boolean;
}

interface StoredCatalogsByBrand {
  [brand: string]: string[];
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CurrencyPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private readonly catalogsStorageKey = 'admin-catalogs-by-brand';
  private readonly brandsStorageKey = 'admin-brands';

  products: Product[] = [];
  brands: string[] = [];
  catalogsByBrand: StoredCatalogsByBrand = {};

  newCatalogName = '';
  catalogBrand = '';
  catalogMessage = '';
  productSearchTerm = '';
  isEditing = false;

  form: ProductForm = this.createEmptyForm();

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.refreshProducts();
  }

  get filteredProducts(): Product[] {
    const search = this.normalize(this.productSearchTerm);

    if (!search) {
      return this.products;
    }

    return this.products.filter((product) =>
      this.normalize(product.name).includes(search)
    );
  }

  saveProduct(): void {
    const product = this.mapFormToProduct();

    if (this.isEditing && this.form.id) {
      const currentProduct = this.products.find(
        (item) => item.id === this.form.id
      );

      if (!currentProduct) {
        return;
      }

      this.productService.updateProduct({
        ...currentProduct,
        ...product,
        id: currentProduct.id,
        createdAt: currentProduct.createdAt
      });
    } else {
      this.productService.createProduct(product);
    }

    this.ensureBrandExists(product.brand);
    this.ensureCatalogExists(product.brand, product.catalog);
    this.cancelEdit();
    this.refreshProducts();
  }

  editProduct(product: Product): void {
    this.isEditing = true;

    this.ensureBrandExists(product.brand);
    this.ensureCatalogExists(product.brand, product.catalog);

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

    const brandCatalogs = this.getCatalogsForBrand(brand);
    const alreadyExists = brandCatalogs.some(
      (catalog) => this.normalize(catalog) === this.normalize(catalogName)
    );

    if (alreadyExists) {
      this.catalogMessage = 'Este catálogo já existe para a marca selecionada.';
      return;
    }

    this.ensureBrandExists(brand);
    this.ensureCatalogExists(brand, catalogName);

    // Deixa o catálogo recém-criado pronto para o cadastro de produto.
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

    const confirmDelete = window.confirm(message);

    if (!confirmDelete) {
      return;
    }

    // Exclusão em cascata: remove todos os produtos do catálogo.
    productsFromCatalog.forEach((product) => {
      this.productService.deleteProduct(product.id);
    });

    const brandKey = this.findBrandKey(brand) ?? brand;
    const remainingCatalogs = (this.catalogsByBrand[brandKey] ?? []).filter(
      (item) => this.normalize(item) !== this.normalize(catalog)
    );

    this.catalogsByBrand = {
      ...this.catalogsByBrand,
      [brandKey]: remainingCatalogs
    };

    this.persistCatalogs();
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

    if (!catalogs.some(
      (catalog) => this.normalize(catalog) === this.normalize(this.form.catalog)
    )) {
      this.form.catalog = catalogs[0] ?? '';
    }
  }

  onCatalogBrandChange(): void {
    this.catalogMessage = '';
  }

  getCatalogsForBrand(brand: string): string[] {
    if (!brand) {
      return [];
    }

    const brandKey = this.findBrandKey(brand);

    if (!brandKey) {
      return [];
    }

    return [...(this.catalogsByBrand[brandKey] ?? [])].sort((a, b) =>
      a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
    );
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.form = this.createEmptyForm();

    if (this.brands.length > 0) {
      this.form.brand = this.brands[0];
      this.onProductBrandChange();
    }
  }

  private refreshProducts(): void {
    this.products = this.productService.getProducts({
      onlyActive: false
    });

    this.refreshBrandsAndCatalogs();
  }

  private refreshBrandsAndCatalogs(): void {
    const storedBrands = this.getStoredBrands();
    const storedCatalogs = this.getStoredCatalogs();

    const productBrands = this.products
      .map((product) => product.brand?.trim())
      .filter((brand): brand is string => Boolean(brand));

    this.brands = this.uniqueSorted([...storedBrands, ...productBrands]);

    const mergedCatalogs: StoredCatalogsByBrand = {};

    this.brands.forEach((brand) => {
      const storedBrandKey = Object.keys(storedCatalogs).find(
        (key) => this.normalize(key) === this.normalize(brand)
      );

      const storedBrandCatalogs = storedBrandKey
        ? storedCatalogs[storedBrandKey] ?? []
        : [];

      const productCatalogs = this.products
        .filter(
          (product) =>
            this.normalize(product.brand) === this.normalize(brand)
        )
        .map((product) => product.catalog?.trim())
        .filter((catalog): catalog is string => Boolean(catalog));

      mergedCatalogs[brand] = this.uniqueSorted([
        ...storedBrandCatalogs,
        ...productCatalogs
      ]);
    });

    this.catalogsByBrand = mergedCatalogs;
    this.persistBrands();
    this.persistCatalogs();

    if (!this.catalogBrand || !this.hasBrand(this.catalogBrand)) {
      this.catalogBrand = this.brands[0] ?? '';
    }

    if (!this.form.brand || !this.hasBrand(this.form.brand)) {
      this.form.brand = this.brands[0] ?? '';
    }

    this.onProductBrandChange();
  }

  private ensureBrandExists(brand: string): void {
    const brandName = brand.trim();

    if (!brandName || this.hasBrand(brandName)) {
      return;
    }

    this.brands = this.uniqueSorted([...this.brands, brandName]);
    this.catalogsByBrand = {
      ...this.catalogsByBrand,
      [brandName]: []
    };

    this.persistBrands();
    this.persistCatalogs();
  }

  private ensureCatalogExists(brand: string, catalog: string): void {
    const brandName = brand.trim();
    const catalogName = catalog.trim();

    if (!brandName || !catalogName) {
      return;
    }

    this.ensureBrandExists(brandName);

    const brandKey = this.findBrandKey(brandName) ?? brandName;
    const currentCatalogs = this.catalogsByBrand[brandKey] ?? [];

    if (
      currentCatalogs.some(
        (item) => this.normalize(item) === this.normalize(catalogName)
      )
    ) {
      return;
    }

    this.catalogsByBrand = {
      ...this.catalogsByBrand,
      [brandKey]: this.uniqueSorted([...currentCatalogs, catalogName])
    };

    this.persistCatalogs();
  }

  private createEmptyForm(): ProductForm {
    return {
      code: '',
      name: '',
      brand: '',
      catalog: '',
      price: 300,
      sizesText: 'P, M, G',
      isActive: true
    };
  }

  private mapFormToProduct(): Omit<Product, 'id' | 'createdAt'> {
    const existingProduct = this.form.id
      ? this.products.find((product) => product.id === this.form.id)
      : undefined;

    const name = this.form.name.trim();

    return {
      code: this.form.code.trim(),
      name,
      slug: existingProduct?.slug ?? this.createSlug(name),
      brand: this.form.brand.trim(),
      catalog: this.form.catalog.trim(),
      category: existingProduct?.category ?? '',
      price: Number(this.form.price),
      description: existingProduct?.description ?? '',
      composition: existingProduct?.composition ?? '',
      images: existingProduct?.images?.length
        ? existingProduct.images
        : ['assets/index/desktop/teste1.jpg'],
      colors: existingProduct?.colors?.length
        ? existingProduct.colors
        : [{ name: 'Única' }],
      sizes: this.form.sizesText
        .split(',')
        .map((size) => size.trim())
        .filter(Boolean),
      stock: existingProduct?.stock ?? 0,
      isActive: this.form.isActive
    };
  }

  private createSlug(value: string): string {
    return this.normalize(value)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private uniqueSorted(values: string[]): string[] {
    const map = new Map<string, string>();

    values.forEach((value) => {
      const trimmedValue = value.trim();
      const normalizedValue = this.normalize(trimmedValue);

      if (trimmedValue && !map.has(normalizedValue)) {
        map.set(normalizedValue, trimmedValue);
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
    );
  }

  private hasBrand(brand: string): boolean {
    return this.brands.some(
      (item) => this.normalize(item) === this.normalize(brand)
    );
  }

  private findBrandKey(brand: string): string | undefined {
    return Object.keys(this.catalogsByBrand).find(
      (key) => this.normalize(key) === this.normalize(brand)
    );
  }

  private getStoredBrands(): string[] {
    try {
      const storedValue = localStorage.getItem(this.brandsStorageKey);

      if (!storedValue) {
        return [];
      }

      const parsedValue = JSON.parse(storedValue);

      return Array.isArray(parsedValue)
        ? parsedValue.filter((item): item is string => typeof item === 'string')
        : [];
    } catch {
      return [];
    }
  }

  private getStoredCatalogs(): StoredCatalogsByBrand {
    try {
      const storedValue = localStorage.getItem(this.catalogsStorageKey);

      if (!storedValue) {
        return {};
      }

      const parsedValue = JSON.parse(storedValue);

      if (!parsedValue || typeof parsedValue !== 'object' || Array.isArray(parsedValue)) {
        return {};
      }

      const validCatalogs: StoredCatalogsByBrand = {};

      Object.entries(parsedValue).forEach(([brand, catalogs]) => {
        if (Array.isArray(catalogs)) {
          validCatalogs[brand] = catalogs.filter(
            (item): item is string => typeof item === 'string'
          );
        }
      });

      return validCatalogs;
    } catch {
      return {};
    }
  }

  private persistBrands(): void {
    localStorage.setItem(
      this.brandsStorageKey,
      JSON.stringify(this.brands)
    );
  }

  private persistCatalogs(): void {
    localStorage.setItem(
      this.catalogsStorageKey,
      JSON.stringify(this.catalogsByBrand)
    );
  }
}
