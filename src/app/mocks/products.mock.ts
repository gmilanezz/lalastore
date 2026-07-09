import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    code: 'JH62131',
    name: 'Vestido Floral',
    slug: 'vestido-floral',
    brand: 'Mysk',
    catalog: 'catalogo1',
    category: 'Vestidos',
    price: 189.9,
    description: 'Vestido longo com estampa floral delicada, tecido leve e fluido. Perfeito para ocasiões especiais.',
    composition: 'Poliéster 100%',
    images: [
      'assets/index/desktop/teste1.jpg',
      'assets/index/desktop/teste2.jpg',
      'assets/index/desktop/teste3.jpg'
    ],
    colors: [
      { name: 'Verde', hex: '#5d7b4d' },
      { name: 'Rosa', hex: '#d99aa5' },
      { name: 'Azul', hex: '#405f8f' }
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 8,
    isActive: true,
    createdAt: '2026-07-09'
  },
  {
    id: 2,
    code: 'JH13565',
    name: 'Blusa Elegance',
    slug: 'blusa-elegance',
    brand: 'Esmeralda',
    catalog: 'catalogo1',
    category: 'Blusas',
    price: 149.9,
    description: 'Blusa elegante com caimento perfeito e detalhes sofisticados.',
    composition: 'Algodão 100%',
    images: [
      'assets/index/desktop/teste1.jpg',
      'assets/index/desktop/teste2.jpg'
    ],
    colors: [
      { name: 'Branco', hex: '#ffffff' },
      { name: 'Preto', hex: '#111111' },
      { name: 'Bege', hex: '#d9c8ad' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 12,
    isActive: true,
    createdAt: '2026-07-09'
  },
  {
    id: 3,
    code: 'JH13562',
    name: 'Conjunto Premium',
    slug: 'conjunto-premium',
    brand: 'Kaele',
    catalog: 'catalogo1',
    category: 'Conjuntos',
    price: 249.9,
    description: 'Conjunto premium de alta qualidade. Ideal para looks executivos.',
    composition: 'Viscose 80% | Elastano 20%',
    images: [
      'assets/index/desktop/teste1.jpg',
      'assets/index/desktop/teste2.jpg',
      'assets/index/desktop/teste3.jpg'
    ],
    colors: [
      { name: 'Cinza', hex: '#808080' },
      { name: 'Preto', hex: '#111111' }
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 6,
    isActive: true,
    createdAt: '2026-07-09'
  },
  {
    id: 4,
    code: 'JH13539',
    name: 'Vestido Longo',
    slug: 'vestido-longo',
    brand: 'Esmeralda',
    catalog: 'catalogo1',
    category: 'Vestidos',
    price: 279.9,
    description: 'Vestido longo sofisticado com caimento perfeito e tecido premium.',
    composition: 'Linho 70% | Viscose 30%',
    images: [
      'assets/index/desktop/teste1.jpg'
    ],
    colors: [
      { name: 'Verde', hex: '#5d7b4d' },
      { name: 'Vermelho', hex: '#9c1f2e' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 4,
    isActive: true,
    createdAt: '2026-07-09'
  },
  {
    id: 5,
    code: 'JH13439',
    name: 'Top Lastex',
    slug: 'top-lastex',
    brand: 'Esmeralda',
    catalog: 'catalogo1',
    category: 'Blusas',
    price: 129.9,
    description: 'Top lastex com alças, modelagem confortável e visual moderno para composições casuais.',
    composition: 'Poliéster 100%',
    images: [
      'assets/index/desktop/teste1.jpg',
      'assets/index/desktop/teste2.jpg'
    ],
    colors: [
      { name: 'Bege', hex: '#eadbb8' },
      { name: 'Terracota', hex: '#c7473f' },
      { name: 'Preto', hex: '#111111' },
      { name: 'Azul', hex: '#a7b9bc' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 15,
    isActive: true,
    createdAt: '2026-07-09'
  },
  {
    id: 6,
    code: 'JH13527',
    name: 'Jaqueta Jeans Curta',
    slug: 'jaqueta-jeans-curta',
    brand: 'Kaele',
    catalog: 'catalogo1',
    category: 'Jaquetas',
    price: 319.9,
    description: 'Jaqueta jeans curta em algodão, ideal para sobreposições e looks casuais elegantes.',
    composition: 'Algodão 100%',
    images: [
      'assets/index/desktop/teste2.jpg',
      'assets/index/desktop/teste3.jpg'
    ],
    colors: [
      { name: 'Azul Jeans', hex: '#8fa6b5' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 7,
    isActive: true,
    createdAt: '2026-07-09'
  }
]