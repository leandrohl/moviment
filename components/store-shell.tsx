'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Camera,
  Minus,
  Plus,
} from 'lucide-react'
import { categories, products, money } from '@/lib/catalog'
import { useStore } from './store-provider'
import { ProductPhoto } from './product-card'
export function Brand({ logoSrc }: { logoSrc?: string }) {
  return (
    <Link className="brand" href="/" aria-label="Moviment — início">
      {logoSrc ? (
        <img src={logoSrc} alt="Moviment" width={170} height={60} />
      ) : (
        <>
          moviment<span>MODA FITNESS · NO SEU RITMO</span>
        </>
      )}
    </Link>
  )
}
export function Header() {
  const { items, setOpen, ready } = useStore()
  const [menu, setMenu] = useState(false)
  return (
    <>
      <div className="announcement">
        Para cada corpo, um novo jeito de se mover. <span>No seu ritmo, com conforto.</span>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="mobile-menu icon-button"
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <Brand />
          <p className="header-note">
            Mais do que vestir.
            <br />É sobre se sentir bem.
          </p>
          <div className="header-actions">
            <Link href="/busca" aria-label="Buscar produtos">
              <Search />
            </Link>
            <Link href="/conta" className="desktop-icon" aria-label="Minha conta">
              <UserRound />
            </Link>
            <Link href="/favoritos" className="desktop-icon" aria-label="Favoritos">
              <Heart />
            </Link>
            <button aria-label="Abrir sacola" data-ready={ready} onClick={() => setOpen(true)}>
              <ShoppingBag />
              <span className="bag-count">{items.reduce((n, i) => n + i.quantity, 0)}</span>
            </button>
          </div>
        </div>
        <nav className={menu ? 'main-nav expanded' : 'main-nav'} aria-label="Navegação principal">
          {[
            ['Início', '/'],
            ['Novidades', '/catalogo?ordem=novidades'],
            ...categories
              .slice(0, 5)
              .map((c) => [c.name, `/catalogo?categoria=${encodeURIComponent(c.name)}`]),
            ['Todos os produtos', '/catalogo'],
          ].map(([name, href]) => (
            <Link key={name} href={href} onClick={() => setMenu(false)}>
              {name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  )
}
export function CartContents() {
  const { items, change, setOpen } = useStore()
  const [notice, setNotice] = useState(false)
  const total = items.reduce(
    (sum, i) => sum + (products.find((p) => p.id === i.productId)?.price || 0) * i.quantity,
    0,
  )
  return (
    <>
      {!items.length ? (
        <div className="empty-state">
          <ShoppingBag size={36} />
          <h2>Espaço para novos movimentos.</h2>
          <p>Sua sacola está vazia. Encontre uma peça que combina com você.</p>
          <Link href="/catalogo" className="primary-button" onClick={() => setOpen(false)}>
            Explorar coleção <ArrowUpRight size={18} />
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item, index) => {
              const p = products.find((p) => p.id === item.productId)!
              return (
                <article className="cart-item" key={`${item.productId}-${item.size}-${item.color}`}>
                  <ProductPhoto index={p.image} alt={p.name} />
                  <div>
                    <Link href={`/produto/${p.id}`} onClick={() => setOpen(false)}>
                      <h3>{p.name}</h3>
                    </Link>
                    <p>
                      {item.color} · {item.size}
                    </p>
                    <strong>{money(p.price * item.quantity)}</strong>
                    <div className="quantity">
                      <button
                        aria-label={`Diminuir ${p.name}`}
                        onClick={() => change(index, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        disabled={item.quantity >= 10}
                        aria-label={`Aumentar ${p.name}`}
                        onClick={() => change(index, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                      <button className="remove" onClick={() => change(index, 0)}>
                        Remover
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>{money(total)}</strong>
          </div>
          <p className="muted">Sacola demonstrativa. Frete e pagamento ainda não conectados.</p>
          <button className="primary-button full" onClick={() => setNotice(true)}>
            Finalizar compra <ArrowUpRight size={18} />
          </button>
          {notice && (
            <p role="status" className="notice">
              O checkout real será disponibilizado após a integração da loja. Nenhum pedido foi
              realizado.
            </p>
          )}
          <Link className="text-link" href="/catalogo" onClick={() => setOpen(false)}>
            Continuar comprando
          </Link>
        </>
      )}
    </>
  )
}
export function CartDrawer() {
  const { open, setOpen } = useStore()
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (open) dialog.current?.showModal()
    else dialog.current?.close()
  }, [open])
  return (
    <dialog
      ref={dialog}
      aria-label="Sua sacola"
      className="cart-dialog"
      onCancel={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div className="drawer-inner">
        <div className="drawer-heading">
          <h2>Sua sacola</h2>
          <button aria-label="Fechar sacola" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <CartContents />
        <Link className="text-link" href="/sacola" onClick={() => setOpen(false)}>
          Ver sacola completa
        </Link>
      </div>
    </dialog>
  )
}
export function Newsletter() {
  const [message, setMessage] = useState('')
  return (
    <section className="newsletter">
      <div>
        <span className="eyebrow">VAMOS JUNTAS?</span>
        <h2>
          Faça parte do nosso <em>movimento.</em>
        </h2>
        <p>Receba novidades, lançamentos e inspirações da Moviment.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setMessage(
            'Seu e-mail é válido. O cadastro ainda não está conectado; nenhum dado foi enviado.',
          )
        }}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Seu e-mail
        </label>
        <div className="email-field">
          <input id="newsletter-email" type="email" placeholder="Seu melhor e-mail" required />
          <button aria-label="Cadastrar e-mail">
            <ArrowUpRight size={24} />
          </button>
        </div>
        <p>{message || 'Ao cadastrar, você concorda com nossa política de privacidade.'}</p>
        <span role="status" className="sr-only">
          {message}
        </span>
      </form>
    </section>
  )
}
export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Brand />
          <p>
            Para cada corpo, um novo jeito de se mover
            <br />— no seu ritmo, com conforto.
          </p>
          <a
            href="https://www.instagram.com/moviment.modafit/"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <Camera size={19} /> @moviment.modafit
          </a>
        </div>
        {[
          {
            title: 'A Moviment',
            links: [
              ['Nossa história', 'sobre'],
              ['Fale com a gente', 'contato'],
            ],
          },
          {
            title: 'Podemos ajudar?',
            links: [
              ['Perguntas frequentes', 'perguntas-frequentes'],
              ['Entregas e frete', 'entregas'],
              ['Trocas e devoluções', 'trocas'],
              ['Privacidade', 'privacidade'],
              ['Termos de uso', 'termos'],
            ],
          },
          {
            title: 'Seu espaço',
            links: [
              ['Minha conta', 'conta'],
              ['Meus pedidos', 'conta'],
              ['Meus favoritos', 'favoritos'],
              ['Minha sacola', 'sacola'],
            ],
          },
        ].map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([name, path]) => (
              <Link key={name} href={`/${path}`}>
                {name}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Moviment. Feita para acompanhar você.</span>
        <span>Loja demonstrativa · Produtos e imagens ilustrativos</span>
      </div>
      <p className="business-note">
        Dados empresariais, CNPJ e canais de atendimento: aguardando informações oficiais.
      </p>
    </footer>
  )
}
