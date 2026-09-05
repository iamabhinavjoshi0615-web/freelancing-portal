"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Lock, ShieldCheck, Layers, ArrowRight, Sparkles } from "lucide-react";

interface HeaderProps {
  agencyName: string;
}

export default function Header({ agencyName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pay & Unlock", href: "/unlock" },
    { name: "Resources", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/70 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl transition-all shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Icon */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Layers className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {agencyName}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase -mt-1">
                Digital Consultancy
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-zinc-100/70 dark:bg-zinc-900/60 p-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-bold transition-all duration-200 rounded-full flex items-center gap-1.5 ${
                  active
                    ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/unlock"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 px-4 sm:px-5 py-2 text-xs font-extrabold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] transition-all duration-200 border border-white/20"
            id="nav-cta-unlock"
          >
            <Lock className="w-3.5 h-3.5 text-blue-100" />
            <span>Unlock Guides @ ₹99</span>
          </Link>
        </div>

        {/* Medium Screen Nav Fallback */}
        <div className="hidden md:flex lg:hidden items-center gap-2">
          <Link
            href="/services"
            className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 px-2 py-1"
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 px-2 py-1"
          >
            Pricing
          </Link>
          <Link
            href="/unlock"
            className="flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm"
          >
            <Lock className="w-3 h-3" />
            <span>Unlock @ ₹99</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl px-4 py-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5 pb-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
                    active
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/50"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900">
            <Link
              href="/unlock"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 py-3 text-xs font-extrabold text-white shadow-md shadow-blue-500/20"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Premium Guides @ ₹99</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
