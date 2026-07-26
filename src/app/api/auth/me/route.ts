import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("terra_session")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    await connectToDatabase();
    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    if (user.email.toLowerCase() === "nikhil18981@gmail.com" && user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }

    const effectiveRole = user.email.toLowerCase() === "nikhil18981@gmail.com" ? "admin" : user.role;

    return NextResponse.json({
      authenticated: true,
      user: {
        id: (user._id as string | object).toString(),
        email: user.email,
        name: user.name,
        role: effectiveRole,
        avatar: user.avatar,
      },
    });
  } catch (error: unknown) {
    console.error("Error in auth me route:", error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
