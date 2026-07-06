import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";
import { WishlistPopup } from "@/components/wishlist-popup";

export const metadata: Metadata = {
  metadataBase: new URL("https://precea-parfum.example"),
  title: {
    default: "PRECEA | Modern Luxury Fragrance House",
    template: "%s | PRECEA"
  },
  description:
    "Discover PRECEA, a modern luxury fragrance house crafting cinematic perfumes, extrait collections, and refined scent rituals.",
  keywords: ["luxury perfume", "niche fragrance", "eau de parfum", "PRECEA"],
  openGraph: {
    title: "PRECEA",
    description: "Cinematic modern fragrances composed with rare materials and quiet restraint.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 800,
        alt: "PRECEA luxury perfume bottle"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Suspense fallback={<SiteHeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <main>{children}</main>
        <WishlistPopup />
        <SiteFooter />
      </body>
    </html>
  );
}
