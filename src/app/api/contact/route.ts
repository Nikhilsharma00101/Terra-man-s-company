import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields (name, email, subject, message) are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been stored successfully.",
        contactId: newContact._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating contact submission:", error);
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
