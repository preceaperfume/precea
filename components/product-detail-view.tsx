"use client";

import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductImageSlider } from "@/components/product-image-slider";
import { WhatsAppOrderPanel } from "@/components/whatsapp-order-panel";
import { formatPrice, getResolvedImages, withSelectedSize } from "@/lib/products";

export function ProductDetailView({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.size);
  const selectedProduct = useMemo(() => withSelectedSize(product, selectedSize), [product, selectedSize]);
  const galleryImages = getResolvedImages(selectedProduct);

  return (
    <section className="container-luxe grid gap-10 py-10 lg:grid-cols-[1.05fr_.95fr]">
      <div className="grid gap-4 sm:grid-cols-1">
        <ProductImageSlider
          key={`${product.id}-${selectedSize}`}
          productName={`${product.name} ${selectedSize}`}
          images={galleryImages}
        />
        <div className="glass rounded-lg p-5">
          <p className="eyebrow">Sillage</p>
          <p className="mt-3 font-serif text-3xl font-semibold">{product.intensity}</p>
          <p className="mt-2 text-sm text-ink/60 dark:text-silk/60">{product.family} fragrance family</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-smoke">Selected size</p>
          <p className="mt-2 font-serif text-2xl">{selectedSize}</p>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:h-fit">
        <p className="eyebrow">{product.kind === "attar" ? "Sacred attar" : product.collection}</p>
        <h1 className="mt-3 font-serif text-6xl font-semibold leading-none">{product.name}</h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-smoke">
          <span className="flex items-center gap-1">
            <Star className="size-4 fill-champagne text-champagne" /> {product.rating}
          </span>
          <span>{product.reviews} reviews</span>
          <span>{formatPrice(selectedProduct.price)}</span>
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
          <WhatsAppOrderPanel
            product={product}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
        </div>
      </div>
    </section>
  );
}
