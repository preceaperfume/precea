export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  price: number;
  size: string;
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

export const products: Product[] = [
  // {
  //   id: "parfum-01",
  //   slug: "velvet-iris-absolu",
  //   name: "Velvet Iris Absolu",
  //   collection: "Nocturne Collection",
  //   price: 285,
  //   size: "75 ml",
  //   mood: "Powdered iris, smoked vanilla, silk at midnight",
  //   intensity: "Opulent",
  //   family: "Floral",
  //   rating: 4.9,
  //   reviews: 184,
  //   bestseller: true,
  //   notes: {
  //     top: ["Bergamot", "Pink pepper", "Violet leaf"],
  //     heart: ["Orris butter", "Jasmine sambac", "Suede"],
  //     base: ["Vanilla smoke", "Sandalwood", "Amber resin"]
  //   },
  //   description:
  //     "A couture iris wrapped in cool suede and slow-burning vanilla smoke. Polished, intimate, and impossibly smooth.",
  //   images: [
  //     "https://upload.meeshosupplyassets.com/cataloging/1783141113975/ChatGPTImageMay14202605_44_02PM.png",
  //     "https://upload.meeshosupplyassets.com/cataloging/1783141113975/ChatGPTImageMay14202605_44_02PM.png"
  //   ]
  // },
  {
    "id": "attar-01",
    "slug": "black-opium-attar-for-men-sweet-vanilla-soft-spicy-long-lasting-alcohol-free-perfume-oil-roll-on",
    "name": "Black Opium Attar",
    "collection": "Exotic Attars",
    "price": 349,
    "size": "12 ml",
    "mood": "Damask rose, honeyed petals, warm sandalwood oil",
    "intensity": "Strong",
    "family": "Oriental Vanilla",
    "rating": 4.9,
    "reviews": 156,
    "kind": "attar",
    "bestseller": true,
    "notes": {
      "top": [
        "Pink Pepper",
        "Orange Blossom",
        "Pear"
      ],
      "heart": [
        "Coffee",
        "Jasmine",
        "Bitter Almond",
        "Licorice"
      ],
      "base": [
        "Vanilla",
        "Patchouli",
        "Cedarwood",
        "Cashmere Wood"
      ]
    },
    "description": "Black Opium Attar is a rich blend of warm vanilla, bold coffee, and delicate white florals, creating a sensual and captivating fragrance. Its long-lasting alcohol-free formula is perfect for everyday wear as well as evenings and special occasions.",
    "images": [
      "https://upload.meeshosupplyassets.com/cataloging/1783141113975/ChatGPTImageMay14202605_44_02PM.png",
      "https://upload.meeshosupplyassets.com/cataloging/1783141113975/ChatGPTImageMay14202605_44_02PM.png"
    ]
  },

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
    name: "Ayaan Khan",
    city: "Mumbai",
    quote: "Velvet Iris feels premium from opening to dry down. Smooth projection and elegant for evening wear.",
    rating: 5,
    productSlug: "velvet-iris-absolu"
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

export const DEFAULT_PRODUCT_PREVIEW_IMAGE =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85";

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getPrimaryProductImage(product: Product) {
  return product.images.find(Boolean) ?? DEFAULT_PRODUCT_PREVIEW_IMAGE;
}

export const perfumes = products.filter((product) => product.kind !== "attar");
export const attars = products.filter((product) => product.kind === "attar");

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
