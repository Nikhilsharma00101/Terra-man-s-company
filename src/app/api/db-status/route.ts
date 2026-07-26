import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          connected: false,
          status: "missing_uri",
          message:
            "MONGODB_URI is not set in environment variables. Please add it to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const mongooseInstance = await connectToDatabase();
    const readyState = mongooseInstance.connection.readyState;
    
    // readyState map: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const stateNames = ["disconnected", "connected", "connecting", "disconnecting"];
    const statusName = stateNames[readyState] || "unknown";

    if (readyState === 1) {
      return NextResponse.json({
        connected: true,
        status: statusName,
        databaseName: mongooseInstance.connection.name,
        message: "Successfully connected to MongoDB Cluster!",
      });
    } else {
      return NextResponse.json(
        {
          connected: false,
          status: statusName,
          message: `Database connection is currently in state: ${statusName}`,
        },
        { status: 503 }
      );
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown connection error";
    return NextResponse.json(
      {
        connected: false,
        status: "error",
        error: errMessage,
        message: "Failed to connect to MongoDB cluster.",
      },
      { status: 500 }
    );
  }
}
