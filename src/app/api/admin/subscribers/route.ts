import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { connectToDatabase } from "@/lib/mongodb";
import { Subscriber } from "@/lib/models/Subscriber";

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
      query.email = new RegExp(search.trim(), "i");
    }

    const subscribers = await Subscriber.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      subscribers,
      count: subscribers.length,
    });
  } catch (error) {
    console.error("Error in admin subscribers GET:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch subscribers." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { subscriberId, isActive } = body;

    if (!subscriberId || isActive === undefined) {
      return NextResponse.json({ success: false, error: "subscriberId and isActive are required." }, { status: 400 });
    }

    await connectToDatabase();

    const updated = await Subscriber.findByIdAndUpdate(
      subscriberId,
      { $set: { isActive: Boolean(isActive) } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Subscriber not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Subscriber status updated.`,
      subscriber: updated,
    });
  } catch (error) {
    console.error("Error in admin subscribers PUT:", error);
    return NextResponse.json({ success: false, error: "Failed to update subscriber." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Subscriber ID is required." }, { status: 400 });
    }

    await connectToDatabase();

    const deleted = await Subscriber.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Subscriber not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber removed successfully.",
    });
  } catch (error) {
    console.error("Error in admin subscribers DELETE:", error);
    return NextResponse.json({ success: false, error: "Failed to delete subscriber." }, { status: 500 });
  }
}
