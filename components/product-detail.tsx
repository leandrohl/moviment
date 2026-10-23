'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ArrowUpRight } from 'lucide-react'
import { products, money, type Product } from '@/lib/catalog'
import { ProductPhoto, ProductCard } from './product-card'
import { useStore } from './store-provider'
export function ProductDetail({ product }: { product: Product }) {
  const { add, favorites, toggleFavorite, ready } = useStore()
  const [color, setColor] = useState(product.variants[0].color)
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [shipping, setShipping] = useState('')
  const variant = product.variants.find((v) => v.color === color)!
  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Início</Link>
        <span>/</span>
        <Link href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className="detail-layout">
        <div className="detail-image">
          <ProductPhoto
            index={product.image}
            alt={`${product.name} em ${color} — foto ilustrativa`}
            priority
          />
          <p className="fine-print">
            Imagem demonstrativa. A foto pode exibir outras peças não incluídas.
          </p>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">SEU CORPO. SEU RITMO.</span>
          <h1>{product.name}</h1>
          <div className="detail-price">
            {product.oldPrice && <del>{money(product.oldPrice)}</del>}
            {money(product.price)}
          </div>
          <p className="detail-description">
            Um essencial para acompanhar seus movimentos e seus momentos de pausa. Uma proposta de
            conforto, leveza e estilo para viver do seu jeito.
          </p>
          <p className="muted">Produto demonstrativo · Preço e estoque ilustrativos</p>
          <fieldset className="variant-group">
            <legend>Cor: {color}</legend>
            <div className="size-options">
              {product.variants.map((v) => (
                <label key={v.color}>
                  <input
                    type="radio"
                    name="product-color"
                    value={v.color}
                    checked={color === v.color}
                    onChange={() => {
                      setColor(v.color)
                      setSize('')
                    }}
                  />
                  <span>
                    <i className="swatch" style={{ background: v.hex, marginRight: 10 }} />
                    {v.color}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="variant-group">
            <legend>Escolha seu tamanho</legend>
            <div className="size-options">
              {['P', 'M', 'G', 'GG', 'XG'].map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name="product-size"
                    value={s}
                    disabled={!variant.sizes.includes(s)}
                    checked={size === s}
                    onChange={() => {
                      setSize(s)
                      setError('')
                    }}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <details>
            <summary>Guia de medidas</summary>
            <p>
              O guia oficial será incluído após a confirmação das medidas pela marca. Nesta
              demonstração, P, M, G e GG estão disponíveis; XG está indisponível. Não utilize esta
              seleção como recomendação de tamanho.
            </p>
          </details>
          <label className="quantity">
            Quantidade{' '}
            <select
              className="input"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          {size && (
            <p className="fine-print">
              {size} / {color} disponível no estoque demonstrativo.
            </p>
          )}
          {error && (
            <p role="alert" className="error-text">
              {error}
            </p>
          )}
          <div className="detail-actions">
            <button
              disabled={!ready}
              className="primary-button"
              onClick={() => {
                if (!size) {
                  setError('Selecione um tamanho para adicionar à sacola.')
                  return
                }
                add({ productId: product.id, color, size, quantity })
              }}
            >
              Adicionar à sacola <ArrowUpRight size={20} />
            </button>
            <button
              className="outline-icon"
              aria-label="Adicionar aos favoritos"
              aria-pressed={favorites.includes(product.id)}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          <form
            className="shipping-form"
            onSubmit={(e) => {
              e.preventDefault()
              setShipping(
                'Simulação: entrega em 5 a 8 dias úteis, por R$ 19,90. Valores ilustrativos, sem consulta a transportadoras.',
              )
            }}
          >
            <label htmlFor="cep">Simular frete — demonstração</label>
            <div>
              <input
                className="input"
                id="cep"
                name="cep"
                placeholder="00000-000"
                inputMode="numeric"
                pattern="[0-9]{5}-?[0-9]{3}"
                title="Informe um CEP com 8 dígitos"
                required
              />
              <button>Calcular</button>
            </div>
            <p role="status">{shipping}</p>
          </form>
          <details>
            <summary>Sobre a peça e cuidados</summary>
            <p>
              Composição, tecnologias do tecido e instruções de lavagem aguardam confirmação do
              fornecedor. Consulte a etiqueta oficial antes do uso.
            </p>
          </details>
          <details>
            <summary>Trocas e devoluções</summary>
            <p>
              As condições comerciais oficiais ainda serão publicadas. Nenhuma compra real é
              processada nesta demonstração.{' '}
              <Link href="/trocas" className="text-link">
                Saiba mais
              </Link>
            </p>
          </details>
        </div>
      </div>
      <section className="section" style={{ paddingInline: 0 }}>
        <div className="section-heading">
          <h2>Outros jeitos de se mover</h2>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </div>
  )
}
