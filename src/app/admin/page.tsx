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
      <div className="flex flex-grow items-center justify-center py-20 px-4 bg-[#18191C] text-[#E2E4E8] font-mono">
        <div className="bg-[#121316] border border-[#2E313A] p-8 max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded bg-[#2E313A] text-[#FFFFFF] font-mono flex items-center justify-center text-sm mx-auto mb-2">
              &gt;_
            </div>
            <h2 className="text-xl font-mono font-bold text-[#FFFFFF] uppercase">ADMIN AUTHENTICATION</h2>
            <p className="text-xs text-[#8E95A5] font-mono">Authenticate to access CMS and dashboard logs.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">
                // ENTER ADMIN PASSWORD
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
              />
            </div>

            {loginError && (
              <p className="text-xs text-[#FF5555] font-mono">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-bracket w-full py-3.5 text-xs text-center block"
              id="admin-login-submit"
            >
              {loading ? (
                <>[ CONNECTING... ]</>
              ) : (
                <>[ AUTHENTICATE & OPEN CMS ]</>
              )}
            </button>
          </form>
          <div className="text-center text-[10px] text-[#8E95A5] font-mono">
            Default pass: <code className="bg-[#18191C] px-1 py-0.5 border border-[#2E313A] text-[#FFFFFF]">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8] font-mono">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 bg-[#121316] border border-[#2E313A] p-5 space-y-6">
          <div>
            <span className="text-[10px] font-mono text-[#8E95A5] uppercase tracking-widest block">// DASHBOARD CMS</span>
            <h2 className="text-base font-mono font-bold text-[#FFFFFF] mt-0.5 flex items-center gap-1.5 uppercase">
              <ShieldCheck className="w-4 h-4 text-[#8E95A5]" />
              Authorized Panel
            </h2>
          </div>

          <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-3 py-2 border text-left transition-colors w-full shrink-0 md:shrink-1 ${
                activeTab === "overview"
                  ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold"
                  : "bg-[#18191C] text-[#8E95A5] border-[#2E313A] hover:text-[#FFFFFF]"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              [ PAYMENTS & LOGS ]
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-3 py-2 border text-left transition-colors w-full shrink-0 md:shrink-1 ${
                activeTab === "settings"
                  ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold"
                  : "bg-[#18191C] text-[#8E95A5] border-[#2E313A] hover:text-[#FFFFFF]"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              [ CMS SETUP ]
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2 px-3 py-2 border text-left transition-colors w-full shrink-0 md:shrink-1 ${
                activeTab === "services"
                  ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold"
                  : "bg-[#18191C] text-[#8E95A5] border-[#2E313A] hover:text-[#FFFFFF]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              [ EDIT SERVICES ]
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex items-center gap-2 px-3 py-2 border text-left transition-colors w-full shrink-0 md:shrink-1 ${
                activeTab === "pricing"
                  ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold"
                  : "bg-[#18191C] text-[#8E95A5] border-[#2E313A] hover:text-[#FFFFFF]"
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              [ PRICE TIERS ]
            </button>
            <button
              onClick={() => setActiveTab("topics")}
              className={`flex items-center gap-2 px-3 py-2 border text-left transition-colors w-full shrink-0 md:shrink-1 ${
                activeTab === "topics"
                  ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold"
                  : "bg-[#18191C] text-[#8E95A5] border-[#2E313A] hover:text-[#FFFFFF]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              [ PAID CONTENT ]
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`flex items-center gap-2 px-3 py-2 border text-left transition-colors w-full shrink-0 md:shrink-1 ${
                activeTab === "portfolio"
                  ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold"
                  : "bg-[#18191C] text-[#8E95A5] border-[#2E313A] hover:text-[#FFFFFF]"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              [ PORTFOLIO ]
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-3 py-2 border text-left transition-colors w-full shrink-0 md:shrink-1 ${
                activeTab === "users"
                  ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF] font-bold"
                  : "bg-[#18191C] text-[#8E95A5] border-[#2E313A] hover:text-[#FFFFFF]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              [ USERS LIST ]
            </button>
          </nav>

          <div className="pt-4 border-t border-[#2E313A]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 border border-[#2E313A] bg-[#18191C] text-[#FF5555] hover:bg-[#FF5555] hover:text-[#18191C] transition-colors w-full text-xs font-mono"
            >
              <LogOut className="w-3.5 h-3.5" />
              [ END SESSION ]
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow w-full space-y-6">
          
          {/* Status notification */}
          {saveStatus && (
            <div className="bg-[#121316] text-[#FFFFFF] border border-[#2E313A] p-4 text-xs font-mono flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FFFFFF]" />
              {saveStatus}
            </div>
          )}

          {/* TAB 1: OVERVIEW & PAYMENTS */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Revenue & Unlock Breakdown Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#121316] border border-[#2E313A] p-5">
                  <span className="text-[10px] text-[#8E95A5] uppercase block">// TOTAL REVENUE</span>
                  <span className="text-2xl font-bold font-mono text-[#FFFFFF] mt-1 block">
                    ₹{(stats.totalRevenue || 0).toLocaleString("en-IN")}
                  </span>
                  <div className="text-[10px] text-[#8E95A5] mt-1 flex justify-between">
                    <span>Single: ₹{stats.singleRevenue || 0}</span>
                    <span>Bundle: ₹{stats.bundleRevenue || 0}</span>
                  </div>
                </div>

                <div className="bg-[#121316] border border-[#2E313A] p-5">
                  <span className="text-[10px] text-[#8E95A5] uppercase block">// UNLOCKS (SINGLE / BUNDLE)</span>
                  <span className="text-2xl font-bold font-mono text-[#FFFFFF] mt-1 block">
                    {stats.singleUnlocksCount || 0} / {stats.bundleUnlocksCount || 0}
                  </span>
                  <span className="text-[10px] text-[#8E95A5] mt-1 block">
                    Single ₹99 / Bundle ₹249
                  </span>
                </div>

                <div className="bg-[#121316] border border-[#2E313A] p-5">
                  <span className="text-[10px] text-[#8E95A5] uppercase block">// WHATSAPP OPT-INS</span>
                  <span className="text-2xl font-bold font-mono text-[#FFFFFF] mt-1 block">
                    {stats.whatsappOptInsCount || 0}
                  </span>
                  <span className="text-[10px] text-[#8E95A5] mt-1 block">
                    Opted in during checkout
                  </span>
                </div>

                <div className="bg-[#121316] border border-[#2E313A] p-5">
                  <span className="text-[10px] text-[#8E95A5] uppercase block">// QUIZ CALCULATOR LEADS</span>
                  <span className="text-2xl font-bold font-mono text-[#FFFFFF] mt-1 block">
                    {stats.totalQuizCompletions || 0}
                  </span>
                  <span className="text-[10px] text-[#8E95A5] mt-1 block">
                    Completed pre-paywall quiz
                  </span>
                </div>
              </div>

              {/* Quiz Insights Bar Charts */}
              <div className="bg-[#121316] border border-[#2E313A] p-6 space-y-6">
                <h3 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase border-b border-[#2E313A] pb-3">
                  // QUIZ AUDIENCE INSIGHTS & INTENT ANALYTICS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Business Type Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-[#8E95A5] uppercase">// TOP BUSINESS MODELS</h4>
                    {stats.businessTypeCounts && Object.keys(stats.businessTypeCounts).length > 0 ? (
                      Object.entries(stats.businessTypeCounts).map(([type, count]) => (
                        <div key={type} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono text-[#E2E4E8]">
                            <span className="capitalize">{type}</span>
                            <span>{String(count)}</span>
                          </div>
                          <div className="w-full h-2 bg-[#18191C] overflow-hidden border border-[#2E313A]">
                            <div
                              className="h-full bg-[#FFFFFF]"
                              style={{ width: `${Math.min(100, ((Number(count)) / Math.max(1, stats.totalQuizCompletions || 1)) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#8E95A5] italic">No quiz responses recorded yet.</p>
                    )}
                  </div>

                  {/* Primary Goal Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-[#8E95A5] uppercase">// PRIMARY GOALS</h4>
                    {stats.goalCounts && Object.keys(stats.goalCounts).length > 0 ? (
                      Object.entries(stats.goalCounts).map(([goal, count]) => (
                        <div key={goal} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono text-[#E2E4E8]">
                            <span className="capitalize">{goal.replace("_", " ")}</span>
                            <span>{String(count)}</span>
                          </div>
                          <div className="w-full h-2 bg-[#18191C] overflow-hidden border border-[#2E313A]">
                            <div
                              className="h-full bg-[#FFFFFF]"
                              style={{ width: `${Math.min(100, ((Number(count)) / Math.max(1, stats.totalQuizCompletions || 1)) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#8E95A5] italic">No goal responses recorded yet.</p>
                    )}
                  </div>

                  {/* Budget Ranges Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-[#8E95A5] uppercase">// BUDGET RANGES</h4>
                    {stats.budgetCounts && Object.keys(stats.budgetCounts).length > 0 ? (
                      Object.entries(stats.budgetCounts).map(([b, count]) => (
                        <div key={b} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono text-[#E2E4E8]">
                            <span>{b.replace("_", "-")}</span>
                            <span>{String(count)}</span>
                          </div>
                          <div className="w-full h-2 bg-[#18191C] overflow-hidden border border-[#2E313A]">
                            <div
                              className="h-full bg-[#FFFFFF]"
                              style={{ width: `${Math.min(100, ((Number(count)) / Math.max(1, stats.totalQuizCompletions || 1)) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#8E95A5] italic">No budget responses recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-[#121316] border border-[#2E313A] p-6 overflow-hidden">
                <h3 className="text-xs font-mono font-bold text-[#FFFFFF] mb-4 uppercase">// PAYMENTS TRANSACTION LEDGER</h3>
                <div className="overflow-x-auto">
                  {orders.length === 0 ? (
                    <p className="text-center text-xs text-[#8E95A5] py-8 font-mono">// No purchase records registered in db.json yet.</p>
                  ) : (
                    <table className="w-full text-xs font-mono text-left">
                      <thead>
                        <tr className="border-b border-[#2E313A] text-[#8E95A5] font-semibold uppercase text-[10px]">
                          <th className="py-3">Customer Details</th>
                          <th className="py-3">Type & Topic ID</th>
                          <th className="py-3">Amount</th>
                          <th className="py-3">WhatsApp Opt-in</th>
                          <th className="py-3">Date</th>
                          <th className="py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E313A] text-[#E2E4E8]">
                        {orders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#18191C]">
                            <td className="py-4">
                              <span className="font-bold text-[#FFFFFF] block">{ord.name}</span>
                              <span className="text-[#8E95A5] text-[10px] block">{ord.email} | {ord.phone}</span>
                            </td>
                            <td className="py-4 font-semibold text-[#FFFFFF]">
                              {ord.topicId === "bundle" ? (
                                <span className="text-[#FFFFFF] font-bold">
                                  Complete Bundle (₹249)
                                </span>
                              ) : (
                                <span>Single: {ord.topicId} (₹99)</span>
                              )}
                            </td>
                            <td className="py-4 font-bold text-[#FFFFFF]">₹{ord.amount}</td>
                            <td className="py-4">
                              {ord.whatsappOptIn ? (
                                <span className="text-[#FFFFFF] font-bold bg-[#2E313A] px-2 py-0.5 text-[10px]">
                                  Yes (Opted-in)
                                </span>
                              ) : (
                                <span className="text-[#8E95A5] text-[10px]">No</span>
                              )}
                            </td>
                            <td className="py-4 text-[#8E95A5]">{new Date(ord.createdAt).toLocaleDateString("en-IN")}</td>
                            <td className="py-4 text-right">
                              <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase border ${
                                ord.status === "paid"
                                  ? "bg-[#FFFFFF] text-[#18191C] border-[#FFFFFF]"
                                  : "bg-[#18191C] text-[#8E95A5] border-[#2E313A]"
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
            <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 space-y-6">
              <h3 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase border-b border-[#2E313A] pb-3">// CMS SETUP VALUES</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Agency Name</label>
                  <input
                    type="text"
                    value={editingSettings.agencyName}
                    onChange={(e) => handleSettingChange("agencyName", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Tagline</label>
                  <input
                    type="text"
                    value={editingSettings.tagline}
                    onChange={(e) => handleSettingChange("tagline", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Contact Phone</label>
                  <input
                    type="text"
                    value={editingSettings.contactPhone}
                    onChange={(e) => handleSettingChange("contactPhone", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Contact Email</label>
                  <input
                    type="email"
                    value={editingSettings.contactEmail}
                    onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// WhatsApp Number</label>
                  <input
                    type="text"
                    value={editingSettings.whatsappNumber}
                    onChange={(e) => handleSettingChange("whatsappNumber", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Consultation Link</label>
                  <input
                    type="text"
                    value={editingSettings.consultationLink}
                    onChange={(e) => handleSettingChange("consultationLink", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Office Address</label>
                <input
                  type="text"
                  value={editingSettings.officeAddress}
                  onChange={(e) => handleSettingChange("officeAddress", e.target.value)}
                  className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Exp Years</label>
                  <input
                    type="number"
                    value={editingSettings.experienceYears}
                    onChange={(e) => handleSettingChange("experienceYears", Number(e.target.value))}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Clients Stat</label>
                  <input
                    type="number"
                    value={editingSettings.satisfiedClients}
                    onChange={(e) => handleSettingChange("satisfiedClients", Number(e.target.value))}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Projects Stat</label>
                  <input
                    type="number"
                    value={editingSettings.projectsCompleted}
                    onChange={(e) => handleSettingChange("projectsCompleted", Number(e.target.value))}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Ad Budgets Stat</label>
                  <input
                    type="text"
                    value={editingSettings.adBudgetManaged}
                    onChange={(e) => handleSettingChange("adBudgetManaged", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#2E313A] pt-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// About Title</label>
                  <input
                    type="text"
                    value={editingSettings.aboutTitle}
                    onChange={(e) => handleSettingChange("aboutTitle", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Admin Password</label>
                  <input
                    type="text"
                    value={editingSettings.adminPassword}
                    onChange={(e) => handleSettingChange("adminPassword", e.target.value)}
                    className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// About Us Description</label>
                <textarea
                  rows={5}
                  value={editingSettings.aboutDesc}
                  onChange={(e) => handleSettingChange("aboutDesc", e.target.value)}
                  className="w-full border border-[#2E313A] bg-[#18191C] px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF] resize-none font-sans"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleSaveChanges("updateSettings", { cmsSettings: editingSettings })}
                  disabled={saving}
                  className="btn-bracket px-6 py-3 text-xs"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 inline mr-1" />}
                  [ SAVE SETTINGS ]
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: EDIT SERVICES */}
          {activeTab === "services" && editingServices.length > 0 && (
            <div className="space-y-6">
              <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 space-y-6">
                <h3 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase border-b border-[#2E313A] pb-3">// SERVICES LIST</h3>
                
                <div className="space-y-10">
                  {editingServices.map((service, sIdx) => (
                    <div key={service.id} className="border-b border-[#2E313A] pb-8 last:border-0 last:pb-0 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Service Name</label>
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => handleServiceChange(sIdx, "name", e.target.value)}
                            className="w-full border border-[#2E313A] bg-[#18191C] px-3 py-2 text-xs font-mono text-[#FFFFFF]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Starting Price</label>
                          <input
                            type="text"
                            value={service.startingPrice}
                            onChange={(e) => handleServiceChange(sIdx, "startingPrice", e.target.value)}
                            className="w-full border border-[#2E313A] bg-[#18191C] px-3 py-2 text-xs font-mono text-[#FFFFFF]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Delivery Time</label>
                          <input
                            type="text"
                            value={service.deliveryTime}
                            onChange={(e) => handleServiceChange(sIdx, "deliveryTime", e.target.value)}
                            className="w-full border border-[#2E313A] bg-[#18191C] px-3 py-2 text-xs font-mono text-[#FFFFFF]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Description</label>
                        <input
                          type="text"
                          value={service.description}
                          onChange={(e) => handleServiceChange(sIdx, "description", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#18191C] px-3 py-2 text-xs font-mono text-[#FFFFFF]"
                        />
                      </div>

                      {/* Features Editor */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase">// Features Included</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feature: string, fIdx: number) => (
                            <div key={fIdx} className="flex gap-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleServiceFeatureChange(sIdx, fIdx, e.target.value)}
                                className="flex-grow border border-[#2E313A] bg-[#18191C] px-3 py-1.5 text-xs font-mono text-[#FFFFFF]"
                              />
                              <button
                                onClick={() => removeServiceFeature(sIdx, fIdx)}
                                className="p-2 text-[#FF5555] hover:bg-[#FF5555]/10 transition-colors"
                                title="Delete feature"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => addServiceFeature(sIdx)}
                          className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#FFFFFF] hover:underline"
                        >
                          <Plus className="w-3 h-3" /> [ ADD FEATURE LINE ]
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#2E313A] mt-6">
                  <button
                    onClick={() => handleSaveChanges("updateServices", { services: editingServices })}
                    disabled={saving}
                    className="btn-bracket px-6 py-3 text-xs"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 inline mr-1" />}
                    [ SAVE SERVICES LIST ]
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EDIT PRICING TIERS */}
          {activeTab === "pricing" && editingPricing.length > 0 && (
            <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-[#2E313A] pb-3 mb-6">
                <h3 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase">// PRICING ESTIMATES TIERS</h3>
                <button
                  onClick={addPricingRow}
                  className="btn-bracket px-3 py-1.5 text-[10px]"
                >
                  + ADD PRICE ROW
                </button>
              </div>

              <div className="space-y-4">
                {editingPricing.map((tier, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2 bg-[#18191C] p-4 border border-[#2E313A] relative">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 flex-grow">
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Category</label>
                        <input
                          type="text"
                          value={tier.category}
                          onChange={(e) => handlePricingChange(idx, "category", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-2 py-1 text-xs font-mono text-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Item/Scope Name</label>
                        <input
                          type="text"
                          value={tier.item}
                          onChange={(e) => handlePricingChange(idx, "item", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-2 py-1 text-xs font-mono text-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Short price label</label>
                        <input
                          type="text"
                          value={tier.basicPrice}
                          onChange={(e) => handlePricingChange(idx, "basicPrice", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-2 py-1 text-xs font-mono font-bold text-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Billing terms</label>
                        <input
                          type="text"
                          value={tier.billing}
                          onChange={(e) => handlePricingChange(idx, "billing", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-2 py-1 text-xs font-mono text-[#FFFFFF]"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Extended Description</label>
                        <input
                          type="text"
                          value={tier.detailedPrice}
                          onChange={(e) => handlePricingChange(idx, "detailedPrice", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-2 py-1 text-xs font-mono text-[#FFFFFF]"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removePricingRow(idx)}
                      className="p-2 text-[#FF5555] hover:bg-[#FF5555]/10 transition-colors self-end sm:self-center"
                      title="Delete row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#2E313A] mt-6">
                <button
                  onClick={() => handleSaveChanges("updatePricing", { pricingTiers: editingPricing })}
                  disabled={saving}
                  className="btn-bracket px-6 py-3 text-xs"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 inline mr-1" />}
                  [ SAVE PRICING MATRIX ]
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: EDIT PAID TOPICS TEASERS */}
          {activeTab === "topics" && editingTopics.length > 0 && (
            <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 space-y-6">
              <h3 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase border-b border-[#2E313A] pb-3">// EDIT TOPIC TEASER COLUMNS</h3>
              
              <div className="space-y-8">
                {editingTopics.map((topic, idx) => (
                  <div key={topic.id} className="border-b border-[#2E313A] pb-6 last:border-0 last:pb-0 space-y-3">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#8E95A5] uppercase tracking-widest">// {topic.id}</h4>
                      <span className="text-sm font-mono font-bold text-[#FFFFFF] block mt-0.5">{topic.title}</span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-[#FFFFFF] uppercase mb-1">// Teaser Description</label>
                      <textarea
                        rows={3}
                        value={topic.teaser}
                        onChange={(e) => handleTopicTeaserChange(idx, e.target.value)}
                        className="w-full border border-[#2E313A] bg-[#18191C] px-3 py-2 text-xs font-mono text-[#FFFFFF]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#2E313A]">
                <button
                  onClick={() => handleSaveChanges("updateTopics", { topics: editingTopics })}
                  disabled={saving}
                  className="btn-bracket px-6 py-3 text-xs"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 inline mr-1" />}
                  [ SAVE PAID CONTENT TEASERS ]
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: EDIT PORTFOLIO PROJECTS */}
          {activeTab === "portfolio" && editingProjects.length > 0 && (
            <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-[#2E313A] pb-3 mb-6">
                <h3 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase">// PORTFOLIO PROJECTS LIST</h3>
                <button
                  onClick={addProjectRow}
                  className="btn-bracket px-3 py-1.5 text-[10px]"
                >
                  + ADD PROJECT
                </button>
              </div>

              <div className="space-y-6">
                {editingProjects.map((project, idx) => (
                  <div key={project.id} className="p-5 bg-[#18191C] border border-[#2E313A] space-y-4 relative">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono text-[#8E95A5]">
                        ID: {project.id}
                      </span>
                      <button
                        onClick={() => removeProjectRow(idx)}
                        className="p-1 text-[#FF5555] hover:bg-[#FF5555]/10 transition-colors"
                        title="Remove project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-3 py-1.5 text-xs font-mono text-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Category</label>
                        <select
                          value={project.category}
                          onChange={(e) => handleProjectChange(idx, "category", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-3 py-1.5 text-xs font-mono text-[#FFFFFF]"
                        >
                          <option value="Web Development">Web Development</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Description</label>
                      <textarea
                        rows={3}
                        value={project.description}
                        onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                        className="w-full border border-[#2E313A] bg-[#121316] px-3 py-1.5 text-xs font-mono text-[#FFFFFF] resize-none font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Tags (Comma-separated)</label>
                        <input
                          type="text"
                          value={project.tags.join(", ")}
                          onChange={(e) => handleProjectTagsChange(idx, e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-3 py-1.5 text-xs font-mono text-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-[#8E95A5] uppercase mb-0.5">Live Link URL (Optional)</label>
                        <input
                          type="text"
                          value={project.link}
                          onChange={(e) => handleProjectChange(idx, "link", e.target.value)}
                          className="w-full border border-[#2E313A] bg-[#121316] px-3 py-1.5 text-xs font-mono text-[#FFFFFF]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#2E313A] mt-6">
                <button
                  onClick={() => handleSaveChanges("updateProjects", { projects: editingProjects })}
                  disabled={saving}
                  className="btn-bracket px-6 py-3 text-xs"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 inline mr-1" />}
                  [ SAVE PORTFOLIO PROJECTS ]
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: VIEW REGISTERED USERS */}
          {activeTab === "users" && (
            <div className="bg-[#121316] border border-[#2E313A] p-6 overflow-hidden">
              <h3 className="text-xs font-mono font-bold text-[#FFFFFF] mb-4 uppercase">// REGISTERED CLIENT ACCOUNTS</h3>
              <div className="overflow-x-auto">
                {users.length === 0 ? (
                  <p className="text-center text-xs text-[#8E95A5] py-8 font-mono">// No client user accounts registered in db.json yet.</p>
                ) : (
                  <table className="w-full text-xs font-mono text-left">
                    <thead>
                      <tr className="border-b border-[#2E313A] text-[#8E95A5] font-semibold uppercase text-[10px]">
                        <th className="py-3">User ID</th>
                        <th className="py-3">Full Name</th>
                        <th className="py-3">Email Address</th>
                        <th className="py-3">Phone Number</th>
                        <th className="py-3 text-right">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E313A] text-[#E2E4E8]">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-[#18191C]">
                          <td className="py-4 font-mono text-[10px] text-[#8E95A5]">{u.id}</td>
                          <td className="py-4 font-bold text-[#FFFFFF]">{u.name}</td>
                          <td className="py-4">{u.email}</td>
                          <td className="py-4">{u.phone}</td>
                          <td className="py-4 text-right text-[#8E95A5]">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
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
    </div>
  );
}
