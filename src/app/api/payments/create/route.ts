import { NextResponse } from "next/server";
import { createOrder } from "../../../../lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, phone, topicId, purchaseType = "single", whatsappOptIn = false } = await request.json();

    if (!name || !email || !phone || !topicId) {
      return NextResponse.json(
        { error: "Name, Email, Phone, and Topic ID are required fields." },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isSandbox = !keyId || !keySecret;

    const receipt = `rec_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const isBundle = purchaseType === "bundle" || topicId === "bundle";
    const amount = isBundle ? 249 : 99; // Rs 249 for Complete Bundle, Rs 99 for Single Topic

    let orderId = "";

    if (isSandbox) {
      // Sandbox Mode: generate a mock order ID
      orderId = `order_mock_${Math.random().toString(36).substring(2, 11)}`;
    } else {
      // Real Mode: make a direct REST API call to Razorpay
      try {
        const authString = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
        const response = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            Authorization: `Basic ${authString}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100, // Razorpay works in paise
            currency: "INR",
            receipt: receipt,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error("Razorpay API Error Response:", errText);
          throw new Error(`Razorpay API returned status ${response.status}`);
        }

        const rpOrder = await response.json();
        orderId = rpOrder.id;
      } catch (err) {
        console.error("Failed to create real Razorpay order. Falling back to Sandbox.", err);
        // Fallback to sandbox if API fails
        orderId = `order_mock_fallback_${Math.random().toString(36).substring(2, 11)}`;
      }
    }

    // Save order in JSON database
    createOrder({
      id: orderId,
      amount,
      currency: "INR",
      status: "created",
      receipt,
      email: email.toLowerCase().trim(),
      phone,
      name,
      topicId: isBundle ? "bundle" : topicId,
      purchaseType: isBundle ? "bundle" : "single",
      whatsappOptIn: Boolean(whatsappOptIn),
      createdAt: new Date().toISOString(),
      razorpayOrderId: isSandbox ? undefined : orderId,
    });

    return NextResponse.json({
      success: true,
      orderId,
      amount: amount * 100, // return in paise for client SDK
      keyId: isSandbox ? "sandbox" : keyId,
      isSandbox,
      name,
      email,
      phone,
      topicId: isBundle ? "bundle" : topicId,
      purchaseType: isBundle ? "bundle" : "single",
      whatsappOptIn: Boolean(whatsappOptIn),
    });
  } catch (error) {
    console.error("Create payment endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while creating order." },
      { status: 500 }
    );
  }
}
