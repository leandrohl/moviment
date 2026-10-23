import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CatalogContent } from '@/components/catalog-content'
import { CartContents } from '@/components/store-shell'

const titles: Record<string, string> = {
  catalogo: 'Coleção',
  busca: 'Busca',
  favoritos: 'Seus favoritos',
  sacola: 'Sua sacola',
  sobre: 'Feita para acompanhar você.',
  conta: 'Seu espaço na Moviment',
  contato: 'Vamos conversar?',
  'perguntas-frequentes': 'Como podemos ajudar?',
  entregas: 'Entregas e frete',
  trocas: 'Trocas e devoluções',
  privacidade: 'Política de privacidade',
  termos: 'Termos de uso',
}

export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return { title: titles[slug] || 'Página não encontrada' }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!titles[slug]) notFound()
  if (['catalogo', 'busca', 'favoritos'].includes(slug))
    return (
      <Suspense fallback={<div className="page-container">Carregando coleção…</div>}>
        <CatalogContent
          mode={slug === 'busca' ? 'search' : slug === 'favoritos' ? 'favorites' : 'catalog'}
        />
      </Suspense>
    )
  if (slug === 'sacola')
    return (
      <div className="page-container bag-page">
        <h1 className="page-title">Sua sacola</h1>
        <CartContents />
      </div>
    )
  return (
    <article className="content-page">
      <Link className="breadcrumb" href="/">
        Início / {titles[slug]}
      </Link>
      <span className="eyebrow">UNIVERSO MOVIMENT</span>
      <h1>{titles[slug]}</h1>
      {slug === 'sobre' ? (
        <>
          <p>
            A Moviment nasceu do desejo da Maria de ajudar mulheres a se sentirem bem com seus
            corpos ao vestir roupas confortáveis.
          </p>
          <p>
            A ideia surgiu ao perceberem que muitas mulheres com corpos nos extremos — muito
            curvilíneas ou muito pequenas — se sentiam desconfortáveis com as opções de roupas
            fitness tradicionais. A marca surge, assim, como um ato de acolhimento e autoestima.
          </p>
          <h2>Para cada corpo, um novo jeito de se mover.</h2>
          <p>
            Acreditamos no conforto, na liberdade e na confiança de ser quem você é. Não existe um
            único corpo, um único caminho ou um único ritmo. Existe o seu.
          </p>
          <p>
            Feminilidade, autenticidade e respeito à individualidade fazem parte de cada movimento
            da nossa marca.
          </p>
          <Link className="primary-button" href="/catalogo">
            Descubra a coleção
          </Link>
        </>
      ) : slug === 'conta' ? (
        <>
          <p>Um espaço para acompanhar pedidos e cuidar do seu perfil.</p>
          <div className="notice">
            A área de clientes ainda não está integrada. Login, cadastro e pedidos estarão
            disponíveis após a conexão com a plataforma de e-commerce. Nenhuma credencial é coletada
            nesta versão.
          </div>
          <h2>Enquanto isso, encontre seus essenciais.</h2>
          <Link className="primary-button" href="/favoritos">
            Ver meus favoritos
          </Link>
        </>
      ) : slug === 'contato' ? (
        <>
          <p>
            Quer conhecer melhor a Moviment? Nosso Instagram oficial é o canal informado pela marca.
          </p>
          <a
            className="primary-button"
            href="https://www.instagram.com/moviment.modafit/"
            target="_blank"
            rel="noreferrer"
          >
            Fale com @moviment.modafit
          </a>
          <h2>Outros canais</h2>
          <p>
            WhatsApp, e-mail de atendimento, endereço e horários serão adicionados após confirmação.
            Não divulgamos contatos não verificados.
          </p>
        </>
      ) : slug === 'perguntas-frequentes' ? (
        <>
          {[
            [
              'Posso comprar nesta versão?',
              'Esta é uma loja demonstrativa. Você pode navegar, escolher variantes e montar sua sacola, mas nenhum pedido ou pagamento é processado.',
            ],
            [
              'Como escolher meu tamanho?',
              'A página de cada peça oferece uma seleção demonstrativa. O guia de medidas oficial será publicado após validação pela marca.',
            ],
            [
              'Como funciona a entrega?',
              'A simulação de frete utiliza valores ilustrativos. Prazos, transportadoras e condições reais ainda serão definidos.',
            ],
            [
              'Minha sacola fica salva?',
              'Sim. A sacola é armazenada no navegador deste dispositivo e pode ser removida ao limpar os dados do navegador.',
            ],
            ['Como falo com a Moviment?', 'Visite nosso Instagram oficial: @moviment.modafit.'],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </>
      ) : (
        <>
          <div className="notice">
            Conteúdo provisório — aguardando informações oficiais e revisão jurídica antes da
            abertura da loja.
          </div>
          {slug === 'privacidade' ? (
            <>
              <h2>Dados nesta demonstração</h2>
              <p>
                A sacola utiliza armazenamento local no navegador para manter produtos, quantidades
                e variantes selecionadas. Os favoritos ficam apenas na memória desta visita. Você
                pode excluir a sacola limpando os dados do site no navegador.
              </p>
              <p>
                O formulário de newsletter não envia nem cadastra seu e-mail. A área de conta não
                coleta credenciais. A versão de produção pode utilizar métricas de audiência da
                Vercel; a política final deverá detalhar fornecedores, finalidades e direitos
                aplicáveis.
              </p>
            </>
          ) : slug === 'trocas' ? (
            <p>
              Os procedimentos de solicitação, canais de atendimento e condições aplicáveis serão
              divulgados após definição pela Moviment, observando a legislação vigente. Esta
              demonstração não recebe pedidos de compra ou de troca.
            </p>
          ) : slug === 'entregas' ? (
            <p>
              Regiões atendidas, transportadoras, custos e prazos ainda serão confirmados. Os
              resultados do simulador de CEP são demonstrativos e não constituem uma oferta de
              entrega.
            </p>
          ) : (
            <p>
              Esta versão permite explorar a experiência da loja com produtos, preços, imagens e
              disponibilidade ilustrativos. Não constitui oferta comercial e não realiza vendas. Os
              termos definitivos serão publicados antes da operação real.
            </p>
          )}
          <p>
            Identificação da empresa, CNPJ e canal de contato para exercício de direitos: pendentes
            de confirmação.
          </p>
          <Link className="text-link" href="/contato">
            Entre em contato
          </Link>
        </>
      )}
    </article>
  )
}
