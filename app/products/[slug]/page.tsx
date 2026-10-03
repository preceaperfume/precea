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

  const primaryImage = getPrimaryProductImage(product);
  const pageUrl = `https://precea.vercel.app/products/${product.slug}`;

  return {
    title: `${product.name} | Luxury Pure Attar & Perfume`,
    description: product.description,
    keywords: [
      product.name,
      `${product.name} attar`,
      product.family,
      product.collection,
      "pure attar",
      "alcohol free perfume oil",
      "long lasting attar India",
      "PRECEA attar",
      ...product.notes.top,
      ...product.notes.heart,
      ...product.notes.base
    ],
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title: `${product.name} | PRECEA™ Luxury Attar`,
      description: product.description,
      url: pageUrl,
      type: "article",
      siteName: "PRECEA™",
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 1000,
          alt: `${product.name} - PRECEA luxury fragrance`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | PRECEA™`,
      description: product.description,
      images: [primaryImage]
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.family === product.family && item.id !== product.id).slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "PRECEA™"
    },
    category: "Fragrance > Attar",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `https://precea.vercel.app/products/${product.slug}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "PRECEA™"
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: "5",
      worstRating: "1"
    }
  };

  return (
    <>
      {/* Product Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <ProductDetailView product={product} />

      <section className="container-luxe pb-12 sm:pb-16">
        <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            ["Arielle M.", "The drydown is unreal. Elegant, warm, and quietly expensive."],
            ["Theo R.", "Projection is refined, but it lasts all day on fabric."],
            ["Mina S.", "The packaging and samples made the whole purchase feel ceremonial."]
          ].map(([name, copy]) => (
            <blockquote key={name} className="glass rounded-xl p-4 sm:p-5">
              <p className="flex gap-1 text-champagne">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</p>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-6 text-ink/70 dark:text-silk/70">{copy}</p>
              <footer className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold">{name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-luxe pb-16 sm:pb-20">
          <p className="eyebrow">You may also love</p>
          <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
