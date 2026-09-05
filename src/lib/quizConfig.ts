export interface QuizQuestions {
  websiteType: "landing" | "basic" | "blog" | "booking" | "ecommerce";
  hasWebsite: "none" | "redesign" | "maintenance";
  goal: "inquiries" | "sell" | "credibility" | "ads";
  budget: "under_5k" | "5k_15k" | "15k_40k" | "40k_plus";
  timeline: "asap" | "month" | "exploring";
}

// Config / Lookup Table for Pricing (Not hardcoded in UI)
export const WEBSITE_TYPE_PRICING: Record<
  QuizQuestions["websiteType"],
  { label: string; min: number; max: number }
> = {
  landing: { label: "Landing Page", min: 2500, max: 6000 },
  basic: { label: "Basic Business Website", min: 8000, max: 20000 },
  blog: { label: "Blog/Content Website", min: 6000, max: 15000 },
  booking: { label: "Booking/Service Website", min: 12000, max: 30000 },
  ecommerce: { label: "E-commerce Website", min: 18000, max: 50000 },
};

export const HOSTING_DOMAIN_ADDONS = {
  domain: { label: "Domain Name", range: "Rs 500 - 1,200/year", min: 500, max: 1200 },
  basicHosting: { label: "Basic Hosting", range: "Rs 2,000 - 5,000/year", min: 2000, max: 5000 },
  premiumHosting: { label: "Premium Hosting", range: "Rs 8,000 - 20,000/year", min: 8000, max: 20000 },
};

export const MAINTENANCE_TIERS = {
  basic: { label: "Basic", range: "Rs 999 - 2,000/month", min: 999, max: 2000 },
  standard: { label: "Standard", range: "Rs 2,500 - 5,000/month", min: 2500, max: 5000 },
  premium: { label: "Premium", range: "Rs 6,000 - 12,000/month", min: 6000, max: 12000 },
};

export const AD_MANAGEMENT_FEES: Record<
  QuizQuestions["budget"],
  { range: string; min: number; max: number }
> = {
  under_5k: { range: "Rs 1,500 - 3,000/month", min: 1500, max: 3000 },
  "5k_15k": { range: "Rs 3,000 - 6,000/month", min: 3000, max: 6000 },
  "15k_40k": { range: "Rs 6,000 - 12,000/month", min: 6000, max: 12000 },
  "40k_plus": { range: "Rs 6,000 - 12,000/month", min: 6000, max: 12000 },
};

export interface CalculatedEstimate {
  devCostRange: { min: number; max: number; label: string } | null;
  hostingDomain: typeof HOSTING_DOMAIN_ADDONS;
  maintenanceTiers: typeof MAINTENANCE_TIERS;
  adManagement: { range: string; min: number; max: number; disclaimer: string } | null;
  exactRecommendedPackage: {
    packageName: string;
    exactPrice: number;
    priceFormatted: string;
  };
  recommendedStack: {
    platform: string;
    domainHosting: string;
    analyticsPayment: string;
  };
  timelineSchedule: Array<{ phase: string; duration: string; details: string }>;
  personalizedChecklist: string[];
}

