"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Lock,
  Unlock,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Printer,
  PhoneCall,
  Download,
  Loader2,
  RefreshCw,
  Table,
  Wrench,
  Clock,
  ShieldCheck,
  MessageCircle,
  Layers,
  Zap,
  Gift,
  ArrowRight
} from "lucide-react";
import { GuideContent } from "../../lib/content";
import PersonalizedActionPlanCard from "../../components/PersonalizedActionPlanCard";

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
  const router = useRouter();

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
  const [retrieving, setRetrieving] = useState(false);
  
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
      <div className="flex flex-grow flex-col items-center justify-center py-32 text-zinc-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
        <span className="text-sm font-semibold">Loading checkout details...</span>
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
          theme: { color: "#2563EB" },
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
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 print:py-0 print:px-2">
        
        {/* Feature 3: WhatsApp Unlock Flow Thank You Box */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/50 shadow-2xl space-y-6 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300">
                Payment Successful • Guide Unlocked
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                Thank You! Access Your Unlocked Content Below
              </h2>
            </div>
          </div>

          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Choose how you would like to consume your unlocked blueprint and resources:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option A */}
            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Option A</span>
              <h3 className="text-sm font-bold">View Directly On This Web Page</h3>
              <p className="text-[11px] text-zinc-300">Read step-by-step checklists, price tables, and print as PDF below.</p>
            </div>

            {/* Option B */}
            <a
              href={`https://wa.me/917415917942?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-colors border border-emerald-400/40 space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Option B (Recommended)</span>
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:underline">Join WhatsApp Channel / Broadcast</h3>
              <p className="text-[11px] text-emerald-100">Get this guide sent directly to your WhatsApp + future marketing tips.</p>
            </a>
          </div>
        </div>

        {/* Feature 5: POST-UNLOCK UPSELL CTA */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-700/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Need Done-For-You Execution?
            </span>
            <h3 className="text-xl font-bold">
              Want us to just build this for you?
            </h3>
            <div className="text-xs text-blue-200 space-y-1">
              <p>• <strong>Starter Website Package</strong> — ₹8,999 (Complete 5-Page Site)</p>
              <p>• <strong>Starter Ad Campaign Setup</strong> — ₹4,999 (Meta/Google Ads Setup)</p>
              <p className="text-[11px] text-emerald-300 font-semibold mt-1">
                *100% of your ₹99 / ₹249 unlock payment will be fully credited back on your final service invoice!
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/917415917942?text=Hi%20Guruji%20Digital,%20I%20unlocked%20my%20guide%20and%20would%20like%20to%20book%20a%20Free%2010-min%20call%20for%20done-for-you%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 text-xs transition-colors shadow"
            >
              <PhoneCall className="w-4 h-4" />
              Book a Free 10-Min Call
            </a>
          </div>
        </div>

        {/* Personalized Action Plan Card if unlocked via quiz */}
        <PersonalizedActionPlanCard sessionId={searchParams.get("quizSession")} />

        {/* Unlocked Header */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden shadow-sm">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase block">
              {isBundleUnlocked ? "Complete Bundle Unlocked (All 4 Guides)" : "Single Topic Unlocked"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
              {unlockedTopicTitle}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Unlocked for: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{unlockedEmail}</span>
            </p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full sm:w-auto"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Bundle Switcher Tabs if bundle unlocked */}
        {isBundleUnlocked && allTopicsData.length > 0 && (
          <div className="space-y-2 print:hidden">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">
              Bundle Guide Switcher:
            </span>
            <div className="flex flex-wrap gap-2">
              {allTopicsData.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setUnlockedContent(t.fullContent);
                    setUnlockedTopicTitle(t.title);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    unlockedTopicTitle === t.title
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {t.title}
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
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            1. Action Plan & Step-by-Step Breakdown
          </h2>
          <div className="space-y-6">
            {unlockedContent.steps.map((step: any, idx: number) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-2xl shadow-sm"
              >
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-black">
                    {idx + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {step.desc}
                </p>
                <ul className="mt-4 space-y-2 border-t border-zinc-50 dark:border-zinc-850 pt-3">
                  {step.details.map((detail: string, index: number) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <Table className="w-5 h-5 text-blue-600" />
              2. Matrix Cost Benchmarks
            </h2>
            {unlockedContent.tables.map((table: any, tIdx: number) => (
              <div
                key={tIdx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="bg-zinc-50 dark:bg-zinc-850 p-4 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-white uppercase tracking-wider">{table.title}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-zinc-100/50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 uppercase font-semibold border-b border-zinc-100 dark:border-zinc-800">
                        {table.headers.map((header: string, hIdx: number) => (
                          <th key={hIdx} className="px-6 py-4">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
                      {table.rows.map((row: string[], rIdx: number) => (
                        <tr key={rIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                          {row.map((cell: string, cIdx: number) => (
                            <td key={cIdx} className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-350">{cell}</td>
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
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            3. Recommended Software & Tool Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {unlockedContent.tools.map((tool: any, idx: number) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-850 p-5 rounded-2xl shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{tool.name}</h3>
                  <span className="bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase">
                    {tool.type}
                  </span>
                </div>
                <div className="mt-2 text-xs font-semibold text-zinc-700 dark:text-zinc-350">
                  Cost: {tool.pricing}
                </div>
                <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-50 dark:border-zinc-850 pt-2.5">
                  {tool.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Timeline Map */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            4. Execution Timelines & Deliverables
          </h2>
          <div className="space-y-4">
            {unlockedContent.timelines.map((time: any, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-850 shadow-sm"
              >
                <div className="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-black p-2.5 rounded-xl text-xs uppercase shrink-0 text-center min-w-[70px]">
                  {time.duration}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{time.phase}</h3>
                  <ul className="mt-2 space-y-1">
                    {time.deliverables.map((item: string, index: number) => (
                      <li key={index} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
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
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            5. Personalized Consultancy Recommendations
          </h2>
          <div className="bg-blue-50/20 dark:bg-blue-950/10 border border-blue-200/40 dark:border-blue-900/40 rounded-3xl p-6 space-y-4">
            {unlockedContent.recommendations.map((rec: string, idx: number) => (
              <div key={idx} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-350 leading-relaxed">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render LOCK Screen
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Pay & Unlock
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Detailed Consultancy Blueprints
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
          Select single guide for ₹99 or unlock the Complete Bundle (All 4 Guides) for ₹249.
        </p>
      </div>

      {/* Feature 4: Bundle Pricing Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Single Guide Option */}
        <div
          onClick={() => setPurchaseType("single")}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
            purchaseType === "single"
              ? "border-blue-600 bg-blue-50/20 dark:bg-blue-950/20 shadow-lg"
              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Option 1</span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Single Topic Unlock</h3>
            </div>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">Rs 99</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Choose one specific topic handbook (Website Building, Ad Strategy, Website Pricing, or Ad Charges).
          </p>
        </div>

        {/* Bundle Option */}
        <div
          onClick={() => setPurchaseType("bundle")}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all relative overflow-hidden ${
            purchaseType === "bundle"
              ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-xl ring-2 ring-emerald-500/20"
              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-400"
          }`}
        >
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
            Best Value - Save Rs 147
          </div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Option 2</span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                Complete Bundle Access
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </h3>
            </div>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Rs 249</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Unlocks ALL 4 handbooks + future updates + priority WhatsApp support. Save ₹147 over single purchases!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Topic Selector & Checklist Comparison */}
        <div className="lg:col-span-7 space-y-8">
          {purchaseType === "single" ? (
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Step 1: Choose Your Guide Topic (Rs 99)
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopicId(t.id)}
                    className={`flex items-start text-left p-4 rounded-2xl border transition-all ${
                      selectedTopicId === t.id
                        ? "border-blue-600 bg-blue-50/20 dark:bg-blue-950/20 dark:border-blue-500"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/40"
                    }`}
                    type="button"
                  >
                    <span className={`mt-0.5 mr-3 shrink-0 flex items-center justify-center w-5 h-5 rounded-full border ${
                      selectedTopicId === t.id ? "bg-blue-600 text-white border-transparent" : "border-zinc-300 dark:border-zinc-700"
                    }`}>
                      {selectedTopicId === t.id && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{t.title}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-6 rounded-3xl bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-200/50">
              <h2 className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-500" />
                Included in Complete Bundle (Rs 249):
              </h2>
              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  1. How to Build a Website for Your Business
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  2. How to Run Ads for Your Business/Product
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  3. Website Types, Pricing, Hosting & Maintenance Charges
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  4. Ad Campaign Charges (Google & Meta Ads Breakdown)
                </li>
              </ul>
            </div>
          )}

          {/* Comparison Table */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Free vs Premium Tier Comparison
            </h2>
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-850 text-zinc-700 dark:text-zinc-350 font-bold border-b border-zinc-200 dark:border-zinc-800">
                    <th className="px-4 py-3">Features Included</th>
                    <th className="px-4 py-3 text-center">Free Tier</th>
                    <th className="px-4 py-3 text-center text-blue-600 dark:text-blue-400">Single (₹99)</th>
                    <th className="px-4 py-3 text-center text-emerald-600 dark:text-emerald-400">Bundle (₹249)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150 dark:divide-zinc-850 text-zinc-650 dark:text-zinc-400">
                  <tr>
                    <td className="px-4 py-3 font-medium">Step-by-Step Technical Blueprint</td>
                    <td className="px-4 py-3 text-center text-rose-500 font-bold">Not Included</td>
                    <td className="px-4 py-3 text-center text-emerald-500 font-bold">1 Guide</td>
                    <td className="px-4 py-3 text-center text-emerald-500 font-bold">All 4 Guides</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Detailed Price & Fee Tables</td>
                    <td className="px-4 py-3 text-center text-rose-500 font-bold">Not Included</td>
                    <td className="px-4 py-3 text-center text-emerald-500 font-bold">Included</td>
                    <td className="px-4 py-3 text-center text-emerald-500 font-bold">Included</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Recommended Tool Stack & Costs</td>
                    <td className="px-4 py-3 text-center text-rose-500 font-bold">Not Included</td>
                    <td className="px-4 py-3 text-center text-emerald-500 font-bold">Included</td>
                    <td className="px-4 py-3 text-center text-emerald-500 font-bold">Included</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">WhatsApp Delivery & Updates</td>
                    <td className="px-4 py-3 text-center text-rose-500 font-bold">Not Included</td>
                    <td className="px-4 py-3 text-center text-emerald-500 font-bold">Included</td>
                    <td className="px-4 py-3 text-center text-emerald-500 font-bold">Priority Delivery</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Form / Payment */}
        <div className="lg:col-span-5 space-y-8">
          {customer === null ? (
            /* Authentication Panel */
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-md relative">
              <div className="flex border-b border-zinc-150 dark:border-zinc-800 mb-6">
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError("");
                  }}
                  className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
                    authMode === "login"
                      ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500"
                      : "border-transparent text-zinc-400 hover:text-zinc-600"
                  }`}
                  type="button"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthError("");
                  }}
                  className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
                    authMode === "signup"
                      ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500"
                      : "border-transparent text-zinc-400 hover:text-zinc-600"
                  }`}
                  type="button"
                >
                  Register Account
                </button>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                {authMode === "login"
                  ? "Sign in to your customer account to view your purchased guides and proceed with secure checkouts."
                  : "Create a customer account to synchronize unlocked consultancy guides permanently across your devices."}
              </p>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "signup" && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ramesh Sharma"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={authPhone}
                        onChange={(e) => setAuthPhone(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@company.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                  />
                </div>

                {authError && (
                  <p className="text-xs text-red-500 font-semibold">{authError}</p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white font-bold py-3.5 text-xs transition-colors shadow"
                  >
                    {authLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : authMode === "login" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Checkout Panel */
            <div className="space-y-6">
              {/* Signed In Status Header */}
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/40 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="text-xs text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-400 block">Signed in as:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{customer.name}</span>
                  <span className="block text-[10px] text-zinc-450">{customer.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 text-xs font-bold text-zinc-600 dark:text-zinc-400 px-3 py-1.5 transition-colors shrink-0"
                  type="button"
                >
                  Sign Out
                </button>
              </div>

              {/* Locked Checkout Actions */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-md relative space-y-4">
                <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <Lock className="w-5 h-5 text-amber-500" />
                  Checkout Details ({purchaseType === "bundle" ? "Complete Bundle @ ₹249" : "Single Guide @ ₹99"})
                </h2>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={customer.name}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-500 font-medium cursor-not-allowed focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled
                      value={customer.email}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-500 font-medium cursor-not-allowed focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      disabled
                      value={customer.phone}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-500 font-medium cursor-not-allowed focus:outline-none"
                    />
                  </div>

                  {/* Feature 3: WhatsApp Opt-In Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whatsappOptIn}
                        onChange={(e) => setWhatsappOptIn(e.target.checked)}
                        className="mt-0.5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                      />
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                        Send me my guide + future tips on WhatsApp
                      </span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || verifying}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white font-bold py-4 text-sm transition-all shadow-lg focus:outline-none"
                      id="checkout-btn-pay"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating Order...
                        </>
                      ) : verifying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying Payment...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Pay ₹{purchaseType === "bundle" ? "249" : "99"} & Unlock Instantly
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="flex items-center justify-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Secured connection (Razorpay, UPI, Cards supported)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom SIMULATED Sandbox Payment Modal */}
      {showSandboxModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex gap-2.5 items-center text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-extrabold uppercase tracking-wider">Demo Gateway Simulation</h3>
            </div>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              No Razorpay API keys found in the server `.env` configuration. The system has automatically loaded in **Sandbox Testing Mode**. Click below to simulate a successful client payment transaction of ₹{purchaseType === "bundle" ? "249" : "99"}.
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
              <div><span className="font-semibold text-zinc-400">Order ID:</span> {sandboxOrderId}</div>
              <div><span className="font-semibold text-zinc-400">Client:</span> {name}</div>
              <div><span className="font-semibold text-zinc-400">Email:</span> {email}</div>
              <div><span className="font-semibold text-zinc-400">Option:</span> {purchaseType === "bundle" ? "Complete Bundle (₹249)" : `Single Topic: ${selectedTopicId}`}</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleVerifySandbox}
                className="flex-grow rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 text-xs transition-colors shadow-md focus:outline-none"
              >
                Simulate Successful Payment
              </button>
              <button
                onClick={() => setShowSandboxModal(false)}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold px-4 py-3 text-xs transition-colors"
              >
                Cancel
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
        <div className="flex flex-grow flex-col items-center justify-center py-32 text-zinc-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <span className="text-sm font-semibold">Loading checkout details...</span>
        </div>
      }
    >
      <PayUnlockContent />
    </Suspense>
  );
}
