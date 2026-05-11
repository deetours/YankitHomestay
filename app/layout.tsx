import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: '--font-serif' });
const _interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Yankit Homestay | Silence in the Himalayas',
  description: 'A quiet homestay at 12,000 feet in Spiti. Stay with a small circle of guests, wake to monastery bells, eat locally, and spend your nights under one of India\'s clearest skies.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${_interTight.variable} ${_instrument.variable} font-sans antialiased overflow-x-hidden`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
