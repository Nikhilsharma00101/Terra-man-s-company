import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  productId: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  images?: string[];
  gallery?: Array<{
    id: string;
    url: string;
    tag: string;
    label: string;
    caption: string;
    hotspots?: Array<{ x: number; y: number; title: string; description: string }>;
    bgTexture?: string;
  }>;
  category: string;
  theme: string;
  ingredients: string[];
  description: string;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    tagline: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    gallery: {
      type: Schema.Types.Mixed,
      default: [],
    },
    category: {
      type: String,
      default: "Grooming",
    },
    theme: {
      type: String,
      default: "Luxury Ritual",
    },
    ingredients: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 50,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
