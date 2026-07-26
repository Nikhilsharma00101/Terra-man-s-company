import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";

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
        { name: searchRegex },
        { email: searchRegex },
        { subject: searchRegex },
        { message: searchRegex },
      ];
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      contacts,
      count: contacts.length,
    });
  } catch (error) {
    console.error("Error in admin contacts GET:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch contact inquiries." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { contactId, status } = body;

    if (!contactId || !status) {
      return NextResponse.json({ success: false, error: "contactId and status are required." }, { status: 400 });
    }

    if (!["new", "read", "replied"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status value." }, { status: 400 });
    }

    await connectToDatabase();

    const updated = await Contact.findByIdAndUpdate(
      contactId,
      { $set: { status } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry status updated to ${status}.`,
      contact: updated,
    });
  } catch (error) {
    console.error("Error in admin contacts PUT:", error);
    return NextResponse.json({ success: false, error: "Failed to update inquiry status." }, { status: 500 });
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
      return NextResponse.json({ success: false, error: "Inquiry ID is required." }, { status: 400 });
    }

    await connectToDatabase();

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Error in admin contacts DELETE:", error);
    return NextResponse.json({ success: false, error: "Failed to delete inquiry." }, { status: 500 });
  }
}
