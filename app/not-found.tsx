import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="empty-state content-page">
      <span className="eyebrow">404 · UM NOVO CAMINHO</span>
      <h1>Vamos encontrar seu próximo movimento?</h1>
      <p>Esta página não foi encontrada, mas a coleção está logo ali.</p>
      <Link className="primary-button" href="/catalogo">
        Conheça a coleção
      </Link>
    </div>
  )
}
