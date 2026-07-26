import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import { products as defaultProducts } from "@/lib/data";

export async function GET() {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    await connectToDatabase();

    let products = await Product.find().sort({ createdAt: -1 }).lean();

    // Auto-seed default products if collection is empty
    if (products.length === 0) {
      const seeded = defaultProducts.map((p) => ({
        productId: p.id,
        name: p.name,
        tagline: p.tagline,
        price: p.price,
        image: p.image,
        category: p.category,
        theme: p.theme,
        ingredients: p.ingredients,
        description: p.description,
        stock: 50,
        isFeatured: true,
        isActive: true,
      }));

      await Product.insertMany(seeded);
      products = await Product.find().sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error in admin products GET:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, tagline, price, image, category, theme, ingredients, description, stock } = body;

    if (!name || !price || !image || !description) {
      return NextResponse.json(
        { success: false, error: "Name, price, image, and description are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const productId = "terra-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);

    const newProduct = await Product.create({
      productId,
      name,
      tagline: tagline || "",
      price: Number(price),
      image,
      category: category || "Grooming",
      theme: theme || "Luxury Ritual",
      ingredients: Array.isArray(ingredients) ? ingredients : (ingredients ? ingredients.split(",").map((s: string) => s.trim()) : []),
      description,
      stock: stock ? Number(stock) : 50,
      isFeatured: true,
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully.",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error in admin products POST:", error);
    return NextResponse.json({ success: false, error: "Failed to create product." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { _id, productId, name, tagline, price, image, category, theme, ingredients, description, stock, isFeatured, isActive } = body;

    if (!_id && !productId) {
      return NextResponse.json({ success: false, error: "Product identifier is required." }, { status: 400 });
    }

    await connectToDatabase();

    const query = _id ? { _id } : { productId };

    const updatePayload: Record<string, unknown> = {};
    if (name !== undefined) updatePayload.name = name;
    if (tagline !== undefined) updatePayload.tagline = tagline;
    if (price !== undefined) updatePayload.price = Number(price);
    if (image !== undefined) updatePayload.image = image;
    if (category !== undefined) updatePayload.category = category;
    if (theme !== undefined) updatePayload.theme = theme;
    if (ingredients !== undefined) {
      updatePayload.ingredients = Array.isArray(ingredients)
        ? ingredients
        : String(ingredients).split(",").map((s) => s.trim()).filter(Boolean);
    }
    if (description !== undefined) updatePayload.description = description;
    if (stock !== undefined) updatePayload.stock = Number(stock);
    if (isFeatured !== undefined) updatePayload.isFeatured = Boolean(isFeatured);
    if (isActive !== undefined) updatePayload.isActive = Boolean(isActive);

    const updatedProduct = await Product.findOneAndUpdate(
      query,
      { $set: updatePayload },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in admin products PUT:", error);
    return NextResponse.json({ success: false, error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const id = searchParams.get("id");

    if (!productId && !id) {
      return NextResponse.json({ success: false, error: "Product ID is required." }, { status: 400 });
    }

    await connectToDatabase();

    const query = id ? { _id: id } : { productId };
    const deleted = await Product.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error in admin products DELETE:", error);
    return NextResponse.json({ success: false, error: "Failed to delete product." }, { status: 500 });
  }
}
