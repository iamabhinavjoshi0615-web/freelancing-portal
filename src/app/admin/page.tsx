"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  Settings,
  DollarSign,
  Users,
  BookOpen,
  Check,
  Save,
  LogOut,
  Loader2,
  FileText,
  Table,
  Plus,
  Trash2,
  ShieldCheck,
  Layout
} from "lucide-react";

export default function AdminDashboard() {
  const [passwordInput, setPasswordInput] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Dashboard Data States
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>({});
  const [orders, setOrders] = useState<any[]>([]);
  const [unlocks, setUnlocks] = useState<any[]>([]);
  const [cmsSettings, setCmsSettings] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [pricingTiers, setPricingTiers] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Editing States
  const [editingSettings, setEditingSettings] = useState<any>(null);
  const [editingServices, setEditingServices] = useState<any[]>([]);
  const [editingPricing, setEditingPricing] = useState<any[]>([]);
  const [editingTopics, setEditingTopics] = useState<any[]>([]);
  const [editingProjects, setEditingProjects] = useState<any[]>([]);
  const [saveStatus, setSaveStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // Check local storage for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      verifyToken(savedToken);
    }
  }, []);

  const verifyToken = async (pass: string) => {
    setLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin", {
        headers: { Authorization: pass },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setOrders(data.orders);
        setUnlocks(data.unlocks);
        setCmsSettings(data.cmsSettings);
        setServices(data.services);
        setPricingTiers(data.pricingTiers);
        setTopics(data.topics);
        setProjects(data.projects || []);
        setUsers(data.users || []);

        // Populate edit buffers
        setEditingSettings(data.cmsSettings);
        setEditingServices(data.services);
        setEditingPricing(data.pricingTiers);
        setEditingTopics(data.topics);
        setEditingProjects(data.projects || []);

        setAuthorized(true);
        setToken(pass);
        localStorage.setItem("admin_token", pass);
      } else {
        setLoginError("Invalid password credentials. Please try again.");
        localStorage.removeItem("admin_token");
        setToken(null);
      }
    } catch (err) {
      console.error(err);
      setLoginError("Failed to connect to the administration service.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput) return;
    verifyToken(passwordInput);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setAuthorized(false);
    setPasswordInput("");
  };

  // Submit changes to API
  const handleSaveChanges = async (action: string, payload: any) => {
    if (!token) return;
    setSaving(true);
    setSaveStatus("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          ...payload,
        }),
      });

      if (res.ok) {
        setSaveStatus("Changes saved successfully!");
        // Reload data
        verifyToken(token);
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("Save failed. Please check validation rules.");
      }
    } catch (err) {
      console.error(err);
      setSaveStatus("Network error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  // CMS Settings change handler
  const handleSettingChange = (key: string, val: any) => {
    setEditingSettings((prev: any) => ({ ...prev, [key]: val }));
  };

  // Services editor handlers
  const handleServiceChange = (index: number, field: string, value: any) => {
    const updated = [...editingServices];
    updated[index] = { ...updated[index], [field]: value };
    setEditingServices(updated);
  };

  const handleServiceFeatureChange = (sIdx: number, fIdx: number, value: string) => {
    const updated = [...editingServices];
    const updatedFeatures = [...updated[sIdx].features];
    updatedFeatures[fIdx] = value;
    updated[sIdx] = { ...updated[sIdx], features: updatedFeatures };
    setEditingServices(updated);
  };

  const addServiceFeature = (sIdx: number) => {
    const updated = [...editingServices];
    updated[sIdx] = { ...updated[sIdx], features: [...updated[sIdx].features, "New Feature Detail"] };
    setEditingServices(updated);
  };

  const removeServiceFeature = (sIdx: number, fIdx: number) => {
    const updated = [...editingServices];
    const updatedFeatures = updated[sIdx].features.filter((_: any, i: number) => i !== fIdx);
    updated[sIdx] = { ...updated[sIdx], features: updatedFeatures };
    setEditingServices(updated);
  };

  // Pricing editor handlers
  const handlePricingChange = (index: number, field: string, value: any) => {
    const updated = [...editingPricing];
    updated[index] = { ...updated[index], [field]: value };
    setEditingPricing(updated);
  };

  const addPricingRow = () => {
    setEditingPricing((prev) => [
      ...prev,
      { category: "Hosting", item: "New Plan Description", basicPrice: "₹499/mo", detailedPrice: "More detail", billing: "Monthly" }
    ]);
  };

  const removePricingRow = (idx: number) => {
    setEditingPricing((prev) => prev.filter((_, i) => i !== idx));
  };

  // Topic editor handlers
  const handleTopicTeaserChange = (idx: number, teaser: string) => {
    const updated = [...editingTopics];
    updated[idx] = { ...updated[idx], teaser };
    setEditingTopics(updated);
  };

  // Projects editor handlers
  const handleProjectChange = (index: number, field: string, value: any) => {
    const updated = [...editingProjects];
    updated[index] = { ...updated[index], [field]: value };
    setEditingProjects(updated);
  };

  const handleProjectTagsChange = (index: number, value: string) => {
    const updated = [...editingProjects];
    updated[index] = { ...updated[index], tags: value.split(",").map((t) => t.trim()).filter(Boolean) };
    setEditingProjects(updated);
  };

  const addProjectRow = () => {
    const newId = "project-" + Date.now();
    setEditingProjects((prev) => [
      ...prev,
      { id: newId, title: "New Client Project", description: "Project description showing the work delivered.", category: "Web Development", tags: ["Next.js", "Tailwind"], link: "#" }
    ]);
  };

  const removeProjectRow = (idx: number) => {
    setEditingProjects((prev) => prev.filter((_, i) => i !== idx));
  };

  if (!authorized) {
    return (
      <div className="flex flex-grow items-center justify-center py-20 px-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100/30 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Admin Authentication</h2>
            <p className="text-xs text-zinc-550 dark:text-zinc-400">Authenticate to access CMS and dashboard logs.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Enter Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-white font-medium"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-500 font-semibold">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3.5 text-xs transition-colors shadow"
              id="admin-login-submit"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Authenticate & Open CMS"
              )}
            </button>
          </form>
          <div className="text-center text-[10px] text-zinc-400 dark:text-zinc-500">
            Default pass: <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex flex-col md:flex-row gap-8 items-start">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 bg-white dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-800 rounded-3xl p-5 space-y-6">
        <div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Dashboard CMS</span>
          <h2 className="text-base font-black text-zinc-900 dark:text-white mt-0.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Authorized Panel
          </h2>
        </div>

        <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors w-full shrink-0 md:shrink-1 ${
              activeTab === "overview"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Payments & Logs
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors w-full shrink-0 md:shrink-1 ${
              activeTab === "settings"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <Settings className="w-4 h-4" />
            CMS Setup & Details
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors w-full shrink-0 md:shrink-1 ${
              activeTab === "services"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <FileText className="w-4 h-4" />
            Edit Services
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors w-full shrink-0 md:shrink-1 ${
              activeTab === "pricing"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <Table className="w-4 h-4" />
            Edit Price Tiers
          </button>
          <button
            onClick={() => setActiveTab("topics")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors w-full shrink-0 md:shrink-1 ${
              activeTab === "topics"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Edit Paid Content
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors w-full shrink-0 md:shrink-1 ${
              activeTab === "portfolio"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <Layout className="w-4 h-4" />
            Edit Portfolio
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors w-full shrink-0 md:shrink-1 ${
              activeTab === "users"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            <Users className="w-4 h-4" />
            Registered Users
          </button>
        </nav>

        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            End Session
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow w-full space-y-6">
        
        {/* Status notification */}
        {saveStatus && (
          <div className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 p-4 rounded-2xl text-xs font-bold shadow flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            {saveStatus}
          </div>
        )}

        {/* TAB 1: OVERVIEW & PAYMENTS */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Revenue & Unlock Breakdown Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block">Total Revenue</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                  ₹{(stats.totalRevenue || 0).toLocaleString("en-IN")}
                </span>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 flex justify-between">
                  <span>Single (₹99): ₹{stats.singleRevenue || 0}</span>
                  <span>Bundle (₹249): ₹{stats.bundleRevenue || 0}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block">Single vs Bundle Unlocks</span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
                  {stats.singleUnlocksCount || 0} / {stats.bundleUnlocksCount || 0}
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                  Single Rs 99 / Bundle Rs 249
                </span>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block">WhatsApp Opt-Ins</span>
                <span className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1 block">
                  {stats.whatsappOptInsCount || 0}
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                  Opted in during checkout
                </span>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block">Quiz Calculator Leads</span>
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
                  {stats.totalQuizCompletions || 0}
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                  Completed pre-paywall quiz
                </span>
              </div>
            </div>

            {/* Quiz Insights Bar Charts */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-3">
                Quiz Audience Insights & Intent Analytics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Business Type Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Top Business Models</h4>
                  {stats.businessTypeCounts && Object.keys(stats.businessTypeCounts).length > 0 ? (
                    Object.entries(stats.businessTypeCounts).map(([type, count]) => (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <span className="capitalize">{type}</span>
                          <span>{String(count)}</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${Math.min(100, ((Number(count)) / Math.max(1, stats.totalQuizCompletions || 1)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-400 italic">No quiz responses recorded yet.</p>
                  )}
                </div>

                {/* Primary Goal Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Primary Goals</h4>
                  {stats.goalCounts && Object.keys(stats.goalCounts).length > 0 ? (
                    Object.entries(stats.goalCounts).map(([goal, count]) => (
                      <div key={goal} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <span className="capitalize">{goal.replace("_", " ")}</span>
                          <span>{String(count)}</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${Math.min(100, ((Number(count)) / Math.max(1, stats.totalQuizCompletions || 1)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-400 italic">No goal responses recorded yet.</p>
                  )}
                </div>

                {/* Budget Ranges Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Budget Ranges</h4>
                  {stats.budgetCounts && Object.keys(stats.budgetCounts).length > 0 ? (
                    Object.entries(stats.budgetCounts).map(([b, count]) => (
                      <div key={b} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <span>{b.replace("_", "-")}</span>
                          <span>{String(count)}</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${Math.min(100, ((Number(count)) / Math.max(1, stats.totalQuizCompletions || 1)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-400 italic">No budget responses recorded yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm overflow-hidden">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Payments Transaction Ledger</h3>
              <div className="overflow-x-auto">
                {orders.length === 0 ? (
                  <p className="text-center text-xs text-zinc-450 dark:text-zinc-500 py-8">No purchase records registered in db.json yet.</p>
                ) : (
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                        <th className="py-3">Customer Details</th>
                        <th className="py-3">Type & Topic ID</th>
                        <th className="py-3">Amount</th>
                        <th className="py-3">WhatsApp Opt-in</th>
                        <th className="py-3">Date</th>
                        <th className="py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                          <td className="py-4">
                            <span className="font-bold text-zinc-900 dark:text-white block">{ord.name}</span>
                            <span className="text-zinc-400 dark:text-zinc-500 text-[10px] block">{ord.email} | {ord.phone}</span>
                          </td>
                          <td className="py-4 font-semibold text-zinc-700 dark:text-zinc-350">
                            {ord.topicId === "bundle" ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-extrabold">
                                Complete Bundle (₹249)
                              </span>
                            ) : (
                              <span>Single: {ord.topicId} (₹99)</span>
                            )}
                          </td>
                          <td className="py-4 font-bold text-zinc-900 dark:text-white">₹{ord.amount}</td>
                          <td className="py-4">
                            {ord.whatsappOptIn ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded text-[10px]">
                                Yes (Opted-in)
                              </span>
                            ) : (
                              <span className="text-zinc-400 text-[10px]">No</span>
                            )}
                          </td>
                          <td className="py-4 text-zinc-500 dark:text-zinc-400">{new Date(ord.createdAt).toLocaleDateString("en-IN")}</td>
                          <td className="py-4 text-right">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                              ord.status === "paid"
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-850 dark:text-zinc-400"
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EDIT CMS SETTINGS */}
        {activeTab === "settings" && editingSettings && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-3">CMS Setup Values</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Agency Name</label>
                <input
                  type="text"
                  value={editingSettings.agencyName}
                  onChange={(e) => handleSettingChange("agencyName", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingSettings.tagline}
                  onChange={(e) => handleSettingChange("tagline", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={editingSettings.contactPhone}
                  onChange={(e) => handleSettingChange("contactPhone", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Contact Email</label>
                <input
                  type="email"
                  value={editingSettings.contactEmail}
                  onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">WhatsApp Number (e.g. 919876543210)</label>
                <input
                  type="text"
                  value={editingSettings.whatsappNumber}
                  onChange={(e) => handleSettingChange("whatsappNumber", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Consultation Call Link</label>
                <input
                  type="text"
                  value={editingSettings.consultationLink}
                  onChange={(e) => handleSettingChange("consultationLink", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Office Address</label>
              <input
                type="text"
                value={editingSettings.officeAddress}
                onChange={(e) => handleSettingChange("officeAddress", e.target.value)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Exp Years</label>
                <input
                  type="number"
                  value={editingSettings.experienceYears}
                  onChange={(e) => handleSettingChange("experienceYears", Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Clients Stat</label>
                <input
                  type="number"
                  value={editingSettings.satisfiedClients}
                  onChange={(e) => handleSettingChange("satisfiedClients", Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Projects Stat</label>
                <input
                  type="number"
                  value={editingSettings.projectsCompleted}
                  onChange={(e) => handleSettingChange("projectsCompleted", Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Ad Budgets Stat</label>
                <input
                  type="text"
                  value={editingSettings.adBudgetManaged}
                  onChange={(e) => handleSettingChange("adBudgetManaged", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-855 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-100 dark:border-zinc-850 pt-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">About Title</label>
                <input
                  type="text"
                  value={editingSettings.aboutTitle}
                  onChange={(e) => handleSettingChange("aboutTitle", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Admin Password</label>
                <input
                  type="text"
                  value={editingSettings.adminPassword}
                  onChange={(e) => handleSettingChange("adminPassword", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-855 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">About Us Description</label>
              <textarea
                rows={5}
                value={editingSettings.aboutDesc}
                onChange={(e) => handleSettingChange("aboutDesc", e.target.value)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-855 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-sans"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSaveChanges("updateSettings", { cmsSettings: editingSettings })}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white font-bold py-3.5 text-xs transition-colors shadow"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: EDIT SERVICES */}
        {activeTab === "services" && editingServices.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-6">Services List</h3>
              
              <div className="space-y-10">
                {editingServices.map((service, sIdx) => (
                  <div key={service.id} className="border-b border-zinc-100 dark:border-zinc-850 pb-8 last:border-0 last:pb-0 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Service Name</label>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => handleServiceChange(sIdx, "name", e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2 text-xs text-zinc-850 dark:text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Starting Price</label>
                        <input
                          type="text"
                          value={service.startingPrice}
                          onChange={(e) => handleServiceChange(sIdx, "startingPrice", e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2 text-xs text-zinc-850 dark:text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Delivery Time</label>
                        <input
                          type="text"
                          value={service.deliveryTime}
                          onChange={(e) => handleServiceChange(sIdx, "deliveryTime", e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2 text-xs text-zinc-850 dark:text-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Description</label>
                      <input
                        type="text"
                        value={service.description}
                        onChange={(e) => handleServiceChange(sIdx, "description", e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-850 dark:text-white"
                      />
                    </div>

                    {/* Features Editor */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Features Included</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature: string, fIdx: number) => (
                          <div key={fIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleServiceFeatureChange(sIdx, fIdx, e.target.value)}
                              className="flex-grow rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-3 py-1.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                            />
                            <button
                              onClick={() => removeServiceFeature(sIdx, fIdx)}
                              className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors"
                              title="Delete feature"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addServiceFeature(sIdx)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <Plus className="w-3 h-3" /> Add Feature Line
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-zinc-150 dark:border-zinc-850 mt-6">
                <button
                  onClick={() => handleSaveChanges("updateServices", { services: editingServices })}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white font-bold py-3.5 text-xs transition-colors shadow"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Services List
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EDIT PRICING TIERS */}
        {activeTab === "pricing" && editingPricing.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-6">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Pricing Estimates Tiers</h3>
              <button
                onClick={addPricingRow}
                className="flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-3.5 py-1.5 text-[10px] font-black text-zinc-700 dark:text-zinc-300 transition-colors border border-zinc-200/50 dark:border-zinc-700"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Price Row
              </button>
            </div>

            <div className="space-y-4">
              {editingPricing.map((tier, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150 dark:border-zinc-850 relative">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 flex-grow">
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-450 uppercase mb-0.5">Category</label>
                      <input
                        type="text"
                        value={tier.category}
                        onChange={(e) => handlePricingChange(idx, "category", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 text-xs text-zinc-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-450 uppercase mb-0.5">Item/Scope Name</label>
                      <input
                        type="text"
                        value={tier.item}
                        onChange={(e) => handlePricingChange(idx, "item", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 text-xs text-zinc-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-450 uppercase mb-0.5">Short price label</label>
                      <input
                        type="text"
                        value={tier.basicPrice}
                        onChange={(e) => handlePricingChange(idx, "basicPrice", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 text-xs text-zinc-800 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-450 uppercase mb-0.5">Billing terms</label>
                      <input
                        type="text"
                        value={tier.billing}
                        onChange={(e) => handlePricingChange(idx, "billing", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 text-xs text-zinc-800 dark:text-white"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[8px] font-bold text-zinc-450 uppercase mb-0.5">Extended Description</label>
                      <input
                        type="text"
                        value={tier.detailedPrice}
                        onChange={(e) => handlePricingChange(idx, "detailedPrice", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 text-xs text-zinc-800 dark:text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removePricingRow(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/20 rounded-xl transition-colors self-end sm:self-center"
                    title="Delete row"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-zinc-150 dark:border-zinc-850 mt-6">
              <button
                onClick={() => handleSaveChanges("updatePricing", { pricingTiers: editingPricing })}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white font-bold py-3.5 text-xs transition-colors shadow"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Pricing Matrix
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: EDIT PAID TOPICS TEASERS */}
        {activeTab === "topics" && editingTopics.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-3">Edit Topic Teaser Columns</h3>
            
            <div className="space-y-8">
              {editingTopics.map((topic, idx) => (
                <div key={topic.id} className="border-b border-zinc-100 dark:border-zinc-850 pb-6 last:border-0 last:pb-0 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest">{topic.id}</h4>
                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 block mt-0.5">{topic.title}</span>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-405 uppercase tracking-wider mb-1">Teaser Description</label>
                    <textarea
                      rows={3}
                      value={topic.teaser}
                      onChange={(e) => handleTopicTeaserChange(idx, e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-800 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850">
              <button
                onClick={() => handleSaveChanges("updateTopics", { topics: editingTopics })}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white font-bold py-3.5 text-xs transition-colors shadow"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Paid Content Teasers
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: EDIT PORTFOLIO PROJECTS */}
        {activeTab === "portfolio" && editingProjects.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-6">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Portfolio Projects List</h3>
              <button
                onClick={addProjectRow}
                className="flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-3.5 py-1.5 text-[10px] font-black text-zinc-700 dark:text-zinc-350 transition-colors border border-zinc-200/50 dark:border-zinc-700"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            <div className="space-y-6">
              {editingProjects.map((project, idx) => (
                <div key={project.id} className="p-5 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-150 dark:border-zinc-850 space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-850 px-2 py-0.5 rounded">
                      ID: {project.id}
                    </span>
                    <button
                      onClick={() => removeProjectRow(idx)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
                      title="Remove project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[8px] font-bold text-zinc-450 uppercase mb-0.5">Project Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-800 dark:text-white font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-455 uppercase mb-0.5">Category</label>
                      <select
                        value={project.category}
                        onChange={(e) => handleProjectChange(idx, "category", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-800 dark:text-white focus:outline-none"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] font-bold text-zinc-455 uppercase mb-0.5">Description</label>
                    <textarea
                      rows={3}
                      value={project.description}
                      onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-800 dark:text-white focus:outline-none resize-none font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-455 uppercase mb-0.5">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        value={project.tags.join(", ")}
                        onChange={(e) => handleProjectTagsChange(idx, e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-850 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-455 uppercase mb-0.5">Live Link URL (Optional)</label>
                      <input
                        type="text"
                        value={project.link}
                        onChange={(e) => handleProjectChange(idx, "link", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-855 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-zinc-150 dark:border-zinc-850 mt-6">
              <button
                onClick={() => handleSaveChanges("updateProjects", { projects: editingProjects })}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white font-bold py-3.5 text-xs transition-colors shadow"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Portfolio Projects
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: VIEW REGISTERED USERS */}
        {activeTab === "users" && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm overflow-hidden">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Registered Client Accounts</h3>
            <div className="overflow-x-auto">
              {users.length === 0 ? (
                <p className="text-center text-xs text-zinc-450 dark:text-zinc-500 py-8">No client user accounts registered in db.json yet.</p>
              ) : (
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3">User ID</th>
                      <th className="py-3">Full Name</th>
                      <th className="py-3">Email Address</th>
                      <th className="py-3">Phone Number</th>
                      <th className="py-3 text-right">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 text-zinc-700 dark:text-zinc-350">
                        <td className="py-4 font-mono text-[10px] text-zinc-450">{u.id}</td>
                        <td className="py-4 font-bold text-zinc-900 dark:text-white">{u.name}</td>
                        <td className="py-4 font-medium">{u.email}</td>
                        <td className="py-4">{u.phone}</td>
                        <td className="py-4 text-right text-zinc-500">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
