"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { perfumes, type Product } from "@/lib/products";

const families = ["All", "Floral", "Amber", "Woody", "Fresh"];
const sortOptions = ["Featured", "Price low", "Price high", "Rating"];

export function ProductFilters({
  initialCollection,
  products = perfumes
}: {
  initialCollection?: string;
  products?: Product[];
}) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [collection, setCollection] = useState(initialCollection ?? "All");
  const collections = ["All", ...Array.from(new Set(products.map((product) => product.collection)))];

  const filtered = useMemo(() => {
    return products
      .filter((product) => (family === "All" ? true : product.family === family))
      .filter((product) => (collection === "All" ? true : product.collection === collection))
      .filter((product) => `${product.name} ${product.mood} ${product.family}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (sort === "Price low") return a.price - b.price;
        if (sort === "Price high") return b.price - a.price;
        if (sort === "Rating") return b.rating - a.rating;
        return Number(b.bestseller) - Number(a.bestseller);
      });
  }, [collection, family, products, query, sort]);

  return (
    <section className="container-luxe pb-20 pt-8">
      <div className="rounded-2xl border border-champagne/40 bg-pearl/70 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
        <div className="grid gap-3 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-smoke" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notes, names, moods"
              className="field pl-11"
            />
          </label>
          <select value={collection} onChange={(event) => setCollection(event.target.value)} className="field">
            {collections.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select value={sort} onChange={(event) => setSort(event.target.value)} className="field">
            {sortOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
            <SlidersHorizontal className="size-4" />
            Family
          </span>
          {families.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFamily(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                family === item
                  ? "border-ink bg-ink text-silk dark:border-silk dark:bg-silk dark:text-ink"
                  : "border-champagne/50 bg-silk/80 text-ink/80 hover:border-champagne hover:bg-pearl dark:border-white/10 dark:bg-white/10 dark:text-silk/85"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-smoke">{filtered.length} perfumes</p>
        <p className="eyebrow hidden sm:block">Extrait focused compositions</p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
