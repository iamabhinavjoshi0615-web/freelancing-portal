import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDb, updateOrder, addUnlock } from "../../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    // Check if sandbox simulated payload
    if (body.isSandbox) {
      const { orderId, email, phone, name, topicId, whatsappOptIn } = body;

      if (!orderId || !email || !topicId) {
        return NextResponse.json(
          { error: "Invalid Sandbox validation payload." },
          { status: 400 }
        );
      }

      // Find order in DB
      const order = db.orders.find((o) => o.id === orderId);
      if (!order) {
        return NextResponse.json({ error: "Order not found in database." }, { status: 404 });
      }

      // Update order status in db
      updateOrder(orderId, {
        status: "paid",
        razorpayPaymentId: `pay_mock_${Math.random().toString(36).substring(2, 11)}`,
        verifiedAt: new Date().toISOString(),
        whatsappOptIn: Boolean(whatsappOptIn || order.whatsappOptIn),
      });

      // Register the unlock for bundle or specific topic
      addUnlock({
        email: email.toLowerCase().trim(),
        topicId: topicId,
        unlockedAt: new Date().toISOString(),
        orderId: orderId,
        whatsappOptIn: Boolean(whatsappOptIn || order.whatsappOptIn),
      });

      const isBundle = topicId === "bundle";
      const topic = isBundle ? null : db.topics.find((t) => t.id === topicId);

      return NextResponse.json({
        success: true,
        message: "Sandbox payment verified successfully.",
        isBundle,
        unlockedContent: topic ? topic.fullContent : null,
        allTopics: isBundle ? db.topics : null,
      });
    }

    // Real Razorpay signature verification
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing Razorpay payment parameters." },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay configuration error on the server." },
        { status: 500 }
      );
    }

    // Verify HMAC-SHA256 signature
    const hmac = crypto.createHmac("sha256", keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Cryptographic signature verification failed. Possible fraud." },
        { status: 400 }
      );
    }

    // Retrieve order to get email and topic details
    const order = db.orders.find((o) => o.id === razorpay_order_id);
    if (!order) {
      return NextResponse.json({ error: "Order not found in database." }, { status: 404 });
    }

    // Mark as paid
    updateOrder(razorpay_order_id, {
      status: "paid",
      razorpayPaymentId: razorpay_payment_id,
      verifiedAt: new Date().toISOString(),
    });

    // Create unlock record
    addUnlock({
      email: order.email.toLowerCase().trim(),
      topicId: order.topicId,
      unlockedAt: new Date().toISOString(),
      orderId: razorpay_order_id,
      whatsappOptIn: order.whatsappOptIn,
    });

    const isBundle = order.topicId === "bundle";
    const topic = isBundle ? null : db.topics.find((t) => t.id === order.topicId);

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      isBundle,
      unlockedContent: topic ? topic.fullContent : null,
      allTopics: isBundle ? db.topics : null,
    });
  } catch (error) {
    console.error("Payment verification endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while verifying payment." },
      { status: 500 }
    );
  }
}
