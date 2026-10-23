export interface ProductVariant {
  color: string
  hex: string
  sizes: string[]
}
export interface Product {
  id: string
  name: string
  category: string
  price: number
  oldPrice?: number
  image: number
  tag?: string
  variants: ProductVariant[]
}
export interface Category {
  name: string
  image: number
}
export interface Collection {
  name: string
  productIds: string[]
}
export interface CartItem {
  productId: string
  color: string
  size: string
  quantity: number
}
export interface Cart {
  items: CartItem[]
}
export interface Customer {
  id: string
  name: string
  email: string
}
export const categories: Category[] = [
  'Conjuntos',
  'Leggings',
  'Tops',
  'Shorts',
  'Macacões',
  'Blusas',
].map((name, i) => ({ name, image: [0, 1, 0, 3, 2, 3][i] }))
const variants = (color: string, hex: string): ProductVariant[] => [
  { color, hex, sizes: ['P', 'M', 'G', 'GG'] },
]
export const products: Product[] = [
  {
    id: 'conjunto-essencia',
    name: 'Conjunto Essência',
    category: 'Conjuntos',
    price: 189.9,
    image: 0,
    tag: 'Novo',
    variants: variants('Terracota', '#B97866'),
  },
  {
    id: 'conjunto-fluir',
    name: 'Conjunto Fluir',
    category: 'Conjuntos',
    price: 199.9,
    image: 1,
    tag: 'Novo',
    variants: variants('Sálvia', '#C5CCBB'),
  },
  {
    id: 'macacao-equilibrio',
    name: 'Macacão Equilíbrio',
    category: 'Macacões',
    price: 219.9,
    oldPrice: 249.9,
    image: 2,
    tag: 'Oferta',
    variants: variants('Oliva', '#4B5545'),
  },
  {
    id: 'shorts-natural',
    name: 'Shorts Natural',
    category: 'Shorts',
    price: 89.9,
    image: 3,
    tag: 'Novo',
    variants: variants('Oliva', '#4B5545'),
  },
  {
    id: 'legging-fluir',
    name: 'Legging Fluir',
    category: 'Leggings',
    price: 119.9,
    image: 1,
    variants: variants('Sálvia', '#C5CCBB'),
  },
  {
    id: 'top-essencia',
    name: 'Top Essência',
    category: 'Tops',
    price: 79.9,
    image: 0,
    variants: variants('Terracota', '#B97866'),
  },
  {
    id: 'blusa-respiro',
    name: 'Blusa Respiro',
    category: 'Blusas',
    price: 89.9,
    image: 3,
    variants: variants('Areia', '#D9D4C1'),
  },
  {
    id: 'legging-essencia',
    name: 'Legging Essência',
    category: 'Leggings',
    price: 119.9,
    image: 0,
    variants: variants('Terracota', '#B97866'),
  },
]
export const money = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
export interface CatalogAdapter {
  list(): Promise<Product[]>
  get(id: string): Promise<Product | undefined>
}
export const demoCatalog: CatalogAdapter = {
  list: async () => products,
  get: async (id) => products.find((p) => p.id === id),
}
