import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import './store.css'
import { Afacad, Corinthia } from 'next/font/google'
import { StoreProvider } from '@/components/store-provider'
import { Header, Footer, CartDrawer } from '@/components/store-shell'

const afacad = Afacad({ subsets: ['latin'], variable: '--font-afacad' })
const corinthia = Corinthia({ subsets: ['latin'], weight: ['400'], variable: '--font-corinthia' })

export const metadata: Metadata = {
  title: { default: 'Moviment — No seu ritmo, com conforto', template: '%s | Moviment' },
  description:
    'Moda fitness feminina que acompanha seu corpo, seu ritmo e cada versão de você. Conheça o universo Moviment.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F5F1E8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="light">
      <body className={`${afacad.variable} ${corinthia.variable} antialiased`}>
        <StoreProvider>
          <a href="#main" className="skip-link">
            Pular para o conteúdo
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
