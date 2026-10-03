import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import favicon from "./favicon.png";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { getProducts } from "@/lib/products";

// Self-host Google Fonts with zero layout shift and automatic preloading
const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap"
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { WishlistPopup } from "@/components/wishlist-popup";
import { SitePreloader } from "@/components/site-preloader";

const SITE_URL = "https://precea.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PRECEA™ | Modern Luxury Fragrance House & Pure Attar",
    template: "%s | PRECEA™"
  },
  description:
    "Discover PRECEA™, a luxury fragrance house crafting pure alcohol-free attars and signature extrait de parfum. Handcrafted with rare natural oils for exceptional longevity and everyday sophistication across India.",
  keywords: [
    "PRECEA",
    "PRECEA perfume",
    "PRECEA attar",
    "luxury attar India",
    "pure attar oil",
    "alcohol free attar",
    "long lasting attar",
    "Black Opium attar",
    "CR7 roll on attar",
    "cool vibe attar",
    "kamrah attar",
    "niche fragrance India",
    "perfume spray Surat",
    "concentrated perfume oil"
  ],
  authors: [{ name: "PRECEA™", url: SITE_URL }],
  creator: "PRECEA™",
  publisher: "PRECEA™",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: SITE_URL
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "PRECEA™ Luxury Perfumes & Attars",
    title: "PRECEA™ | Modern Luxury Fragrance House & Pure Attar",
    description:
      "Handcrafted luxury attars and fine perfumes composed with rare natural oils, aged sandalwood, and rich modern notes. Alcohol-free, long-lasting, and delivered across India.",
    images: [
      {
        url: `${SITE_URL}/hero-img.png`,
        width: 1200,
        height: 630,
        alt: "PRECEA Luxury Attar & Perfume Collection"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PRECEA™ | Modern Luxury Fragrance House & Pure Attar",
    description:
      "Handcrafted luxury attars and fine perfumes composed with rare natural oils. Alcohol-free, long-lasting fragrances.",
    images: [`${SITE_URL}/hero-img.png`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png"
  },
  category: "luxury fragrance & beauty"
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PRECEA™",
  url: SITE_URL,
  logo: `${SITE_URL}/precea.png`,
  image: `${SITE_URL}/hero-img.png`,
  description: "Modern luxury fragrance house crafting pure alcohol-free attars and fine perfumes.",
  sameAs: [
    "https://www.instagram.com/preceaperfume?igsh=cHB5dHZxNWljcHhn"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8849181879",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Gujarati"]
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PRECEA™ Luxury Perfumes & Attars",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();

  return (
    <html lang="en" className={`${fontSerif.variable} ${fontSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external image origins for lightning-fast image delivery */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://upload.meeshosupplyassets.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://upload.meeshosupplyassets.com" />

        {/* Structured Data: Organization & WebSite Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SitePreloader />
        <ScrollProgress />
        <SmoothScroll />
        <Suspense fallback={<SiteHeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <main className="bg-transparent">{children}</main>
        <FloatingWhatsApp />
        <WishlistPopup products={products} />
        <SiteFooter />
      </body>
    </html>
  );
}
