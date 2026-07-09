export type UserRole = 'customer' | 'admin';

export interface ProductColor {
  name: string;
  hex?: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  slug: string;
  brand: string;
  catalog: string;
  category: string;
  price: number;
  description: string;
  composition?: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export interface ProductFilters {
  brand?: string;
  catalog?: string;
  category?: string;
  search?: string;
  size?: string;
  color?: string;
  onlyActive?: boolean;
}
