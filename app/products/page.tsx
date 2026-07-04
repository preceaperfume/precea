import type { Metadata } from "next";
import { ProductFilters } from "@/components/product-filters";

export const metadata: Metadata = {
  title: "Perfumes",
  description: "Shop OSCII luxury perfumes by collection, scent family, rating, and price."
};

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <section className="border-b border-ink/10 bg-luxe-radial py-14 dark:border-white/10">
        <div className="container-luxe">
          <p className="eyebrow">Perfume library</p>
          <h1 className="mt-3 max-w-3xl font-serif text-6xl font-semibold leading-none">Find the signature that follows you softly</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70 dark:text-silk/70">
            Search by mood, filter by family, and sort our extrait-focused compositions with precision.
          </p>
        </div>
      </section>
      <ProductFilters initialCollection={params.collection} />
    </>
  );
}
