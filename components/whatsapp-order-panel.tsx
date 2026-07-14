"use client";

import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { formatPrice, withSelectedSize } from "@/lib/products";
import { productWhatsAppUrl } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

type WhatsAppOrderPanelProps = {
  product: Product;
  selectedSize?: string;
  onSizeChange?: (size: string) => void;
};

export function WhatsAppOrderPanel({ product, selectedSize, onSizeChange }: WhatsAppOrderPanelProps) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const openWishlist = useWishlistStore((state) => state.openWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const wished = wishlist.includes(product.id);
  const sizeOptions = product.sizes.length > 0 ? product.sizes : [{ size: product.size, price: product.price, images: product.images }];
  const [internalSize, setInternalSize] = useState(product.size);
  const activeSize = selectedSize ?? internalSize;
  const setActiveSize = onSizeChange ?? setInternalSize;
  const selectedProduct = useMemo(() => withSelectedSize(product, activeSize), [product, activeSize]);
  const orderLink = useMemo(() => productWhatsAppUrl(selectedProduct), [selectedProduct]);

  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-smoke">
            {selectedProduct.size} {product.kind === "attar" ? "concentrated attar oil" : "extrait de parfum"}
          </p>
          <p className="font-serif text-4xl font-semibold">{formatPrice(selectedProduct.price)}</p>
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

      {sizeOptions.length > 1 && (
        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-smoke">Select size</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {sizeOptions.map((option) => (
              <button
                key={option.size}
                type="button"
                onClick={() => setActiveSize(option.size)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                  activeSize === option.size
                    ? "border-ink bg-ink text-silk dark:border-silk dark:bg-silk dark:text-ink"
                    : "border-ink/15 bg-white/45 text-ink/80 hover:border-ink/30 dark:border-white/15 dark:bg-white/10 dark:text-silk/85 dark:hover:border-white/30"
                }`}
              >
                {option.size} · {formatPrice(option.price)}
              </button>
            ))}
          </div>
        </div>
      )}

      <a
        href={orderLink}
        target="_blank"
        rel="noopener noreferrer"
        className="button-primary mt-6 w-full bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
      >
        <WhatsAppIcon className="size-5" />
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
