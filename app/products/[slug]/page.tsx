import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductDetailView } from "@/components/product-detail-view";
import { getPrimaryProductImage, getProductBySlug, getProducts } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: getPrimaryProductImage(product) }]
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.family === product.family && item.id !== product.id).slice(0, 3);

  return (
    <>
      <ProductDetailView product={product} />

      <section className="container-luxe pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Arielle M.", "The drydown is unreal. Elegant, warm, and quietly expensive."],
            ["Theo R.", "Projection is refined, but it lasts all day on fabric."],
            ["Mina S.", "The packaging and samples made the whole purchase feel ceremonial."]
          ].map(([name, copy]) => (
            <blockquote key={name} className="glass rounded-lg p-5">
              <p className="flex gap-1 text-champagne">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</p>
              <p className="mt-4 text-sm leading-6 text-ink/70 dark:text-silk/70">{copy}</p>
              <footer className="mt-4 text-sm font-semibold">{name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-luxe pb-20">
          <p className="eyebrow">You may also love</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
