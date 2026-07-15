"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { whatsappUrl, buildGeneralOrderMessage } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

type NavItem = {
  href: string;
  label: string;
  isActive: (pathname: string, searchParams: URLSearchParams) => boolean;
};

const navItems: NavItem[] = [
  // {
  //   href: "/attar",
  //   label: "Attar",
  //   isActive: (pathname) =>
  //     pathname === "/attar" || (pathname.startsWith("/products/") && pathname.includes("-attar"))
  // },
  // {
  //   href: "/products",
  //   label: "Perfumes",
  //   isActive: (pathname, searchParams) =>
  //     (pathname === "/products" && !searchParams.get("collection")) ||
  //     (pathname.startsWith("/products/") && !pathname.includes("-attar"))
  // },
];

function navLinkClass(active: boolean) {
  return [
    "relative py-1 transition hover:text-rosewood dark:hover:text-champagne",
    active
      ? "font-semibold text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-champagne dark:text-champagne"
      : "text-ink/75 dark:text-silk/75"
  ].join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const wishlist = useWishlistStore((state) => state.wishlist);
  const openWishlist = useWishlistStore((state) => state.openWishlist);

  return (
    <header className="header-enter relative sticky top-0 z-50 border-b border-ink/10 bg-silk/80 backdrop-blur-2xl dark:border-white/10 dark:bg-noir/70">
      <div className="container-luxe flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" prefetch className="inline-flex items-start font-serif text-2xl font-semibold tracking-[0.18em]">
          <span>PRECEA</span>
          <span className="-ml-1 -mt-0.4 text-[0.30em] leading-none tracking-normal">TM</span>
        </Link>
        <nav className="hidden items-center gap-10 text-sm font-medium tracking-[0.06em] md:flex">
          {navItems.map((item) => {
            const active = item.isActive(pathname, searchParams);

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={navLinkClass(active)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Open wishlist"
            onClick={openWishlist}
            className="relative grid size-10 place-items-center rounded-full border border-ink/10 bg-white/45 transition hover:border-champagne hover:bg-white/75 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <Heart className="size-4" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-rosewood px-1 text-[10px] font-bold leading-4 text-silk dark:bg-champagne dark:text-ink">
                {wishlist.length}
              </span>
            )}
          </button>

          <a
            href={whatsappUrl(buildGeneralOrderMessage())}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            className="grid size-10 place-items-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:bg-[#1ebe57] hover:shadow-glow"
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteHeaderFallback() {
  return (
    <header className="sticky top-0 z-50 h-[4.5rem] border-b border-ink/10 bg-silk/80 backdrop-blur-2xl dark:border-white/10 dark:bg-noir/70" />
  );
}
