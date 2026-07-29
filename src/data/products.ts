export interface ProductColor {
  name: string;
  hex: string;
  /** Optional: for split/diagonal two-tone swatches like black/white */
  hex2?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  description: string;
  fabric: string;
  story: string;
}


export const products: Product[] = [

  {
    id: '-hoodie-black',
    name: 'Graphic Hoodie Black',
    price: 950,
    category: 'Hoodies',
    images: [
      //'/images/prod1-1.PNG',
      '/images/prod1-2.png',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
    ],
    rating: 4.7,
    description: 'Premium heavyweight graphic hoodie.',
    fabric: '100% cotton fleece. Wash cold.',
    story: 'Fresh from the archive.',
  },
  {
    id: 'molemi-classic-millie',
    name: 'Molemi Classic Millie (300gsm)',
    price: 600,
    category: 'Tees',
    images: [
      '/images/prod2-1.png',
      '/images/prod2-2.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
    ],
    rating: 4.8,
    description: 'Classic oversized streetwear t-shirt with a premium 300gsm weight.',
    fabric: '100% Cotton, 300gsm. Wash cold.',
    story: 'Tall Boy Wear staple piece.',
  },
  {
    id: 'dr-lucas-mangope-tee',
    name: 'Dr. Lucas Mangope T-Shirt',
    price: 550,
    category: 'Tees',
    images: [
      '/images/prod3-1.png',
      '/images/prod3-2.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
    ],
    rating: 4.9,
    description: 'Dr. Lucas Mangope tribute t-shirt.',
    fabric: '100% Cotton. Wash cold.',
    story: 'A tribute to Dr. Lucas Mangope.',
  },
  {
    id: 'graphic-tee-black',
    name: 'Graphic T-Shirt Black',
    price: 550,
    category: 'Tees',
    images: [
      '/images/prod4-1.png',
      '/images/prod4-2.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
    ],
    rating: 4.8,
    description: 'Oversized black graphic t-shirt.',
    fabric: '100% Cotton. Wash cold.',
    story: 'Classic streetwear.',
  },

  {
    id: 'orlando-pirates-tee',
    name: 'Orlando Pirates (300gsm)',
    price: 550,
    category: 'Tees',
    images: [
      '/images/orlando-pirates-1.png',
      '/images/orlando-pirates-2.png',
    ],
    sizes: ['4XL', '5XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
    ],
    rating: 4.9,
    description: 'Orlando Pirates tribute t-shirt (300gsm). Ezimnyama Ngenkani.',
    fabric: '100% Cotton, 300gsm',
    story: 'A tribute to the mighty Buccaneers.',
  },

];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
