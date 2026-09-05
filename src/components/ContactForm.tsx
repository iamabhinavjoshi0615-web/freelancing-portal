"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("web-dev");
  const [budget, setBudget] = useState("₹10k-25k");
  const [message, setMessage] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate database/webhook post
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900 rounded-3xl p-8 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-emerald-500 rounded-2xl text-white">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Inquiry Received!</h3>
        <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. Our consultancy team will review your requirements and contact you on WhatsApp/Email within the next 4 working hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">Send an Inquiry</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Name</label>
          <input
            type="text"
            required
            placeholder="Ramesh Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Phone Number</label>
          <input
            type="tel"
            required
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Email Address</label>
        <input
          type="email"
          required
          placeholder="ramesh@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Service Required</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="web-dev">Web Development</option>
            <option value="ecommerce">Shopify / E-commerce</option>
            <option value="marketing">Google / Meta Ads</option>
            <option value="retainer">Monthly Maintenance</option>
            <option value="custom">Custom Portal / CRM</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Est. Project Budget</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="₹5k-10k">₹5,000 - ₹10,000</option>
            <option value="₹10k-25k">₹10,000 - ₹25,000</option>
            <option value="₹25k-50k">₹25,000 - ₹50,000</option>
            <option value="₹50k+">₹50,000 +</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Project Details / Message</label>
        <textarea
          rows={4}
          required
          placeholder="Briefly describe what your business does and what type of website/ads you need."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-855 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white font-bold py-3.5 text-xs transition-colors shadow focus:outline-none"
          id="contact-form-submit-btn"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Inquiry...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit My Inquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}
