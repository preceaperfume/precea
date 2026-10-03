"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { PerfumeLoader } from "@/components/perfume-loader";
import { attars, type Product } from "@/lib/products";

import { useWishlistStore } from "@/store/wishlist";

const families = ["All", "Floral", "Amber", "Woody", "Fresh"];
const sizeChoices = [
  { label: "All sizes", value: "all" },
  { label: "8 ml", value: "8 ml" },
  { label: "12 ml", value: "12 ml" }
];

export function AttarFilters({
  products = attars
}: {
  initialCollection?: string;
  products?: Product[];
}) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("All");
  const globalSize = useWishlistStore((state) => state.globalSize);
  const setGlobalSize = useWishlistStore((state) => state.setGlobalSize);

  const filtered = useMemo(() => {
    return products
      .filter((product) => {
        if (family === "All") return true;
        const familyLower = family.toLowerCase();
        const prodFamily = product.family.toLowerCase();
        const prodMood = product.mood.toLowerCase();

        if (prodFamily.includes(familyLower)) return true;
        if (family === "Amber" && (prodFamily.includes("oriental") || prodMood.includes("amber"))) return true;
        return prodMood.includes(familyLower);
      })
      .filter((product) => `${product.name} ${product.mood} ${product.family}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
  }, [family, products, query]);

  return (
    <section className="container-luxe pb-20 pt-8">
      {/* Sleek Filter Bar with Family & Size Switches */}
      <div className="rounded-2xl border border-champagne/40 bg-pearl/70 p-3 sm:p-3.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <label className="relative block flex-1 max-w-full lg:max-w-xs xl:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-smoke" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notes, names, moods"
              className="field h-11 pl-11 text-xs sm:text-sm"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            {/* Global Size Switcher: [All sizes] [8 ml] [12 ml] */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="mr-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-smoke shrink-0">
                Size
              </span>
              {sizeChoices.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => setGlobalSize(item.value)}
                  className={`rounded-full border px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium transition shrink-0 touch-manipulation ${
                    globalSize === item.value
                      ? "border-ink bg-ink text-silk shadow-sm dark:border-silk dark:bg-silk dark:text-ink"
                      : "border-champagne/50 bg-silk/80 text-ink/80 hover:border-champagne hover:bg-pearl dark:border-white/10 dark:bg-white/10 dark:text-silk/85"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden h-5 w-px bg-ink/10 dark:bg-white/10 sm:block" />

            {/* Family Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="mr-1 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-smoke shrink-0">
                <SlidersHorizontal className="size-3.5" />
                Family
              </span>
              {families.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setFamily(item)}
                  className={`rounded-full border px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium transition shrink-0 touch-manipulation ${
                    family === item
                      ? "border-ink bg-ink text-silk shadow-sm dark:border-silk dark:bg-silk dark:text-ink"
                      : "border-champagne/50 bg-silk/80 text-ink/80 hover:border-champagne hover:bg-pearl dark:border-white/10 dark:bg-white/10 dark:text-silk/85"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex items-center justify-between">
        <p className="text-xs sm:text-sm text-smoke">{filtered.length} attars</p>
        <p className="eyebrow hidden sm:block">Traditional concentrated oils</p>
      </div>

      {filtered.length === 0 ? (
        <div className="my-10 flex flex-col items-center justify-center rounded-2xl border border-champagne/30 bg-silk/70 p-8 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-12">
          <div className="relative size-24">
            <PerfumeLoader variant="card" className="!static !size-24 !bg-transparent" />
          </div>
          <h3 className="mt-4 font-serif text-xl sm:text-2xl font-semibold">
            No Essences Found
          </h3>
          <p className="mt-2 max-w-md text-xs sm:text-sm text-smoke">
            {query
              ? `We couldn't find any fragrances matching "${query}". Try searching for floral, sandalwood, amber, or vanilla.`
              : "No fragrances match the selected criteria."}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFamily("All");
            }}
            className="button-secondary mt-5 min-h-[44px] text-xs sm:text-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
