import type { Product } from "@/lib/products";
import { formatPrice, getPrimaryProductImage } from "@/lib/products";

export const WHATSAPP_NUMBER = "918849181879";

export function buildProductOrderMessage(product: Product) {
  const primaryImage = getPrimaryProductImage(product);

  return [
    "Hello PRECEA™, I would like to order:",
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
  return "Hello PRECEA™, I would like to place a fragrance order. Please share your current collection and delivery details.";
}

export function buildSignatureOrderMessage() {
  return [
    "Hello PRECEA™, I would like to order:",
    "",
    "*Signature*",
    "Type: Extrait de Parfum",
    "Collection: PRECEA Signature",
    "",
    "Please confirm availability, sizes, price, and delivery details."
  ].join("\n");
}

export function buildWishlistOrderMessage(items: Product[]) {
  if (items.length === 0) return buildGeneralOrderMessage();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const lines = [
    "Hello PRECEA™, I would like to order the following from my Wishlist:",
    ""
  ];

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. *${item.name}* (${item.size}) - ${formatPrice(item.price)}`
    );
  });

  lines.push("");
  lines.push(`*Estimated Total:* ${formatPrice(total)}`);
  lines.push("");
  lines.push("Please confirm availability and delivery details.");

  return lines.join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppUrl(product: Product) {
  return whatsappUrl(buildProductOrderMessage(product));
}
