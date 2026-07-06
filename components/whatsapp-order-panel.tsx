"use client";

import { Heart, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { productWhatsAppUrl } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

export function WhatsAppOrderPanel({ product }: { product: Product }) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const openWishlist = useWishlistStore((state) => state.openWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const wished = wishlist.includes(product.id);

  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-smoke">{product.size} {product.kind === "attar" ? "concentrated attar oil" : "extrait de parfum"}</p>
          <p className="font-serif text-4xl font-semibold">{formatPrice(product.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            if (!wished) openWishlist();
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="grid size-12 place-items-center rounded-full border border-ink/10 dark:border-white/10"
        >
          <Heart className={`size-5 ${wished ? "fill-rosewood text-rosewood dark:fill-champagne dark:text-champagne" : ""}`} />
        </button>
      </div>
      <a
        href={productWhatsAppUrl(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="button-primary mt-6 w-full bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
      >
        <MessageCircle className="size-4" />
        Order on WhatsApp
      </a>
      <div className="mt-5 grid gap-3 text-sm text-ink/70 dark:text-silk/70">
        <p className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-moss dark:text-champagne" />
          Complimentary insured delivery and private wrapping
        </p>
        <p className="flex items-center gap-2">
          <Sparkles className="size-4 text-moss dark:text-champagne" />
          Includes two discovery samples selected by the atelier
        </p>
      </div>
    </div>
  );
}
