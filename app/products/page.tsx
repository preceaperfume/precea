import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getPerfumes } from "@/lib/products";

export const metadata: Metadata = {
  title: "Perfumes",
  description: "Shop PRECEA luxury perfumes by collection, scent family, rating, and price."
};

export default async function ProductsPage() {
  const perfumes = await getPerfumes();

  return (
    <>
      <section className="border-b border-ink/10 bg-luxe-radial py-14 dark:border-white/10">
        <div className="container-luxe">
          <p className="eyebrow">Perfume library</p>
          <h1 className="mt-3 max-w-3xl font-serif text-6xl font-semibold leading-none">Find the signature that follows you softly</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70 dark:text-silk/70">
            Explore our extrait-focused compositions in a clean, fixed catalog view.
          </p>
        </div>
      </section>
      <section className="container-luxe pb-20 pt-8">
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-smoke">{perfumes.length} perfumes</p>
          <p className="eyebrow hidden sm:block">Extrait focused compositions</p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {perfumes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
