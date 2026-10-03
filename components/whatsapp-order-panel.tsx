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
  const updateItemSize = useWishlistStore((state) => state.updateItemSize);
  const openWishlist = useWishlistStore((state) => state.openWishlist);
  const isWished = useWishlistStore((state) => state.isWished);
  const getItemSize = useWishlistStore((state) => state.getItemSize);
  const globalSize = useWishlistStore((state) => state.globalSize);

  const sizeOptions = product.sizes.length > 0 ? product.sizes : [{ size: product.size, price: product.price, images: product.images }];
  const savedSize = getItemSize(product.id);
  const [internalSize, setInternalSize] = useState(() => savedSize || (globalSize !== "all" && sizeOptions.some(o => o.size.toLowerCase() === globalSize.toLowerCase()) ? globalSize : product.size));
  const activeSize = selectedSize ?? internalSize;
  const setActiveSize = onSizeChange ?? setInternalSize;
  const wished = isWished(product.id);

  const handleSelectSize = (newSize: string) => {
    setActiveSize(newSize);
    if (wished) {
      updateItemSize(product.id, newSize);
    }
  };

  const selectedProduct = useMemo(() => withSelectedSize(product, activeSize), [product, activeSize]);
  const orderLink = useMemo(() => productWhatsAppUrl(selectedProduct), [selectedProduct]);

  return (
    <div className="glass rounded-xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm leading-5 text-smoke">
            {selectedProduct.size}{" "}
            <span className="block sm:inline">
              {product.kind === "attar" ? "concentrated attar oil" : "extrait de parfum"}
            </span>
          </p>
          <p className="mt-1 font-serif text-2xl font-semibold sm:text-4xl">{formatPrice(selectedProduct.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id, activeSize);
            if (!wished) openWishlist();
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/10 touch-manipulation sm:size-12 dark:border-white/10"
        >
          <Heart className={`size-5 ${wished ? "fill-rosewood text-rosewood dark:fill-champagne dark:text-champagne" : ""}`} />
        </button>
      </div>

      {sizeOptions.length > 1 && (
        <div className="mt-4 sm:mt-5">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-smoke">Select size</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {sizeOptions.map((option) => (
              <button
                key={option.size}
                type="button"
                onClick={() => handleSelectSize(option.size)}
                className={`rounded-full border px-2.5 py-2 text-xs font-semibold transition touch-manipulation sm:px-3 sm:text-sm ${
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
        className="button-primary mt-5 sm:mt-6 w-full min-h-[48px] touch-manipulation bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
      >
        <WhatsAppIcon className="size-5" />
        Order on WhatsApp
      </a>
      <div className="mt-4 sm:mt-5 grid gap-2.5 text-xs sm:text-sm text-ink/70 dark:text-silk/70">
        <p className="flex items-start gap-2 sm:items-center">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-moss sm:mt-0 dark:text-champagne" />
          Complimentary insured delivery and private wrapping
        </p>
        <p className="flex items-start gap-2 sm:items-center">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-moss sm:mt-0 dark:text-champagne" />
          Includes two discovery samples selected by the atelier
        </p>
      </div>
    </div>
  );
}
