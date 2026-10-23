import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Heart, Wind, Sun, Flower2, Camera } from 'lucide-react'
import { categories, products } from '@/lib/catalog'
import { ProductCard, ProductPhoto } from './product-card'
import { Newsletter } from './store-shell'
export function HomeContent() {
  return (
    <>
      <section className="hero">
        <Image
          src="/images/campaign.png"
          alt="Duas mulheres em conjuntos terracota e sálvia em um jardim iluminado pelo sol"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow">SEJA VOCÊ. ESTEJA EM MOVIMENTO.</span>
          <h1>
            Seu movimento,
            <br />
            <em>suas regras.</em>
          </h1>
          <p>
            Peças que acompanham seu corpo,
            <br />
            seu ritmo e cada versão de você.
          </p>
          <Link className="primary-button" href="/catalogo">
            Conheça a coleção <ArrowUpRight size={19} />
          </Link>
        </div>
        <span className="hero-caption">CONFORTO QUE ABRAÇA. LIBERDADE QUE INSPIRA.</span>
        <span className="hero-index">
          01 <span>/ 01</span>
        </span>
      </section>
      <div className="brand-values">
        <span>
          <Heart /> Feita para corpos reais
        </span>
        <span>
          <Wind /> Liberdade em cada movimento
        </span>
        <span>
          <Sun /> Do treino à sua rotina
        </span>
      </div>
      <section className="section category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">UM LOOK PARA CADA VERSÃO SUA</span>
            <h2>
              Encontre seu próximo <em>movimento.</em>
            </h2>
          </div>
          <Link className="text-link" href="/catalogo">
            Explore a coleção <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="categories">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/catalogo?categoria=${encodeURIComponent(c.name)}`}
              className="category-card"
            >
              <ProductPhoto index={c.image} alt={c.name} />
              <div>
                <h3>{c.name}</h3>
                <ArrowUpRight size={19} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ACABARAM DE CHEGAR</span>
            <h2>Novidades para acompanhar você</h2>
          </div>
          <Link href="/catalogo?ordem=novidades" className="text-link">
            Ver novidades <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </section>
      <section className="story-section">
        <div className="story-image">
          <Image
            src="/images/campaign.png"
            alt="Conforto e conexão em um momento de pausa"
            fill
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">MUITO ALÉM DE VESTIR</span>
          <h2>
            Feita para
            <br />
            acompanhar <em>você.</em>
          </h2>
          <p>
            Na Moviment, acreditamos que cada corpo tem seu próprio ritmo. Criamos uma experiência
            que celebra o conforto, a liberdade e a confiança de ser quem você é.
          </p>
          <Link href="/sobre" className="text-link">
            Conheça nossa história <ArrowUpRight size={19} />
          </Link>
          <span className="story-signature">No seu ritmo. Do seu jeito.</span>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ESCOLHAS QUE ABRAÇAM</span>
            <h2>Os favoritos do momento</h2>
          </div>
          <Link href="/catalogo" className="text-link">
            Descubra seus favoritos <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="collection-banner">
        <div>
          <span className="eyebrow">DA PRIMEIRA RESPIRAÇÃO AO FIM DO DIA</span>
          <h2>
            Movimente-se
            <br />
            <em>do seu jeito.</em>
          </h2>
          <p>Do treino aos momentos que fazem parte da sua rotina.</p>
          <Link className="primary-button" href="/catalogo">
            Descubra seu look <ArrowUpRight size={18} />
          </Link>
        </div>
        <ProductPhoto index={1} alt="Conjunto Fluir em verde sálvia" />
      </section>
      <section className="benefits section">
        {[
          [Heart, 'Conforto para sua rotina', 'Um convite para se sentir bem.'],
          [Wind, 'Liberdade de movimento', 'Seu ritmo sempre em primeiro lugar.'],
          [Flower2, 'Estilo em cada detalhe', 'Essenciais com a sua personalidade.'],
          [Sun, 'Cada corpo, uma história', 'Um espaço para ser você.'],
        ].map(([Icon, title, description]) => {
          const I = Icon as typeof Heart
          return (
            <div key={String(title)}>
              <I size={26} />
              <h3>{String(title)}</h3>
              <p>{String(description)}</p>
            </div>
          )
        })}
      </section>
      <section className="section instagram-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">NOS ENCONTRAMOS POR LÁ</span>
            <h2>
              Moviment também é <em>conexão.</em>
            </h2>
          </div>
          <a
            className="text-link"
            href="https://www.instagram.com/moviment.modafit/"
            target="_blank"
            rel="noreferrer"
          >
            <Camera size={18} /> @moviment.modafit
          </a>
        </div>
        <div className="instagram-grid">
          {[1, 0, 3, 2].map((i) => (
            <a
              href="https://www.instagram.com/moviment.modafit/"
              key={i}
              target="_blank"
              rel="noreferrer"
              aria-label="Siga a Moviment no Instagram"
            >
              <ProductPhoto index={i} alt="Editorial demonstrativo Moviment" />
            </a>
          ))}
        </div>
        <p className="fine-print">
          Imagens editoriais demonstrativas. Não representam um feed integrado ao Instagram.
        </p>
      </section>
      <Newsletter />
    </>
  )
}
