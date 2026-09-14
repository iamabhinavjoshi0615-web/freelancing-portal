"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  CheckCircle,
  AlertTriangle,
  Printer,
  PhoneCall,
  Loader2,
  Table,
  Wrench,
  Clock,
  ShieldCheck,
  MessageCircle,
  Layers,
  Zap,
  Gift
} from "lucide-react";
import { GuideContent } from "../../lib/content";
import PersonalizedActionPlanCard from "../../components/PersonalizedActionPlanCard";
import ScrollReveal from "../../components/ScrollReveal";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => Promise<void>;
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

function PayUnlockContent() {
  const searchParams = useSearchParams();

  const [topics, setTopics] = useState<any[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState("website-building");
  const [purchaseType, setPurchaseType] = useState<"single" | "bundle">("single");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Checking states
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  
  // Unlocked state
  const [unlockedContent, setUnlockedContent] = useState<GuideContent | null>(null);
  const [unlockedTopicTitle, setUnlockedTopicTitle] = useState("");
  const [unlockedEmail, setUnlockedEmail] = useState("");
  const [isBundleUnlocked, setIsBundleUnlocked] = useState(false);
  const [allTopicsData, setAllTopicsData] = useState<any[]>([]);

  // Customer Auth States
  const [customer, setCustomer] = useState<{ id: string; name: string; email: string; phone: string } | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Sandbox simulation states
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [sandboxOrderId, setSandboxOrderId] = useState("");

  const [mounted, setMounted] = useState(false);

  // Mount logic: check if customer is logged in
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("customer_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomer(parsed);
        setName(parsed.name);
        setEmail(parsed.email);
        setPhone(parsed.phone);
      } catch (e) {
        console.error("Local storage auth parse error:", e);
      }
    }
  }, []);

  // Auto unlock check if logged in customer has already paid
  useEffect(() => {
    if (customer && selectedTopicId && topics.length > 0) {
      const checkUnlockState = async () => {
        try {
          const res = await fetch(
            `/api/content/${selectedTopicId}?email=${encodeURIComponent(customer.email.toLowerCase().trim())}`
          );
          if (res.ok) {
            const data = await res.json();
            if (!data.isLocked) {
              setUnlockedContent(data.content);
              const activeTopic = topics.find((t) => t.id === selectedTopicId);
              setUnlockedTopicTitle(activeTopic ? activeTopic.title : "Unlocked Guide");
              setUnlockedEmail(customer.email);
            } else {
              setUnlockedContent(null);
            }
          }
        } catch (e) {
          console.error("Auto unlock verification failure:", e);
        }
      };
      checkUnlockState();
    } else {
      setUnlockedContent(null);
    }
  }, [customer, selectedTopicId, topics]);

  // Retrieve Topics metadata from API
  useEffect(() => {
    async function loadTopics() {
      try {
        const list = [
          { id: "website-building", title: "How to Build a Website for Your Business", desc: "Choose CMS vs code, hosting options, domain extensions, and setup checklist." },
          { id: "running-ads", title: "How to Run Ads for Your Business/Product", desc: "Select Google vs Meta, budget sizes, pixel configurations, and ad copy templates." },
          { id: "website-pricing", title: "Website Types, Pricing, Hosting, Domain, and Maintenance Charges", desc: "Compare agency fees, domains, hostings, and maintenance retainers." },
          { id: "ad-pricing", title: "Ad Campaign Charges (Google Ads, Meta Ads, etc.)", desc: "Review agency monthly retainers, setup costs, and conversion metrics." }
        ];
        setTopics(list);

        // Pre-select topic from URL if present
        const urlTopic = searchParams.get("topic");
        if (urlTopic && list.some(t => t.id === urlTopic)) {
          setSelectedTopicId(urlTopic);
        }

        const urlBundle = searchParams.get("bundle");
        if (urlBundle === "true") {
          setPurchaseType("bundle");
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadTopics();
  }, [searchParams]);

  if (!mounted) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center py-32 bg-[#18191C] text-[#E2E4E8] font-mono">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFFFFF] mb-4" />
        <span className="text-sm font-mono">[ INITIALIZING CHECKOUT PROTOCOL... ]</span>
      </div>
    );
  }

  // Initiate checkout
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in your Name, Email, and Phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.toLowerCase().trim(),
          phone,
          topicId: purchaseType === "bundle" ? "bundle" : selectedTopicId,
          purchaseType,
          whatsappOptIn,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const activeTopic = topics.find(t => t.id === selectedTopicId);
      const topicTitle = purchaseType === "bundle" ? "Complete Bundle (All 4 Guides)" : (activeTopic ? activeTopic.title : "Premium Guide");

      if (orderData.isSandbox) {
        // Trigger simulated Sandbox Checkout
        setSandboxOrderId(orderData.orderId);
        setShowSandboxModal(true);
      } else {
        // Trigger Real Razorpay Checkout
        if (typeof window.Razorpay === "undefined") {
          alert("Razorpay payment gateway failed to load. Please disable ad-blockers and try again.");
          setLoading(false);
          return;
        }

        const options: RazorpayOptions = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: "INR",
          name: "Guruji Digital & Tech",
          description: `Unlock: ${topicTitle}`,
          order_id: orderData.orderId,
          prefill: {
            name: orderData.name,
            email: orderData.email,
            contact: orderData.phone,
          },
          handler: async (response) => {
            setVerifying(true);
            try {
              const verifyRes = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  whatsappOptIn,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                if (verifyData.isBundle && verifyData.allTopics) {
                  setIsBundleUnlocked(true);
                  setAllTopicsData(verifyData.allTopics);
                  const firstTopic = verifyData.allTopics[0];
                  setUnlockedContent(firstTopic.fullContent);
                  setUnlockedTopicTitle(firstTopic.title);
                } else {
                  setUnlockedContent(verifyData.unlockedContent);
                  setUnlockedTopicTitle(topicTitle);
                }
                setUnlockedEmail(orderData.email);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                alert("Payment verification failed! " + verifyData.error);
              }
            } catch (err) {
              console.error(err);
              alert("Server connection failed during payment verification.");
            } finally {
              setVerifying(false);
            }
          },
          theme: { color: "#18191C" },
          modal: {
            ondismiss: () => {
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error: any) {
      console.error(error);
      alert("Error initiating checkout: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit Sign In / Sign Up
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        authMode === "login"
          ? { email: authEmail, password: authPassword }
          : { name: authName, email: authEmail, phone: authPhone, password: authPassword };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save session
        setCustomer(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
        setPhone(data.user.phone);
        localStorage.setItem("customer_user", JSON.stringify(data.user));
        
        // Reset auth fields
        setAuthEmail("");
        setAuthPassword("");
        setAuthName("");
        setAuthPhone("");
      } else {
        setAuthError(data.error || "Authentication failed. Please verify credentials.");
      }
    } catch (err) {
      console.error(err);
      setAuthError("Network error. Failed to connect to authentication services.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("customer_user");
    setCustomer(null);
    setUnlockedContent(null);
    setUnlockedTopicTitle("");
    setIsBundleUnlocked(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  // Verify simulated sandbox transaction
  const handleVerifySandbox = async () => {
    setShowSandboxModal(false);
    setVerifying(true);
    try {
      const verifyRes = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isSandbox: true,
          orderId: sandboxOrderId,
          email: email.toLowerCase().trim(),
          phone,
          name,
          topicId: purchaseType === "bundle" ? "bundle" : selectedTopicId,
          whatsappOptIn,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        const activeTopic = topics.find(t => t.id === selectedTopicId);
        if (verifyData.isBundle && verifyData.allTopics) {
          setIsBundleUnlocked(true);
          setAllTopicsData(verifyData.allTopics);
          const firstTopic = verifyData.allTopics[0];
          setUnlockedContent(firstTopic.fullContent);
          setUnlockedTopicTitle(firstTopic.title);
        } else {
          setUnlockedContent(verifyData.unlockedContent);
          setUnlockedTopicTitle(activeTopic ? activeTopic.title : "Premium Guide");
        }
        setUnlockedEmail(email.toLowerCase().trim());
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Simulated verification failed! " + verifyData.error);
      }
    } catch (err) {
      console.error(err);
      alert("Sandbox server connection failed.");
    } finally {
      setVerifying(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Guruji Digital! I just unlocked ${unlockedTopicTitle || "my consultancy guide"}. Please send me my guide + future tips on WhatsApp.`
  );

  // Render UNLOCKED Premium Content
  if (unlockedContent) {
    return (
      <div className="w-full bg-[#18191C] text-[#E2E4E8] font-mono py-12 px-4 sm:px-6 lg:px-8 print:py-0 print:px-2 print:bg-white print:text-black">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* WhatsApp Unlock Flow Thank You Box */}
          <ScrollReveal>
            <div className="terminal-box p-6 sm:p-8 space-y-6 print:hidden">
              <div>
                <div className="wireframe-section-label mb-1">// PAYMENT VERIFIED • BLUEPRINT UNLOCKED</div>
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF]">
                  THANK YOU! ACCESS YOUR UNLOCKED CONTENT BELOW
                </h2>
              </div>

              <p className="text-xs text-[#8E95A5] leading-relaxed">
                Choose how you would like to consume your unlocked blueprint and resources:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option A */}
                <div className="p-5 bg-[#121316] border border-[#2E313A] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#8E95A5]">OPTION A</span>
                  <h3 className="text-xs font-mono font-bold text-[#FFFFFF]">VIEW DIRECTLY ON THIS PAGE</h3>
                  <p className="text-[11px] text-[#8E95A5]">Read step-by-step checklists, price tables, and print as PDF below.</p>
                </div>

                {/* Option B */}
                <a
                  href={`https://wa.me/917415917942?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-[#121316] border border-[#FFFFFF] hover:bg-[#18191C] space-y-2 group block transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#FFFFFF]">OPTION B (RECOMMENDED)</span>
                    <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
                  </div>
                  <h3 className="text-xs font-mono font-bold text-[#FFFFFF] group-hover:underline">[ JOIN WHATSAPP CHANNEL ]</h3>
                  <p className="text-[11px] text-[#8E95A5]">Get this guide sent directly to your WhatsApp + future marketing tips.</p>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* POST-UNLOCK UPSELL CTA */}
          <ScrollReveal>
            <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
              <div className="space-y-2 text-center md:text-left">
                <div className="wireframe-section-label">// DONE-FOR-YOU EXECUTION</div>
                <h3 className="text-xl font-mono font-bold text-[#FFFFFF]">
                  WANT US TO BUILD THIS FOR YOU?
                </h3>
                <div className="text-xs text-[#8E95A5] space-y-1 font-mono">
                  <p>• <strong>Starter Website Package</strong> — ₹8,999 (Complete 5-Page Site)</p>
                  <p>• <strong>Starter Ad Campaign Setup</strong> — ₹4,999 (Meta/Google Ads Setup)</p>
                  <p className="text-[11px] text-[#FFFFFF] font-bold mt-1">
                    *100% of your ₹99 / ₹249 unlock payment will be credited back on your final invoice!
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a
                  href="https://wa.me/917415917942?text=Hi%20Guruji%20Digital,%20I%20unlocked%20my%20guide%20and%20would%20like%20to%20book%20a%20Free%2010-min%20call%20for%20done-for-you%20packages."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bracket px-6 py-3 text-xs text-center"
                >
                  [ BOOK FREE 10-MIN CALL ]
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Personalized Action Plan Card if unlocked via quiz */}
          <PersonalizedActionPlanCard sessionId={searchParams.get("quizSession")} />

          {/* Unlocked Header */}
          <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
            <div>
              <span className="text-xs font-mono font-bold text-[#FFFFFF] uppercase block">
                // {isBundleUnlocked ? "COMPLETE BUNDLE UNLOCKED (ALL 4 GUIDES)" : "SINGLE TOPIC UNLOCKED"}
              </span>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] mt-1">
                {unlockedTopicTitle}
              </h2>
              <p className="text-xs text-[#8E95A5] font-mono mt-1">
                UNLOCKED FOR: <span className="text-[#FFFFFF]">{unlockedEmail}</span>
              </p>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="btn-bracket px-4 py-3 text-xs w-full sm:w-auto"
              >
                [ PRINT / SAVE PDF ]
              </button>
            </div>
          </div>

          {/* Bundle Switcher Tabs if bundle unlocked */}
          {isBundleUnlocked && allTopicsData.length > 0 && (
            <div className="space-y-2 print:hidden font-mono">
              <span className="text-xs font-bold text-[#8E95A5] uppercase tracking-wider block">
                // BUNDLE GUIDE SWITCHER:
              </span>
              <div className="flex flex-wrap gap-2">
                {allTopicsData.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setUnlockedContent(t.fullContent);
                      setUnlockedTopicTitle(t.title);
                    }}
                    className={`px-4 py-2 text-xs font-mono border ${
                      unlockedTopicTitle === t.title
                        ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold"
                        : "bg-[#121316] text-[#8E95A5] border-[#2E313A] hover:text-[#FFFFFF]"
                    }`}
                  >
                    [ {t.title.toUpperCase()} ]
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRINT BANNER ONLY FOR PAPER */}
          <div className="hidden print:block border-b border-zinc-300 pb-4 mb-6">
            <h1 className="text-3xl font-bold">{unlockedTopicTitle}</h1>
            <p className="text-sm text-zinc-600">Consultancy Blueprint. Email: {unlockedEmail} | Provided by Guruji Digital & Tech</p>
          </div>

          {/* 1. Steps Breakdown */}
          <div className="space-y-6">
            <div className="wireframe-section-label">// SECTION 01</div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] flex items-center gap-2 border-b border-[#2E313A] pb-2">
              1. ACTION PLAN & STEP-BY-STEP BREAKDOWN
            </h2>
            <div className="space-y-6">
              {unlockedContent.steps.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#121316] border border-[#2E313A] p-6 space-y-3"
                >
                  <h3 className="text-base font-mono font-bold text-[#FFFFFF] flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#2E313A] text-[#FFFFFF] text-xs font-mono flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#8E95A5] leading-relaxed">
                    {step.desc}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-[#2E313A] pt-3 text-xs font-mono text-[#E2E4E8]">
                    {step.details.map((detail: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#8E95A5]">&rarr;</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Tables Matrix */}
          {unlockedContent.tables && unlockedContent.tables.length > 0 && (
            <div className="space-y-6">
              <div className="wireframe-section-label">// SECTION 02</div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] flex items-center gap-2 border-b border-[#2E313A] pb-2">
                2. MATRIX COST BENCHMARKS
              </h2>
              {unlockedContent.tables.map((table: any, tIdx: number) => (
                <div
                  key={tIdx}
                  className="bg-[#121316] border border-[#2E313A] overflow-hidden"
                >
                  <div className="bg-[#18191C] p-4 border-b border-[#2E313A]">
                    <h3 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase">{table.title}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono text-left">
                      <thead>
                        <tr className="bg-[#18191C] text-[#8E95A5] uppercase font-semibold border-b border-[#2E313A]">
                          {table.headers.map((header: string, hIdx: number) => (
                            <th key={hIdx} className="px-6 py-3">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E313A]">
                        {table.rows.map((row: string[], rIdx: number) => (
                          <tr key={rIdx} className="hover:bg-[#18191C]">
                            {row.map((cell: string, cIdx: number) => (
                              <td key={cIdx} className="px-6 py-3 text-[#E2E4E8]">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Recommended Tools */}
          <div className="space-y-6">
            <div className="wireframe-section-label">// SECTION 03</div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] flex items-center gap-2 border-b border-[#2E313A] pb-2">
              3. RECOMMENDED SOFTWARE & TOOL STACK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unlockedContent.tools.map((tool: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#121316] border border-[#2E313A] p-5 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-mono font-bold text-[#FFFFFF]">{tool.name}</h3>
                    <span className="bg-[#2E313A] px-2 py-0.5 text-[10px] font-mono text-[#FFFFFF] uppercase">
                      {tool.type}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#FFFFFF]">
                    COST: {tool.pricing}
                  </div>
                  <p className="text-xs text-[#8E95A5] leading-relaxed border-t border-[#2E313A] pt-2.5">
                    {tool.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Timeline Map */}
          <div className="space-y-6">
            <div className="wireframe-section-label">// SECTION 04</div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] flex items-center gap-2 border-b border-[#2E313A] pb-2">
              4. EXECUTION TIMELINES & DELIVERABLES
            </h2>
            <div className="space-y-4">
              {unlockedContent.timelines.map((time: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 bg-[#121316] border border-[#2E313A]"
                >
                  <div className="bg-[#2E313A] text-[#FFFFFF] font-mono font-bold p-2 text-xs uppercase shrink-0 text-center min-w-[70px]">
                    {time.duration}
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase">{time.phase}</h3>
                    <ul className="mt-2 space-y-1">
                      {time.deliverables.map((item: string, index: number) => (
                        <li key={index} className="text-xs text-[#8E95A5] flex items-center gap-1.5 font-mono">
                          <span className="text-[#8E95A5]">&rarr;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Direct Recommendations */}
          <div className="space-y-6">
            <div className="wireframe-section-label">// SECTION 05</div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] flex items-center gap-2 border-b border-[#2E313A] pb-2">
              5. PERSONALIZED CONSULTANCY RECOMMENDATIONS
            </h2>
            <div className="bg-[#121316] border border-[#2E313A] p-6 space-y-4">
              {unlockedContent.recommendations.map((rec: string, idx: number) => (
                <div key={idx} className="flex gap-3 text-xs font-mono text-[#E2E4E8] leading-relaxed">
                  <span className="text-[#8E95A5]">&rarr;</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render LOCK Screen
  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* Page Header (Dark Charcoal Block) */}
      <section className="border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="wireframe-section-label mb-4">// CONSULTANCY BLUEPRINTS</div>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF] max-w-3xl">
              PAY & UNLOCK SYSTEM BLUEPRINTS
            </h1>
            <p className="mt-4 text-[#8E95A5] text-base sm:text-lg max-w-2xl font-sans">
              Select single guide for ₹99 or unlock the Complete Bundle (All 4 Guides) for ₹249.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Unlock Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Bundle Pricing Selector */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto font-mono">
            {/* Single Guide Option */}
            <div
              onClick={() => setPurchaseType("single")}
              className={`p-6 border-2 cursor-pointer transition-all ${
                purchaseType === "single"
                  ? "border-[#FFFFFF] bg-[#121316]"
                  : "border-[#2E313A] bg-[#121316]/50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-mono text-[#8E95A5] uppercase">// OPTION 01</span>
                  <h3 className="text-lg font-mono font-bold text-[#FFFFFF]">SINGLE TOPIC UNLOCK</h3>
                </div>
                <span className="text-2xl font-mono font-bold text-[#FFFFFF]">₹99</span>
              </div>
              <p className="text-xs text-[#8E95A5] leading-relaxed font-sans">
                Choose one specific topic handbook (Website Building, Ad Strategy, Website Pricing, or Ad Charges).
              </p>
            </div>

            {/* Bundle Option */}
            <div
              onClick={() => setPurchaseType("bundle")}
              className={`p-6 border-2 cursor-pointer transition-all relative ${
                purchaseType === "bundle"
                  ? "border-[#FFFFFF] bg-[#121316]"
                  : "border-[#2E313A] bg-[#121316]/50"
              }`}
            >
              <div className="absolute top-0 right-0 bg-[#FFFFFF] text-[#18191C] text-[10px] font-mono font-bold uppercase px-3 py-1">
                BEST VALUE - SAVE ₹147
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-mono text-[#8E95A5] uppercase">// OPTION 02</span>
                  <h3 className="text-lg font-mono font-bold text-[#FFFFFF]">
                    COMPLETE BUNDLE ACCESS
                  </h3>
                </div>
                <span className="text-2xl font-mono font-bold text-[#FFFFFF]">₹249</span>
              </div>
              <p className="text-xs text-[#8E95A5] leading-relaxed font-sans">
                Unlocks ALL 4 handbooks + future updates + priority WhatsApp support. Save ₹147 over single purchases!
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Topic Selector & Checklist Comparison */}
          <div className="lg:col-span-7 space-y-8">
            {purchaseType === "single" ? (
              <div className="space-y-4 font-mono">
                <h2 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider">
                  // Step 1: Choose Your Guide Topic (₹99)
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopicId(t.id)}
                      className={`flex items-start text-left p-4 border transition-all ${
                        selectedTopicId === t.id
                          ? "border-[#FFFFFF] bg-[#121316]"
                          : "border-[#2E313A] bg-[#121316]/50 hover:border-[#8E95A5]"
                      }`}
                      type="button"
                    >
                      <span className={`mt-0.5 mr-3 shrink-0 flex items-center justify-center w-5 h-5 border font-mono text-xs ${
                        selectedTopicId === t.id ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold" : "border-[#2E313A] text-[#8E95A5]"
                      }`}>
                        {selectedTopicId === t.id ? ">" : "#"}
                      </span>
                      <div>
                        <h3 className="text-sm font-mono font-bold text-[#FFFFFF]">{t.title}</h3>
                        <p className="text-xs text-[#8E95A5] mt-1 leading-relaxed font-sans">{t.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-6 bg-[#121316] border border-[#2E313A] font-mono">
                <h2 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#8E95A5]" />
                  // Included in Complete Bundle (₹249):
                </h2>
                <ul className="space-y-2 text-xs font-mono text-[#E2E4E8]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#8E95A5]">&rarr;</span>
                    1. How to Build a Website for Your Business
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#8E95A5]">&rarr;</span>
                    2. How to Run Ads for Your Business/Product
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#8E95A5]">&rarr;</span>
                    3. Website Types, Pricing, Hosting & Maintenance Charges
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#8E95A5]">&rarr;</span>
                    4. Ad Campaign Charges (Google & Meta Ads Breakdown)
                  </li>
                </ul>
              </div>
            )}

            {/* Comparison Table */}
            <div className="space-y-4 font-mono">
              <h2 className="text-xs font-mono font-bold text-[#8E95A5] uppercase tracking-wider">
                // Free vs Premium Tier Comparison
              </h2>
              <div className="border border-[#2E313A] bg-[#121316]">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-[#18191C] text-[#8E95A5] font-bold border-b border-[#2E313A]">
                      <th className="px-4 py-3">Features Included</th>
                      <th className="px-4 py-3 text-center">Free Tier</th>
                      <th className="px-4 py-3 text-center text-[#FFFFFF]">Single (₹99)</th>
                      <th className="px-4 py-3 text-center text-[#FFFFFF]">Bundle (₹249)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2E313A] text-[#E2E4E8]">
                    <tr className="hover:bg-[#18191C]">
                      <td className="px-4 py-3 font-medium">Step-by-Step Technical Blueprint</td>
                      <td className="px-4 py-3 text-center text-[#8E95A5]">Not Included</td>
                      <td className="px-4 py-3 text-center text-[#FFFFFF] font-bold">1 Guide</td>
                      <td className="px-4 py-3 text-center text-[#FFFFFF] font-bold">All 4 Guides</td>
                    </tr>
                    <tr className="hover:bg-[#18191C]">
                      <td className="px-4 py-3 font-medium">Detailed Price & Fee Tables</td>
                      <td className="px-4 py-3 text-center text-[#8E95A5]">Not Included</td>
                      <td className="px-4 py-3 text-center text-[#FFFFFF] font-bold">Included</td>
                      <td className="px-4 py-3 text-center text-[#FFFFFF] font-bold">Included</td>
                    </tr>
                    <tr className="hover:bg-[#18191C]">
                      <td className="px-4 py-3 font-medium">Recommended Tool Stack & Costs</td>
                      <td className="px-4 py-3 text-center text-[#8E95A5]">Not Included</td>
                      <td className="px-4 py-3 text-center text-[#FFFFFF] font-bold">Included</td>
                      <td className="px-4 py-3 text-center text-[#FFFFFF] font-bold">Included</td>
                    </tr>
                    <tr className="hover:bg-[#18191C]">
                      <td className="px-4 py-3 font-medium">WhatsApp Delivery & Updates</td>
                      <td className="px-4 py-3 text-center text-[#8E95A5]">Not Included</td>
                      <td className="px-4 py-3 text-center text-[#FFFFFF] font-bold">Included</td>
                      <td className="px-4 py-3 text-center text-[#FFFFFF] font-bold">Priority Delivery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Side: Form / Payment */}
          <div className="lg:col-span-5 space-y-8 font-mono">
            {customer === null ? (
              /* Authentication Panel */
              <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 space-y-4">
                <div className="flex border-b border-[#2E313A] mb-6">
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                    }}
                    className={`flex-1 pb-3 text-xs font-mono font-bold text-center border-b-2 transition-all ${
                      authMode === "login"
                        ? "border-[#FFFFFF] text-[#FFFFFF]"
                        : "border-transparent text-[#8E95A5] hover:text-[#FFFFFF]"
                    }`}
                    type="button"
                  >
                    [ SIGN IN ]
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setAuthError("");
                    }}
                    className={`flex-1 pb-3 text-xs font-mono font-bold text-center border-b-2 transition-all ${
                      authMode === "signup"
                        ? "border-[#FFFFFF] text-[#FFFFFF]"
                        : "border-transparent text-[#8E95A5] hover:text-[#FFFFFF]"
                    }`}
                    type="button"
                  >
                    [ REGISTER ACCOUNT ]
                  </button>
                </div>

                <p className="text-xs text-[#8E95A5] mb-6 leading-relaxed font-sans">
                  {authMode === "login"
                    ? "Sign in to your customer account to view your purchased guides and proceed with secure checkouts."
                    : "Create a customer account to synchronize unlocked consultancy guides permanently across your devices."}
                </p>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === "signup" && (
                    <>
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">
                          // Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ramesh Sharma"
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] placeholder-[#8E95A5]/60 focus:outline-none focus:border-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">
                          // Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="9876543210"
                          value={authPhone}
                          onChange={(e) => setAuthPhone(e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] placeholder-[#8E95A5]/60 focus:outline-none focus:border-[#FFFFFF]"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">
                      // Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@company.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] placeholder-[#8E95A5]/60 focus:outline-none focus:border-[#FFFFFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">
                      // Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] placeholder-[#8E95A5]/60 focus:outline-none focus:border-[#FFFFFF]"
                    />
                  </div>

                  {authError && (
                    <p className="text-xs text-[#FF5555] font-mono">{authError}</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="btn-bracket w-full py-3.5 text-xs text-center"
                    >
                      {authLoading ? (
                        <>Processing...</>
                      ) : authMode === "login" ? (
                        "[ SIGN IN ]"
                      ) : (
                        "[ CREATE ACCOUNT ]"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Checkout Panel */
              <div className="space-y-6">
                {/* Signed In Status Header */}
                <div className="bg-[#121316] border border-[#2E313A] p-4 flex items-center justify-between gap-4 font-mono">
                  <div className="text-xs text-[#E2E4E8]">
                    <span className="text-[#8E95A5] block text-[10px]">// SIGNED IN AS:</span>
                    <span className="font-bold text-[#FFFFFF]">{customer.name}</span>
                    <span className="block text-[10px] text-[#8E95A5]">{customer.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="border border-[#2E313A] bg-[#18191C] text-xs font-mono text-[#8E95A5] hover:text-[#FFFFFF] px-3 py-1.5 transition-colors shrink-0"
                    type="button"
                  >
                    [ SIGN OUT ]
                  </button>
                </div>

                {/* Locked Checkout Actions */}
                <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 space-y-4">
                  <h2 className="text-base font-mono font-bold text-[#FFFFFF] flex items-center gap-2 border-b border-[#2E313A] pb-3 uppercase">
                    <Lock className="w-4 h-4 text-[#FFFFFF]" />
                    CHECKOUT DETAILS ({purchaseType === "bundle" ? "BUNDLE @ ₹249" : "SINGLE @ ₹99"})
                  </h2>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-[#8E95A5] uppercase mb-1">
                        // Full Name
                      </label>
                      <input
                        type="text"
                        disabled
                        value={customer.name}
                        className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2.5 text-xs font-mono text-[#8E95A5] cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-[#8E95A5] uppercase mb-1">
                        // Email Address
                      </label>
                      <input
                        type="email"
                        disabled
                        value={customer.email}
                        className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2.5 text-xs font-mono text-[#8E95A5] cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-[#8E95A5] uppercase mb-1">
                        // Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        disabled
                        value={customer.phone}
                        className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2.5 text-xs font-mono text-[#8E95A5] cursor-not-allowed"
                      />
                    </div>

                    {/* WhatsApp Opt-In Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={whatsappOptIn}
                          onChange={(e) => setWhatsappOptIn(e.target.checked)}
                          className="mt-0.5 border-[#2E313A] bg-[#18191C] text-[#FFFFFF] accent-[#FFFFFF]"
                        />
                        <span className="text-xs text-[#8E95A5] font-mono">
                          Send me my guide + future tips on WhatsApp
                        </span>
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading || verifying}
                        className="btn-bracket w-full py-4 text-xs font-mono text-center block"
                        id="checkout-btn-pay"
                      >
                        {loading ? (
                          <>[ CREATING ORDER... ]</>
                        ) : verifying ? (
                          <>[ VERIFYING PAYMENT... ]</>
                        ) : (
                          <>[ PAY ₹{purchaseType === "bundle" ? "249" : "99"} & UNLOCK INSTANTLY ]</>
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8E95A5] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] animate-pulse"></span>
                    Secured connection (Razorpay, UPI, Cards supported)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom SIMULATED Sandbox Payment Modal */}
      {showSandboxModal && (
        <div className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121316] border border-[#2E313A] p-6 max-w-md w-full shadow-2xl space-y-6 font-mono text-[#E2E4E8]">
            <div className="flex gap-2.5 items-center text-[#FFFFFF]">
              <AlertTriangle className="w-5 h-5 shrink-0 text-[#FFFFFF]" />
              <h3 className="text-base font-mono font-bold uppercase tracking-wider text-[#FFFFFF]">Demo Gateway Simulation</h3>
            </div>
            
            <p className="text-xs text-[#8E95A5] leading-relaxed">
              No Razorpay API keys found in server configuration. Loaded in **Sandbox Testing Mode**. Click below to simulate a successful client payment transaction of ₹{purchaseType === "bundle" ? "249" : "99"}.
            </p>

            <div className="bg-[#18191C] p-4 border border-[#2E313A] space-y-1 text-xs font-mono">
              <div><span className="text-[#8E95A5]">Order ID:</span> {sandboxOrderId}</div>
              <div><span className="text-[#8E95A5]">Client:</span> {name}</div>
              <div><span className="text-[#8E95A5]">Email:</span> {email}</div>
              <div><span className="text-[#8E95A5]">Option:</span> {purchaseType === "bundle" ? "Complete Bundle (₹249)" : `Single Topic: ${selectedTopicId}`}</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleVerifySandbox}
                className="btn-bracket flex-grow py-3 text-xs text-center"
              >
                [ SIMULATE PAYMENT ]
              </button>
              <button
                onClick={() => setShowSandboxModal(false)}
                className="px-4 py-3 bg-[#18191C] border border-[#2E313A] text-[#8E95A5] hover:text-[#FFFFFF] text-xs font-mono"
              >
                [ CANCEL ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PayUnlock() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-grow flex-col items-center justify-center py-32 bg-[#18191C] text-[#E2E4E8] font-mono">
          <Loader2 className="w-8 h-8 animate-spin text-[#FFFFFF] mb-4" />
          <span className="text-sm font-mono">[ LOADING CHECKOUT DETAILS... ]</span>
        </div>
      }
    >
      <PayUnlockContent />
    </Suspense>
  );
}
