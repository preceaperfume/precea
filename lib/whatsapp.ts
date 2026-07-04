import type { Product } from "@/lib/products";
import { formatPrice, getPrimaryProductImage } from "@/lib/products";

export const WHATSAPP_NUMBER = "917359657806";

export function buildProductOrderMessage(product: Product) {
  const primaryImage = getPrimaryProductImage(product);

  return [
    "Hello OSCII, I would like to order:",
    "",
    `*${product.name}*`,
    `Type: ${product.kind === "attar" ? "Attar" : "Perfume"}`,
    `Collection: ${product.collection}`,
    `Size: ${product.size}`,
    `Price: ${formatPrice(product.price)}`,
    ...(primaryImage ? ["", "Product image:", primaryImage] : []),
    "",
    "Please confirm availability and delivery details."
  ].join("\n");
}

export function buildGeneralOrderMessage() {
  return "Hello OSCII, I would like to place a fragrance order. Please share your current collection and delivery details.";
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppUrl(product: Product) {
  return whatsappUrl(buildProductOrderMessage(product));
}
