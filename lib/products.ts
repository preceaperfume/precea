import localDataJson from "@/data.json";

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
    sizes.find((item) => normalizeSizeLabel(item.size).toLowerCase() === "8 ml") ??
    sizes[0] ??
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
    rating: asNumber(source.rating, 4.8),
    reviews: asNumber(source.reviews, 120),
    kind: normalizeKind(source.kind) ?? "attar",
    notes: normalizeNotes(source.notes),
    description: asString(source.description),
    images: selected.images,
    bestseller: asBoolean(source.bestseller),
    newArrival: asBoolean(source.newArrival)
  };
}

export function normalizeProducts(payload: unknown): Product[] {
  const rows = Array.isArray(payload) ? payload : payload ? [payload] : [];
  return rows.map(normalizeProduct).filter((item): item is Product => item !== null);
}

// ---------------------------------------------------------
// Load and Normalize ALL products from data.json directly
// ---------------------------------------------------------
export const allLocalProducts: Product[] = normalizeProducts(localDataJson);

export const fallbackProducts: Product[] = allLocalProducts;
export const products: Product[] = allLocalProducts;
export const attars: Product[] = allLocalProducts.filter((product) => product.kind === "attar" || !product.kind);
export const perfumes: Product[] = allLocalProducts.filter((product) => product.kind === "parfum");

export const collections = [
  {
    name: "Black Opium",
    copy: "A rich blend of warm spices, vanilla, and deep woody notes, crafted for those who appreciate a powerful and long-lasting signature fragrance.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Kaaf",
    copy: "A refreshing fusion of aquatic, citrus, and soft musk notes that delivers a clean, sophisticated scent perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Kamrah",
    copy: "An opulent composition of amber, vanilla, and precious woods, creating a smooth, rich, and unforgettable luxury attar experience.",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-01",
    name: "Jay Gamit",
    city: "Surat",
    quote: "Amazing fragrance with a premium feel. Precea Attar CR7 smells fresh, classy, and lasts really well.",
    rating: 5,
    productSlug: "cr7-roll-on-attar"
  },
  {
    id: "testimonial-02",
    name: "Ravi chavda",
    city: "Surat",
    quote: "Black Opium has a rich, classy fragrance with a smooth and long-lasting scent. Really loved it!",
    rating: 5,
    productSlug: "black-opium-attar-for-men-sweet-vanilla-soft-spicy-long-lasting-alcohol-free-perfume-oil-roll-on"
  },
  {
    id: "testimonial-03",
    name: "Hiba Shaikh",
    city: "Mumbai",
    quote: "Very attractive fragrance with a fresh and elegant feel. Lasts really well and feels premium.",
    rating: 5,
    productSlug: "dunhill-desire-roll-on-attar"
  }
];

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

let cachedProducts: Product[] | null = null;

/**
 * Returns all products loaded dynamically from data.json on disk (server) or bundled data.json.
 * Cached in-memory to deliver maximum throughput and instantaneous response times.
 */
export async function getProducts(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts;

  if (typeof window === "undefined") {
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "data.json");
      const fileContent = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(fileContent);
      const normalized = normalizeProducts(parsed);
      if (normalized.length > 0) {
        cachedProducts = normalized;
        return normalized;
      }
    } catch {
      // Fallback to imported JSON module
    }
  }
  cachedProducts = allLocalProducts;
  return allLocalProducts;
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
  const perfumesList = allProducts.filter((product) => product.kind === "parfum");
  return perfumesList.length > 0 ? perfumesList : allProducts;
}

export async function getAttars(): Promise<Product[]> {
  const allProducts = await getProducts();
  const attarsList = allProducts.filter((product) => product.kind === "attar" || !product.kind);
  return attarsList.length > 0 ? attarsList : allProducts;
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
