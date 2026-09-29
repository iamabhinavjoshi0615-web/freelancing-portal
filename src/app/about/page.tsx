import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCmsSettings } from "../../lib/db";
import ScrollReveal from "../../components/ScrollReveal";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us - Digital Consultancy & Web Development | The Industries",
  description: "Learn about our mission to provide transparent, high-performance web development and lead-generation ad campaigns for Indian MSMEs.",
  openGraph: {
    title: "About Us - Digital Consultancy & Web Development | The Industries",
    description: "Learn about our mission to provide transparent, high-performance web development and lead-generation ad campaigns for Indian MSMEs.",
    images: [{ url: "/icon.png", width: 1200, height: 630, alt: "About The Industries" }],
  },
};

export default function About() {
  const settings = getCmsSettings();

  const values = [
    {
      title: "Transparent pricing",
      description: "Every package shows exactly what's included, and what's not",
    },
    {
      title: "No lock-in",
      description: "You own your code, your domain, and your hosting, always",
    },
    {
      title: "Guidance before commitment",
      description: "Get a real estimate for ₹99 before you spend thousands",
    },
    {
      title: "Built for Indian MSMEs",
      description: "Pricing and payment options that make sense for small businesses, not enterprise budgets",
    },
  ];

  const founderSkills = [
    "Next.js",
    "React.js",
    "Spring Boot",
    "MongoDB",
    "Postman",
    "Meta Ads",
    "Google Ads",
    "Local SEO",
  ];

  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* 1. COMPANY HERO */}
      <section className="bg-[#18191C] border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="wireframe-section-label mb-4">// ABOUT THE INDUSTRIES</div>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF] max-w-3xl">
              About The Industries
            </h1>
            <p className="mt-4 text-[#8E95A5] text-base sm:text-lg max-w-2xl font-sans leading-relaxed">
              A web development and digital marketing consultancy built for small businesses in India — clear pricing, no jargon, no hidden retainers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="bg-[#121316] border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#FFFFFF]">
                Why we started
              </h2>
              <p className="text-sm sm:text-base text-[#8E95A5] leading-relaxed font-sans">
                Small business owners in India frequently get vague quotes and don't know what a fair price for a website or ad campaign looks like. The Industries was built to solve this problem with a ₹99 calculator and guide system, paired with real project execution for clients who want full-service delivery. Founded in 2023, we serve retail, healthcare, real estate, and service businesses across India with transparent rates and zero agency fluff.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. WHAT WE STAND FOR */}
      <section className="bg-[#F4F4F6] text-[#18191C] border-b border-[#E2E4E8] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#18191C]">
              What we stand for
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] border border-[#E2E4E8] p-6 card-hover flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-mono font-bold text-[#18191C] mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs text-[#526075] font-sans leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. COMPANY FACTS */}
      <section className="bg-[#18191C] text-[#E2E4E8] border-b border-[#2E313A] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 rounded-lg flex flex-col sm:flex-row items-center justify-around gap-6 text-center font-mono text-sm sm:text-base text-[#E2E4E8]">
              <div className="flex items-center gap-2">
                <span className="text-[#8E95A5]">//</span>
                <span>Founded 2023</span>
              </div>
              <span className="hidden sm:inline text-[#2E313A]">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[#8E95A5]">//</span>
                <span>Based in Noida, India</span>
              </div>
              <span className="hidden sm:inline text-[#2E313A]">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[#8E95A5]">//</span>
                <span>10+ projects delivered</span>
              </div>
              <span className="hidden sm:inline text-[#2E313A]">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[#8E95A5]">//</span>
                <span>3+ clients served</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. MEET THE FOUNDER */}
      <section className="bg-[#F4F4F6] text-[#18191C] border-b border-[#E2E4E8] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#18191C]">
                Meet the founder
              </h2>

              <div className="bg-[#FFFFFF] border border-[#E2E4E8] p-6 sm:p-8 card-hover flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                <img
                  src="/abhinav-joshi.png"
                  alt="Abhinav Joshi"
                  className="w-28 h-28 sm:w-32 sm:h-32 object-cover shrink-0 border border-[#E2E4E8] rounded-md"
                />
                <div className="space-y-4 text-center sm:text-left flex-grow">
                  <div>
                    <h3 className="text-xl font-mono font-bold text-[#18191C]">Abhinav Joshi</h3>
                    <p className="text-xs font-mono font-bold text-[#526075] mt-0.5">// FOUNDER & WEB CONSULTANT</p>
                  </div>
                  <p className="text-xs text-[#526075] leading-relaxed font-sans">
                    Helping small businesses and independent professionals build high-converting websites and ad campaigns without overpaying or getting lost in agency jargon.
                  </p>
                  <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {founderSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-[#F4F4F6] text-[#18191C] text-[11px] font-mono border border-[#E2E4E8]"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-[#E2E4E8]">
                    <Link
                      href="/team/abhinav-joshi"
                      className="btn-bracket text-[#18191C] hover:bg-[#18191C] hover:text-[#FFFFFF] inline-block text-xs"
                    >
                      View full profile &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. CLOSING CTA */}
      <section className="bg-[#18191C] text-[#E2E4E8] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-[#121316] border border-[#2E313A] p-8 sm:p-12 text-center space-y-6">
              <h2 className="text-2xl sm:text-4xl font-mono font-bold text-[#FFFFFF]">
                Want to work with us?
              </h2>
              <p className="text-sm sm:text-base text-[#8E95A5] font-sans max-w-xl mx-auto">
                Get in touch today for a transparent consultation, custom project estimate, or strategy discussion.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="btn-bracket bg-[#FFFFFF] text-[#18191C] hover:bg-[#E2E4E8] border-[#FFFFFF] w-full sm:w-auto text-center py-3 px-6 text-xs font-bold"
                >
                  Get in touch
                </Link>
                <a
                  href={`https://wa.me/${settings.whatsappNumber || "917415917942"}?text=${encodeURIComponent("Hi The Industries, I visited your website and would like to inquire about working together.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bracket text-[#E2E4E8] hover:text-[#FFFFFF] border-[#2E313A] hover:border-[#FFFFFF] w-full sm:w-auto text-center py-3 px-6 text-xs font-bold"
                >
                  Chat on WhatsApp &rarr;
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
