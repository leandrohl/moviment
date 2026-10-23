export default function Loading() {
  return (
    <div className="page-container" role="status" aria-label="Carregando">
      <p className="eyebrow">PREPARANDO SEU PRÓXIMO MOVIMENTO</p>
      <div className="product-grid">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton" />
        ))}
      </div>
      <span className="sr-only">Carregando coleção...</span>
    </div>
  )
}
