export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  category: string;
  theme: string;
  ingredients: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: "terra-face-wash",
    name: "TERRA Purifying Face Wash",
    tagline: "Deep Cleansing. Matte Finish. Raw Energy.",
    price: 899,
    image: "/images/face-wash.png",
    category: "Skincare",
    theme: "Freshness, Deep cleansing, Matte masculine skincare",
    ingredients: ["Activated Charcoal", "Volcanic Ash", "Eucalyptus Extract"],
    description: "Experience the ultimate reset. Formulated for the modern man, this rich purifying wash removes impurities while maintaining your skin's natural moisture barrier. Activated charcoal and volcanic ash work in tandem to draw out toxins, leaving a confident, matte finish.",
  },
  {
    id: "terra-beard-oil",
    name: "TERRA Signature Beard Oil",
    tagline: "Masculine Sophistication. Warm Ambience.",
    price: 999,
    image: "/images/beard-oil.png",
    category: "Grooming",
    theme: "Masculine sophistication, Warm earthy oils, Luxury beard ritual",
    ingredients: ["Argan Oil", "Sandalwood", "Black Pepper Extract"],
    description: "A testament to quiet confidence. This premium elixir softens, nourishes, and tames your beard while delivering a signature earthy aroma. Infused with warm sandalwood and a hint of black pepper, it elevates your daily ritual into a moment of pure luxury.",
  }
];
