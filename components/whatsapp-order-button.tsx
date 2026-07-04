import { MessageCircle } from "lucide-react";
import type { Product } from "@/lib/products";
import { buildGeneralOrderMessage, productWhatsAppUrl, whatsappUrl } from "@/lib/whatsapp";

type Props = {
  product?: Product;
  className?: string;
  children?: React.ReactNode;
};

export function WhatsAppOrderButton({ product, className = "button-primary w-full", children }: Props) {
  const href = product ? productWhatsAppUrl(product) : whatsappUrl(buildGeneralOrderMessage());

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <MessageCircle className="size-4" />
      {children ?? "Order on WhatsApp"}
    </a>
  );
}
