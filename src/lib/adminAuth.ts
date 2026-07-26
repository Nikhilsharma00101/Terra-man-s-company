import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { User, IUser } from "@/lib/models/User";
import { verifyToken } from "@/lib/auth";

export const ADMIN_EMAIL = "nikhil18981@gmail.com";

export interface AdminAuthResult {
  isAdmin: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
  error?: string;
}

export async function getAdminSession(): Promise<AdminAuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("terra_session")?.value;

    if (!token) {
      return { isAdmin: false, user: null, error: "Authentication required." };
    }

    const payload = verifyToken(token);
    if (!payload || !payload.email) {
      return { isAdmin: false, user: null, error: "Invalid session payload." };
    }

    await connectToDatabase();
    const userDoc = await User.findById(payload.userId);

    const cleanEmail = payload.email.toLowerCase();
    const isDevAdminEmail = cleanEmail === ADMIN_EMAIL.toLowerCase();

    // Check if user exists in DB or if it's dev admin email
    if (!userDoc && !isDevAdminEmail) {
      return { isAdmin: false, user: null, error: "User account not found." };
    }

    // Auto-promote nikhil18981@gmail.com to admin role in DB if needed
    if (userDoc && isDevAdminEmail && userDoc.role !== "admin") {
      userDoc.role = "admin";
      await userDoc.save();
    }

    const role = userDoc?.role || (isDevAdminEmail ? "admin" : "user");
    const isAdmin = isDevAdminEmail || role === "admin";

    if (!isAdmin) {
      return { isAdmin: false, user: null, error: "Forbidden: Admin privileges required." };
    }

    return {
      isAdmin: true,
      user: {
        id: userDoc ? (userDoc._id as string | object).toString() : payload.userId,
        email: cleanEmail,
        name: userDoc?.name || cleanEmail.split("@")[0],
        role: "admin",
      },
    };
  } catch (error) {
    console.error("Error in getAdminSession:", error);
    return { isAdmin: false, user: null, error: "Internal server authentication error." };
  }
}
