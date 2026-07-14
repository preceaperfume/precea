export type ProductSize = {
  size: string;
  price: number;
  images: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  price: number;
  size: string;
  sizes: ProductSize[];
  mood: string;
  intensity: string;
  family: string;
  rating: number;
  reviews: number;
  kind?: "parfum" | "attar";
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string;
  images: string[];
  bestseller?: boolean;
  newArrival?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: 4 | 5;
  productSlug: string;
};

type ApiProductSize = {
  size?: unknown;
  price?: unknown;
  images?: unknown;
};

type ApiProduct = {
  id?: unknown;
  slug?: unknown;
  name?: unknown;
  collection?: unknown;
  price?: unknown;
  size?: unknown;
  sizes?: unknown;
  mood?: unknown;
  intensity?: unknown;
  family?: unknown;
  rating?: unknown;
  reviews?: unknown;
  kind?: unknown;
  notes?: unknown;
  description?: unknown;
  images?: unknown;
  bestseller?: unknown;
  newArrival?: unknown;
};

export const DEFAULT_PRODUCT_PREVIEW_IMAGE =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85";

export const GITHUB_PRODUCTS_URL =
  "https://raw.githubusercontent.com/preceaperfume/precea/main/data.json";

const fallbackProducts: Product[] = [
  {
    id: "attar-01",
    slug: "black-opium-attar-for-men-sweet-vanilla-soft-spicy-long-lasting-alcohol-free-perfume-oil-roll-on",
    name: "Black Opium Attar",
    collection: "Exotic Attars",
    price: 349,
    size: "12 ml",
    sizes: [
      {
        size: "8 ml",
        price: 249,
        images: [
          "https://upload.meeshosupplyassets.com/cataloging/1783141113975/ChatGPTImageMay14202605_44_02PM.png"
        ]
      },
      {
        size: "12 ml",
        price: 349,
        images: [
          "https://upload.meeshosupplyassets.com/cataloging/1783141113975/ChatGPTImageMay14202605_44_02PM.png"
        ]
      }
    ],
    mood: "Damask rose, honeyed petals, warm sandalwood oil",
    intensity: "Strong",
    family: "Oriental Vanilla",
    rating: 4.9,
    reviews: 156,
    kind: "attar",
    bestseller: true,
    notes: {
      top: ["Pink Pepper", "Orange Blossom", "Pear"],
      heart: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cedarwood", "Cashmere Wood"]
    },
    description:
      "Black Opium Attar is a rich blend of warm vanilla, bold coffee, and delicate white florals, creating a sensual and captivating fragrance. Its long-lasting alcohol-free formula is perfect for everyday wear as well as evenings and special occasions.",
    images: [
      "https://upload.meeshosupplyassets.com/cataloging/1783141113975/ChatGPTImageMay14202605_44_02PM.png"
    ]
  }
];

export const collections = [
  {
    name: "Nocturne Collection",
    copy: "Smoky florals and ambered woods composed for evening ritual.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Atelier Reserve",
    copy: "Rare materials, extrait strength, and intimate projection.",
    image: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Riviera Mornings",
    copy: "Fresh signatures with linen, citrus, salt, and sun-warmed skin.",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-01",
    name: "Ravi chavda",
    city: "Surat",
    quote: "Velvet Iris feels premium from opening to dry down. Smooth projection and elegant for evening wear.",
    rating: 5,
    productSlug: "black-opium-attar-for-men-sweet-vanilla-soft-spicy-long-lasting-alcohol-free-perfume-oil-roll-on"
  },
  {
    id: "testimonial-02",
    name: "Hiba Shaikh",
    city: "Hyderabad",
    quote: "Gulab Noor Attar lasts all day on my skin. Rich rose with beautiful sandalwood warmth.",
    rating: 5,
    productSlug: "gulab-noor-attar"
  },
  {
    id: "testimonial-03",
    name: "Rehan Ali",
    city: "Delhi",
    quote: "Packaging and support were excellent, and the scent quality is way above what I expected.",
    rating: 4,
    productSlug: "velvet-iris-absolu"
  }
];

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asBoolean(value: unknown) {
  return value === true;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.length > 0) : [];
}

const SIZE_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1596367407372-96cb88503db6?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=1200&q=85"
];

function isUsableImageUrl(url: string) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) return false;
  if (url.includes("your-domain.com")) return false;
  return true;
}

