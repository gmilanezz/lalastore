import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    code: 'JH62131',
    name: 'Top Malha Amarração',
    slug: 'top-malha-amarracao',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Top',
    price: 300,
    description: 'Top malha com amarração nas costas.',
    composition: 'Poliamida 85% | Elastano 15%',
    images: [
      'assets/maisum/topmalha1.jpg',
      'assets/maisum/topmalha2.jpg',
      'assets/maisum/topmalha3.jpg',
      'assets/maisum/topmalha4.jpg'
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
  },
  {
    id: 2,
    code: 'JH13565',
    name: 'Saia Midi Bordado',
    slug: 'saia-midi-bordado',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Saia',
    price: 300,
    description: 'Saia midi bordada em algodão.',
    composition: 'Algodão 100%',
    images: [
      'assets/maisum/saiabordado1.jpg',
      'assets/maisum/saiabordado2.jpg',
      'assets/maisum/saiabordado3.jpg',
      'assets/maisum/saiabordado4.jpg'
    ],
    colors: [
      { name: 'Café', hex: '#5A3826' },
      { name: 'Bege', hex: '#D9C8AD' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 3,
    code: 'JH13562',
    name: 'Calça Aladim Pala',
    slug: 'calca-aladim-pala',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Calça',
    price: 300,
    description: 'Calça aladim com pala, modelagem ampla e confortável.',
    composition: 'Poliéster 75% | Viscose 20% | Elastano 5% | Forro: Poliéster 100%',
    images: [
      'assets/maisum/calcapala1.jpg',
      'assets/maisum/calcapala2.jpg'
    ],
    colors: [
      { name: 'Preto', hex: '#111111' },
      { name: 'Creme', hex: '#F7E9CF' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 4,
    code: 'JH13439',
    name: 'Top Lastex',
    slug: 'top-lastex',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Top',
    price: 300,
    description: 'Top lastex com alças e modelagem confortável.',
    composition: 'Poliéster 100%',
    images: [
      'assets/maisum/toplastex1.jpg',
      'assets/maisum/toplastex2.jpg',
      'assets/maisum/toplastex3.jpg'
    ],
    colors: [
      { name: 'Bege', hex: '#D9C8AD' },
      { name: 'Terracota', hex: '#C7473F' },
      { name: 'Preto', hex: '#111111' },
      { name: 'Azul', hex: '#A7B9BC' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 5,
    code: 'JH13527',
    name: 'Jaqueta Jeans Curta',
    slug: 'jaqueta-jeans-curta',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Jaqueta',
    price: 300,
    description: 'Jaqueta jeans curta em algodão.',
    composition: 'Algodão 100%',
    images: [
      'assets/maisum/jaquetajeans1.jpg',
      'assets/maisum/jaquetajeans2.jpg',
      'assets/maisum/jaquetajeans3.jpg'
    ],
    colors: [
      { name: 'Azul', hex: '#8FA6B5' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 6,
    code: 'JH77037',
    name: 'Conjunto Viscolinho',
    slug: 'conjunto-viscolinho',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Conjunto',
    price: 300,
    description: 'Conjunto em viscolinho com blazer e calça.',
    composition: 'Liocel 90% | Viscose 8% | Elastano 2%',
    images: [
      'assets/maisum/conjuntoviscolinho1.jpg',
      'assets/maisum/conjuntoviscolinho2.jpg',
      'assets/maisum/conjuntoviscolinho3.jpg',
      'assets/maisum/conjuntoviscolinho4.jpg'
    ],
    colors: [
      { name: 'Verde', hex: '#A8A090' },
      { name: 'Creme', hex: '#E8E8E6' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 7,
    code: 'JH62101',
    name: 'Regata Bordada',
    slug: 'regata-bordada',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Regata',
    price: 300,
    description: 'Regata bordada com alças finas.',
    composition: 'Viscose 67% | Poliamida 21% | Linho 12%',
    images: [
      'assets/maisum/regatabordada1.jpg',
      'assets/maisum/regatabordada2.jpg',
      'assets/maisum/regatabordada3.jpg'
    ],
    colors: [
      { name: 'Creme', hex: '#F7E9CF' },
      { name: 'Café', hex: '#8B6B47' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 8,
    code: 'JH76919',
    name: 'Calça Pantalona Jeans',
    slug: 'calca-pantalona-jeans',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Calça',
    price: 300,
    description: 'Calça pantalona jeans em algodão.',
    composition: 'Algodão 100%',
    images: [
      'assets/maisum/calcapantalona1.jpg'
    ],
    colors: [
      { name: 'Verde', hex: '#5D6346' },
      { name: 'Caqui', hex: '#E8E6DF' },
      { name: 'Cinza', hex: '#8C817D' },
      { name: 'Café', hex: '#B66A2F' },
      { name: 'Azul Marinho', hex: '#0B1F3A' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 9,
    code: 'JH13539',
    name: 'Vestido Longo Floral',
    slug: 'vestido-longo-floral',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Vestido',
    price: 300,
    description: 'Vestido longo floral com modelagem sofisticada.',
    composition: 'Linho 70% | Viscose 30% | Forro: Poliéster 100%',
    images: [
      'assets/maisum/vestidofloral1.jpg',
      'assets/maisum/vestidofloral2.jpg',
      'assets/maisum/vestidofloral3.jpg',
      'assets/maisum/vestidofloral4.jpg'
    ],
    colors: [
      { name: 'Preto', hex: '#111111' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 10,
    code: 'JH62151',
    name: 'Blusa Linho Costa Nua',
    slug: 'blusa-linho-costa-nua',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Blusa',
    price: 300,
    description: 'Blusa em linho com costa nua e amarração.',
    composition: 'Algodão 85% | Linho 15%',
    images: [
      'assets/maisum/blusalinho1.jpg',
      'assets/maisum/blusalinho2.jpg',
      'assets/maisum/blusalinho3.jpg'
    ],
    colors: [
      { name: 'Verde', hex: '#B6BC18' },
      { name: 'Laranja', hex: '#FF4A1F' },
      { name: 'Bege', hex: '#F7E9CF' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 11,
    code: 'JH76839',
    name: 'Saia Longa em Linho',
    slug: 'saia-longa-em-linho',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Saia',
    price: 300,
    description: 'Saia longa em linho com modelagem ampla.',
    composition: 'Viscose 55% | Linho 20% | Poliéster 15% | Algodão 10%',
    images: [
      'assets/maisum/saialonga1.jpg',
    ],
    colors: [
      { name: 'Creme', hex: '#F7E9CF' },
      { name: 'Verde', hex: '#7A8065' },
      { name: 'Bege', hex: '#D9C8AD' },
      { name: 'Azul Marinho', hex: '#0B1F3A' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 12,
    code: 'JH62121',
    name: 'Calça Cargo',
    slug: 'calca-cargo',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Calça',
    price: 300,
    description: 'Calça cargo em algodão com poliamida.',
    composition: 'Algodão 65% | Poliamida 35%',
    images: [
      'assets/maisum/calcacargo1.jpg',
      'assets/maisum/calcacargo2.jpg',
      'assets/maisum/calcacargo3.jpg',
      'assets/maisum/calcacargo4.jpg'
    ],
    colors: [
      { name: 'Caramelo', hex: '#B6793C' },
      { name: 'Azul Marinho', hex: '#3E4558' },
      { name: 'Verde', hex: '#7A8065' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 13,
    code: 'JH13587',
    name: 'Regata Básica',
    slug: 'regata-basica',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Regata',
    price: 300,
    description: 'Regata básica em poliéster com elastano.',
    composition: 'Poliéster 90% | Elastano 10%',
    images: [
      'assets/maisum/regatabasica1.jpg',
      'assets/maisum/regatabasica2.jpg',
      'assets/maisum/regatabasica3.jpg'
    ],
    colors: [
      { name: 'Verde', hex: '#5D5636' },
      { name: 'Preto', hex: '#111111' },
      { name: 'Creme', hex: '#F7E9CF' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 14,
    code: 'JH77014',
    name: 'Regata Jeans',
    slug: 'regata-jeans',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Regata',
    price: 300,
    description: 'Regata jeans em algodão.',
    composition: 'Algodão 100%',
    images: [
      'assets/maisum/regatajeans1.jpg',
      'assets/maisum/regatajeans2.jpg',
      'assets/maisum/regatajeans3.jpg',
      'assets/maisum/regatajeans4.jpg'
    ],
    colors: [
      { name: 'Azul', hex: '#7FA3C1' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 15,
    code: 'JH77015',
    name: 'Calça Jeans Botões',
    slug: 'calca-jeans-botoes',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Calça',
    price: 300,
    description: 'Calça jeans com botões laterais.',
    composition: 'Algodão 100%',
    images: [
      'assets/maisum/calcajeansbotoes1.jpg',
    ],
    colors: [
      { name: 'Azul', hex: '#7FA3C1' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 16,
    code: 'JH13569',
    name: 'Camisa Peplum',
    slug: 'camisa-peplum',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Camisa',
    price: 300,
    description: 'Camisa peplum em algodão.',
    composition: 'Algodão 100%',
    images: [
      'assets/maisum/camisapeplum1.jpg',
      'assets/maisum/camisapeplum2.jpg',
      'assets/maisum/camisapeplum3.jpg'
    ],
    colors: [
      { name: 'Azul', hex: '#AFC6E8' },
      { name: 'Creme', hex: '#F7E9CF' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 17,
    code: 'MU101054',
    name: 'Calça Jeans Reta',
    slug: 'calca-jeans-reta',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Calça',
    price: 300,
    description: 'Calça jeans reta em algodão.',
    composition: 'Algodão 100%',
    images: [
      'assets/maisum/calcajeansreta1.jpg'
    ],
    colors: [
      { name: 'Azul', hex: '#3E668C' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  },
  {
    id: 18,
    code: 'JH13538',
    name: 'Vestido Longo Pala',
    slug: 'vestido-longo-pala',
    brand: 'maisum',
    catalog: 'summerpreview',
    category: 'Vestido',
    price: 300,
    description: 'Vestido longo pala em poliéster.',
    composition: 'Poliéster 100%',
    images: [
      'assets/maisum/vestidolongopala1.jpg',
      'assets/maisum/vestidolongopala2.jpg',
      'assets/maisum/vestidolongopala3.jpg',
      'assets/maisum/vestidolongopala4.jpg'
    ],
    colors: [
      { name: 'Violeta', hex: '#6E568D' },
      { name: 'Amarelo', hex: '#D7CB68' }
    ],
    sizes: ['P', 'M', 'G'],
    stock: 5,
    isActive: true,
    createdAt: '2026-07-14'
  }
]