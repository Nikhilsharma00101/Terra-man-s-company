import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "terra_super_secret_jwt_key_2026";

export function generateOtp(): string {
  // Generate cryptographically strong 6-digit OTP
  const randomNum = crypto.randomInt(100000, 999999);
  return randomNum.toString();
}

export function signToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch (err) {
    return null;
  }
}

export async function sendOtpEmail(email: string, otp: string): Promise<{ sent: boolean; isDevMode: boolean }> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 587,
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Terra Grooming & Rituals" <${smtpUser}>`,
        to: email,
        subject: `${otp} is your Terra Authentication Code`,
        html: `
          <div style="background-color: #0c0c0c; color: #f4f0ea; font-family: serif; padding: 40px 20px; text-align: center;">
            <div style="max-width: 500px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1); padding: 30px; background-color: #121212;">
              <h2 style="letter-spacing: 0.2em; color: #c49a6c; margin-bottom: 20px;">TERRA</h2>
              <p style="font-family: sans-serif; font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.6;">
                Use the single-use authorization code below to log in to your Terra account.
              </p>
              <div style="font-family: monospace; font-size: 36px; letter-spacing: 0.3em; color: #ffffff; background-color: #1a1a1a; border: 1px solid #c49a6c; padding: 15px; margin: 25px 0; font-weight: bold;">
                ${otp}
              </div>
              <p style="font-family: sans-serif; font-size: 12px; color: rgba(255,255,255,0.4);">
                This code expires in 10 minutes. If you did not request this code, please ignore this email.
              </p>
            </div>
          </div>
        `,
      });
      return { sent: true, isDevMode: false };
    } catch (err) {
      console.error("Failed to send email via SMTP:", err);
      // Fallback to dev mode logging
    }
  }

  // Development mode fallback logging
  console.log("==========================================");
  console.log(`[TERRA AUTH OTP DEV] Email: ${email} | OTP: ${otp}`);
  console.log("==========================================");
  return { sent: true, isDevMode: true };
}
