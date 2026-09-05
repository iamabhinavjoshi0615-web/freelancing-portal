import React from "react";
import { Mail, Phone, MapPin, Calendar, ExternalLink, MessageCircle } from "lucide-react";
import { getCmsSettings } from "../../lib/db";
import ContactForm from "../../components/ContactForm";

export const dynamic = "force-dynamic";

export default function Contact() {
  const settings = getCmsSettings();

  const waText = encodeURIComponent(
    `Hi ${settings.agencyName}, I would like to book a consultation regarding my business.`
  );
  const waUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${waText}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-full border border-blue-200/30">
          Get in Touch
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Start Your Digital Project
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
          Ready to scale? Connect with our development and marketing consultants. Book a direct call or drop an inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact Cards & Booking */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Booking Card */}
          <div className="bg-gradient-to-tr from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-6 shadow-md">
            <div className="flex gap-3 items-center">
              <div className="p-2.5 bg-blue-600 rounded-2xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">Free Consultation Call</span>
                <h3 className="text-lg font-bold">Book a 10-Min Discovery Call</h3>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Schedule a brief 10-minute briefing call with our lead developer to clarify your ideas, tech options, and timeline estimations.
            </p>
            <a
              href={settings.consultationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold py-3.5 text-xs transition-colors shadow"
              id="calendly-booking-btn"
            >
              Schedule My Discovery Call
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick WhatsApp Action */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Immediate Assistance
            </h3>
            <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed">
              Skip forms entirely. Click below to message our engineering team directly on WhatsApp.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 text-xs transition-colors shadow"
              id="whatsapp-contact-page-btn"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Core Info Details */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4 text-sm text-zinc-650 dark:text-zinc-400">
            <h3 className="text-xs font-bold text-zinc-850 dark:text-zinc-300 uppercase tracking-wider pb-2 border-b border-zinc-100 dark:border-zinc-850">
              Agency Contact Information
            </h3>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <a href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`} className="hover:underline font-medium">
                {settings.contactPhone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <a href={`mailto:${settings.contactEmail}`} className="hover:underline font-medium">
                {settings.contactEmail}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span className="leading-tight font-medium">{settings.officeAddress}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
