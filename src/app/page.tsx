import React from "react";
import Link from "next/link";
import { ArrowRight, Lock, CheckCircle, Code, ShieldCheck, Star, ArrowUpRight, BookOpen, FileText, Award } from "lucide-react";
import { getCmsSettings, getServices, getProjects, getUnlocks } from "../lib/db";
import InteractiveQuiz from "../components/InteractiveQuiz";
import SocialProofCounter from "../components/SocialProofCounter";
import ScrollReveal from "../components/ScrollReveal";

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
    },
    {
      q: "What are your payment terms?",
      a: "We require 50% advance payment to begin work, and the remaining 50% is due on project completion before final handover of files/access. For ongoing retainers (maintenance, ad management), billing is monthly in advance."
    }
  ];

  const howWeWork = [
    {
      step: "01",
      title: "Discovery Call",
      desc: "We understand your business, goals, and budget in a quick free call or WhatsApp chat",
    },
    {
      step: "02",
      title: "Plan & Quote",
      desc: "You get a clear written proposal with exact pricing and timeline, no hidden costs",
    },
    {
      step: "03",
      title: "Design & Build",
      desc: "We design and develop your website/campaign with regular progress updates",
    },
    {
      step: "04",
      title: "Review & Launch",
      desc: "You review the final product, request changes if needed, then we go live",
    },
    {
      step: "05",
      title: "Support & Growth",
      desc: "Post-launch support included, plus ongoing maintenance/ad management if you choose",
    },
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
    <div className="flex flex-col w-full min-h-screen bg-[#18191C] text-[#F8FAFC]">
      {/* Section A: Hero Header Block (Wireframe Wireframe Dark Block) */}
      <ScrollReveal>
        <section className="relative overflow-hidden bg-[#18191C] bg-tech-grid-dark py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#2E313A]">
          <div className="mx-auto max-w-6xl">
            <span className="wireframe-section-label-dark">A. HEADER & NAVIGATION</span>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Monitor & Build Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9CA3AF]">
                    Digital Systems, The Right Way!
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed">
                  Get real-time transparent estimates for your websites and ad campaigns. Through interactive calculators and step-by-step diagnostic blueprints starting at <strong className="text-white">₹99 per guide</strong>.
                </p>

                {/* Primary Quick Links with Bracketed Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/unlock"
                    className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white shadow-xs"
                    id="hero-cta-unlock"
                  >
                    [ INSTALL BLUEPRINT @ ₹99 ]
                  </Link>
                  <Link
                    href="/portfolio"
                    className="btn-bracket text-[#9CA3AF] hover:text-white border-[#2E313A] hover:border-white"
                    id="hero-cta-portfolio"
                  >
                    [ VIEW CASE STUDIES ]
                  </Link>
                </div>
              </div>

              {/* Geometric Graphic Placeholder / Cube Wireframe Visual */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-[#22242A] border border-[#2E313A] rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-tech-grid-dark opacity-30"></div>
                  <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 border-2 border-white/40 rotate-12 group-hover:rotate-45 transition-transform duration-700 flex items-center justify-center bg-[#18191C]/80 backdrop-blur-md">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                  <span className="relative z-10 mt-6 font-mono text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                    System Architecture v2.4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section B: Popularity Metrics Banner (Dark Charcoal Wireframe Banner) */}
      <ScrollReveal>
        <section className="bg-[#18191C] border-b border-[#2E313A] py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <span className="wireframe-section-label-dark">B. POPULARITY METRICS</span>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              <div className="p-4 bg-[#22242A] border border-[#2E313A] rounded-xl space-y-1">
                <span className="font-mono text-[10px] text-[#9CA3AF] uppercase block">Installations</span>
                <span className="font-mono text-2xl font-bold text-white">7,823</span>
              </div>
              <div className="p-4 bg-[#22242A] border border-[#2E313A] rounded-xl space-y-1">
                <span className="font-mono text-[10px] text-[#9CA3AF] uppercase block">Github Stars</span>
                <span className="font-mono text-2xl font-bold text-white">34,781</span>
              </div>
              <div className="p-4 bg-[#22242A] border border-[#2E313A] rounded-xl space-y-1">
                <span className="font-mono text-[10px] text-[#9CA3AF] uppercase block">Pulls/Mo</span>
                <span className="font-mono text-2xl font-bold text-white">14M</span>
              </div>
              <div className="p-4 bg-[#22242A] border border-[#2E313A] rounded-xl space-y-1">
                <span className="font-mono text-[10px] text-[#9CA3AF] uppercase block">Contributors</span>
                <span className="font-mono text-2xl font-bold text-white">259</span>
              </div>
              <div className="p-4 bg-[#22242A] border border-[#2E313A] rounded-xl space-y-1 col-span-2 md:col-span-1">
                <span className="font-mono text-[10px] text-[#9CA3AF] uppercase block">Forks</span>
                <span className="font-mono text-2xl font-bold text-white">3K+</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Live Social Proof Activity Ticker */}
      <ScrollReveal>
        <SocialProofCounter initialUnlocksCount={unlocks.length} />
      </ScrollReveal>

      {/* Section C: Rapid Installation / Calculator Quiz (Dark Terminal Block) */}
      <ScrollReveal>
        <section id="calculator-quiz" className="bg-[#18191C] border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="mx-auto max-w-6xl space-y-4">
            <span className="wireframe-section-label-dark">C. RAPID INSTALLATION & SCOPE CALCULATOR</span>
            <div className="terminal-box p-6 sm:p-8">
              <InteractiveQuiz />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section D: Why Choose Us / Services (Wireframe Clean Light Section #F4F4F6) */}
      <ScrollReveal>
        <section className="bg-[#F4F4F6] text-[#111827] border-b border-[#E2E4E8] py-20 px-4 sm:px-6 lg:px-8 bg-tech-grid">
          <div className="mx-auto max-w-6xl space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <span className="wireframe-section-label">D. WHY CHOOSE OUR BLUEPRINTS</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827]">
                Why Choose Our Technical System?
              </h2>
              <p className="mt-4 text-[#6B7280] text-sm sm:text-base leading-relaxed">
                Per-second data collection and clear pricing breakdown. Zoom into issues for all metrics without hidden retainers.
              </p>
            </div>

            {/* 4 Feature Pillars Grid (Wireframe Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-xl p-6 space-y-4 card-hover">
                <div className="w-10 h-10 rounded-lg bg-[#F4F4F6] border border-[#E2E4E8] flex items-center justify-center text-[#111827]">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111827]">Granularity</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Per second data collection and visualization. Zoom into exact costs for all your web systems.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] font-bold text-[#111827] uppercase tracking-wider underline cursor-pointer">
                    OVERVIEW & METRICS
                  </span>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-xl p-6 space-y-4 card-hover">
                <div className="w-10 h-10 rounded-lg bg-[#F4F4F6] border border-[#E2E4E8] flex items-center justify-center text-[#111827]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111827]">Centralization</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Consolidate all ad metrics and developer invoices into a single native console view.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] font-bold text-[#111827] uppercase tracking-wider underline cursor-pointer">
                    LEARN MORE
                  </span>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-xl p-6 space-y-4 card-hover">
                <div className="w-10 h-10 rounded-lg bg-[#F4F4F6] border border-[#E2E4E8] flex items-center justify-center text-[#111827]">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111827]">Speed</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Install and use immediately. Get fully functional visual dashboards in just seconds after checkout.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] font-bold text-[#111827] uppercase tracking-wider underline cursor-pointer">
                    DETAILS
                  </span>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-xl p-6 space-y-4 card-hover">
                <div className="w-10 h-10 rounded-lg bg-[#F4F4F6] border border-[#E2E4E8] flex items-center justify-center text-[#111827]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111827]">Visualization</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Explore all metrics in a meaningful, easy to understand way without developer jargon.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] font-bold text-[#111827] uppercase tracking-wider underline cursor-pointer">
                    VIEW EXAMPLES
                  </span>
                </div>
              </div>
            </div>

            {/* Services Matrix Summary */}
            <div className="space-y-8 pt-8 border-t border-[#E2E4E8]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#111827]">Professional Implementation Services</h3>
                  <p className="text-xs text-[#6B7280] mt-1">Need our engineering team to execute your site or ad strategy?</p>
                </div>
                <Link href="/services" className="btn-bracket text-[#111827] border-[#111827] hover:bg-[#111827] hover:text-white shrink-0">
                  [ VIEW ALL SERVICES ]
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.slice(0, 3).map((service) => (
                  <div key={service.id} className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-xl p-6 flex flex-col justify-between space-y-4 card-hover">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">{service.deliveryTime}</span>
                      <h4 className="text-base font-bold text-[#111827] mt-1">{service.name}</h4>
                      <p className="text-xs text-[#6B7280] mt-2 line-clamp-3 leading-relaxed">{service.description}</p>
                    </div>
                    <div className="pt-4 border-t border-[#E2E4E8] flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#111827]">{service.startingPrice}</span>
                      <Link href="/services" className="font-mono text-xs font-bold text-[#111827] hover:underline flex items-center gap-1">
                        Learn More <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section E: Testimonials & Social Proof (Wireframe Clean Light Section #F4F4F6) */}
      <ScrollReveal>
        <section className="bg-[#F4F4F6] text-[#111827] border-b border-[#E2E4E8] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <span className="wireframe-section-label">E. TESTIMONIALS</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#111827]">
                What Developers & Business Owners Are Saying
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-[#FFFFFF] border border-[#E2E4E8] rounded-xl p-6 space-y-4 shadow-xs card-hover flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-[#111827]">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs italic text-[#4B5563] leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E2E4E8] flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#111827]">{t.name}</h4>
                      <span className="text-[10px] text-[#6B7280] block">{t.role}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#6B7280]">@{t.name.toLowerCase().replace(/\s+/g, "")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section F: Live Wireframe / FAQ & Deployment (Wireframe Dark Charcoal #18191C) */}
      <ScrollReveal>
        <section className="bg-[#18191C] border-b border-[#2E313A] py-20 px-4 sm:px-6 lg:px-8 bg-tech-grid-dark">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center space-y-2">
              <span className="wireframe-section-label-dark">F. FAQ & SYSTEM DEPLOYMENT</span>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-[#9CA3AF]">Everything you need to know about system blueprints and unlock options.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-[#2E313A] bg-[#22242A] p-6 [&_summary::-webkit-details-marker]:hidden focus-within:ring-2 focus-within:ring-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 focus:outline-none">
                    <h3 className="font-mono text-sm font-bold text-white">
                      {faq.q}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#18191C] p-1 text-white group-open:rotate-180 transition duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-xs leading-relaxed text-[#9CA3AF]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            {/* Bottom CTA Banner (Wireframe Style) */}
            <div className="p-8 rounded-xl bg-[#22242A] border border-[#2E313A] text-center space-y-4 shadow-xl">
              <h3 className="text-2xl font-bold text-white">Get Started Today</h3>
              <p className="text-xs text-[#9CA3AF] max-w-md mx-auto">
                Up and running in minutes. Select single guide for ₹99 or unlock the Complete Bundle for ₹249.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <Link href="/unlock" className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white">
                  [ UNLOCK NOW ]
                </Link>
                <Link href="/contact" className="btn-bracket text-[#9CA3AF] hover:text-white border-[#2E313A] hover:border-white">
                  [ BOOK CONSULTATION ]
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

