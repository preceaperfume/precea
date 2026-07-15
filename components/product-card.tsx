"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { formatPrice, getPrimaryProductImage, withSelectedSize } from "@/lib/products";
import { buildProductOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const openWishlist = useWishlistStore((state) => state.openWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const wished = wishlist.includes(product.id);
  const sizeOptions = product.sizes.length > 0 ? product.sizes : [{ size: product.size, price: product.price, images: product.images }];
  const [selectedSize, setSelectedSize] = useState(product.size);
  const selectedProduct = useMemo(() => withSelectedSize(product, selectedSize), [product, selectedSize]);
  const previewImage = getPrimaryProductImage(selectedProduct);
  const orderLink = useMemo(
    () => whatsappUrl(buildProductOrderMessage(selectedProduct)),
    [selectedProduct]
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-champagne/35 bg-silk/85 p-4 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-champagne/60 hover:shadow-luxe dark:border-white/10 dark:bg-white/10 dark:hover:border-white/15">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden rounded-lg bg-pearl/80 dark:bg-white/10">
        <div className={featured ? "relative aspect-[4/5]" : "relative aspect-[5/6]"}>
          <Image
            key={`${product.id}-${selectedSize}`}
            src={previewImage}
            alt={`${product.name} ${selectedSize} bottle`}
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />
          {(product.bestseller || product.newArrival) && (
            <span className="absolute left-3 top-3 rounded-full bg-silk/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink backdrop-blur">
              {product.bestseller ? "Best seller" : "New"}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.26em] text-smoke">{product.collection}</p>
            <Link href={`/products/${product.slug}`} className="mt-1.5 block font-serif text-[1.65rem] font-semibold leading-tight">
              {product.name}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => {
              toggleWishlist(product.id);
              if (!wished) openWishlist();
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-champagne/40 bg-pearl/70 transition hover:border-rosewood hover:bg-pearl dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <Heart className={`size-4 ${wished ? "fill-rosewood text-rosewood dark:fill-champagne dark:text-champagne" : ""}`} />
          </button>
        </div>
        <p className="mt-3.5 flex-1 text-sm leading-6 text-ink/70 dark:text-silk/60">{product.mood}</p>
        {sizeOptions.length > 1 && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-smoke">Select size</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {sizeOptions.map((option) => (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => setSelectedSize(option.size)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    selectedSize === option.size
                      ? "border-ink bg-ink text-silk dark:border-silk dark:bg-silk dark:text-ink"
                      : "border-champagne/45 bg-pearl/60 text-ink/80 hover:border-champagne hover:bg-pearl dark:border-white/15 dark:bg-white/10 dark:text-silk/85 dark:hover:border-white/30"
                  }`}
                >
                  {option.size}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{formatPrice(selectedProduct.price)}</p>
            <p className="text-xs text-smoke">{selectedProduct.size}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-smoke">
            <Star className="size-3 fill-champagne text-champagne" />
            {product.rating}
          </div>
        </div>
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary mt-4 w-full bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
        >
          <WhatsAppIcon className="size-5" />
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}
