import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    code: 'JH62131',
    name: 'Top Malha Amarração',
    slug: 'malha-amarracao',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Top',
    price: 319.9,
    description: 'Top Malha com amarração nas costas',
    composition: 'Poliamida 85% | Elastano 15%',
    images: [
      '/assets/maisum/teste1.jpg',
      '/assets/maisum/teste2.jpg',
      '/assets/maisum/teste3.jpg',
      '/assets/maisum/teste4.jpg'
    ],
    colors: [
      { name: 'Creme', hex: '#F7E9CF' },
      { name: 'Azul Marinho', hex: '#0B1F3A' },
      { name: 'Vinho', hex: '#6D1A36' },
      { name: 'Preto', hex: '#111111' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  }
]