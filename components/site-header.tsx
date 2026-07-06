"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, MessageCircle, Heart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { whatsappUrl, buildGeneralOrderMessage } from "@/lib/whatsapp";
import { useWishlistStore } from "@/store/wishlist";

type NavItem = {
  href: string;
  label: string;
  isActive: (pathname: string, searchParams: URLSearchParams) => boolean;
};

const navItems: NavItem[] = [
  {
    href: "/attar",
    label: "Attar",
    isActive: (pathname) =>
      pathname === "/attar" || (pathname.startsWith("/products/") && pathname.includes("-attar"))
  },
  {
    href: "/products",
    label: "Perfumes",
    isActive: (pathname, searchParams) =>
      (pathname === "/products" && !searchParams.get("collection")) ||
      (pathname.startsWith("/products/") && !pathname.includes("-attar"))
  },

];

function navLinkClass(active: boolean, mobile = false) {
  return [
    mobile ? "block rounded-xl px-4 py-3 text-base" : "relative py-1",
    "transition hover:text-rosewood dark:hover:text-champagne",
    active
      ? mobile
        ? "bg-white/60 font-semibold text-ink dark:bg-white/10 dark:text-champagne"
        : "font-semibold text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-champagne dark:text-champagne"
      : mobile
        ? "text-ink/80 dark:text-silk/80"
        : "text-ink/75 dark:text-silk/75"
  ].join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const openWishlist = useWishlistStore((state) => state.openWishlist);

  
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="header-enter relative sticky top-0 z-50 border-b border-ink/10 bg-silk/80 backdrop-blur-2xl dark:border-white/10 dark:bg-noir/70">
      <div className="container-luxe flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" prefetch className="font-serif text-2xl font-semibold tracking-[0.18em]">
          PRECEA
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
            <MessageCircle className="size-4" />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white/45 transition hover:border-champagne hover:bg-white/75 md:hidden dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 top-[4.5rem] z-40 bg-ink/20 backdrop-blur-[2px] md:hidden dark:bg-black/40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        id="mobile-nav"
        aria-hidden={!menuOpen}
        className={`absolute left-0 right-0 top-full z-50 border-b border-ink/10 bg-silk/95 px-5 py-4 shadow-luxe backdrop-blur-2xl transition duration-300 md:hidden dark:border-white/10 dark:bg-noir/95 ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = item.isActive(pathname, searchParams);

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={navLinkClass(active, true)}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <a
          href={whatsappUrl(buildGeneralOrderMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary mt-4 w-full bg-[#25D366] hover:bg-[#1ebe57] dark:bg-[#25D366] dark:text-white dark:hover:bg-[#1ebe57]"
          onClick={() => setMenuOpen(false)}
        >
          <MessageCircle className="size-4" />
          Order on WhatsApp
        </a>
      </nav>
    </header>
  );
}

export function SiteHeaderFallback() {
  return (
    <header className="sticky top-0 z-50 h-[4.5rem] border-b border-ink/10 bg-silk/80 backdrop-blur-2xl dark:border-white/10 dark:bg-noir/70" />
  );
}
