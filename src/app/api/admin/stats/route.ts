import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";
import { User } from "@/lib/models/User";
import { Contact } from "@/lib/models/Contact";
import { Subscriber } from "@/lib/models/Subscriber";
import { Product } from "@/lib/models/Product";
import mongoose from "mongoose";

export async function GET() {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    await connectToDatabase();

    const [
      ordersCount,
      usersCount,
      contactsCount,
      newContactsCount,
      subscribersCount,
      productsCount,
      recentOrders,
      ordersByStatus,
      totalRevenueResult
    ] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Subscriber.countDocuments({ isActive: true }),
      Product.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Order.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),
      Order.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ])
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;
    
    const statusBreakdown: Record<string, number> = {
      pending: 0,
      paid: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };
    ordersByStatus.forEach((item: { _id: string; count: number }) => {
      if (item._id) statusBreakdown[item._id] = item.count;
    });

    const isDbConnected = mongoose.connection.readyState === 1;

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        ordersCount,
        usersCount,
        contactsCount,
        newContactsCount,
        subscribersCount,
        productsCount,
        statusBreakdown,
        dbConnected: isDbConnected,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Error in admin stats route:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard metrics." },
      { status: 500 }
    );
  }
}
