import type { Metadata, ResolvingMetadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/ffffflllfoppppoter';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { PageTransition } from '@/components/layout/page-transition';
import { SmoothScroll } from '@/components/smooth-scroll';
import Script from "next/script";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://growthincs.org';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL(siteBaseUrl),
    title: "growthincs | India's Leading Marketing Company – Get Started!",
    description: 'Growthincs is India\'s leading marketing company specialising in lead generation, performance marketing, SEO, and digital strategy that drives real business growth.',
    keywords: [
      'digital marketing services',
      'lead generation company',
      'Google ads management',
      'social media optimization',
      'website design services',
      'IT consulting services',
      'software development',
      'UI UX design',
      'India marketing company',
      'performance marketing India',
    ],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      images: ['/og-image.png', ...previousImages],
    },
    verification: {
      google: "wTstn1FBjYq1eiiIQGLBh3VqRRzk30kBXDBTi9Cr8EY",
      other: { 'facebook-domain-verification': 'drexzerresx9odmqejc4v7d5cchihv' }
    },
    icons: { icon: '/favicon-v2.ico' },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-P4H9F7B19J" />
        <Script id="google-analytics">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-P4H9F7B19J');
        `}</Script>
        <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://growthincs.org/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://growthincs.org/services" },
            { "@type": "ListItem", position: 3, name: "Portfolio", item: "https://growthincs.org/portfolio" },
            { "@type": "ListItem", position: 4, name: "Blog", item: "https://growthincs.org/blog" },
            { "@type": "ListItem", position: 5, name: "Contact", item: "https://growthincs.org/contact" }
          ]
        }) }} />

        <SmoothScroll>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
          <Toaster />
        </SmoothScroll>
      </body>
    </html>
  );
}
