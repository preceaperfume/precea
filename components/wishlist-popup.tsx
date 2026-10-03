"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { formatPrice, getPrimaryProductImage, products as fallbackProducts, withSelectedSize, type Product } from "@/lib/products";
import { buildWishlistOrderMessage, productWhatsAppUrl, whatsappUrl } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

export function WishlistPopup({ products = fallbackProducts }: { products?: Product[] }) {
  const isOpen = useWishlistStore((state) => state.isOpen);
  const closeWishlist = useWishlistStore((state) => state.closeWishlist);
  const items = useWishlistStore((state) => state.items);
  const updateItemSize = useWishlistStore((state) => state.updateItemSize);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeWishlist();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeWishlist]);

  // Resolve each wishlisted product with its exact selected size and price
  const wishedItems = useMemo(() => {
    return items
      .map((item) => {
        const baseProduct = products.find((p) => p.id === item.id || p.slug === item.id);
        if (!baseProduct) return null;
        const sizedProduct = withSelectedSize(baseProduct, item.size);
        return {
          baseProduct,
          sizedProduct,
          selectedSize: sizedProduct.size
        };
      })
      .filter((entry): entry is { baseProduct: Product; sizedProduct: Product; selectedSize: string } => entry !== null);
  }, [items, products]);

  const allSizedProducts = useMemo(() => wishedItems.map((e) => e.sizedProduct), [wishedItems]);
  const totalPrice = useMemo(() => allSizedProducts.reduce((sum, item) => sum + item.price, 0), [allSizedProducts]);
  const orderAllUrl = useMemo(() => whatsappUrl(buildWishlistOrderMessage(allSizedProducts)), [allSizedProducts]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close wishlist"
          className="fixed inset-0 z-[60] bg-ink/25 backdrop-blur-[2px] dark:bg-black/50"
          onClick={closeWishlist}
        />
      )}

      <aside
        aria-hidden={!isOpen}
        aria-label="Wishlist"
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-ink/10 bg-silk/95 shadow-luxe backdrop-blur-2xl transition duration-300 dark:border-white/10 dark:bg-noir/95 ${
          isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <Heart className="size-5 text-rosewood dark:text-champagne" />
            <div>
              <h2 className="font-serif text-2xl font-semibold">Wishlist</h2>
              <p className="text-xs text-smoke">
                {wishedItems.length} {wishedItems.length === 1 ? "fragrance" : "fragrances"} saved
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close wishlist"
            onClick={closeWishlist}
            className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white/45 transition hover:border-champagne hover:bg-white/75 touch-manipulation dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {wishedItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="grid size-16 place-items-center rounded-full border border-ink/10 bg-white/50 dark:border-white/10 dark:bg-white/10">
                <Heart className="size-7 text-smoke" />
              </div>
              <p className="mt-5 font-serif text-2xl font-semibold">Your wishlist is empty</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-smoke">
                Tap the heart on any fragrance to save it here with your chosen size.
              </p>
              <Link href="#collection" onClick={closeWishlist} className="button-primary mt-8">
                <ShoppingBag className="size-4" />
                Browse attars
              </Link>
            </div>
          ) : (
            <ul className="space-y-3.5">
              {wishedItems.map(({ baseProduct, sizedProduct, selectedSize }) => (
                <li
                  key={`${baseProduct.id}-${selectedSize}`}
                  className="grid grid-cols-[80px_1fr_auto] gap-3.5 rounded-xl border border-ink/10 bg-white/60 p-3.5 shadow-sm dark:border-white/10 dark:bg-white/10"
                >
                  <Link
                    href={`/products/${baseProduct.slug}`}
                    onClick={closeWishlist}
                    className="relative aspect-square overflow-hidden rounded-lg bg-pearl/60 dark:bg-white/5"
                  >
                    <Image
                      src={getPrimaryProductImage(sizedProduct)}
                      alt={baseProduct.name}
                      fill
                      sizes="80px"
                      className="object-cover transition hover:scale-105"
                    />
                  </Link>

                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-smoke">
                      {baseProduct.collection}
                    </p>
                    <Link
                      href={`/products/${baseProduct.slug}`}
                      onClick={closeWishlist}
                      className="mt-0.5 block truncate font-serif text-base sm:text-lg font-semibold leading-tight hover:text-rosewood dark:hover:text-champagne"
                    >
                      {baseProduct.name}
                    </Link>

                    {/* Price for selected size */}
                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-sm font-semibold text-ink dark:text-silk">
                        {formatPrice(sizedProduct.price)}
                      </p>
                      <span className="text-xs text-smoke font-medium">({selectedSize})</span>
                    </div>

                    {/* Dynamic Size Switcher Pills inside Wishlist */}
                    {baseProduct.sizes.length > 1 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {baseProduct.sizes.map((option) => (
                          <button
                            key={option.size}
                            type="button"
                            onClick={() => updateItemSize(baseProduct.id, option.size)}
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition touch-manipulation ${
                              selectedSize === option.size
                                ? "border-ink bg-ink text-silk shadow-sm dark:border-silk dark:bg-silk dark:text-ink"
                                : "border-ink/15 bg-white/50 text-ink/75 hover:border-ink/30 dark:border-white/15 dark:bg-white/10 dark:text-silk/75"
                            }`}
                          >
                            {option.size}
                          </button>
                        ))}
                      </div>
                    )}

                    <a
                      href={productWhatsAppUrl(sizedProduct)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#25D366] hover:underline"
                    >
                      <WhatsAppIcon className="size-3.5" />
                      Order {selectedSize}
                    </a>
                  </div>

                  <button
                    type="button"
                    aria-label={`Remove ${baseProduct.name} from wishlist`}
                    onClick={() => removeFromWishlist(baseProduct.id)}
                    className="grid size-9 shrink-0 place-items-center self-start rounded-full border border-ink/10 transition hover:border-rosewood hover:bg-white/70 touch-manipulation dark:border-white/10 dark:hover:bg-white/15"
                  >
                    <Heart className="size-4 fill-rosewood text-rosewood dark:fill-champagne dark:text-champagne" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {wishedItems.length > 0 && (
          <div className="space-y-3 border-t border-ink/10 px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] dark:border-white/10">
            <a
              href={orderAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary w-full min-h-[46px] touch-manipulation bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
            >
              <WhatsAppIcon className="size-4" />
              Order on WhatsApp · {formatPrice(totalPrice)}
            </a>
            <Link href="#collection" onClick={closeWishlist} className="button-secondary w-full min-h-[46px] touch-manipulation">
              Continue shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
