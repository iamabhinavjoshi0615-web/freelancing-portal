import React from "react";
import Link from "next/link";
import { ArrowRight, Lock, CheckCircle, Code, ShieldCheck, MessageSquare, Star, ArrowUpRight, BookOpen, Gift, FileText, Award } from "lucide-react";
import { getCmsSettings, getServices, getProjects, getUnlocks } from "../lib/db";
import InteractiveQuiz from "../components/InteractiveQuiz";
import SocialProofCounter from "../components/SocialProofCounter";

export const dynamic = "force-dynamic";

export default function Home() {
  const settings = getCmsSettings();
  const services = getServices();
  const projects = getProjects();
  const unlocks = getUnlocks();

  const freeResources = [
    {
      title: "5 Costly Mistakes Indian MSMEs Make on Their First Website",
      category: "Free Checklist",
      desc: "Learn why 70% of business owners lose domain rights or pay unnecessary monthly retainers.",
      readTime: "4 Min Read",
      link: "/blog#mistakes-website",
      icon: FileText,
      badge: "100% Free",
      highlights: ["Domain ownership traps", "Mobile loading benchmarks", "Free SSL certificate guide"]
    },
    {
      title: "First-Time Ad Budget Allocation Blueprint (Meta & Google)",
      category: "Free Strategy",
      desc: "Step-by-step guide to calculating daily ad spend without burning your marketing budget.",
      readTime: "5 Min Read",
      link: "/blog#ads-budget",
      icon: FileText,
      badge: "100% Free",
      highlights: ["Meta vs Google Search intent", "Minimum ₹500/day daily cap rule", "Pixel setup basics"]
    },
    {
      title: "Shared SSD vs Cloud Hosting Tech Stack Matrix",
      category: "Free Tech Guide",
      desc: "Choose the exact hosting plan for your traffic volume and avoid developer upsells.",
      readTime: "3 Min Read",
      link: "/blog#hosting-shared-cloud",
      icon: BookOpen,
      badge: "100% Free",
      highlights: ["Hostinger vs Cloudways math", "Security & backup defaults", "E-commerce vs profile sites"]
    }
  ];

  const faqs = [
    {
      q: "Does the ad management fee include my ad budget?",
      a: "No. Ad spend (the amount paid directly to Google, Meta, or ad networks) is completely separate from our management fee. Example: If your ad budget is Rs 5,000/month, that goes to the ad platform directly via your card/UPI — our management retainer fee is charged separately for setup, strategy, ad creatives, and weekly optimization."
    },
    {
      q: "Why do you charge only ₹99 for these guides?",
      a: "Typical agencies charge thousands for an initial consultation just to give you standard pricing and hosting advice. We believe in complete transparency. For ₹99, we give you the exact technical blueprints, pricing calculators, and tool guides directly, saving you time and preventing you from being overcharged by developers."
    },
    {
      q: "How do I access the guide after paying?",
      a: "Upon successful payment via UPI, Debit/Credit Card, or Netbanking, the premium content will instantly unlock on the page. No page reloads needed! You will also get options to join our WhatsApp broadcast or save the guide as PDF."
    },
    {
      q: "Can I get a refund if I'm not satisfied?",
      a: "Due to the instant digital nature of these downloadable blueprints and tools, all ₹99/₹249 unlocks are non-refundable. However, if you decide to hire our team for full project execution or ad management, 100% of the money you paid will be fully credited towards your final service invoice."
    },
    {
      q: "Do you offer full development and ad services too?",
      a: "Yes! These guides are to help you plan. If you decide you want our expert team to build your website or run your ad campaigns, we offer complete development and digital marketing services. Your unlock payment will be fully credited (deducted) from your final invoice."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Founder, Kumar Garments (Ludhiana)",
      quote: "The website pricing guide saved me at least ₹15,000. I was quoted ₹30k by a local developer for basic WooCommerce, but using Guruji's guide, I set up Shopify myself and hired a freelancer for just ₹10k for custom setups.",
      stars: 5
    },
    {
      name: "Dr. Anjali Sharma",
      role: "Owner, Skin Care Clinic (Delhi)",
      quote: "I unlocked the Facebook Ads guide. The step-by-step target setup and ad copy formula helped us get 40+ appointments in the very first week with a daily budget of just ₹500.",
      stars: 5
    },
    {
      name: "Amit Patel",
      role: "Director, Patel Logistics (Ahmedabad)",
      quote: "Excellent initiative. Simple, direct information without the typical corporate fluff. Highly recommend the budget calculators.",
      stars: 5
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-zinc-950 dark:via-black dark:to-black py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/50 dark:border-zinc-900/50">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -z-10"></div>

        <div className="mx-auto max-w-5xl text-center space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-200/50 dark:border-blue-800/40">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Transparent Digital Consultancy & Growth
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Stop Overpaying for{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400">
                Websites & Ad Campaigns
              </span>
            </h1>
            
            <p className="mt-4 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Calculate your exact project cost in 60 seconds with our free interactive quiz, or unlock expert blueprints starting at just <strong className="text-zinc-900 dark:text-white">₹99 per guide</strong>.
            </p>
          </div>

          {/* Feature 1: Interactive Quiz Entry Point */}
          <div id="calculator-quiz" className="pt-4 scroll-mt-20">
            <InteractiveQuiz />
          </div>

          {/* Primary Quick Links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/unlock"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-xl transition-all duration-200"
              id="hero-cta-unlock"
            >
              <Lock className="w-4 h-4" />
              Unlock Premium Guides @ ₹99 / Bundle ₹249
            </Link>
            <Link
              href="/portfolio"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 px-8 py-4 text-base font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
              id="hero-cta-portfolio"
            >
              View Client Case Studies
            </Link>
          </div>

          {/* Core Trust Pillars */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="flex gap-3 p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-900/50 backdrop-blur-sm">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Zero Jargon & Fluff</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Direct checklists, exact pricing tables, and tools built for business growth.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-900/50 backdrop-blur-sm">
              <Code className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">India-Centric Benchmarks</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Calculators optimized for Indian lead costs, domains (.in), and hosting plans.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-900/50 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Instant Safe Unlock</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">UPI & card payment integration with full ₹99 credit towards custom development services.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 6: Social Proof Live Counter & Activity Ticker */}
      <SocialProofCounter initialUnlocksCount={unlocks.length} />

      {/* Feature 2: Case Studies / Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950/30 border-b border-zinc-200/50 dark:border-zinc-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/40">
                Our Proven Work
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Featured Case Studies & Results
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm max-w-2xl">
                Real results from Indian MSMEs, local clinics, apparel manufacturers, and service brands.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
            >
              View All Case Studies &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="flex flex-col justify-between rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                  {proj.imageMockup ? (
                    <img src={proj.imageMockup} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold">{proj.title}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                    {proj.category}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white truncate">{proj.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    {proj.keyMetrics && (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.keyMetrics.map((m, mIdx) => (
                          <span key={mIdx} className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                            <Award className="w-3 h-3 text-emerald-500" />
                            <span>{m}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <Link href="/portfolio" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between">
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources Section */}
      <section id="free-resources" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-black dark:via-emerald-950/10 dark:to-black border-b border-zinc-200/50 dark:border-zinc-900/50 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-200/50 dark:border-emerald-800/40">
              100% Free Knowledge Base
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Free Resources & Planning Guides
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base">
              No login or payment required. Read our free action checklists, budget calculators, and decision blueprints before starting your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {freeResources.map((res, index) => {
              return (
                <div
                  key={index}
                  className="group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 relative"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200/40 dark:border-emerald-900/40">
                        {res.category}
                      </span>
                      <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                        {res.readTime}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {res.title}
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {res.desc}
                    </p>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Key Highlights</span>
                      {res.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <Link
                      href={res.link}
                      className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group/btn"
                    >
                      <span>Read Free Guide</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Callout Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900/90 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-700/40 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold">
                Want Complete Technical Blueprints & Price Calculators?
              </h3>
              <p className="text-xs text-emerald-200">
                Unlock single handbooks for ₹99 or unlock the Complete Bundle (All 4 Guides) for ₹249.
              </p>
            </div>
            <Link
              href="/unlock"
              className="flex items-center justify-center rounded-full bg-white text-emerald-950 font-extrabold px-6 py-3 text-xs hover:bg-emerald-100 transition-colors shrink-0 shadow"
            >
              Unlock Guides @ ₹99 / Bundle ₹249
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section Summary */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-16">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Professional Tech & Marketing Services
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Need more than self-serve guides? We execute custom development projects and manage optimization ad retainers.
            </p>
          </div>

          {/* Subsection 1: Web Development & Portals */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                Web Development & Custom Portals
              </h3>
              <Link href="/services" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                View All Web Services &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services
                .filter((s) => ["business-website", "ecommerce-store", "landing-page", "service-booking"].includes(s.id))
                .map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
                  >
                    <div>
                      <h4 className="text-base font-bold text-zinc-900 dark:text-white">{service.name}</h4>
                      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 block">Starting Price</span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{service.startingPrice}</span>
                      </div>
                    </div>
                    <Link
                      href="/services"
                      className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Learn More
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Subsection 2: Digital Marketing & Ads Services */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Digital Marketing & Ad Retainers
              </h3>
              <Link href="/services" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                View All Ad Services &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services
                .filter((s) => !["business-website", "ecommerce-store", "landing-page", "service-booking"].includes(s.id))
                .map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-200/60 dark:border-emerald-900/50 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-zinc-900 dark:text-white">{service.name}</h4>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          {service.deliveryTime}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 block">Starting Price</span>
                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                          {service.startingPrice.includes("+ GST") ? service.startingPrice : `${service.startingPrice} + GST`}
                        </span>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal mt-1 leading-snug">
                          Management fee only. Your ad budget is separate.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/services"
                      className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                    >
                      Learn More
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Paywall Preview Callout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl mx-4 sm:mx-8 lg:mx-16 my-8 shadow-xl">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="inline-block bg-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Rs 99 Digital Consultancy
            </span>
            <h2 className="text-3xl font-bold tracking-tight">Unlock Handbooks & Custom Calculators</h2>
            <p className="text-sm text-blue-200 max-w-xl">
              Get direct access to our core blueprint reports, detailed cost breakdown spreadsheets, and marketing templates without scheduling expensive consulting calls.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/unlock"
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 text-white font-bold px-8 py-4 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all duration-200 text-center w-full"
            >
              <Lock className="w-4 h-4" />
              Pay ₹99 & Unlock Content
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950/20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Trusted by Local Indian Businesses
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm">
              Read how small scale merchants and service providers are saving costs and driving sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm"
              >
                <div className="flex gap-0.5 text-amber-500 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{t.name}</h4>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/50 dark:border-zinc-900/50">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm">
              Everything you need to know about the ₹99 unlock payment model.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 [&_summary::-webkit-details-marker]:hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 focus:outline-none">
                  <h3 className="font-semibold text-zinc-900 dark:text-white text-base">
                    {faq.q}
                  </h3>
                  <span className="shrink-0 rounded-full bg-blue-50 dark:bg-blue-950 p-1.5 text-blue-600 dark:text-blue-400 group-open:rotate-180 transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
