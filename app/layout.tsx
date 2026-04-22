import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import ConditionalFooter from '@/components/ConditionalFooter';
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://artikel.haniplabs.com'),
  title: {
    default: 'TeknoVarta - Portal Berita Teknologi',
    template: '%s | TeknoVarta'
  },
  description: 'TeknoVarta menyajikan berita teknologi terkini, review gadget mendalam, database spesifikasi smartphone lengkap, dan panduan digital akurat.',
  keywords: [
    'berita teknologi', 'portal berita teknologi', 'tekno varta', 'teknologi indonesia', 
    'gadget review indonesia', 'ai news indonesia', 'spesifikasi hp terbaru 2026', 
    'tips gadget', 'perbaikan smartphone', 'service hp surabaya', 'hanif abdurrohim'
  ],
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Hanif Abdurrohim', url: 'https://haniipp.space' }],
  publisher: 'TeknoVarta Media Network',
  other: {
    'geo.region': 'ID-JI',
    'geo.placename': 'Surabaya',
    'language': 'Indonesian',
    'revisit-after': '1 days',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://artikel.haniplabs.com',
    siteName: 'TeknoVarta Intelligence Portal',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'TeknoVarta - High Performance Tech Portal'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dextryayers',
    creator: '@dextryayers',
  },
  icons: {
    icon: '/images/favicon.ico',
  },
};

import { ThemeProvider } from '@/components/ThemeProvider';
import TipsSidebar from '@/components/TipsSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TeknoVarta",
    "url": "https://artikel.haniplabs.com",
    "logo": "https://artikel.haniplabs.com/images/favicon.ico",
    "description": "Portal berita teknologi dan spesifikasi smartphone terpercaya.",
    "sameAs": [
      "https://twitter.com/tekno_varta"
    ]
  };

  return (
    <html lang="id" className={cn(inter.variable, spaceGrotesk.variable, playfair.variable)} suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <TipsSidebar />
          <WhatsAppButton />
          <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply dark:mix-blend-overlay"></div>
          <main className="flex-1">
            {children}
          </main>
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
