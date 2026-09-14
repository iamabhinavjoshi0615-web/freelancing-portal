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
      <div className="bg-[#FFFFFF] border border-[#E2E4E8] p-8 text-center space-y-4 font-mono text-[#18191C]">
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded bg-[#18191C] text-[#FFFFFF] font-mono flex items-center justify-center text-sm">
            &gt;_
          </div>
        </div>
        <h3 className="text-lg font-mono font-bold text-[#18191C]">INQUIRY RECEIVED!</h3>
        <p className="text-xs text-[#526075] leading-relaxed max-w-sm mx-auto font-sans">
          Thank you for reaching out. Our consultancy team will review your requirements and contact you on WhatsApp/Email within the next 4 working hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-bracket px-4 py-2 text-xs font-mono"
        >
          [ SEND ANOTHER INQUIRY ]
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#FFFFFF] border border-[#E2E4E8] p-6 sm:p-8 space-y-4 text-[#18191C] font-mono">
      <h3 className="text-lg font-mono font-bold text-[#18191C] uppercase tracking-wider mb-2">// Send an Inquiry</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-mono font-bold text-[#18191C] uppercase mb-1">// Name</label>
          <input
            type="text"
            required
            placeholder="Ramesh Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#E2E4E8] bg-[#F4F4F6] px-4 py-2 text-xs font-mono text-[#18191C] focus:outline-none focus:border-[#18191C]"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono font-bold text-[#18191C] uppercase mb-1">// Phone Number</label>
          <input
            type="tel"
            required
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-[#E2E4E8] bg-[#F4F4F6] px-4 py-2 text-xs font-mono text-[#18191C] focus:outline-none focus:border-[#18191C]"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-mono font-bold text-[#18191C] uppercase mb-1">// Email Address</label>
        <input
          type="email"
          required
          placeholder="ramesh@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[#E2E4E8] bg-[#F4F4F6] px-4 py-2 text-xs font-mono text-[#18191C] focus:outline-none focus:border-[#18191C]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-mono font-bold text-[#18191C] uppercase mb-1">// Service Required</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border border-[#E2E4E8] bg-[#F4F4F6] px-4 py-2 text-xs font-mono text-[#18191C] focus:outline-none focus:border-[#18191C]"
          >
            <option value="web-dev">Web Development</option>
            <option value="ecommerce">Shopify / E-commerce</option>
            <option value="marketing">Google / Meta Ads</option>
            <option value="retainer">Monthly Maintenance</option>
            <option value="custom">Custom Portal / CRM</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-mono font-bold text-[#18191C] uppercase mb-1">// Est. Project Budget</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full border border-[#E2E4E8] bg-[#F4F4F6] px-4 py-2 text-xs font-mono text-[#18191C] focus:outline-none focus:border-[#18191C]"
          >
            <option value="₹5k-10k">₹5,000 - ₹10,000</option>
            <option value="₹10k-25k">₹10,000 - ₹25,000</option>
            <option value="₹25k-50k">₹25,000 - ₹50,000</option>
            <option value="₹50k+">₹50,000 +</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-mono font-bold text-[#18191C] uppercase mb-1">// Project Details / Message</label>
        <textarea
          rows={4}
          required
          placeholder="Briefly describe what your business does and what type of website/ads you need."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-[#E2E4E8] bg-[#F4F4F6] px-4 py-2 text-xs font-mono text-[#18191C] focus:outline-none focus:border-[#18191C] resize-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-bracket w-full py-3.5 text-xs font-mono text-center block"
          id="contact-form-submit-btn"
        >
          {submitting ? (
            <>[ SUBMITTING INQUIRY... ]</>
          ) : (
            <>[ SUBMIT INQUIRY &rarr; ]</>
          )}
        </button>
      </div>
    </form>
  );
}
