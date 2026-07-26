import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    await connectToDatabase();

    const query: Record<string, unknown> = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { orderId: searchRegex },
        { "customer.fullName": searchRegex },
        { "customer.email": searchRegex },
        { "customer.city": searchRegex },
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length,
    });
  } catch (error) {
    console.error("Error in admin orders GET:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: "orderId and status are required." }, { status: 400 });
    }

    const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid order status." }, { status: 400 });
    }

    await connectToDatabase();

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { $set: { status } },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, error: "Order not found." }, { status: 444 });
    }

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${status}.`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error in admin orders PUT:", error);
    return NextResponse.json({ success: false, error: "Failed to update order." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ success: false, error: "orderId is required." }, { status: 400 });
    }

    await connectToDatabase();

    const deleted = await Order.findOneAndDelete({ orderId });

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order successfully deleted.",
    });
  } catch (error) {
    console.error("Error in admin orders DELETE:", error);
    return NextResponse.json({ success: false, error: "Failed to delete order." }, { status: 500 });
  }
}
