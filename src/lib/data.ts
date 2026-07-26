export type ProductHotspot = {
  x: number;
  y: number;
  title: string;
  description: string;
};

export type ProductGalleryItem = {
  id: string;
  url: string;
  tag: "STUDIO" | "TEXTURE" | "RITUAL" | "DETAIL";
  label: string;
  caption: string;
  hotspots?: ProductHotspot[];
  bgTexture?: string;
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  images?: string[];
  gallery?: ProductGalleryItem[];
  category: string;
  theme: string;
  ingredients: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: "terra-face-wash",
    name: "TERRA Deep Clean Face Wash",
    tagline: "Ideal for Oily & Acne Prone Skin | Niacinamide, Salicylic Acid & Hyaluronic Acid",
    price: 899,
    image: "/images/products/face-wash/front-side.jpeg",
    images: [
      "/images/products/face-wash/front-side.jpeg",
      "/images/products/face-wash/back-side.jpeg",
      "/images/products/face-wash/texture-view.png",
      "/images/products/face-wash/ritual-view.png"
    ],
    gallery: [
      {
        id: "fw-01",
        url: "/images/products/face-wash/front-side.jpeg",
        tag: "STUDIO",
        label: "01 Front View",
        caption: "TERRA Deep Clean Face Wash 100ml — Niacinamide, Salicylic Acid & Hyaluronic Acid.",
      },
      {
        id: "fw-02",
        url: "/images/products/face-wash/back-side.jpeg",
        tag: "DETAIL",
        label: "02 Ingredients & Caution",
        caption: "Full ingredient breakdown, directions of use, and caution advisory.",
      },
      {
        id: "fw-03",
        url: "/images/products/face-wash/texture-view.png",
        tag: "TEXTURE",
        label: "03 Active Lather",
        caption: "Sulfate-free, paraben-free, cruelty-free deep cleansing gel.",
        bgTexture: "/images/water-ripple.png",
      },
      {
        id: "fw-04",
        url: "/images/products/face-wash/ritual-view.png",
        tag: "RITUAL",
        label: "04 Daily Ritual",
        caption: "Twice daily cleansing for clear, balanced, oil-free skin.",
      }
    ],
    category: "Skincare",
    theme: "Deep Clean, Oil Control, Acne Defense",
    ingredients: ["Niacinamide", "Salicylic Acid", "Hyaluronic Acid", "Green Tea Extract", "Tea Tree Extract"],
    description: "Specially formulated for oily and acne-prone skin. Enriched with Niacinamide to improve skin texture, Salicylic Acid to unclog pores, Hyaluronic Acid for deep hydration, and Green Tea & Tea Tree extracts to soothe and control excess oil. 100% Sulfate Free, Paraben Free, and Cruelty Free.",
  },
  {
    id: "terra-beard-oil",
    name: "TERRA Beard Nourishing Oil",
    tagline: "Nourishes, Softens, Strengthens. Relieves Dryness & Comforts Your Beard.",
    price: 999,
    image: "/images/products/beard-oil/front-side.jpeg",
    images: [
      "/images/products/beard-oil/front-side.jpeg",
      "/images/products/beard-oil/back-side.jpeg",
      "/images/products/beard-oil/texture-view.png",
      "/images/products/beard-oil/ritual-view.png"
    ],
    gallery: [
      {
        id: "bo-01",
        url: "/images/products/beard-oil/front-side.jpeg",
        tag: "STUDIO",
        label: "01 Front View",
        caption: "TERRA Beard Nourishing Oil 30ml in UV-protective glass bottle.",
      },
      {
        id: "bo-02",
        url: "/images/products/beard-oil/back-side.jpeg",
        tag: "DETAIL",
        label: "02 Formula Details",
        caption: "Infused with Jojoba, Argan, Almond, Castor, Black Seed & Lavender oils.",
      },
      {
        id: "bo-03",
        url: "/images/products/beard-oil/texture-view.png",
        tag: "TEXTURE",
        label: "03 Golden Elixir",
        caption: "Silky, fast-absorbing botanical oil blend for maximum softening.",
      },
      {
        id: "bo-04",
        url: "/images/products/beard-oil/ritual-view.png",
        tag: "RITUAL",
        label: "04 Grooming Ritual",
        caption: "Apply 2-3 drops daily to nourish facial hair and skin underneath.",
      }
    ],
    category: "Grooming",
    theme: "Beard Nourishment, Softening, Dryness Relief",
    ingredients: ["Almond Oil", "Jojoba Oil", "Argan Oil", "Castor Oil", "Black Seed Oil", "Lavender Oil", "Vitamin E"],
    description: "Designed to nourish, soften, and strengthen facial hair while relieving itchiness and skin dryness underneath. Formulated with a botanical blend of Sweet Almond, Jojoba, Argan, Castor, Black Seed, and Lavender essential oils with Vitamin E for daily grooming luxury.",
  }
];
