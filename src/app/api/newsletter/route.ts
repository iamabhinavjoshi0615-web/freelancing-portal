import { NextResponse } from "next/server";
import { addNewsletterSubscriber } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email?.trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const subscriber = addNewsletterSubscriber(email);

    return NextResponse.json({
      success: true,
      message: "Subscribed! You'll receive free tips on pricing & ads in your inbox.",
      subscriber,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
