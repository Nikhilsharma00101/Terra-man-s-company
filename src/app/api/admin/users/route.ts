import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { Order } from "@/lib/models/Order";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    await connectToDatabase();

    const query: Record<string, unknown> = {};
    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [{ email: searchRegex }, { name: searchRegex }];
    }

    const users = await User.find(query).sort({ createdAt: -1 }).lean();

    // Fetch order counts per user email
    const userEmails = users.map((u) => u.email);
    const orderCounts = await Order.aggregate([
      { $match: { "customer.email": { $in: userEmails } } },
      { $group: { _id: "$customer.email", count: { $sum: 1 } } },
    ]);

    const orderCountMap = new Map<string, number>();
    orderCounts.forEach((item: { _id: string; count: number }) => {
      if (item._id) orderCountMap.set(item._id.toLowerCase(), item.count);
    });

    const enrichedUsers = users.map((u) => ({
      id: (u._id as string | object).toString(),
      email: u.email,
      name: u.name,
      role: u.email.toLowerCase() === "nikhil18981@gmail.com" ? "admin" : u.role,
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
      totalOrders: orderCountMap.get(u.email.toLowerCase()) || 0,
    }));

    return NextResponse.json({
      success: true,
      users: enrichedUsers,
      count: enrichedUsers.length,
    });
  } catch (error) {
    console.error("Error in admin users GET:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json({ success: false, error: "userId and role are required." }, { status: 400 });
    }

    if (role !== "user" && role !== "admin") {
      return NextResponse.json({ success: false, error: "Role must be 'user' or 'admin'." }, { status: 400 });
    }

    await connectToDatabase();

    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
    }

    // Prevent demoting primary dev admin
    if (userToUpdate.email.toLowerCase() === "nikhil18981@gmail.com" && role === "user") {
      return NextResponse.json(
        { success: false, error: "Cannot demote primary development admin (nikhil18981@gmail.com)." },
        { status: 400 }
      );
    }

    userToUpdate.role = role;
    await userToUpdate.save();

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}.`,
      user: {
        id: (userToUpdate._id as string | object).toString(),
        email: userToUpdate.email,
        name: userToUpdate.name,
        role: userToUpdate.role,
      },
    });
  } catch (error) {
    console.error("Error in admin users PUT:", error);
    return NextResponse.json({ success: false, error: "Failed to update user role." }, { status: 500 });
  }
}
