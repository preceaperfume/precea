"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Sparkles, UserRound } from "lucide-react";
import { getPrimaryProductImage, products } from "@/lib/products";
import { buildGeneralOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

export function AccountDashboard() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const wishedProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <section className="container-luxe py-12">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Client salon</p>
          <h1 className="mt-3 font-serif text-6xl font-semibold">Welcome back</h1>
          <p className="mt-4 max-w-xl text-ink/70 dark:text-silk/70">
            Revisit your wishlist and place orders directly through WhatsApp with our atelier team.
          </p>
        </div>
        <a
          href={whatsappUrl(buildGeneralOrderMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary w-fit bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
        >
          <MessageCircle className="size-4" />
          Order on WhatsApp
        </a>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          [Heart, String(wishlist.length), "Wishlist"],
          [Sparkles, "Floral amber", "Preferred profile"]
        ].map(([Icon, value, label]) => {
          const TypedIcon = Icon as typeof Heart;
          return (
            <div key={label as string} className="glass rounded-lg p-5">
              <TypedIcon className="size-5 text-moss dark:text-champagne" />
              <p className="mt-4 font-serif text-4xl font-semibold">{value as string}</p>
              <p className="text-sm text-smoke">{label as string}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="glass rounded-lg p-5">
          <div className="flex items-center gap-3">
            <UserRound className="size-5" />
            <h2 className="font-serif text-3xl font-semibold">Wishlist</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {wishedProducts.length === 0 ? (
              <p className="text-sm leading-6 text-smoke">Save fragrances from product cards and they will appear here.</p>
            ) : (
              wishedProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="grid grid-cols-[72px_1fr] gap-3 rounded-lg border border-ink/10 p-2 dark:border-white/10">
                  <div className="relative aspect-square overflow-hidden rounded-md">
                    <Image src={getPrimaryProductImage(product)} alt={product.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{product.name}</p>
                    <p className="text-sm text-smoke">{product.collection}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>  
  );
}