function hashSeed(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

function sanitizeImages(images: string[]) {
  return images.filter((url) => url.startsWith("http://") || url.startsWith("https://"));
}

/** Prefer real CDN URLs; for placeholder hosts, use distinct images per product + size. */
export function resolveProductImages(productId: string, size: string, images: string[]) {
  const usable = images.filter(isUsableImageUrl);
  if (usable.length > 0) return usable;

  const seed = hashSeed(`${productId}:${normalizeSizeLabel(size).toLowerCase()}`);
  const primary = SIZE_FALLBACK_IMAGES[seed % SIZE_FALLBACK_IMAGES.length];
  const secondary = SIZE_FALLBACK_IMAGES[(seed + 2) % SIZE_FALLBACK_IMAGES.length];
  return Array.from(new Set([primary, secondary]));
}

export function getResolvedImages(product: Product) {
  return resolveProductImages(product.id, product.size, product.images);
}

function normalizeSizeLabel(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function preferDefaultSize(sizes: ProductSize[]) {
  return (
    sizes.find((item) => normalizeSizeLabel(item.size).toLowerCase() === "12 ml") ??
    sizes[sizes.length - 1] ??
    null
  );
}

function normalizeProductSizes(raw: ApiProduct): ProductSize[] {
  if (Array.isArray(raw.sizes) && raw.sizes.length > 0) {
    return raw.sizes
      .map((entry) => {
        const size = entry as ApiProductSize;
        const label = normalizeSizeLabel(asString(size.size));
        if (!label) return null;
        return {
          size: label,
          price: asNumber(size.price),
          images: sanitizeImages(asStringArray(size.images))
        } satisfies ProductSize;
      })
      .filter((item): item is ProductSize => item !== null);
  }

  const legacySize = normalizeSizeLabel(asString(raw.size, "12 ml"));
  return [
    {
      size: legacySize || "12 ml",
      price: asNumber(raw.price),
      images: sanitizeImages(asStringArray(raw.images))
    }
  ];
}

function normalizeKind(value: unknown): Product["kind"] | undefined {
  if (value === "attar" || value === "parfum") return value;
  return undefined;
}

function normalizeNotes(value: unknown): Product["notes"] {
  const notes = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    top: asStringArray(notes.top),
    heart: asStringArray(notes.heart),
    base: asStringArray(notes.base)
  };
}

export function normalizeProduct(raw: unknown): Product | null {
  if (!raw || typeof raw !== "object") return null;

  const source = raw as ApiProduct;
  const id = asString(source.id);
  const slug = asString(source.slug);
  const name = asString(source.name);
  if (!id || !slug || !name) return null;

  const sizes = normalizeProductSizes(source);
  if (sizes.length === 0) return null;

  const selected = preferDefaultSize(sizes) ?? sizes[0];

  return {
    id,
    slug,
    name,
    collection: asString(source.collection, "PRECEA"),
    price: selected.price,
    size: selected.size,
    sizes,
    mood: asString(source.mood),
    intensity: asString(source.intensity),
    family: asString(source.family),
    rating: asNumber(source.rating),
    reviews: asNumber(source.reviews),
    kind: normalizeKind(source.kind),
    notes: normalizeNotes(source.notes),
    description: asString(source.description),
    images: selected.images,
    bestseller: asBoolean(source.bestseller),
    newArrival: asBoolean(source.newArrival)
  };
}

function normalizeProducts(payload: unknown): Product[] {
  const rows = Array.isArray(payload) ? payload : payload ? [payload] : [];
  return rows.map(normalizeProduct).filter((item): item is Product => item !== null);
}

export function getProductSizeOption(product: Product, sizeLabel: string) {
  const target = normalizeSizeLabel(sizeLabel).toLowerCase();
  return (
    product.sizes.find((item) => normalizeSizeLabel(item.size).toLowerCase() === target) ??
    product.sizes[0]
  );
}

export function withSelectedSize(product: Product, sizeLabel: string): Product {
  const selected = getProductSizeOption(product, sizeLabel);
  if (!selected) return product;

  return {
    ...product,
    size: selected.size,
    price: selected.price,
    images: selected.images
  };
}

export async function fetchProductsFromGithub(): Promise<Product[]> {
  try {
    const response = await fetch(GITHUB_PRODUCTS_URL, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return fallbackProducts;

    const payload = (await response.json()) as unknown;
    const remoteProducts = normalizeProducts(payload);
    return remoteProducts.length > 0 ? remoteProducts : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getProducts(): Promise<Product[]> {
  return fetchProductsFromGithub();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const allProducts = await getProducts();
  return allProducts.find((product) => product.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getPrimaryProductImage(product: Product) {
  return getResolvedImages(product)[0] ?? DEFAULT_PRODUCT_PREVIEW_IMAGE;
}

export async function getPerfumes(): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter((product) => product.kind !== "attar");
}

export async function getAttars(): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter((product) => product.kind === "attar");
}

export const products = fallbackProducts;
export const perfumes = products.filter((product) => product.kind !== "attar");
export const attars = products.filter((product) => product.kind === "attar");

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
