import React from "react";
import Link from "next/link";
import { Award, Lock } from "lucide-react";
import { getCmsSettings } from "../../lib/db";
import ScrollReveal from "../../components/ScrollReveal";
import AnimatedCounter from "../../components/AnimatedCounter";

export const dynamic = "force-dynamic";

export default function About() {
  const settings = getCmsSettings();

  const coreValues = [
    {
      title: "Radical Transparency",
      desc: "No hidden charges, markups, or hostaged assets. We tell you the exact pricing structures of hostings, domains, and agency retainer percentages.",
    },
    {
      title: "MSME First Approach",
      desc: "Our blueprints and pricing calculators are tailored for Indian startups, retail stores, local service companies, and family-owned businesses.",
    },
    {
      title: "No-Obligation Consulting",
      desc: "By giving away our core blueprints for just ₹99, we let you decide if you want to execute yourself or hire our expert team to handle it for you.",
    },
  ];

  const teamMembers = [
    {
      name: "Abhinav Joshi",
      title: "Founder & Web Consultant",
      bio: "I help small businesses and independent professionals get online without overpaying or getting lost in agency jargon. From e-commerce stores to niche service websites, I focus on building sites that actually convert visitors into customers — backed by clear pricing and honest guidance at every step.",
      image: "/abhinav-joshi.png",
      skills: [
        "Web Development",
        "SEO & Content Strategy",
        "Google & Meta Ads",
        "E-commerce",
        "WordPress / Shopify"
      ],
      statLine: "4+ projects delivered across retail, healthcare, real estate, and spiritual services — from Kumar Garments to Pandit Maa Baglamukhi.",
    },
  ];

  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* Page Header (Dark Charcoal Block) */}
      <section className="border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="wireframe-section-label mb-4">// ABOUT THE INDUSTRIES</div>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF] max-w-3xl">
              WE DEMYSTIFY TECH & MARKETING
            </h1>
            <p className="mt-4 text-[#8E95A5] text-base sm:text-lg max-w-2xl font-sans">
              Operating with transparent rates, zero agency jargon, and battle-tested blueprints.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Team / Founder Section (Light Off-White Block) */}
      <section className="bg-[#F4F4F6] text-[#18191C] border-b border-[#E2E4E8] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#18191C]">
                Meet the Founder
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#FFFFFF] border border-[#E2E4E8] p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover shrink-0 border border-[#E2E4E8]"
                  />
                  <div className="space-y-4 text-center sm:text-left flex-grow">
                    <div>
                      <h3 className="text-xl font-mono font-bold text-[#18191C]">{member.name}</h3>
                      <p className="text-xs font-mono font-bold text-[#526075] mt-0.5">// {member.title.toUpperCase()}</p>
                    </div>
                    <p className="text-xs text-[#526075] leading-relaxed font-sans">
                      {member.bio}
                    </p>
                    <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                      {member.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-[#F4F4F6] text-[#18191C] text-[11px] font-mono border border-[#E2E4E8]"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>
                    {member.statLine && (
                      <p className="pt-3 border-t border-[#E2E4E8] text-xs font-mono text-[#526075]">
                        {member.statLine}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Info (Dark Charcoal Block) */}
      <section className="bg-[#18191C] text-[#E2E4E8] border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side: Text Story */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#FFFFFF] leading-tight">
                  {settings.aboutTitle}
                </h2>
                <p className="text-sm text-[#8E95A5] leading-relaxed font-sans">
                  {settings.aboutDesc}
                </p>
                <div className="bg-[#121316] p-6 border border-[#2E313A] flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-[#2E313A] flex items-center justify-center text-[#FFFFFF] font-mono text-xs shrink-0">
                    ₹99
                  </div>
                  <div className="font-mono">
                    <h3 className="text-xs font-bold text-[#FFFFFF] uppercase">// WHY THE ₹99 PRICE TAG?</h3>
                    <p className="text-xs text-[#8E95A5] mt-1 leading-relaxed font-sans">
                      Most agencies require hours of sales calls just to quote basic development costs. We package our exact technical checklists, supplier costs, and ad rules into simple digital handbooks. Unlocking them for ₹99 helps filter out spam while keeping expert consulting affordable for every Indian business owner.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Visual Stats Panel */}
              <div className="lg:col-span-5 bg-[#121316] p-8 border border-[#2E313A] space-y-8 font-mono">
                <div className="space-y-2">
                  <span className="wireframe-section-label block">// SYSTEM PERFORMANCE</span>
                  <h3 className="text-2xl font-bold text-[#FFFFFF]">PROVEN TRACK RECORD</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="border-l-2 border-[#FFFFFF] pl-4 py-1">
                    <span className="text-2xl font-bold font-mono text-[#FFFFFF] block">
                      <AnimatedCounter value={`${settings.projectsCompleted}+`} />
                    </span>
                    <span className="text-[10px] text-[#8E95A5] font-mono uppercase tracking-wider">Projects Delivered</span>
                  </div>
                  <div className="border-l-2 border-[#FFFFFF] pl-4 py-1">
                    <span className="text-2xl font-bold font-mono text-[#FFFFFF] block">
                      <AnimatedCounter value={`${settings.satisfiedClients}+`} />
                    </span>
                    <span className="text-[10px] text-[#8E95A5] font-mono uppercase tracking-wider">Clients Served</span>
                  </div>
                  <div className="border-l-2 border-[#FFFFFF] pl-4 py-1">
                    <span className="text-2xl font-bold font-mono text-[#FFFFFF] block">
                      <AnimatedCounter value={`${settings.experienceYears}+ Years`} />
                    </span>
                    <span className="text-[10px] text-[#8E95A5] font-mono uppercase tracking-wider">Years of Engineering</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2E313A]">
                  <Link
                    href="/unlock"
                    className="btn-bracket w-full py-3.5 text-xs text-center inline-block"
                  >
                    [ UNLOCK PREMIUM BLUEPRINTS @ ₹99 ]
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values Section (Light Off-White Block) */}
      <section className="bg-[#F4F4F6] text-[#18191C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#18191C]">Our Operating Values</h2>
              <p className="text-sm text-[#526075] mt-2 font-sans">The guidelines that define our client relationships and project workflows.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {coreValues.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#FFFFFF] border border-[#E2E4E8] p-6 text-[#18191C]"
                  >
                    <div className="text-xs font-mono text-[#526075] mb-1">0{index + 1}.</div>
                    <h3 className="text-base font-mono font-bold text-[#18191C] mb-2">{value.title}</h3>
                    <p className="text-xs text-[#526075] leading-relaxed font-sans">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
