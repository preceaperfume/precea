import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pure Traditional Attar Collection",
  description: "Shop PRECEA traditional pure attars — 100% alcohol-free concentrated perfume oils distilled with rare botanicals and aged sandalwood.",
  alternates: {
    canonical: "https://precea.vercel.app/attar"
  },
  openGraph: {
    title: "Pure Traditional Attar Collection | PRECEA",
    description: "Shop PRECEA traditional attars — concentrated perfume oils distilled with rare botanicals and aged sandalwood.",
    url: "https://precea.vercel.app/attar",
    siteName: "PRECEA Luxury Fragrances",
    images: [
      {
        url: "/precea.png",
        width: 1200,
        height: 630,
        alt: "PRECEA Traditional Attars"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pure Traditional Attar Collection | PRECEA",
    description: "Shop PRECEA traditional attars — concentrated perfume oils distilled with rare botanicals.",
    images: ["/precea.png"]
  }
};

export default function AttarPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-luxe-radial py-10 sm:py-14 dark:border-white/10">
        <div className="container-luxe">
          <p className="eyebrow">ATTAR COLLECTION</p>
          <h1 className="mt-2.5 max-w-3xl font-serif text-2xl sm:text-4xl lg:text-6xl font-semibold leading-tight sm:leading-none">
            Find concentrated attars crafted for long-lasting wear
          </h1>
          <p className="mt-3.5 max-w-2xl text-sm sm:text-base lg:text-lg leading-6 sm:leading-8 text-ink/70 dark:text-silk/70">
            Search by mood, filter by family, and sort traditional attar compositions with precision.
          </p>
          <Link href="/" className="button-secondary mt-6 sm:mt-8 w-full sm:w-fit min-h-[46px] touch-manipulation">
            Browse attars on home page
          </Link>
        </div>
      </section>
    </>
  );
}
