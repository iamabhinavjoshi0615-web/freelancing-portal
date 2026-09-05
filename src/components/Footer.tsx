import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Award, CheckCircle2, TrendingUp } from "lucide-react";

interface FooterProps {
  agencyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  experienceYears: number;
  satisfiedClients: number;
  projectsCompleted: number;
  adBudgetManaged: string;
}

export default function Footer({
  agencyName,
  tagline,
  phone,
  email,
  address,
  experienceYears,
  satisfiedClients,
  projectsCompleted,
  adBudgetManaged,
}: FooterProps) {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 mt-auto">
      {/* Trust Metrics Banner */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">{experienceYears}+ Years</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Industry Expertise</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">{projectsCompleted}+</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Projects Delivered</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">{satisfiedClients}+</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Happy Indian Clients</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 mb-2">
                <TrendingUp className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">{adBudgetManaged}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Ad Budget Managed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-emerald-400">
              {agencyName}
            </span>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              {tagline}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Empowering MSMEs & Startups with high-ROI consultancy and transparent pricing structure.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Quick Directory</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link href="/" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Pricing Details</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/unlock" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Unlock Guides</Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Free Resources</Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Get Quote</Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">CMS Admin</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">{phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Banner */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} {agencyName}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <span>GST Registered Invoices available upon request.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
