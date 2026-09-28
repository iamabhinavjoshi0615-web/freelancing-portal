import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/content";
import { getCmsSettings, getProjects } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";

export const revalidate = 60;

export async function generateStaticParams() {
  return Object.keys(TEAM_MEMBERS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = TEAM_MEMBERS[slug];
  if (!member) {
    return {
      title: "Team Member Not Found | The Industries",
    };
  }

  return {
    title: "Abhinav Joshi, Founder & Web Consultant | The Industries",
    description: "Abhinav Joshi builds websites and runs Meta Ads and local SEO campaigns for small businesses in India, with clear upfront pricing.",
    openGraph: {
      type: "profile",
      title: "Abhinav Joshi, Founder & Web Consultant | The Industries",
      description: "Abhinav Joshi builds websites and runs Meta Ads and local SEO campaigns for small businesses in India, with clear upfront pricing.",
      images: [{ url: member.image, width: 1200, height: 630, alt: member.name }],
    },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = TEAM_MEMBERS[slug];

  if (!member) {
    notFound();
  }

  const settings = getCmsSettings();
  const allProjects = getProjects();

  // Selected work projects matching configured IDs
  const selectedProjects = member.selectedWorkIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter(Boolean);

  const waText = encodeURIComponent(
    `Hi ${member.name}, I found your profile on ${settings.agencyName} and would like to discuss a project.`
  );
  const waUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${waText}`;

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      "@type": "Organization",
      name: settings.agencyName,
    },
    url: `https://theindustries.in/team/${member.slug}`,
  };

  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* a) Header Section */}
      <section className="border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              {/* Profile Photo */}
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover shrink-0 rounded-[8px] border border-[#2E313A]"
              />

              <div className="space-y-4 text-center sm:text-left flex-grow">
                <div>
                  <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF]">
                    {member.name}
                  </h1>
                  <p className="text-sm sm:text-base font-mono font-bold text-[#8E95A5] mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Facts Row in Plain Text separated by thin dividers */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono text-[#8E95A5]">
                  {member.facts.map((fact, idx) => (
                    <React.Fragment key={idx}>
                      <span>{fact}</span>
                      {idx < member.facts.length - 1 && <span className="text-[#2E313A]">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                  <Link
                    href="/contact"
                    className="btn-bracket px-5 py-2.5 text-xs font-mono text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#18191C] transition-colors rounded-md"
                  >
                    Work with me
                  </Link>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#8E95A5] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-[#10B981]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Profile Body */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* b) About */}
        <ScrollReveal>
          <div className="space-y-3 border-b border-[#2E313A] pb-8">
            <h2 className="text-xl font-mono font-bold text-[#FFFFFF]">About Abhinav</h2>
            <p className="text-sm text-[#8E95A5] leading-relaxed font-sans max-w-3xl">
              {member.about}
            </p>
          </div>
        </ScrollReveal>

        {/* c) Specialization */}
        <ScrollReveal>
          <div className="space-y-3 border-b border-[#2E313A] pb-8">
            <h2 className="text-xl font-mono font-bold text-[#FFFFFF]">Specialization</h2>
            <p className="text-sm text-[#E2E4E8] font-sans">
              {member.specialization}
            </p>
          </div>
        </ScrollReveal>

        {/* d) Core skills */}
        <ScrollReveal>
          <div className="space-y-3 border-b border-[#2E313A] pb-8">
            <h2 className="text-xl font-mono font-bold text-[#FFFFFF]">Core skills</h2>
            <p className="text-sm font-mono text-[#E2E4E8]">
              {member.coreSkills.join(", ")}
            </p>
          </div>
        </ScrollReveal>

        {/* e) Currently working on */}
        <ScrollReveal>
          <div className="space-y-3 border-b border-[#2E313A] pb-8">
            <h2 className="text-xl font-mono font-bold text-[#FFFFFF]">Currently working on</h2>
            <p className="text-sm text-[#8E95A5] font-sans leading-relaxed">
              {member.currentlyWorkingOn}
            </p>
          </div>
        </ScrollReveal>

        {/* f) Selected work */}
        <ScrollReveal>
          <div className="space-y-6 border-b border-[#2E313A] pb-8">
            <h2 className="text-xl font-mono font-bold text-[#FFFFFF]">Selected work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedProjects.map((project) => {
                if (!project) return null;
                return (
                  <div
                    key={project.id}
                    className="bg-[#121316] border border-[#2E313A] p-6 rounded-lg flex flex-col justify-between space-y-4 card-hover"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[#8E95A5] uppercase block">
                        // {project.clientType || project.category}
                      </span>
                      <h3 className="text-base font-mono font-bold text-[#FFFFFF]">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#8E95A5] font-sans line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#2E313A] flex items-center justify-between">
                      {project.link && project.link !== "#" ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono font-bold text-[#FFFFFF] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Visit live project</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          href="/portfolio"
                          className="text-xs font-mono font-bold text-[#FFFFFF] hover:underline inline-flex items-center gap-1"
                        >
                          <span>View case study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* g) Closing call to action */}
        <ScrollReveal>
          <div className="bg-[#121316] border border-[#2E313A] p-8 sm:p-10 rounded-lg text-center space-y-4 font-mono">
            <h2 className="text-2xl font-bold text-[#FFFFFF]">Have a project in mind?</h2>
            <p className="text-xs text-[#8E95A5] max-w-md mx-auto font-sans leading-relaxed">
              Let's build a high-performance website or run targeted ad campaigns to grow your business inquiries.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-bracket px-6 py-3 text-xs text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#18191C] transition-colors rounded-md"
              >
                Work with me
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8E95A5] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-[#10B981]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
