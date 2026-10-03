import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gift, PackageCheck, ShieldCheck, Sparkles, Star, Truck, Video } from "lucide-react";
import heroImg from "./hero-img.png";
import securePackingImg from "./securepacking.png";
import Livepacking from "./livepacking.png";
import freeSamplesImg from "./freesamples.png";
import fastDeliveryImg from "./fastdelivery.png";
import { AttarFilters } from "@/components/attar-filters";
import { ProductCard } from "@/components/product-card";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { IndiaStatesMarquee } from "@/components/india-states-marquee";
import { collections, getAttars, getPrimaryProductImage, testimonials } from "@/lib/products";
import { buildGeneralOrderMessage, buildSignatureOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export default async function Home() {
  const attars = await getAttars();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PRECEA Luxury Attar & Perfume Catalog",
    description: "Curated collection of artisanal alcohol-free attars and luxury perfumes delivered across India.",
    numberOfItems: attars.length,
    itemListElement: attars.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.name,
        image: getPrimaryProductImage(item),
        description: item.notes ? `${item.name} luxury fragrance with ${item.notes.top.join(", ")} notes.` : item.name,
        sku: item.slug,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `https://precea.vercel.app/products/${item.slug}`
        }
      }
    }))
  };

  const promiseCards = [
    {
      title: "Secure Packing",
      copy: "Every order is packed with premium materials to ensure it reaches you safely.",
      icon: PackageCheck,
      image: securePackingImg
    },
    {
      title: "Live Packing",
      copy: "Watch your order being packed live via video call for complete transparency and trust.",
      icon: Video,
      image: Livepacking
    },
    {
      title: "Free Samples",
      copy: "Enjoy free perfume samples with every order and discover new favorites.",
      icon: Gift,
      image: freeSamplesImg
    },
    {
      title: "Fast Delivery",
      copy: "We ensure fast and reliable delivery so you can enjoy your fragrance without the wait.",
      icon: Truck,
      image: fastDeliveryImg
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
      <section className="relative min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-silk dark:bg-noir">
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

        <div className="container-luxe relative z-[2] flex min-h-[calc(100dvh-4.5rem)] items-center py-10 sm:py-16 lg:py-20">
          <div className="w-full max-w-full sm:max-w-xl lg:max-w-2xl">
            <p className="eyebrow">Maison de parfum</p>
            <h1 className="mt-3 break-words font-serif text-[2.2rem] font-semibold leading-[1.08] tracking-tight text-ink dark:text-silk sm:mt-6 sm:text-5xl sm:leading-[1.02] md:text-6xl lg:text-7xl xl:text-8xl xl:leading-[0.95]">
              Luxury Attars Crafted to Perfection
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-ink/75 dark:text-silk/75 sm:mt-7 sm:text-lg sm:leading-8">
              Experience timeless attars blended from the finest natural ingredients. Rich, long-lasting fragrances that reflect elegance, tradition, and modern luxury.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <Link href="#collection" className="button-primary w-full sm:w-auto min-h-[48px] touch-manipulation">
                Discover Attars <ArrowRight className="size-4" />
              </Link>
              <Link href="#collection" className="button-secondary w-full sm:w-auto min-h-[48px] touch-manipulation">
                View Signature Collection
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-2.5 text-xs sm:mt-10 sm:grid-cols-3 sm:gap-4 sm:text-sm">
              {["Pure Attar", "Luxury Ingredients", "Long-Lasting Performance"].map((item) => (
                <div key={item} className="glass flex items-center gap-2.5 rounded-xl p-3 sm:block sm:p-4">
                  <CheckCircle2 className="size-4 shrink-0 text-moss sm:mb-2 dark:text-champagne" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <IndiaStatesMarquee />

      <section id="collection" className="scroll-mt-20 border-y border-ink/10 bg-luxe-radial py-8 sm:py-14 dark:border-white/10">
        <div className="container-luxe">
          <p className="eyebrow">ATTAR COLLECTION</p>
          <h2 className="mt-2.5 max-w-3xl font-serif text-2xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Discover Luxury Attars Crafted for Every Occasion
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70 dark:text-silk/70 sm:mt-5 sm:text-lg sm:leading-8">
            Explore PRECEA's exclusive collection of premium alcohol-free attars, handcrafted with natural oils and timeless fragrance notes. Find the perfect long-lasting scent for daily wear, celebrations, and special moments.
          </p>
        </div>
      </section>
      <AttarFilters products={attars} />

      <section id="signature" className="bg-signature-atelier scroll-mt-24 overflow-hidden py-12 sm:py-20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">PRECEA PERFUME</p>
            <h2 className="mt-2.5 font-serif text-2xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Our Signature Perfume Spray
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-ink/70 dark:text-silk/70 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              Experience PRECEA™ Signature, a luxury perfume spray crafted with premium fragrance oils and refined ingredients. Designed for exceptional longevity, elegance, and everyday sophistication.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-5xl sm:mt-12">
            <div className="group relative overflow-hidden rounded-2xl border border-ink/10 shadow-luxe dark:border-white/10">
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[18/9]">
                <Image
                  src={heroImg}
                  alt="PRECEA Signature extrait de parfum"
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="parallax-image object-cover object-center transition duration-700 group-hover:scale-105"
                  priority={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/45 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/60 via-noir/25 to-transparent px-4 pb-4 pt-12 sm:px-8 sm:pb-8 sm:pt-24 lg:px-10 lg:pb-10 lg:pt-28">
                  <div className="lg:flex lg:items-end lg:justify-between lg:gap-6">
                    <div className="max-w-xl">
                      <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne drop-shadow-sm">
                        Extrait de parfum
                      </p>
                      <h3 className="mt-1.5 font-serif text-2xl font-semibold text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                        Signature
                      </h3>
                      <p className="mt-1.5 text-xs leading-5 text-white/90 drop-shadow-sm sm:text-sm sm:leading-6 lg:text-base lg:leading-7">
                        Premium perfume spray crafted with citrus, floral, woody, and musk notes. Long-lasting fragrance designed for everyday luxury and unforgettable impressions.
                      </p>
                    </div>
                    <a
                      href={whatsappUrl(buildSignatureOrderMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary mt-4 w-full shrink-0 bg-[#25D366] hover:bg-[#1ebe57] sm:w-auto lg:mt-0 dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
                    >
                      <WhatsAppIcon className="size-5" />
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pearl py-12 sm:py-20 dark:bg-white/5">
        <div className="container-luxe grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-2.5 font-serif text-2xl font-semibold sm:text-4xl lg:text-5xl">What customers say</h2>
            <p className="mt-3 text-sm text-ink/70 dark:text-silk/70 sm:text-base">
              Real feedback from people who wear PRECEA every day.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col rounded-xl bg-white p-4 sm:p-5 shadow-sm dark:border dark:border-white/10 dark:bg-white/10"
              >
                <div className="flex items-center gap-1 text-champagne">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={`${item.id}-star-${index}`} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink/75 dark:text-silk/75">"{item.quote}"</p>
                <div className="mt-4 border-t border-ink/10 pt-3 dark:border-white/10">
                  <p className="text-sm font-medium">{item.name}</p>
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

      <section className="bg-ink py-12 sm:py-20 text-silk dark:bg-white/5">
        <div className="container-luxe">
          <div className="max-w-2xl">
            <p className="eyebrow text-champagne">FEATURED COLLECTIONS</p>
            <h2 className="mt-2.5 font-serif text-2xl font-semibold sm:text-4xl lg:text-5xl">Discover Our Signature Attar Collections</h2>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
            {collections.map((collection) => (
              <article
                key={collection.name}
                className="group relative min-h-[300px] sm:min-h-[380px] overflow-hidden rounded-xl"
              >
                <Image src={collection.image} alt={collection.name} fill sizes="(max-width: 640px) 95vw, (max-width: 1024px) 48vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-noir/80 via-noir/40 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-5 pt-8 sm:px-7 sm:pb-7">
                  <Sparkles className="mb-2.5 size-4 sm:size-5 text-champagne" />
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-silk drop-shadow-sm">{collection.name}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-5 sm:leading-6 text-silk/85 drop-shadow-sm">{collection.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe grid gap-8 sm:gap-12 py-12 sm:py-20 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="eyebrow">HERITAGE OF SCENT</p>
          <h2 className="mt-2.5 font-serif text-2xl font-semibold sm:text-4xl lg:text-5xl">Crafted with Tradition. Refined for Today.</h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-ink/70 dark:text-silk/70">
            Every PRECEA™ attar is carefully blended using premium natural oils and traditional perfumery techniques. Our alcohol-free attars deliver rich, long-lasting fragrances that leave a timeless impression.
          </p>
          <a
            href={whatsappUrl(buildGeneralOrderMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary mt-6 w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
          >
            <WhatsAppIcon className="size-5" />
            Order on WhatsApp
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85" alt="Perfume ritual" fill sizes="(max-width: 768px) 50vw, 35vw" className="parallax-image object-cover" loading="lazy" />
          </div>
          <div className="relative mt-6 sm:mt-10 aspect-[4/5] overflow-hidden rounded-xl">
            <Image src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85" alt="Perfume bottle detail" fill sizes="(max-width: 768px) 50vw, 35vw" className="parallax-image object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2e8] py-12 sm:py-20 dark:bg-white/5">
        <div className="container-luxe">
          <div className="text-center">
            <p className="eyebrow text-[#9b7d45]">Our promise to you</p>
            <h2 className="mt-2.5 font-serif text-2xl font-semibold text-ink dark:text-silk sm:text-4xl lg:text-5xl">Shop with Confidence</h2>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {promiseCards.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-ink/10 bg-white/65 shadow-sm dark:border-white/10 dark:bg-white/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                  </div>
                  <div className="relative px-4 pb-5 pt-7 sm:px-5 sm:pb-6 sm:pt-8 text-center">
                    <div className="absolute -top-6 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full border border-[#e7d4ae] bg-[#fff8ea] text-[#b89149] shadow-sm dark:border-white/15 dark:bg-noir dark:text-champagne">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold">{item.title}</h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-6 text-ink/70 dark:text-silk/70">{item.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 w-full max-w-full overflow-hidden rounded-2xl border border-[#e7d4ae] bg-[#fff8ea] px-3.5 py-3.5 sm:px-5 sm:py-4 dark:border-white/10 dark:bg-white/5 md:rounded-full md:px-6 md:py-3">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5">
              {trustBadges.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex min-w-0 items-center justify-start gap-2 text-xs sm:text-sm text-ink/80 sm:justify-center dark:text-silk/80"
                  >
                    <Icon className="size-4 shrink-0 text-[#b89149] dark:text-champagne" />
                    <span className="leading-snug">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
