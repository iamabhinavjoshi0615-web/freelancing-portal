import { NextResponse } from "next/server";
import { getUserByEmail } from "../../../../lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password credentials" }, { status: 401 });
    }

    // Hash input password to compare with database hash
    const inputHash = crypto.createHash("sha256").update(password).digest("hex");

    if (inputHash !== user.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password credentials" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
