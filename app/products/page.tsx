import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getPerfumes } from "@/lib/products";

export const metadata: Metadata = {
  title: "Luxury Perfumes Collection",
  description: "Shop PRECEA luxury perfumes by collection, scent family, rating, and price. Pure extrait formulations with high projection and pan-India delivery.",
  alternates: {
    canonical: "https://precea.vercel.app/products"
  },
  openGraph: {
    title: "Luxury Perfumes Collection | PRECEA",
    description: "Shop PRECEA luxury perfumes by collection, scent family, rating, and price.",
    url: "https://precea.vercel.app/products",
    siteName: "PRECEA Luxury Fragrances",
    images: [
      {
        url: "/precea.png",
        width: 1200,
        height: 630,
        alt: "PRECEA Luxury Perfumes"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Perfumes Collection | PRECEA",
    description: "Shop PRECEA luxury perfumes. Pure extrait formulations crafted for long-lasting sillage.",
    images: ["/precea.png"]
  }
};

export default async function ProductsPage() {
  const perfumes = await getPerfumes();

  return (
    <>
      <section className="border-b border-ink/10 bg-luxe-radial py-10 sm:py-14 dark:border-white/10">
        <div className="container-luxe">
          <p className="eyebrow">Perfume library</p>
          <h1 className="mt-2.5 max-w-3xl font-serif text-2xl sm:text-4xl lg:text-6xl font-semibold leading-tight sm:leading-none">
            Find the signature that follows you softly
          </h1>
          <p className="mt-3.5 max-w-2xl text-sm sm:text-base lg:text-lg leading-6 sm:leading-8 text-ink/70 dark:text-silk/70">
            Explore our extrait-focused compositions in a clean, fixed catalog view.
          </p>
        </div>
      </section>
      <section className="container-luxe pb-16 sm:pb-20 pt-6 sm:pt-8">
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-smoke">{perfumes.length} perfumes</p>
          <p className="eyebrow hidden sm:block">Extrait focused compositions</p>
        </div>

        <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {perfumes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
