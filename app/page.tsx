import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { collections, products, testimonials } from "@/lib/products";
import { buildGeneralOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export default function Home() {
  const bestsellers = products.filter((product) => product.bestseller);

  return (
    <>
      <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-silk dark:bg-noir">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1800&q=90"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-bg-image"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
          <div className="hero-bg-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-luxe-radial opacity-70" />
        </div>

        <div className="container-luxe relative z-[2] flex min-h-[calc(100vh-4.5rem)] items-center py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">Maison de parfum</p>
            <h1 className="mt-6 font-serif text-6xl font-semibold leading-[0.9] text-ink dark:text-silk sm:text-7xl lg:text-8xl">
              OSCII
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink/75 dark:text-silk/75">
              Cinematic extrait fragrances crafted with rare materials, modern restraint, and the quiet gravity of true luxury.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="button-primary">
                Shop the collection <ArrowRight className="size-4" />
              </Link>
              <Link href="/products/velvet-iris-absolu" className="button-secondary">
                Discover Velvet Iris
              </Link>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 text-sm">
              {["Extrait strength", "Rare naturals", "Private wrapping"].map((item) => (
                <div key={item} className="glass rounded-xl p-4">
                  <CheckCircle2 className="mb-2 size-4 text-moss dark:text-champagne" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Best sellers</p>
            <h2 className="mt-3 font-serif text-5xl font-semibold">Objects of desire</h2>
          </div>
          <Link href="/products" className="button-secondary w-fit">
            View all perfumes
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </section>

      <section className="container-luxe pb-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-3 font-serif text-5xl font-semibold">What customers say</h2>
          <p className="mt-4 text-ink/70 dark:text-silk/70">
            Real feedback from people who wear OSCII every day.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="flex h-full flex-col rounded-xl border border-ink/10 bg-white/55 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
            >
              <div className="flex items-center gap-1 text-champagne">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={`${item.id}-star-${index}`} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-6 text-ink/75 dark:text-silk/75">"{item.quote}"</p>
              <div className="mt-5 border-t border-ink/10 pt-4 dark:border-white/10">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-smoke">{item.city}</p>
                <Link href={`/products/${item.productSlug}`} className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-rosewood dark:text-champagne">
                  View fragrance
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-silk dark:bg-white/5">
        <div className="container-luxe">
          <div className="max-w-2xl">
            <p className="eyebrow text-champagne">Featured collections</p>
            <h2 className="mt-3 font-serif text-5xl font-semibold">Compositions with a point of view</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.name}
                href={`/products?collection=${encodeURIComponent(collection.name)}`}
                className="group relative min-h-[380px] overflow-hidden rounded-xl"
              >
                <Image src={collection.image} alt={collection.name} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <Sparkles className="mb-3 size-5 text-champagne" />
                  <h3 className="font-serif text-3xl font-semibold">{collection.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-silk/75">{collection.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe grid gap-12 py-20 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="eyebrow">The ritual</p>
          <h2 className="mt-3 font-serif text-5xl font-semibold">Luxury made tactile, not loud</h2>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-silk/70">
            Every OSCII order is prepared with archival paper, discovery vials, and a care card matched to the fragrance family.
          </p>
          <a
            href={whatsappUrl(buildGeneralOrderMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary mt-8 bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
          >
            <MessageCircle className="size-4" />
            Order on WhatsApp
          </a>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85" alt="Perfume ritual" fill sizes="50vw" className="object-cover" />
          </div>
          <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-xl">
            <Image src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85" alt="Perfume bottle detail" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
