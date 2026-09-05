import { NextResponse } from "next/server";
import { createQuizResponse, getQuizResponses, QuizResponse, getQuizResponseBySession } from "../../../lib/db";
import { calculateQuizEstimate, QuizQuestions } from "../../../lib/quizConfig";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { websiteType, businessType, hasWebsite, goal, budget, timeline, email, phone } = body;

    // Default or map websiteType and hasWebsite properly
    const resolvedWebsiteType = (websiteType || businessType || "basic") as QuizQuestions["websiteType"];
    const resolvedHasWebsite = (hasWebsite || "none") as QuizQuestions["hasWebsite"];
    const resolvedGoal = (goal || "inquiries") as QuizQuestions["goal"];
    const resolvedBudget = (budget || "5k_15k") as QuizQuestions["budget"];
    const resolvedTimeline = (timeline || "asap") as QuizQuestions["timeline"];

    const answers: QuizQuestions = {
      websiteType: resolvedWebsiteType,
      hasWebsite: resolvedHasWebsite,
      goal: resolvedGoal,
      budget: resolvedBudget,
      timeline: resolvedTimeline,
    };

    const estimate = calculateQuizEstimate(answers);

    // Calculate total min/max for fallback summary
    const devMin = estimate.devCostRange ? estimate.devCostRange.min : 0;
    const devMax = estimate.devCostRange ? estimate.devCostRange.max : 0;
    const adMin = estimate.adManagement ? estimate.adManagement.min : 0;
    const adMax = estimate.adManagement ? estimate.adManagement.max : 0;

    const estimatedMin = devMin + adMin;
    const estimatedMax = devMax + adMax;

    let suggestedTopic = "website-building";
    if (resolvedGoal === "ads") {
      suggestedTopic = "running-ads";
    } else if (resolvedGoal === "credibility") {
      suggestedTopic = "website-pricing";
    }

    const sessionId = `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const responseRecord: QuizResponse = {
      id: `resp_${Date.now()}`,
      sessionId,
      businessType: resolvedWebsiteType,
      hasWebsite: resolvedHasWebsite,
      goal: resolvedGoal,
      budget: resolvedBudget,
      timeline: resolvedTimeline,
      estimatedMin,
      estimatedMax,
      estimateData: estimate,
      createdAt: new Date().toISOString(),
      email: email ? email.toLowerCase().trim() : undefined,
      phone: phone ? phone.trim() : undefined,
    };

    createQuizResponse(responseRecord);

    return NextResponse.json({
      success: true,
      sessionId,
      estimatedMin,
      estimatedMax,
      estimate,
      suggestedTopic,
      message: "Quiz analysis generated successfully.",
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while analyzing quiz responses." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (sessionId) {
      const resp = getQuizResponseBySession(sessionId);
      if (!resp) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, response: resp });
    }

    const responses = getQuizResponses();
    return NextResponse.json({
      success: true,
      count: responses.length,
      responses,
    });
  } catch (error) {
    console.error("Quiz GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz responses." },
      { status: 500 }
    );
  }
}
