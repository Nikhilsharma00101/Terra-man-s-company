import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Otp } from "@/lib/models/Otp";
import { User } from "@/lib/models/User";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP code are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    await connectToDatabase();

    // Verify OTP record
    const otpRecord = await Otp.findOne({
      email: cleanEmail,
      otp: cleanOtp,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired verification code. Please request a new code." },
        { status: 400 }
      );
    }

    // Delete verified OTP record
    await Otp.deleteOne({ _id: otpRecord._id });

    const isDevAdmin = cleanEmail === "nikhil18981@gmail.com";
    let user = await User.findOne({ email: cleanEmail });
    if (!user) {
      user = await User.create({
        email: cleanEmail,
        name: cleanEmail.split("@")[0],
        role: isDevAdmin ? "admin" : "user",
        lastLoginAt: new Date(),
      });
    } else {
      user.lastLoginAt = new Date();
      if (isDevAdmin) {
        user.role = "admin";
      }
      await user.save();
    }

    // Generate JWT token
    const token = signToken({
      userId: (user._id as string | object).toString(),
      email: user.email,
    });

    // Create Response and set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: {
        id: (user._id as string | object).toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    });

    response.cookies.set("terra_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    console.error("Error in verify-otp API:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to verify OTP.";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
