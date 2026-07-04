"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice, getPrimaryProductImage } from "@/lib/products";
import { productWhatsAppUrl } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const wished = wishlist.includes(product.id);
  const previewImage = getPrimaryProductImage(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white/55 p-4 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-luxe dark:border-white/10 dark:bg-white/10 dark:hover:border-white/15">

      <Link href={`/products/${product.slug}`} className="block overflow-hidden rounded-lg bg-pearl dark:bg-white/10">
        <div className={featured ? "relative aspect-[4/5]" : "relative aspect-[5/6]"}>
          <Image
            src={previewImage}
            alt={`${product.name} perfume bottle`}
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />
          {(product.bestseller || product.newArrival) && (
            <span className="absolute left-3 top-3 rounded-full bg-silk/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink backdrop-blur">
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
            onClick={() => toggleWishlist(product.id)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-white/40 transition hover:border-rosewood hover:bg-white/70 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <Heart className={`size-4 ${wished ? "fill-rosewood text-rosewood dark:fill-champagne dark:text-champagne" : ""}`} />
          </button>
        </div>
        <p className="mt-3.5 flex-1 text-sm leading-6 text-ink/70 dark:text-silk/60">{product.mood}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{formatPrice(product.price)}</p>
            <p className="text-xs text-smoke">{product.size}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-smoke">
            <Star className="size-3 fill-champagne text-champagne" />
            {product.rating}
          </div>
        </div>
        <a
          href={productWhatsAppUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary mt-4 w-full bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
        >
          <MessageCircle className="size-4" />
          Order on WhatsApp
        </a>
      </div>

    </article>
  );
}
