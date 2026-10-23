import { notFound } from 'next/navigation'
import { demoCatalog, products } from '@/lib/catalog'
import { ProductDetail } from '@/components/product-detail'
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = await demoCatalog.get(id)
  return {
    title: p?.name || 'Produto não encontrado',
    description: p
      ? `${p.name}: conheça os detalhes no catálogo demonstrativo Moviment.`
      : undefined,
  }
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await demoCatalog.get(id)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
