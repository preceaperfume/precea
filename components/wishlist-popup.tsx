"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { formatPrice, getPrimaryProductImage, products } from "@/lib/products";
import { buildGeneralOrderMessage, productWhatsAppUrl, whatsappUrl } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

export function WishlistPopup() {
  const isOpen = useWishlistStore((state) => state.isOpen);
  const closeWishlist = useWishlistStore((state) => state.closeWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishedProducts = products.filter((product) => wishlist.includes(product.id));

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
                {wishlist.length} {wishlist.length === 1 ? "fragrance" : "fragrances"} saved
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close wishlist"
            onClick={closeWishlist}
            className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white/45 transition hover:border-champagne hover:bg-white/75 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {wishedProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="grid size-16 place-items-center rounded-full border border-ink/10 bg-white/50 dark:border-white/10 dark:bg-white/10">
                <Heart className="size-7 text-smoke" />
              </div>
              <p className="mt-5 font-serif text-2xl font-semibold">Your wishlist is empty</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-smoke">
                Tap the heart on any fragrance to save it here for later.
              </p>
              <Link href="/products" onClick={closeWishlist} className="button-primary mt-8">
                <ShoppingBag className="size-4" />
                Browse perfumes
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {wishedProducts.map((product) => (
                <li
                  key={product.id}
                  className="grid grid-cols-[80px_1fr_auto] gap-3 rounded-xl border border-ink/10 bg-white/55 p-3 dark:border-white/10 dark:bg-white/10"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={closeWishlist}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={getPrimaryProductImage(product)}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-smoke">{product.collection}</p>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={closeWishlist}
                      className="mt-1 block truncate font-serif text-lg font-semibold leading-tight hover:text-rosewood dark:hover:text-champagne"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm font-semibold">{formatPrice(product.price)}</p>
                    <a
                      href={productWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#25D366] hover:underline"
                    >
                      <MessageCircle className="size-3.5" />
                      Order
                    </a>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name} from wishlist`}
                    onClick={() => toggleWishlist(product.id)}
                    className="grid size-9 shrink-0 place-items-center self-start rounded-full border border-ink/10 transition hover:border-rosewood hover:bg-white/70 dark:border-white/10 dark:hover:bg-white/15"
                  >
                    <Heart className="size-4 fill-rosewood text-rosewood dark:fill-champagne dark:text-champagne" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {wishedProducts.length > 0 && (
          <div className="space-y-3 border-t border-ink/10 px-5 py-4 dark:border-white/10">
            <a
              href={whatsappUrl(buildGeneralOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary w-full bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
            >
              <MessageCircle className="size-4" />
              Order on WhatsApp
            </a>
            <Link href="/products" onClick={closeWishlist} className="button-secondary w-full">
              Continue shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