export function calculateQuizEstimate(answers: QuizQuestions): CalculatedEstimate {
  // 1. Website Development Base & Redesign/Maintenance Modifiers
  let devCostRange: { min: number; max: number; label: string } | null = null;
  const base = WEBSITE_TYPE_PRICING[answers.websiteType] || WEBSITE_TYPE_PRICING.basic;

  if (answers.hasWebsite === "maintenance") {
    // Skip website cost range, show only maintenance tiers
    devCostRange = null;
  } else if (answers.hasWebsite === "redesign") {
    // Redesign: multiply base range by 0.6 - 0.7
    const min = Math.round(base.min * 0.6);
    const max = Math.round(base.max * 0.7);
    devCostRange = {
      min,
      max,
      label: `${base.label} (Redesign & Optimization)`,
    };
  } else {
    // New build
    devCostRange = {
      min: base.min,
      max: base.max,
      label: `${base.label} (New Build)`,
    };
  }

  // 2. Ad Management Fee if Q3 = "Run ads"
  let adManagement: CalculatedEstimate["adManagement"] = null;
  if (answers.goal === "ads") {
    const feeConfig = AD_MANAGEMENT_FEES[answers.budget] || AD_MANAGEMENT_FEES["5k_15k"];
    adManagement = {
      range: feeConfig.range,
      min: feeConfig.min,
      max: feeConfig.max,
      disclaimer: "This is our management fee only. Ad spend goes directly to Google/Meta and is separate.",
    };
  }

  // 3. Exact Recommended Package (Single Number/Tier, not a range) based on Q4 (Budget)
  let packageName = "Starter Website & Digital Setup";
  let exactPrice = 4999;

  if (answers.budget === "under_5k") {
    packageName = answers.hasWebsite === "maintenance" ? "Basic Website Support Plan" : "Starter Web Presence Package";
    exactPrice = answers.hasWebsite === "maintenance" ? 1499 : 4999;
  } else if (answers.budget === "5k_15k") {
    packageName = answers.goal === "ads" ? "Performance Ad Setup + Business Site" : "Standard Professional Growth Package";
    exactPrice = 12500;
  } else if (answers.budget === "15k_40k") {
    packageName = answers.websiteType === "ecommerce" ? "Advanced E-Commerce Storefront" : "Pro Multi-Page Custom Business Suite";
    exactPrice = 28000;
  } else if (answers.budget === "40k_plus") {
    packageName = "Scaled Enterprise Portal & Multi-Channel Ad Management";
    exactPrice = 45000;
  }

  // 4. Recommended Stack
  let platform = "Custom Next.js / Clean HTML & Tailwind";
  if (answers.websiteType === "ecommerce" || answers.goal === "sell") {
    platform = "Shopify OS 2.0 / WooCommerce";
  } else if (answers.websiteType === "blog") {
    platform = "WordPress CMS with Custom Gutenberg Layouts";
  } else if (answers.websiteType === "booking") {
    platform = "Next.js / WordPress with Integrated Calendly & WhatsApp Booking API";
  }

  let domainHosting = "Namecheap (.com/.in) + Hostinger Business Cloud (India Datacenter)";
  if (answers.budget === "15k_40k" || answers.budget === "40k_plus") {
    domainHosting = "Namecheap Domain + Cloudways / AWS Managed Cloud Server + Cloudflare CDN";
  }

  let analyticsPayment = "Razorpay UPI/Cards + Google Analytics 4 + Meta Pixel";
  if (answers.goal === "ads") {
    analyticsPayment += " + Meta Ads Manager & Google Search Console Conversion Tracking";
  }

  // 5. Urgency Timeline
  let timelineSchedule: CalculatedEstimate["timelineSchedule"] = [];
  if (answers.timeline === "asap") {
    timelineSchedule = [
      { phase: "Days 1 - 2", duration: "Setup & Strategy", details: "Domain registration, hosting server configuration, content & asset collection" },
      { phase: "Days 3 - 5", duration: "Rapid Build", details: "Design wireframing, layout development, contact forms, and mobile responsiveness" },
      { phase: "Days 6 - 7", duration: "QA & Launch", details: "Speed audit, SSL security installation, GA4 tracking test, and live domain propagation" },
    ];
  } else if (answers.timeline === "month") {
    timelineSchedule = [
      { phase: "Week 1", duration: "Discovery & Planning", details: "Competitor analysis, content outline, user flow diagram, and brand color palette" },
      { phase: "Week 2", duration: "UI/UX & Core Build", details: "Desktop and mobile frontend development, typography tuning, asset optimization" },
      { phase: "Week 3", duration: "Integrations", details: "Razorpay/UPI integration, WhatsApp chat widget, CRM lead forms, and Meta Pixel" },
      { phase: "Week 4", duration: "Testing & Handover", details: "Cross-device browser testing, CMS video training handover, and official launch" },
    ];
  } else {
    timelineSchedule = [
      { phase: "Phase 1", duration: "Brand Audit", details: "Define target audience, register brand domain name, and organize service catalog" },
      { phase: "Phase 2", duration: "Vendor Selection", details: "Compare hosting options, review ad management retainers, and finalize budget" },
      { phase: "Phase 3", duration: "Execution Kickoff", details: "Initiate development when ready with 100% of your Rs 99 unlock fee credited" },
    ];
  }

  // 6. Personalized Checklist
  const personalizedChecklist = [
    `Register your domain name directly under your personal account (avoid host hostage lock).`,
    `Choose hosting server located in India for under 1.2s mobile page speed load times.`,
    `Implement instant WhatsApp click-to-chat CTA to boost lead conversion by 3x.`,
    answers.goal === "ads"
      ? `Set up Meta Pixel & Google Ads Conversion Tags BEFORE running paid ad campaigns.`
      : `Verify Google Business Profile listing to rank for local organic search keywords.`,
    `Schedule your free 10-minute strategy kickoff call with our team to start implementation.`,
  ];

  return {
    devCostRange,
    hostingDomain: HOSTING_DOMAIN_ADDONS,
    maintenanceTiers: MAINTENANCE_TIERS,
    adManagement,
    exactRecommendedPackage: {
      packageName,
      exactPrice,
      priceFormatted: `Rs ${exactPrice.toLocaleString("en-IN")}`,
    },
    recommendedStack: {
      platform,
      domainHosting,
      analyticsPayment,
    },
    timelineSchedule,
    personalizedChecklist,
  };
}
