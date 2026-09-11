import React from "react";
import Link from "next/link";
import { Award, Lock } from "lucide-react";
import { getCmsSettings } from "../../lib/db";

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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          About Guruji
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          We Demystify Tech & Marketing
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
          Operating with transparent rates, zero agency jargon, and battle-tested blueprints.
        </p>
      </div>

      {/* Team / Founder Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            Meet the Founder
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-700"
              />
              <div className="space-y-4 text-center sm:text-left flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{member.title}</p>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {member.bio}
                </p>
                <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                  {member.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium border border-zinc-200 dark:border-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {member.statLine && (
                  <p className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {member.statLine}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Text Story */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
            {settings.aboutTitle}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {settings.aboutDesc}
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl text-white shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Why the ₹99 Price tag?</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Most agencies require hours of sales calls just to quote basic development costs. We package our exact technical checklists, supplier costs, and ad rules into simple digital handbooks. Unlocking them for ₹99 helps filter out spam while keeping expert consulting affordable for every Indian business owner.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Stats Panel */}
        <div className="lg:col-span-5 bg-gradient-to-tr from-blue-600 to-indigo-900 rounded-3xl p-8 text-white space-y-8 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-200 uppercase tracking-widest block">Agency Performance</span>
            <h3 className="text-2xl font-black">Proven Track Record</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="border-l-2 border-blue-400 pl-4 py-1">
              <span className="text-3xl font-extrabold block">{settings.experienceYears}+ Years</span>
              <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">Expertise</span>
            </div>
            <div className="border-l-2 border-blue-400 pl-4 py-1">
              <span className="text-3xl font-extrabold block">{settings.satisfiedClients}+</span>
              <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">Clients Served</span>
            </div>
            <div className="border-l-2 border-blue-400 pl-4 py-1">
              <span className="text-3xl font-extrabold block">{settings.projectsCompleted}+</span>
              <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">Projects Completed</span>
            </div>
            <div className="border-l-2 border-blue-400 pl-4 py-1">
              <span className="text-3xl font-extrabold block">{settings.adBudgetManaged}</span>
              <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">Ad Spend Managed</span>
            </div>
          </div>

          <div className="pt-4 border-t border-blue-800">
            <Link
              href="/unlock"
              className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 text-xs transition-colors shadow-lg"
            >
              <Lock className="w-3.5 h-3.5" />
              Unlock Premium Blueprints @ ₹99
            </Link>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">Our Operating Values</h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-405 mt-2">The guidelines that define our client relationships and project workflows.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => {
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
