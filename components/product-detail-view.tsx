"use client";

import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductImageSlider } from "@/components/product-image-slider";
import { WhatsAppOrderPanel } from "@/components/whatsapp-order-panel";
import { formatPrice, getResolvedImages, withSelectedSize } from "@/lib/products";
import { useWishlistStore } from "@/store/wishlist";

function SillageCard({ product, selectedSize }: { product: Product; selectedSize: string }) {
  return (
    <div className="glass w-full rounded-xl p-4 sm:p-5">
      <p className="eyebrow">Sillage</p>
      <p className="mt-2 font-serif text-2xl font-semibold sm:mt-2.5 sm:text-3xl">{product.intensity}</p>
      <p className="mt-1.5 text-xs sm:text-sm text-ink/65 dark:text-silk/65">{product.family} fragrance family</p>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-smoke sm:mt-5 sm:text-xs">Selected size</p>
      <p className="mt-1.5 font-serif text-xl sm:text-2xl">{selectedSize}</p>
    </div>
  );
}

export function ProductDetailView({ product }: { product: Product }) {
  const getItemSize = useWishlistStore((state) => state.getItemSize);
  const globalSize = useWishlistStore((state) => state.globalSize);
  const savedWishlistSize = getItemSize(product.id);

  const [selectedSize, setSelectedSize] = useState(() =>
    savedWishlistSize || (globalSize !== "all" && product.sizes.some(s => s.size.toLowerCase() === globalSize.toLowerCase()) ? globalSize : product.size)
  );

  useEffect(() => {
    if (savedWishlistSize) {
      setSelectedSize(savedWishlistSize);
    }
  }, [savedWishlistSize]);

  const selectedProduct = useMemo(() => withSelectedSize(product, selectedSize), [product, selectedSize]);
  const galleryImages = getResolvedImages(selectedProduct);

  return (
    <section className="container-luxe grid gap-6 py-6 sm:gap-10 sm:py-10 lg:grid-cols-[1.05fr_.95fr]">
      <div className="order-1 grid w-full gap-4">
        <ProductImageSlider
          key={`${product.id}-${selectedSize}`}
          productName={`${product.name} ${selectedSize}`}
          images={galleryImages}
        />
        {/* Desktop Sillage Card */}
        <div className="hidden lg:block">
          <SillageCard product={product} selectedSize={selectedSize} />
        </div>
      </div>

      <div className="order-2 flex min-w-0 flex-col lg:sticky lg:top-24 lg:h-fit">
        <div>
          <p className="eyebrow">{product.kind === "attar" ? "Sacred attar" : product.collection}</p>
          <h1 className="mt-2.5 break-words font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm text-smoke">
            <span className="flex items-center gap-1">
              <Star className="size-3.5 sm:size-4 shrink-0 fill-champagne text-champagne" />
              {product.rating}
            </span>
            <span className="text-ink/25 dark:text-silk/25">·</span>
            <span>{product.reviews} reviews</span>
            <span className="text-ink/25 dark:text-silk/25">·</span>
            <span className="font-semibold text-ink dark:text-silk">{formatPrice(selectedProduct.price)}</span>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-ink/70 dark:text-silk/70">
          {product.description}
        </p>

        {/* WhatsApp Order Panel set top side right above notes */}
        <div className="mt-5 sm:mt-6">
          <WhatsAppOrderPanel
            product={product}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
        </div>

        {/* Fragrance Notes */}
        <div className="mt-5 grid gap-2.5 sm:mt-8 sm:gap-3">
          {Object.entries(product.notes).map(([stage, notes]) => (
            <div key={stage} className="rounded-xl border border-ink/10 bg-white/40 p-3 sm:p-4 dark:border-white/10 dark:bg-white/10">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-smoke sm:tracking-[0.25em]">
                {stage} notes
              </p>
              <p className="mt-1.5 break-words font-serif text-lg leading-snug sm:text-2xl">
                {notes.join(" / ")}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Sillage Card */}
        <div className="mt-5 block lg:hidden">
          <SillageCard product={product} selectedSize={selectedSize} />
        </div>
      </div>
    </section>
  );
}
