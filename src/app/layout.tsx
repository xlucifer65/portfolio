import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Rayyan Ahemad — Engineer, Creator, Builder',
    template: '%s | Rayyan Ahemad',
  },
  description:
    'I build things while figuring life out. Engineer, creator, and occasional vibe coder deploying ideas into reality. Currently obsessed with AI tooling, AWS architecture, and invoice parsing systems.',
  keywords: [
    'Rayyan Ahemad',
    'Software Engineer',
    'AWS Solutions Architect',
    'AI Tools',
    'Invoice Parser',
    'ParserAI',
    'Full Stack Developer',
    'Creator',
  ],
  authors: [{ name: 'Rayyan Ahemad', url: 'https://rayyanahemad.com' }],
  creator: 'Rayyan Ahemad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rayyanahemad.com',
    title: 'Rayyan Ahemad — Engineer, Creator, Builder',
    description:
      'Building things while figuring life out. Engineer obsessed with AI tools, AWS architecture, and shipping real products.',
    siteName: 'Rayyan Ahemad',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Rayyan Ahemad Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rayyan Ahemad — Engineer, Creator, Builder',
    description: 'Building things while figuring life out.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rayyanahemad.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} ${jetbrains.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
