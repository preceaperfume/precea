import Link from "next/link";
import { Instagram, Mail, Facebook } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { buildGeneralOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-silk dark:border-white/10 dark:bg-noir">
      <div className="container-luxe grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="inline-flex items-start font-serif text-3xl font-semibold">
            <span>PRECEA</span>
            <span className="-ml-1 -mt-0.4 text-[0.25em] leading-none tracking-normal">TM</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-silk/70">
            A modern fragrance house composing rare materials into cinematic signatures for daily ritual.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Mail].map((Icon, index) => (
              <a
                key={index}
                href="https://www.instagram.com/preceaperfume?igsh=cHB5dHZxNWljcHhn"
                aria-label="Social link"
                target="_blank"
                className="grid size-10 place-items-center rounded-full border border-white/12 transition hover:border-champagne hover:text-champagne"
              >
                <Icon className="size-5" />
              </a>
            ))}
            <a
              href={whatsappUrl(buildGeneralOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="grid size-10 place-items-center rounded-full border border-white/12 transition hover:border-[#25D366] hover:text-[#25D366]"
            >
              <WhatsAppIcon className="size-6" />
            </a>
          </div>
        </div>
        {/* <div className="grid gap-3 text-sm text-silk/70">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne">Maison</p>
          <Link href="/products">Perfumes</Link>
          <Link href="/attar">Attar</Link>
          <a href={whatsappUrl(buildGeneralOrderMessage())} target="_blank" rel="noopener noreferrer">
            Order on WhatsApp
          </a>
        </div> */}
        <NewsletterForm />
      </div>
    </footer>
  );
}
