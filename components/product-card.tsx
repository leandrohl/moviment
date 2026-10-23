'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ArrowUpRight } from 'lucide-react'
import { money, type Product } from '@/lib/catalog'
import { useStore } from './store-provider'
export function ProductPhoto({
  index,
  alt,
  priority = false,
}: {
  index: number
  alt: string
  priority?: boolean
}) {
  return (
    <div className="product-photo">
      <Image
        src={`/images/product-${index}.webp`}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 700px) 50vw, 25vw"
        style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
      />
    </div>
  )
}
export function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite } = useStore()
  return (
    <article className="product-card">
      <div className="product-image">
        <Link href={`/produto/${product.id}`} aria-label={`Ver ${product.name}`}>
          <ProductPhoto index={product.image} alt={`${product.name} — imagem ilustrativa`} />
        </Link>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className="favorite"
          aria-label={`Favoritar ${product.name}`}
          aria-pressed={favorites.includes(product.id)}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
        </button>
        <Link className="quick-buy" href={`/produto/${product.id}`}>
          Escolher tamanho <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="product-meta">
        <Link href={`/produto/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <span
          className="swatch"
          style={{ background: product.variants[0].hex }}
          title={product.variants[0].color}
        />
      </div>
      <p className="price">
        {product.oldPrice && <del>{money(product.oldPrice)}</del>} {money(product.price)}
      </p>
      <p className="product-caption">Conforto em cada movimento</p>
    </article>
  )
}
