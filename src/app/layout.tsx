import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cockroach Membership Registry | Lifetime Digital Certificates',
  description:
    'An independent community movement celebrating human resilience, longevity, and cryptographic digital identity. Claim your one lifetime certificate today.',
  keywords: [
    'Cockroach Registry',
    'Cockroach Movement',
    'Lifetime Certificate',
    'Digital Identity',
    'Cryptographic Verification',
    'Amnesty Style Registry',
  ],
  authors: [{ name: 'Cockroach Registry Initiative' }],
  openGraph: {
    title: 'Cockroach Membership Registry | The Unbreakable Movement',
    description:
      'Claim your lifetime digital membership certificate. Cryptographically signed, publicly verifiable.',
    url: 'https://registry.cockroach.org',
    siteName: 'Cockroach Membership Registry',
    images: [
      {
        url: 'https://registry.cockroach.org/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Cockroach Membership Registry Certificate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cockroach Membership Registry',
    description: 'Claim your one lifetime digital membership certificate today.',
    creator: '@CockroachReg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F3] text-[#111111] font-sans selection:bg-[#FFD400] selection:text-[#111111]">
        <QueryProvider>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
