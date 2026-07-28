import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    code: '',
    name: '',
    slug: '',
    brand: '',
    catalog: '',
    category: '',
    price: 300,
    description: '',
    composition: '',
    images: [
      'assets/maisum/',
    ],
    colors: [
      { name: 'Creme', hex: '#F7E9CF' },
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
]