"use client";

import React, { useState } from "react";
import { ExternalLink, Layers, Layout, ShoppingCart, TrendingUp, CheckCircle, ArrowRight, X, Award } from "lucide-react";
import { Project } from "../lib/content";

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
        return <Layout className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "e-commerce":
        return <ShoppingCart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "digital marketing":
        return <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeCategory === category
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-350"
            }`}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Visual Header / Screenshot Mockup */}
            <div className="relative h-48 w-full bg-gradient-to-br from-zinc-800 to-zinc-950 overflow-hidden">
              {project.imageMockup ? (
                <img
                  src={project.imageMockup}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold">
                  {project.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-white border border-white/10">
                {getCategoryIcon(project.category)}
                <span>{project.category}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  {project.clientType || "Client Showcase"}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug truncate">
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
                        className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/40"
                      >
                        <Award className="w-3.5 h-3.5 text-emerald-500" />
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Before / After Box */}
                {project.beforeAfter && (
                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800/60 text-xs space-y-2">
                    <div className="text-zinc-500 dark:text-zinc-400">
                      <span className="font-bold text-rose-500 uppercase tracking-wider text-[10px]">Before:</span>{" "}
                      {project.beforeAfter.before}
                    </div>
                    <div className="text-zinc-800 dark:text-zinc-200 font-semibold border-t border-zinc-200/40 dark:border-zinc-800/60 pt-2">
                      <span className="font-bold text-emerald-500 uppercase tracking-wider text-[10px]">After:</span>{" "}
                      {project.beforeAfter.after}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline">
                  View Full Case Study & Results
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                {selectedProject.clientType || "Case Study Detail"}
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {selectedProject.title}
              </h2>
            </div>

            {selectedProject.keyMetrics && (
              <div className="flex flex-wrap gap-2">
                {selectedProject.keyMetrics.map((metric, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-300/40 dark:border-emerald-800/40"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {selectedProject.fullCaseStudy ? (
              <div className="space-y-5 text-sm">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800">
                  <h4 className="font-bold text-zinc-900 dark:text-white uppercase text-xs tracking-wider mb-1">
                    The Business Challenge
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs">
                    {selectedProject.fullCaseStudy.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 uppercase text-xs tracking-wider mb-2">
                    Our Solution & Implementation
                  </h4>
                  {Array.isArray(selectedProject.fullCaseStudy.solution) ? (
                    <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                      {selectedProject.fullCaseStudy.solution.map((item, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs">
                      {selectedProject.fullCaseStudy.solution}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-900 dark:text-white uppercase text-xs tracking-wider">
                    Key Performance Outcomes
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.fullCaseStudy.results.map((res, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProject.fullCaseStudy.keyTakeaway && (
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs italic text-zinc-700 dark:text-zinc-300 space-y-1">
                    <span className="font-bold not-italic text-amber-800 dark:text-amber-400 block uppercase text-[10px] tracking-wider">
                      Key Takeaway
                    </span>
                    <p>&ldquo;{selectedProject.fullCaseStudy.keyTakeaway}&rdquo;</p>
                  </div>
                )}

                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-zinc-900 dark:text-white uppercase text-xs tracking-wider">
                      Website Visuals & Media
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedProject.gallery.map((img, gIdx) => (
                        <div key={gIdx} className="group relative rounded-xl overflow-hidden bg-zinc-800 border border-zinc-200 dark:border-zinc-800 aspect-video sm:aspect-square">
                          <img
                            src={img.url}
                            alt={img.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 opacity-90">
                            <span className="text-[10px] font-semibold text-white truncate leading-tight">{img.caption}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {selectedProject.description}
              </p>
            )}

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-end gap-3">
              {selectedProject.link && selectedProject.link !== "#" && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 text-xs transition-colors shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Live Website &rarr;</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold px-6 py-2.5 text-xs transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
