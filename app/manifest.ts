import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PRECEA™ | Modern Luxury Fragrance House",
    short_name: "PRECEA",
    description: "Handcrafted luxury attars and fine perfumes made with natural oils and timeless notes.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7ef",
    theme_color: "#11100e",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png"
      }
    ]
  };
}
