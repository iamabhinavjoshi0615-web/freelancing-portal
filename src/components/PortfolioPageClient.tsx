"use client";

import React, { useState } from "react";
import { ExternalLink, Layers, Layout, ShoppingCart, TrendingUp, CheckCircle, ArrowRight, X, Award } from "lucide-react";
import { Project } from "../lib/content";
import ScrollReveal from "./ScrollReveal";

interface PortfolioPageClientProps {
  initialProjects: Project[];
}

export default function PortfolioPageClient({ initialProjects }: PortfolioPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique categories for filters
  const categories = ["All", ...Array.from(new Set(initialProjects.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web development":
        return <Layout className="w-3.5 h-3.5" />;
      case "e-commerce":
        return <ShoppingCart className="w-3.5 h-3.5" />;
      case "ad campaigns":
        return <TrendingUp className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-12 text-[#E2E4E8]">
      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center gap-2 justify-center font-mono">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-xs font-mono transition-all ${
              activeCategory === category
                ? "bg-[#FFFFFF] text-[#18191C] font-bold border border-[#FFFFFF]"
                : "bg-[#121316] border border-[#2E313A] text-[#8E95A5] hover:text-[#FFFFFF]"
            }`}
            type="button"
          >
            [ {category.toUpperCase()} ]
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, pIdx) => (
          <ScrollReveal key={project.id} delayMs={pIdx * 100}>
            <div
              className="flex flex-col justify-between bg-[#121316] border border-[#2E313A] overflow-hidden group cursor-pointer h-full"
              onClick={() => setSelectedProject(project)}
            >
              {/* Visual Header / Screenshot Mockup */}
              <div className="relative h-48 w-full bg-[#18191C] overflow-hidden border-b border-[#2E313A]">
                {project.imageMockup ? (
                  <img
                    src={project.imageMockup}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#FFFFFF] font-mono font-bold">
                    {project.title}
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-[#18191C]/90 px-3 py-1 flex items-center gap-1.5 text-[11px] font-mono text-[#FFFFFF] border border-[#2E313A]">
                  {getCategoryIcon(project.category)}
                  <span>{project.category.toUpperCase()}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-[#18191C]/90 p-3 border border-[#2E313A]">
                  <span className="text-[10px] font-mono font-bold text-[#8E95A5] uppercase tracking-widest block">
                    {project.clientType || "Client Showcase"}
                  </span>
                  <h3 className="text-base font-mono font-bold text-[#FFFFFF] leading-snug truncate">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Metrics Badges */}
                  {project.keyMetrics && project.keyMetrics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.keyMetrics.map((metric, mIdx) => (
                        <span
                          key={mIdx}
                          className="inline-flex items-center gap-1.5 bg-[#18191C] text-[#FFFFFF] text-xs font-mono px-3 py-1 border border-[#2E313A]"
                        >
                          <Award className="w-3.5 h-3.5 text-[#8E95A5]" />
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-[#8E95A5] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Before / After Box */}
                  {project.beforeAfter && (
                    <div className="p-3.5 bg-[#18191C] border border-[#2E313A] text-xs font-mono space-y-2">
                      <div className="text-[#8E95A5]">
                        <span className="font-mono font-bold text-[#FFFFFF] uppercase tracking-wider text-[10px]">BEFORE:</span>{" "}
                        {project.beforeAfter.before}
                      </div>
                      <div className="text-[#FFFFFF] font-semibold border-t border-[#2E313A] pt-2">
                        <span className="font-mono font-bold text-[#FFFFFF] uppercase tracking-wider text-[10px]">AFTER:</span>{" "}
                        {project.beforeAfter.after}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-[#18191C] text-[#8E95A5] text-[10px] font-mono px-2 py-0.5 border border-[#2E313A]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2E313A] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FFFFFF] flex items-center gap-1">
                    [ VIEW CASE STUDY ]
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121316] border border-[#2E313A] max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-[#E2E4E8] font-mono">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 bg-[#18191C] text-[#FFFFFF] hover:bg-[#2E313A] transition-colors border border-[#2E313A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E95A5]">
                // {selectedProject.clientType || "Case Study Detail"}
              </span>
              <h2 className="text-2xl font-mono font-bold text-[#FFFFFF]">
                {selectedProject.title}
              </h2>
            </div>

            {selectedProject.keyMetrics && (
              <div className="flex flex-wrap gap-2">
                {selectedProject.keyMetrics.map((metric, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-[#18191C] text-[#FFFFFF] text-xs font-mono px-3 py-1.5 border border-[#2E313A]"
                  >
                    <Award className="w-3.5 h-3.5 text-[#8E95A5]" />
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {selectedProject.fullCaseStudy ? (
              <div className="space-y-5 text-xs font-mono">
                <div className="p-4 bg-[#18191C] border border-[#2E313A]">
                  <h4 className="font-mono font-bold text-[#FFFFFF] uppercase text-xs tracking-wider mb-1">
                    // THE BUSINESS CHALLENGE
                  </h4>
                  <p className="text-[#8E95A5] leading-relaxed">
                    {selectedProject.fullCaseStudy.challenge}
                  </p>
                </div>

                <div className="p-4 bg-[#18191C] border border-[#2E313A]">
                  <h4 className="font-mono font-bold text-[#FFFFFF] uppercase text-xs tracking-wider mb-2">
                    // OUR SOLUTION & IMPLEMENTATION
                  </h4>
                  {Array.isArray(selectedProject.fullCaseStudy.solution) ? (
                    <ul className="space-y-2 text-[#8E95A5]">
                      {selectedProject.fullCaseStudy.solution.map((item, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#8E95A5] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#8E95A5] leading-relaxed">
                      {selectedProject.fullCaseStudy.solution}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono font-bold text-[#FFFFFF] uppercase text-xs tracking-wider">
                    // KEY PERFORMANCE OUTCOMES
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.fullCaseStudy.results.map((res, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-[#8E95A5]">
                        <CheckCircle className="w-4 h-4 text-[#8E95A5] shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProject.fullCaseStudy.keyTakeaway && (
                  <div className="p-4 bg-[#18191C] border border-[#2E313A] text-xs italic text-[#8E95A5] space-y-1">
                    <span className="font-mono font-bold not-italic text-[#FFFFFF] block uppercase text-[10px] tracking-wider">
                      // KEY TAKEAWAY
                    </span>
                    <p>&ldquo;{selectedProject.fullCaseStudy.keyTakeaway}&rdquo;</p>
                  </div>
                )}

                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="font-mono font-bold text-[#FFFFFF] uppercase text-xs tracking-wider">
                      // WEBSITE VISUALS & MEDIA
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedProject.gallery.map((img, gIdx) => (
                        <div key={gIdx} className="group relative bg-[#18191C] border border-[#2E313A] aspect-video sm:aspect-square overflow-hidden">
                          <img
                            src={img.url}
                            alt={img.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                          />
                          <div className="absolute inset-0 bg-[#18191C]/80 flex items-end p-2 opacity-90">
                            <span className="text-[10px] font-mono text-[#FFFFFF] truncate leading-tight">{img.caption}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs font-mono text-[#8E95A5] leading-relaxed">
                {selectedProject.description}
              </p>
            )}

            <div className="pt-4 border-t border-[#2E313A] flex flex-wrap items-center justify-end gap-3 font-mono">
              {selectedProject.link && selectedProject.link !== "#" && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bracket px-4 py-2 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  [ VIEW LIVE WEBSITE &rarr; ]
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-[#18191C] border border-[#2E313A] text-[#8E95A5] hover:text-[#FFFFFF] text-xs font-mono"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
