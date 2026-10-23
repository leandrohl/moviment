'use client'
import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { SlidersHorizontal, Search, Heart } from 'lucide-react'
import { products, categories, money } from '@/lib/catalog'
import { ProductCard } from './product-card'
import { useStore } from './store-provider'
export function CatalogContent({
  mode = 'catalog',
}: {
  mode?: 'catalog' | 'search' | 'favorites'
}) {
  const search = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { favorites } = useStore()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [limit, setLimit] = useState(6)
  const category = search.get('categoria') || ''
  const size = search.get('tamanho') || ''
  const color = search.get('cor') || ''
  const max = Number(search.get('preco') || 300)
  const order = search.get('ordem') || 'relevancia'
  const query = search.get('q') || ''
  const update = (key: string, value: string) => {
    const params = new URLSearchParams(search.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    setLimit(6)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }
  const filtered = products
    .filter(
      (p) =>
        (mode !== 'favorites' || favorites.includes(p.id)) &&
        (!category || p.category === category) &&
        (!size || p.variants.some((v) => v.sizes.includes(size))) &&
        (!color || p.variants.some((v) => v.color === color)) &&
        p.price <= max &&
        (!query ||
          `${p.name} ${p.category}`
            .toLocaleLowerCase('pt-BR')
            .includes(query.toLocaleLowerCase('pt-BR'))),
    )
    .sort((a, b) =>
      order === 'menor'
        ? a.price - b.price
        : order === 'maior'
          ? b.price - a.price
          : order === 'novidades'
            ? Number(b.tag === 'Novo') - Number(a.tag === 'Novo')
            : 0,
    )
  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Início</Link>
        <span>/</span>
        <span>
          {mode === 'search' ? 'Busca' : mode === 'favorites' ? 'Favoritos' : category || 'Coleção'}
        </span>
      </div>
      <span className="eyebrow">PEÇAS QUE ACOMPANHAM VOCÊ</span>
      <h1 className="page-title">
        {mode === 'search'
          ? 'Encontre seu próximo movimento'
          : mode === 'favorites'
            ? 'Seus favoritos'
            : category || 'Todos os produtos'}
      </h1>
      <p className="page-intro">
        Essenciais para viver no seu ritmo. Catálogo demonstrativo com imagens e valores
        ilustrativos.
      </p>
      {mode === 'search' && (
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault()
            update('q', String(new FormData(e.currentTarget).get('q') || ''))
          }}
        >
          <input
            key={query}
            name="q"
            aria-label="Buscar produtos"
            defaultValue={query}
            placeholder="Busque por conjuntos, leggings, tops..."
          />
          <button className="primary-button">
            <Search size={18} />
            Buscar
          </button>
        </form>
      )}
      <div className="catalog-top">
        <span>
          {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}{' '}
          {query && `para “${query}”`}
        </span>
        <button
          className="filter-toggle"
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={16} />
          Filtros
        </button>
        <label>
          Ordenar:{' '}
          <select
            aria-label="Ordenar produtos"
            value={order}
            onChange={(e) => update('ordem', e.target.value)}
          >
            <option value="relevancia">Relevância</option>
            <option value="novidades">Novidades</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </label>
      </div>
      <div className="catalog-layout">
        <aside
          className={filtersOpen ? 'filters visible' : 'filters'}
          aria-label="Filtros de produtos"
        >
          <fieldset>
            <legend>Categoria</legend>
            {categories.map((c) => (
              <label key={c.name}>
                <input
                  type="radio"
                  name="category"
                  checked={category === c.name}
                  onChange={() => update('categoria', c.name)}
                />
                {c.name}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Tamanho</legend>
            {['P', 'M', 'G', 'GG'].map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  name="size"
                  checked={size === s}
                  onChange={() => update('tamanho', s)}
                />
                {s}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Cor</legend>
            {['Terracota', 'Sálvia', 'Oliva', 'Areia'].map((c) => (
              <label key={c}>
                <input
                  type="radio"
                  name="color"
                  checked={color === c}
                  onChange={() => update('cor', c)}
                />
                {c}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Faixa de preço</legend>
            <label htmlFor="price-range">Até {money(max)}</label>
            <input
              id="price-range"
              type="range"
              min="50"
              max="300"
              step="10"
              value={max}
              onChange={(e) => update('preco', e.target.value)}
            />
          </fieldset>
          <button
            className="text-link"
            onClick={() => {
              router.replace(pathname, { scroll: false })
              setLimit(6)
            }}
          >
            Limpar filtros
          </button>
        </aside>
        <div>
          {filtered.length ? (
            <>
              <div className="product-grid">
                {filtered.slice(0, limit).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {filtered.length > limit && (
                <button className="load-more" onClick={() => setLimit(limit + 6)}>
                  Ver mais produtos
                </button>
              )}
            </>
          ) : (
            <div className="empty-state">
              <Heart />
              <h2>
                {mode === 'favorites' ? 'Seus favoritos começam aqui.' : 'Nenhuma peça encontrada.'}
              </h2>
              <p>
                {mode === 'favorites'
                  ? 'Toque no coração de um produto para guardá-lo durante sua visita.'
                  : 'Experimente outra busca ou limpe os filtros.'}
              </p>
              <Link className="text-link" href="/catalogo">
                Explorar coleção
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
