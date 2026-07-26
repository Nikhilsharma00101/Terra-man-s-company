import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Otp } from "@/lib/models/Otp";
import { generateOtp, sendOtpEmail } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    await connectToDatabase();

    // Delete existing OTPs for this email
    await Otp.deleteMany({ email: cleanEmail });

    // Generate new OTP
    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    await Otp.create({
      email: cleanEmail,
      otp: otpCode,
      expiresAt,
    });

    const { isDevMode } = await sendOtpEmail(cleanEmail, otpCode);

    return NextResponse.json(
      {
        success: true,
        message: `Verification code sent to ${cleanEmail}`,
        devOtp: isDevMode ? otpCode : undefined,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error in send-otp API:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to send OTP.";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
