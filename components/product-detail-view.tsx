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
    <section className="container-luxe grid gap-8 py-8 sm:gap-10 sm:py-10 lg:grid-cols-[1.05fr_.95fr]">
      <div className="order-1 grid w-full gap-4">
        <ProductImageSlider
          key={`${product.id}-${selectedSize}`}
          productName={`${product.name} ${selectedSize}`}
          images={galleryImages}
        />
        <div className="glass w-full rounded-lg p-4 sm:p-5">
          <p className="eyebrow">Sillage</p>
          <p className="mt-2 font-serif text-2xl font-semibold sm:mt-3 sm:text-3xl">{product.intensity}</p>
          <p className="mt-2 text-sm text-ink/60 dark:text-silk/60">{product.family} fragrance family</p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-smoke sm:mt-6">Selected size</p>
          <p className="mt-2 font-serif text-xl sm:text-2xl">{selectedSize}</p>
        </div>
      </div>

      <div className="order-2 flex min-w-0 flex-col lg:sticky lg:top-24 lg:h-fit">
        <div className="order-1">
          <p className="eyebrow">{product.kind === "attar" ? "Sacred attar" : product.collection}</p>
          <h1 className="mt-3 break-words font-serif text-[2.35rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl sm:leading-[1.02] lg:text-6xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-smoke">
            <span className="flex items-center gap-1">
              <Star className="size-4 shrink-0 fill-champagne text-champagne" />
              {product.rating}
            </span>
            <span className="text-ink/25 dark:text-silk/25">·</span>
            <span>{product.reviews} reviews</span>
            <span className="text-ink/25 dark:text-silk/25">·</span>
            <span className="font-semibold text-ink dark:text-silk">{formatPrice(selectedProduct.price)}</span>
          </div>
        </div>

        <div className="order-2 mt-6 lg:order-4">
          <WhatsAppOrderPanel
            product={product}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
        </div>

        <p className="order-3 mt-5 text-base leading-7 text-ink/70 dark:text-silk/70 sm:mt-6 sm:text-lg sm:leading-8 lg:order-2">
          {product.description}
        </p>

        <div className="order-4 mt-6 grid gap-3 sm:mt-8 lg:order-3">
          {Object.entries(product.notes).map(([stage, notes]) => (
            <div key={stage} className="rounded-lg border border-ink/10 bg-white/40 p-3.5 sm:p-4 dark:border-white/10 dark:bg-white/10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-smoke sm:text-xs sm:tracking-[0.25em]">
                {stage} notes
              </p>
              <p className="mt-2 break-words font-serif text-xl leading-snug sm:text-2xl">
                {notes.join(" / ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
