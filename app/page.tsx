import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gift, PackageCheck, ShieldCheck, Sparkles, Star, Truck, Video } from "lucide-react";
import heroImg from "./hero-img.png";
import { AttarFilters } from "@/components/attar-filters";
import { ProductCard } from "@/components/product-card";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { collections, getAttars, getProducts, testimonials } from "@/lib/products";
import { buildGeneralOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export default async function Home() {
  const attars = await getAttars();
  const promiseCards = [
    {
      title: "Secure Packing",
      copy: "Every order is packed with premium materials to ensure it reaches you safely.",
      icon: PackageCheck,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Live Packing",
      copy: "Watch your order being packed live via video call for complete transparency and trust.",
      icon: Video,
      image:
        "https://images.unsplash.com/photo-1596367407372-96cb88503db6?auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Free Samples",
      copy: "Enjoy free perfume samples with every order and discover new favorites.",
      icon: Gift,
      image:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85"
    },
    {
      title: "Fast Delivery",
      copy: "We ensure fast and reliable delivery so you can enjoy your fragrance without the wait.",
      icon: Truck,
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=900&q=85"
    }
  ];
  const trustBadges = [
    { label: "100% Genuine Products", icon: ShieldCheck },
    { label: "Secure Payments", icon: CheckCircle2 },
    { label: "Trusted by Thousands", icon: Star },
    { label: "24/7 Customer Support", icon: Sparkles },
    { label: "Pan India Delivery", icon: Truck }
  ];

  return (
    <>
      <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-silk dark:bg-noir">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImg}
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
              PRECEA
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

      {/* <section className="container-luxe py-20">
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
      </section> */}

      <section className="border-y border-ink/10 bg-luxe-radial py-14 dark:border-white/10">
        <div className="container-luxe">
          <p className="eyebrow">Attar library</p>
          <h2 className="mt-3 max-w-3xl font-serif text-5xl font-semibold leading-none">
            Find concentrated attars crafted for long-lasting wear
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70 dark:text-silk/70">
            Search by mood, filter by family, and sort traditional attar compositions with precision.
          </p>
        </div>
      </section>
      <AttarFilters products={attars} />

      <section className="bg-pearl py-20 dark:bg-white/5">
        <div className="container-luxe grid gap-12 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-3 font-serif text-5xl font-semibold">What customers say</h2>
            <p className="mt-4 text-ink/70 dark:text-silk/70">
              Real feedback from people who wear PRECEA every day.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col rounded-xl bg-white p-5 shadow-sm dark:border dark:border-white/10 dark:bg-white/10"
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
            Every PRECEA™ order is prepared with archival paper, discovery vials, and a care card matched to the fragrance family.
          </p>
          <a
            href={whatsappUrl(buildGeneralOrderMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary mt-8 bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
          >
            <WhatsAppIcon className="size-4" />
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

      <section className="bg-[#f7f2e8] py-20 dark:bg-white/5">
        <div className="container-luxe">
          <div className="text-center">
            <p className="eyebrow text-[#9b7d45]">Our promise to you</p>
            <h2 className="mt-3 font-serif text-5xl font-semibold text-ink dark:text-silk sm:text-6xl">Shop with Confidence</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {promiseCards.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-ink/10 bg-white/65 shadow-sm dark:border-white/10 dark:bg-white/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
                  </div>
                  <div className="relative px-5 pb-6 pt-8 text-center">
                    <div className="absolute -top-6 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full border border-[#e7d4ae] bg-[#fff8ea] text-[#b89149] shadow-sm dark:border-white/15 dark:bg-noir dark:text-champagne">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-serif text-3xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/70 dark:text-silk/70">{item.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-full border border-[#e7d4ae] bg-[#fff8ea] px-4 py-3 dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-3 md:grid-cols-5">
              {trustBadges.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex items-center justify-center gap-2 text-sm text-ink/80 dark:text-silk/80">
                    <Icon className="size-4 text-[#b89149] dark:text-champagne" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
