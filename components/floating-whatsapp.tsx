import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { buildGeneralOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const href = whatsappUrl(buildGeneralOrderMessage());

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float group fixed bottom-5 left-5 z-[60] grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition hover:scale-105 hover:bg-[#1ebe57] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:left-6 sm:size-[3.75rem] dark:focus-visible:ring-offset-noir"
    >
      <span className="whatsapp-float-ripple" aria-hidden="true" />
      <span className="whatsapp-float-ripple whatsapp-float-ripple-delay" aria-hidden="true" />
      <WhatsAppIcon className="relative z-10 size-7 sm:size-8" />
    </a>
  );
}
