import Link from "next/link";
import { Instagram, Mail, MessageCircle, Twitter } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { buildGeneralOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-silk dark:border-white/10 dark:bg-noir">
      <div className="container-luxe grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <p className="font-serif text-3xl font-semibold">OSCII</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-silk/70">
            A modern fragrance house composing rare materials into cinematic signatures for daily ritual.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Twitter, Mail].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social link"
                className="grid size-10 place-items-center rounded-full border border-white/12 transition hover:border-champagne hover:text-champagne"
              >
                <Icon className="size-4" />
              </a>
            ))}
            <a
              href={whatsappUrl(buildGeneralOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="grid size-10 place-items-center rounded-full border border-white/12 transition hover:border-[#25D366] hover:text-[#25D366]"
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>
        <div className="grid gap-3 text-sm text-silk/70">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne">Maison</p>
          <Link href="/products">Perfumes</Link>
          <Link href="/attar">Attar</Link>
          <Link href="/account">Wishlist</Link>
          <a href={whatsappUrl(buildGeneralOrderMessage())} target="_blank" rel="noopener noreferrer">
            Order on WhatsApp
          </a>
        </div>
        <NewsletterForm />
      </div>
    </footer>
  );
}
