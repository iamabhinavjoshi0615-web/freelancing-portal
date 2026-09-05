import { NextResponse } from "next/server";
import {
  getDb,
  saveDb,
  getOrders,
  getUnlocks,
  getCmsSettings,
  updateCmsSettings,
  updateServices,
  updatePricingTiers,
  getProjects,
  updateProjects
} from "../../../lib/db";

// Helper to verify admin authorization
function isAuthorized(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const settings = getCmsSettings();
  return authHeader === settings.adminPassword;
}

// GET: returns dashboard stats, order history, CMS settings, services, pricing tiers, and projects
export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const db = getDb();
    
    // Process dashboard statistics
    const orders = getOrders();
    const paidOrders = orders.filter((o) => o.status === "paid");
    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);

    const singleUnlocks = paidOrders.filter((o) => o.topicId !== "bundle" && (o.amount === 99 || o.purchaseType === "single"));
    const bundleUnlocks = paidOrders.filter((o) => o.topicId === "bundle" || o.amount === 249 || o.purchaseType === "bundle");
    
    const singleRevenue = singleUnlocks.reduce((sum, o) => sum + o.amount, 0);
    const bundleRevenue = bundleUnlocks.reduce((sum, o) => sum + o.amount, 0);

    const whatsappOptInsCount = orders.filter((o) => o.whatsappOptIn).length;

    // Quiz Popularity Analytics
    const quizResponses = db.quizResponses || [];
    const businessTypeCounts: Record<string, number> = {};
    const goalCounts: Record<string, number> = {};
    const budgetCounts: Record<string, number> = {};

    quizResponses.forEach((r) => {
      businessTypeCounts[r.businessType] = (businessTypeCounts[r.businessType] || 0) + 1;
      goalCounts[r.goal] = (goalCounts[r.goal] || 0) + 1;
      budgetCounts[r.budget] = (budgetCounts[r.budget] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders: orders.length,
        totalPaid: paidOrders.length,
        totalRevenue: totalRevenue,
        singleUnlocksCount: singleUnlocks.length,
        bundleUnlocksCount: bundleUnlocks.length,
        singleRevenue,
        bundleRevenue,
        whatsappOptInsCount,
        totalQuizCompletions: quizResponses.length,
        businessTypeCounts,
        goalCounts,
        budgetCounts,
        totalUnlocks: db.unlocks.length,
      },
      orders: orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      unlocks: db.unlocks,
      quizResponses: quizResponses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      cmsSettings: db.cmsSettings,
      services: db.services,
      pricingTiers: db.pricingTiers,
      topics: db.topics,
      projects: getProjects(),
      users: db.users || [],
    });
  } catch (error) {
    console.error("Admin GET route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: updates CMS settings, services, pricing, topics, or projects
export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { action, cmsSettings, services, pricingTiers, topics, projects } = body;

    const db = getDb();

    if (action === "updateSettings" && cmsSettings) {
      updateCmsSettings(cmsSettings);
    } else if (action === "updateServices" && services) {
      updateServices(services);
    } else if (action === "updatePricing" && pricingTiers) {
      updatePricingTiers(pricingTiers);
    } else if (action === "updateTopics" && topics) {
      db.topics = topics;
      saveDb(db);
    } else if (action === "updateProjects" && projects) {
      updateProjects(projects);
    } else {
      return NextResponse.json({ error: "Invalid action or missing parameters" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Data updated successfully.",
    });
  } catch (error) {
    console.error("Admin POST route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
