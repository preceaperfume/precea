import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Attar",
  description: "Shop PRECEA traditional attars — concentrated perfume oils distilled with rare botanicals and aged sandalwood."
};

export default function AttarPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-luxe-radial py-14 dark:border-white/10">
        <div className="container-luxe">
          <p className="eyebrow">ATTAR COLLECTION</p>
          <h1 className="mt-3 max-w-3xl font-serif text-6xl font-semibold leading-none">
            Find concentrated attars crafted for long-lasting wear
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70 dark:text-silk/70">
            Search by mood, filter by family, and sort traditional attar compositions with precision.
          </p>
          <Link href="/" className="button-secondary mt-8 w-fit">
            Browse attars on home page
          </Link>
        </div>
      </section>
    </>
  );
}
