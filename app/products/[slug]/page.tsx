import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { WhatsAppOrderPanel } from "@/components/whatsapp-order-panel";
import { ProductCard } from "@/components/product-card";
import { formatPrice, getPrimaryProductImage, getProduct, products } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
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
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.family === product.family && item.id !== product.id).slice(0, 3);

  return (
    <>
      <section className="container-luxe grid gap-10 py-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg sm:col-span-2">
            <Image src={getPrimaryProductImage(product)} alt={`${product.name} bottle`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
          {product.images.slice(1).map((image) => (
            <div key={image} className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={image} alt={`${product.name} detail`} fill sizes="30vw" className="object-cover" />
            </div>
          ))}
          <div className="glass rounded-lg p-5">
            <p className="eyebrow">Sillage</p>
            <p className="mt-3 font-serif text-3xl font-semibold">{product.intensity}</p>
            <p className="mt-2 text-sm text-ink/60 dark:text-silk/60">{product.family} fragrance family</p>
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="eyebrow">{product.kind === "attar" ? "Sacred attar" : product.collection}</p>
          <h1 className="mt-3 font-serif text-6xl font-semibold leading-none">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-smoke">
            <span className="flex items-center gap-1"><Star className="size-4 fill-champagne text-champagne" /> {product.rating}</span>
            <span>{product.reviews} reviews</span>
            <span>{formatPrice(product.price)}</span>
          </div>
          <p className="mt-6 text-lg leading-8 text-ink/70 dark:text-silk/70">{product.description}</p>
          <div className="mt-8 grid gap-3">
            {Object.entries(product.notes).map(([stage, notes]) => (
              <div key={stage} className="rounded-lg border border-ink/10 bg-white/40 p-4 dark:border-white/10 dark:bg-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-smoke">{stage} notes</p>
                <p className="mt-2 font-serif text-2xl">{notes.join(" / ")}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <WhatsAppOrderPanel product={product} />
          </div>
        </div>
      </section>

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