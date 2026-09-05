import { NextRequest, NextResponse } from "next/server";
import { getDb, checkUnlock } from "../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    const db = getDb();
    const topic = db.topics.find((t) => t.id === topicId);

    if (!topic) {
      return NextResponse.json({ error: "Topic not found." }, { status: 404 });
    }

    // Check if the content is unlocked for this email
    const isUnlocked = email ? checkUnlock(email.toLowerCase(), topicId) : false;

    if (isUnlocked) {
      return NextResponse.json({
        id: topic.id,
        title: topic.title,
        category: topic.category,
        teaser: topic.teaser,
        price: topic.price,
        isLocked: false,
        content: topic.fullContent,
      });
    } else {
      // Return teaser version only, hide premium content fields
      return NextResponse.json({
        id: topic.id,
        title: topic.title,
        category: topic.category,
        teaser: topic.teaser,
        price: topic.price,
        isLocked: true,
      });
    }
  } catch (error) {
    console.error("Content retrieval API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
