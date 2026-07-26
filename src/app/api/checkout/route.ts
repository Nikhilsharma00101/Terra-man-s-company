import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, totalAmount, paymentMethod } = body;

    if (!customer || !items || !items.length || !totalAmount) {
      return NextResponse.json(
        { success: false, error: "Invalid order payload. Missing customer details or items." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const orderId = "TERRA-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder = await Order.create({
      orderId,
      customer,
      items,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully.",
        orderId: newOrder.orderId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error saving order:", error);
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
