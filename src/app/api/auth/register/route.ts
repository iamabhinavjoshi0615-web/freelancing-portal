import { NextResponse } from "next/server";
import { getUserByEmail, createUser } from "../../../../lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }

    // Securely hash password using node:crypto (sha256)
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    const newUser = {
      id: "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    createUser(newUser);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
