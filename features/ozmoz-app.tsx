"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Cpu,
  Database,
  DollarSign,
  Hexagon,
  Layers,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  User,
  Users,
  X,
  Zap,
  Globe,
  Rss
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PageId =
  | "home"
  | "detail"
  | "leaderboards"
  | "faq"
  | "auth"
  | "reports"
  | "success";

type Mission = {
  id: number;
  appName: string;
  category: string;
  theme: string;
  difficulty: string;
  stack: string[];
  bounty: number;
  days: number;
  teamSize: number;
  status: string;
  timestamp: string;
  bookmarks: number;
  devStrategy: string;
};

type UserProfile = { name: string; level: number; xp: number };

type ChatMsg = { role: "system" | "user"; text: string };

const USER_TICKER = [
  "Mike K. raised the bounty on Vine (Reborn) by $250",
  "sarah_dev joined the Winamp UI revival squad",
  "Alex M. shipped first PR on Google Wave — +180 XP",
  "collective_7 pledged $500 toward Neo-City RPG infrastructure",
  "Jordan L. documented the legacy auth flow for 3 missions",
  "repo_wizard forked Vine and resumed the HLS pipeline",
  "nina.codes claimed Tester role on Winamp UI",
  "Anonymous sponsor added $1,200 to the public bounty pool",
  "EU-West node: 12 architects online in the last hour",
  "Ravi P. published Lab Report #044 — dependency graph cleared"
];

/** Invite-only access (not shown in UI). */
const INVITE_ACCESS_CODE = "1186";

export function OzmozApp() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [claimedMissions, setClaimedMissions] = useState<Mission[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {
      role: "system",
      text: "Ozmoz Protocol Assistant online. How can we facilitate your architectural revival today?"
    }
  ]);
  const [currentChatMessage, setCurrentChatMessage] = useState("");

  const [formData, setFormData] = useState({
    appName: "",
    bounty: "850",
    days: "14",
    teamSize: "2"
  });
  const [isDevLoading, setIsDevLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<{
    strategy: string;
    bounty: number;
    deadline: number;
    capacity: number;
  } | null>(null);

  const [filters, setFilters] = useState({ search: "", theme: "All" });
  const [authForm, setAuthForm] = useState({ name: "", code: "" });
  const [authError, setAuthError] = useState("");

  const [cpuLoad, setCpuLoad] = useState(37);
  const [memoryUsage, setMemoryUsage] = useState(62);
  const [latency, setLatency] = useState(14);
  const [nodes, setNodes] = useState(45200);
  const [toast, setToast] = useState<string | null>(null);
  const [briefingEmail, setBriefingEmail] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 4000);
  }, []);

  const missions = useMemo<Mission[]>(
    () => [
      {
        id: 1,
        appName: "Google Wave",
        category: "REAL-TIME SYSTEMS",
        theme: "Tech",
        difficulty: "Hard",
        stack: ["Next.js", "Y.js", "Rust"],
        bounty: 500,
        days: 7,
        teamSize: 3,
        status: "Open",
        timestamp: "2 hours ago",
        bookmarks: 142,
        devStrategy:
          "Architect a decentralized real-time sync using modern CRDTs. Rebuild the frontend with high-performance canvas rendering."
      },
      {
        id: 2,
        appName: "Vine (Reborn)",
        category: "VIDEO INFRASTRUCTURE",
        theme: "Social Media",
        difficulty: "Extreme",
        stack: ["Go", "HLS", "WASM"],
        bounty: 1200,
        days: 14,
        teamSize: 5,
        status: "In Progress",
        timestamp: "5 hours ago",
        bookmarks: 89,
        devStrategy:
          "Implement HLS adaptive streaming with edge-computing for sub-second latency video delivery."
      },
      {
        id: 3,
        appName: "Winamp UI",
        category: "LEGACY MODERNIZATION",
        theme: "Tech",
        difficulty: "Medium",
        stack: ["React", "SVG", "WebAudio"],
        bounty: 800,
        days: 10,
        teamSize: 2,
        status: "Open",
        timestamp: "1 hour ago",
        bookmarks: 256,
        devStrategy:
          "Revitalize the classic skins with high-DPI SVG support and integrate modern streaming SDKs."
      },
      {
        id: 4,
        appName: "Neo-City RPG",
        category: "GAME ENGINE",
        theme: "Videogame",
        difficulty: "Extreme",
        stack: ["Three.js", "C++", "WebAssembly"],
        bounty: 3500,
        days: 30,
        teamSize: 8,
        status: "Open",
        timestamp: "10 mins ago",
        bookmarks: 412,
        devStrategy:
          "Rebuild the abandoned 2004 RPG engine for modern browsers using Three.js and persistent world storage."
      }
    ],
    []
  );

  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      const searchMatch = m.appName.toLowerCase().includes(filters.search.toLowerCase());
      const themeMatch = filters.theme === "All" || m.theme === filters.theme;
      return searchMatch && themeMatch;
    });
  }, [missions, filters]);

  const resetToHome = useCallback(() => {
    setCurrentPage("home");
    setSelectedMission(null);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCpuLoad(31 + Math.floor(Math.random() * 28));
      setMemoryUsage(52 + Math.floor(Math.random() * 30));
      setLatency(10 + Math.floor(Math.random() * 12));
      setNodes(44900 + Math.floor(Math.random() * 400));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleDevAnalyze = () => {
    if (!formData.appName.trim()) return;
    setIsDevLoading(true);
    setAiInsight(null);
    setTimeout(() => {
      const seed = formData.appName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      const bounty = 680 + (seed % 920);
      const deadline = 9 + (seed % 13);
      const capacity = 2 + (seed % 4);
      const insight = {
        strategy: `Architectural audit for "${formData.appName}" complete. Legacy I/O and auth layers show the highest risk. Recommend phased extraction of the sync boundary, then hardening tests before a structured migration.`,
        bounty,
        deadline,
        capacity
      };
      setAiInsight(insight);
      setFormData((f) => ({
        ...f,
        bounty: String(insight.bounty),
        days: String(insight.deadline),
        teamSize: String(insight.capacity)
      }));
      setIsDevLoading(false);
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authForm.code.trim() === INVITE_ACCESS_CODE) {
      setUser({ name: authForm.name.trim() || "Architect_One", level: 12, xp: 4500 });
      setAuthError("");
      setCurrentPage("reports");
    } else {
      setAuthError("INVALID ACCESS CODE. PROTOCOL DENIED.");
    }
  };

  const handleBriefingSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const email = briefingEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Enter a valid email to subscribe to the briefing.");
      return;
    }
    showToast("Briefing subscription confirmed. Check your inbox for the next drop.");
    setBriefingEmail("");
  };

  const handleShareSite = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "OZMOZ Revival Labs", text: "Dead codebase revival missions.", url });
      } catch {
        showToast("Share cancelled.");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast("Link copied to clipboard.");
      } catch {
        showToast("Could not copy link.");
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentChatMessage.trim()) return;
    setChatMessages((prev) => [...prev, { role: "user", text: currentChatMessage }]);
    setCurrentChatMessage("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: "We are directing you to our representative. Please hold on for a moment."
        }
      ]);
    }, 1000);
  };

  const claimMission = (mission: Mission) => {
    if (!user) {
      setCurrentPage("auth");
      return;
    }
    if (!claimedMissions.find((m) => m.id === mission.id)) {
      setClaimedMissions((prev) => [...prev, mission]);
    }
    setCurrentPage("reports");
  };

  const handlePublishMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setCurrentPage("auth");
      return;
    }
    setCurrentPage("success");
  };

  const navBtn = (page: PageId, label: string, active: boolean) => (
    <button
      type="button"
      onClick={() => setCurrentPage(page)}
      className={`text-[10px] font-bold uppercase tracking-[0.2em] transition ${
        active ? "text-emerald-400" : "text-slate-500 hover:text-emerald-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative min-h-screen cursor-auto bg-[#01040b] font-mono text-slate-200 antialiased selection:bg-emerald-500/30 selection:text-emerald-100">
      <div className="pointer-events-none fixed inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(100,116,139,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.25)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(16,185,129,0.12),transparent_50%)]" />

      <nav className="sticky top-0 z-[80] border-b border-emerald-500/20 bg-[#050b18]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button
            type="button"
            onClick={resetToHome}
            className="group flex flex-col items-start gap-0.5 text-left transition"
          >
            <div className="relative flex items-center gap-2">
              <motion.span
                className="relative rounded-lg border border-emerald-400/50 bg-emerald-500/10 p-2"
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: "0 0 20px rgba(74,222,128,0.35)" }}
              >
                <Zap size={22} className="text-emerald-400" fill="currentColor" fillOpacity={0.2} />
              </motion.span>
              <div>
                <span className="text-lg font-black uppercase italic tracking-tight text-white">
                  OZ<span className="text-emerald-400">MOZ</span>
                </span>
                <p className="text-[7px] font-bold uppercase tracking-[0.35em] text-slate-500">
                  Revival Labs
                </p>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-6 md:flex">
              {navBtn("home", "Operations", currentPage === "home")}
              {navBtn("leaderboards", "Leaderboards", currentPage === "leaderboards")}
              <button
                type="button"
                onClick={() => (user ? setCurrentPage("reports") : setCurrentPage("auth"))}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition ${
                  currentPage === "reports" ? "text-emerald-400" : "text-slate-500 hover:text-emerald-300"
                }`}
              >
                Lab Reports
              </button>
              {navBtn("faq", "F.A.Q", currentPage === "faq")}
            </div>
            {user ? (
              <button
                type="button"
                onClick={() => setCurrentPage("reports")}
                className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-200 transition hover:bg-emerald-500/25"
              >
                <User size={14} /> {user.name}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentPage("auth")}
                className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition hover:border-emerald-500/50 hover:text-emerald-300"
              >
                <ShieldCheck size={14} /> Log In
              </button>
            )}
          </div>
        </div>

        <div className="overflow-hidden border-t border-slate-800/80 bg-black/60 py-2">
          <motion.div
            className="flex min-w-max gap-12 px-4 text-[9px] font-bold tracking-[0.06em] text-emerald-300/95"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 80, ease: "linear", repeat: Infinity }}
          >
            {[...USER_TICKER, ...USER_TICKER].map((item, i) => (
              <span key={`${item}-${i}`} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <header className="relative overflow-hidden px-6 pb-4 pt-14 text-center">
              <div className="pointer-events-none absolute left-1/4 top-1/4 h-40 w-96 rounded-full bg-emerald-500/20 blur-[80px]" />
              <div className="relative z-10 mx-auto max-w-5xl">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-900/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300 shadow-lg">
                  <Terminal size={12} className="text-emerald-400" /> The High-End Revival Protocol
                </div>
                <h1 className="mb-6 text-5xl font-black uppercase italic leading-[0.95] tracking-tight text-white md:text-7xl">
                  Revive Dead <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Codebases.
                  </span>
                </h1>
                <p className="mx-auto mb-10 max-w-xl text-base font-medium italic leading-relaxed text-slate-400 md:text-lg">
                  Premium infrastructure for developers to reclaim abandoned source code and architect
                  high-value digital futures.
                </p>
              </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 pb-24 pt-4">
              <section className="mb-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
                <motion.div
                  className="group relative cursor-default overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#050b14]/95 px-5 py-6 text-center sm:px-4"
                  whileHover={{ scale: 1.02, borderColor: "rgba(52, 211, 153, 0.45)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <div className="mb-3 flex justify-center">
                    <span className="inline-flex rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-400 shadow-none transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_22px_rgba(52,211,153,0.35)]">
                      <Users className="h-6 w-6 transition duration-300 group-hover:text-emerald-300" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>
                  <p className="text-2xl font-black tabular-nums text-white md:text-3xl">3.8K+</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Engineers
                  </p>
                </motion.div>
                <motion.div
                  className="group relative cursor-default overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#050b14]/95 px-5 py-6 text-center sm:px-4"
                  whileHover={{ scale: 1.02, borderColor: "rgba(52, 211, 153, 0.45)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <div className="mb-3 flex justify-center">
                    <span className="inline-flex rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-400 shadow-none transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_22px_rgba(52,211,153,0.35)]">
                      <DollarSign className="h-6 w-6 transition duration-300 group-hover:text-emerald-300" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>
                  <p className="text-2xl font-black tabular-nums text-white md:text-3xl">$2.4M</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    USD prize awarded
                  </p>
                </motion.div>
                <motion.div
                  className="group relative cursor-default overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#050b14]/95 px-5 py-6 text-center sm:px-4"
                  whileHover={{ scale: 1.02, borderColor: "rgba(52, 211, 153, 0.45)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <div className="mb-3 flex justify-center">
                    <span className="inline-flex rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-400 shadow-none transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_22px_rgba(52,211,153,0.35)]">
                      <Layers className="h-6 w-6 transition duration-300 group-hover:text-emerald-300" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>
                  <p className="text-2xl font-black tabular-nums text-white md:text-3xl">12K+</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Projects revived
                  </p>
                </motion.div>
              </section>

              <section className="relative mb-20 max-w-4xl overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-white/[0.04] p-8 shadow-[0_0_60px_rgba(16,185,129,0.08)] backdrop-blur-xl md:p-12">
                <h2 className="mb-8 flex items-center gap-3 text-2xl font-black uppercase italic text-white">
                  <Plus className="text-emerald-400" size={24} /> Technical Mission
                </h2>
                <form onSubmit={handlePublishMission} className="space-y-8">
                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      Repository Identifier (Repo ID)
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        placeholder="github.com/archive/dead-app..."
                        className="flex-1 rounded-2xl border-2 border-slate-700 bg-[#030712] py-4 px-6 text-base font-bold text-white outline-none transition focus:border-emerald-500"
                        value={formData.appName}
                        onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={handleDevAnalyze}
                        disabled={isDevLoading || !formData.appName.trim()}
                        className="flex items-center justify-center gap-2 rounded-[1.5rem] border border-emerald-500/40 bg-emerald-500/20 px-8 py-4 text-[10px] font-black uppercase tracking-widest text-emerald-100 transition hover:bg-emerald-500/30 disabled:opacity-40"
                      >
                        {isDevLoading ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Sparkles size={16} />
                        )}
                        Analyze
                      </button>
                    </div>
                  </div>

                  {aiInsight && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/10 p-8"
                    >
                      <div className="mb-4 flex items-center gap-2 text-emerald-400">
                        <Zap size={14} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Architect AI Insight
                        </span>
                      </div>
                      <p className="mb-6 border-l-2 border-emerald-400/60 pl-4 text-xs italic leading-relaxed text-emerald-100/90">
                        &ldquo;{aiInsight.strategy}&rdquo;
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="rounded-xl border border-emerald-500/25 bg-[#050b14] p-4">
                          <span className="mb-1 block text-[8px] font-black uppercase text-emerald-400/80">
                            Approx Bounty
                          </span>
                          <span className="text-xl font-black text-emerald-300">${aiInsight.bounty}</span>
                        </div>
                        <div className="rounded-xl border border-emerald-500/25 bg-[#050b14] p-4">
                          <span className="mb-1 block text-[8px] font-black uppercase text-emerald-400/80">
                            Deadline
                          </span>
                          <span className="text-xl font-black text-emerald-300">{aiInsight.deadline} Days</span>
                        </div>
                        <div className="rounded-xl border border-emerald-500/25 bg-[#050b14] p-4">
                          <span className="mb-1 block text-[8px] font-black uppercase text-emerald-400/80">
                            Capacity
                          </span>
                          <span className="text-xl font-black text-emerald-300">{aiInsight.capacity} Slots</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="ml-1 text-[10px] font-black uppercase text-slate-500">Bounty ($)</label>
                      <input
                        type="number"
                        className="w-full rounded-xl border-2 border-slate-700 bg-[#030712] py-4 px-6 font-bold text-white outline-none focus:border-emerald-500"
                        value={formData.bounty}
                        onChange={(e) => setFormData({ ...formData, bounty: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-[10px] font-black uppercase text-slate-500">Deadline (days)</label>
                      <input
                        type="number"
                        className="w-full rounded-xl border-2 border-slate-700 bg-[#030712] py-4 px-6 font-bold text-white outline-none focus:border-emerald-500"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-[10px] font-black uppercase text-slate-500">Architects</label>
                      <input
                        type="number"
                        className="w-full rounded-xl border-2 border-slate-700 bg-[#030712] py-4 px-6 font-bold text-white outline-none focus:border-emerald-500"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-[1.75rem] border border-emerald-500/30 bg-gradient-to-r from-emerald-600 to-teal-600 py-6 text-[12px] font-black uppercase tracking-[0.35em] text-white shadow-[0_0_40px_rgba(16,185,129,0.25)] transition hover:brightness-110 active:scale-[0.99]"
                  >
                    Publish Mission
                  </button>
                </form>
              </section>

              <section className="space-y-12">
                <div className="flex flex-col items-start justify-between gap-8 px-2 md:flex-row md:items-end">
                  <div className="space-y-2 text-left">
                    <h2 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white md:text-5xl">
                      Live Operations
                    </h2>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                      Browse active architectural bounties
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex rounded-2xl border border-slate-700 bg-[#050b14] p-1">
                      {(["All", "Videogame", "Tech", "Social Media"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFilters({ ...filters, theme: t })}
                          className={`rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-widest transition ${
                            filters.theme === t
                              ? "bg-emerald-500/20 text-emerald-300 shadow-inner"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <Search
                        size={14}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                      <input
                        type="text"
                        placeholder="Search protocol..."
                        className="w-48 rounded-full border-2 border-slate-700 bg-[#030712] py-2.5 pl-10 pr-4 text-xs font-bold text-white outline-none focus:border-emerald-500"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  {filteredMissions.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setSelectedMission(m);
                        setCurrentPage("detail");
                      }}
                      className="group relative cursor-pointer overflow-hidden rounded-[3rem] border-2 border-slate-800 bg-white/[0.03] p-10 text-left shadow-lg transition duration-300 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                    >
                      <Hexagon
                        size={180}
                        className="absolute right-0 top-0 opacity-[0.04] text-emerald-400 transition group-hover:rotate-12"
                      />
                      <div className="relative z-10 mb-6 flex justify-between items-start">
                        <div className="space-y-2">
                          <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-400">
                            <Activity size={10} /> {m.category}
                          </span>
                          <h3 className="mt-1 text-3xl font-black uppercase italic leading-none tracking-tighter text-white md:text-4xl">
                            {m.appName}
                          </h3>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[8px] font-black uppercase text-emerald-300">
                            {m.status}
                          </span>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Bookmark size={10} className="text-slate-500" />
                            <span className="text-[10px] font-bold">{m.bookmarks}</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative z-10 mb-6 grid grid-cols-2 gap-4">
                        <div className="rounded-[2rem] border border-slate-700/80 bg-[#050b14] p-6">
                          <p className="mb-2 text-[8px] font-bold uppercase text-slate-500">Bounty Pool</p>
                          <p className="text-2xl font-black text-white">${m.bounty}</p>
                        </div>
                        <div className="rounded-[2rem] border border-slate-700/80 bg-[#050b14] p-6">
                          <p className="mb-2 text-[8px] font-bold uppercase text-slate-500">Complexity</p>
                          <p className="text-2xl font-black text-white">{m.difficulty}</p>
                        </div>
                      </div>
                      <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-8">
                        <span className="text-[10px] font-bold uppercase tracking-widest italic text-slate-500">
                          {m.days} DAYS LEFT
                        </span>
                        <ArrowRight
                          size={22}
                          className="text-emerald-400 transition group-hover:translate-x-2"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </main>
          </motion.div>
        )}

        {currentPage === "detail" && selectedMission && (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-left"
          >
            <button
              type="button"
              onClick={() => setCurrentPage("home")}
              className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 transition hover:text-emerald-400"
            >
              <ChevronLeft size={16} /> Back to Hub
            </button>
            <div className="mb-12">
              <span className="inline-block rounded-xl border border-emerald-500/40 bg-emerald-950/80 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                {`${selectedMission.theme} // ${selectedMission.category}`}
              </span>
              <h1 className="my-8 text-6xl font-black uppercase italic leading-none tracking-tighter text-white md:text-8xl">
                {selectedMission.appName}
              </h1>
              <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.25em] italic text-slate-500">
                <span className="flex items-center gap-2">
                  <Clock size={14} /> {selectedMission.timestamp}
                </span>
                <span className="flex items-center gap-2 text-emerald-400">
                  <Bookmark size={14} fill="currentColor" /> {selectedMission.bookmarks} Architect Savvy
                </span>
              </div>
            </div>
            <div className="relative mb-16 overflow-hidden rounded-[3rem] border border-emerald-500/20 bg-[#050b14] p-10 shadow-2xl md:p-12">
              <Cpu size={300} className="absolute right-0 top-0 opacity-[0.06] text-emerald-400" />
              <h4 className="relative z-10 mb-8 text-[11px] font-black uppercase tracking-[0.35em] text-emerald-400 italic">
                The Revival Strategy
              </h4>
              <p className="relative z-10 mb-10 border-l-4 border-emerald-500 pl-8 text-xl font-mono italic leading-relaxed text-slate-200 md:text-2xl">
                &ldquo;{selectedMission.devStrategy}&rdquo;
              </p>
              <div className="relative z-10 mb-10 flex flex-wrap gap-3">
                {selectedMission.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => claimMission(selectedMission)}
                className="relative z-10 rounded-3xl border border-emerald-400/50 bg-emerald-500 px-10 py-5 text-sm font-black uppercase tracking-[0.3em] text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Initiate Connection
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === "leaderboards" && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-left"
          >
            <h1 className="mb-4 text-5xl font-black uppercase italic leading-none tracking-tighter text-white">
              Architect Elite
            </h1>
            <p className="mb-12 text-[11px] font-bold uppercase tracking-[0.35em] text-slate-500">
              Global performance rankings
            </p>
            <div className="space-y-4">
              {[
                { rank: 1, name: "Zero_Day", xp: "95,400", badge: "Grand Master", missions: 42 },
                { rank: 2, name: "Kernel_Panic", xp: "82,100", badge: "Master", missions: 38 },
                { rank: 3, name: "Rust_Lord", xp: "74,500", badge: "Master", missions: 31 }
              ].map((p) => (
                <button
                  key={p.rank}
                  type="button"
                  onClick={() =>
                    showToast(`Public profile for ${p.name} — full dossier and match history coming soon.`)
                  }
                  className="flex w-full items-center justify-between rounded-[2rem] border border-slate-800 bg-white/[0.03] p-8 text-left shadow-md transition hover:border-emerald-500/40"
                >
                  <div className="flex items-center gap-8">
                    <span className="text-4xl font-black italic text-slate-800">#0{p.rank}</span>
                    <div>
                      <h4 className="mb-1 text-xl font-black uppercase italic leading-none text-white">
                        {p.name}
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                        {p.badge}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black leading-none text-white">{p.xp} XP</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                      {p.missions} Missions
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentPage === "faq" && (
          <motion.div
            key="faq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-left"
          >
            <h1 className="mb-16 text-5xl font-black uppercase italic leading-none tracking-tighter text-white">
              F.A.Q Protocol
            </h1>
            <div className="space-y-12">
              {[
                {
                  q: "What is Digital Archeology?",
                  a: "The process of refactoring, optimizing, and breathing new life into abandoned or legacy codebases that still hold intrinsic architectural value."
                },
                {
                  q: "How are rewards distributed?",
                  a: "Rewards are distributed instantly via Ozmoz Smart Contracts once mission completion is verified by the Lab Lords."
                },
                {
                  q: "Can I participate solo?",
                  a: "Absolutely. Many missions are designated for Solo Architects, while others require a Collective effort for high-complexity modules."
                }
              ].map((item, i) => (
                <div key={i} className="space-y-4 border-l-4 border-emerald-500 pl-6">
                  <h3 className="text-2xl font-black uppercase italic leading-tight text-white">{item.q}</h3>
                  <p className="font-medium italic leading-relaxed text-slate-400">{item.a}</p>
                </div>
              ))}
              <div className="mt-20 rounded-[2.5rem] border border-slate-700 bg-[#050b14] p-10">
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  Command Center Support
                </p>
                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <a
                    href="tel:+15550006966"
                    className="text-sm font-bold text-white underline decoration-emerald-500/40 transition hover:text-emerald-300"
                  >
                    Secure Line: +1 (555) 00-OZMOZ
                  </a>
                  <a
                    href="mailto:admin@ozmoz.lab"
                    className="text-sm font-bold text-white underline decoration-emerald-500/40 transition hover:text-emerald-300"
                  >
                    Encrypted Mail: admin@ozmoz.lab
                  </a>
                </div>
                <p className="text-xs italic leading-relaxed text-slate-500">
                  If you have any other questions, contact us. Representative architects are standing by
                  24/7 in the Zurich lab facility.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {currentPage === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mx-auto max-w-md px-6 py-24"
          >
            <div className="rounded-[3rem] border-2 border-slate-700 bg-white/[0.04] p-12 shadow-2xl backdrop-blur-xl">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-emerald-500/30 bg-[#030712] shadow-xl">
                <Lock className="text-emerald-400" size={24} />
              </div>
              <h2 className="mb-2 text-3xl font-black uppercase italic leading-none tracking-tighter text-white">
                Access Portal
              </h2>
              <p className="mb-10 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                Closed beta — invite-only tester access
              </p>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="ml-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    Architect Identifier
                  </label>
                  <input
                    type="text"
                    placeholder="DISPLAY NAME"
                    className="mt-2 w-full rounded-2xl border-2 border-slate-700 bg-[#030712] py-4 px-6 font-bold text-white outline-none focus:border-emerald-500"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="ml-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    Invite code
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="off"
                    className="mt-2 w-full rounded-2xl border-2 border-slate-700 bg-[#030712] py-4 px-6 text-center font-mono text-sm font-bold tracking-wide text-white outline-none focus:border-emerald-500"
                    value={authForm.code}
                    onChange={(e) => setAuthForm({ ...authForm, code: e.target.value })}
                  />
                </div>
                {authError && (
                  <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-center text-[10px] font-black uppercase text-red-400">
                    {authError}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full rounded-[1.5rem] border border-emerald-500/40 bg-emerald-600 py-5 text-[11px] font-black uppercase tracking-[0.35em] text-white shadow-xl transition hover:bg-emerald-500"
                >
                  Initialize Access
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {currentPage === "reports" && user && (
          <motion.div
            key="reports"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mx-auto max-w-6xl px-6 py-16 text-left"
          >
            <div className="mb-20 flex flex-col items-start gap-12 md:flex-row">
              <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-[3rem] border border-emerald-500/30 bg-[#030712] shadow-2xl">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(16,185,129,0.35)_1px,transparent_1px)] [background-size:24px_24px]" />
                <User size={80} className="text-white/20" />
                <div className="absolute -bottom-2 rounded-xl border border-emerald-400/50 bg-emerald-600 px-6 py-2 text-xs font-black uppercase tracking-widest italic text-white shadow-lg">
                  LVL {user.level}
                </div>
              </div>
              <div className="space-y-6">
                <h1 className="text-6xl font-black uppercase italic leading-none tracking-tighter text-white md:text-7xl">
                  {user.name}
                </h1>
                <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.25em] italic text-slate-500">
                  <button
                    type="button"
                    onClick={() =>
                      showToast("XP ledger: missions +12, reviews +6, docs +4. Next tier at 5,000 XP.")
                    }
                    className="flex items-center gap-2 text-emerald-400 transition hover:text-emerald-300"
                  >
                    <Trophy size={14} /> {user.xp} Total XP
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Identity verified via lab SSO. Revocation: support@ozmoz.lab.")}
                    className="flex items-center gap-2 text-emerald-400 transition hover:text-emerald-300"
                  >
                    <Database size={14} /> Architect Identity Verified
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      showToast("Preferences: theme, notifications, API keys — full panel shipping soon.")
                    }
                    className="flex items-center gap-2 transition hover:text-white"
                  >
                    <Settings size={14} /> System Preferences
                  </button>
                </div>
              </div>
            </div>

            <h3 className="mb-10 text-3xl font-black uppercase italic tracking-tighter text-white">
              Active Project Fleet
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {claimedMissions.length > 0 ? (
                claimedMissions.map((m, i) => (
                  <div
                    key={`${m.id}-${i}`}
                    className="group relative overflow-hidden rounded-[3.5rem] border-2 border-emerald-500/25 bg-emerald-500/10 p-10 shadow-lg transition hover:shadow-emerald-500/10"
                  >
                    <Zap size={120} className="absolute right-0 top-0 rotate-12 opacity-[0.08] text-emerald-400" />
                    <div className="relative z-10 mb-6 flex justify-between items-start">
                      <h4 className="text-3xl font-black uppercase italic leading-none text-white">
                        {m.appName}
                      </h4>
                      <span className="animate-pulse rounded-xl border border-emerald-400/40 bg-emerald-600 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white">
                        Connecting...
                      </span>
                    </div>
                    <p className="relative z-10 mb-8 max-w-sm text-sm italic leading-relaxed text-emerald-100/80">
                      &ldquo;Revival protocol initiated. Local cache synchronized. Awaiting architect input for
                      module migration.&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        showToast(`Workstation for “${m.appName}” queued. Neural link opens in a new session.`);
                        setIsChatOpen(true);
                      }}
                      className="relative z-10 rounded-2xl border border-emerald-500/40 bg-[#030712] px-8 py-4 text-[11px] font-black uppercase tracking-widest text-emerald-300 transition hover:bg-emerald-600 hover:text-white"
                    >
                      Open Workstation
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center gap-6 rounded-[3.5rem] border-2 border-dashed border-slate-700 p-24 text-center opacity-70">
                  <Hexagon size={64} className="text-slate-700" />
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">
                    No active architectural deployments
                  </p>
                  <button
                    type="button"
                    onClick={() => setCurrentPage("home")}
                    className="rounded-3xl border border-slate-600 bg-slate-900 px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white transition hover:border-emerald-500/50"
                  >
                    Browse Operations
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() =>
                  showToast("Extra deployment slot unlocks after 3 completed missions or Lab Rank 15.")
                }
                className="flex cursor-pointer flex-col items-center justify-center gap-6 rounded-[3.5rem] border-2 border-slate-800 bg-slate-900/40 p-10 text-left grayscale opacity-50 transition hover:border-emerald-500/40 hover:opacity-80"
              >
                <Plus size={48} className="text-slate-600" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">
                  Locked Deployment Slot
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mx-auto max-w-2xl px-6 py-32 text-center"
          >
            <div className="mx-auto mb-10 flex h-32 w-32 rotate-12 items-center justify-center rounded-[3rem] border border-emerald-400/50 bg-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
              <CheckCircle2 size={64} className="text-white" />
            </div>
            <h1 className="mb-8 text-6xl font-black uppercase italic leading-none tracking-tighter text-white md:text-7xl">
              Protocol <br /> Published.
            </h1>
            <p className="mb-12 text-[11px] font-black uppercase tracking-[0.35em] text-slate-500 italic leading-relaxed">
              Your mission has been broadcast to the elite architect network. <br />
              System awaiting synchronization.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setCurrentPage("home")}
                className="rounded-[1.75rem] border border-emerald-500/40 bg-slate-900 px-12 py-6 text-xs font-black uppercase tracking-[0.4em] text-white transition hover:bg-emerald-600"
              >
                Return to Hub
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("home");
                  showToast("Your mission is now visible under Live Operations.");
                }}
                className="rounded-[1.75rem] border border-emerald-500/30 bg-emerald-500/15 px-10 py-6 text-xs font-black uppercase tracking-[0.3em] text-emerald-200 transition hover:bg-emerald-500/25"
              >
                View live board
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-5">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-[340px] overflow-hidden rounded-[2rem] border border-emerald-500/25 bg-[#050b14]/95 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/5 bg-[#030712] p-5 text-white">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest italic text-slate-300">
                    Protocol Support Terminal
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="text-slate-400 transition hover:text-emerald-400"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="h-[280px] space-y-5 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.5rem] px-5 py-3.5 text-[12px] font-medium leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-tr-none border border-emerald-500/30 bg-emerald-600/30 text-white shadow-lg"
                          : "rounded-tl-none border border-slate-700 bg-[#030712] text-slate-400 italic shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-3 border-t border-slate-800 bg-[#030712] p-4">
                <input
                  type="text"
                  placeholder="Type protocol request..."
                  className="flex-1 rounded-2xl border border-slate-700 bg-[#050b14] px-5 py-4 text-[11px] font-bold text-white outline-none focus:ring-1 focus:ring-emerald-500"
                  value={currentChatMessage}
                  onChange={(e) => setCurrentChatMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="rounded-2xl border border-emerald-500/40 bg-emerald-600 p-4 text-white transition hover:bg-emerald-500"
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-emerald-500/40 bg-[#030712] text-white shadow-2xl transition hover:scale-105 active:scale-95"
        >
          <MessageSquare size={28} className="transition group-hover:rotate-12" />
        </button>
      </div>

      <footer className="relative z-[60] mt-auto overflow-hidden border-t border-emerald-500/20 bg-[#050a14] pb-16 pt-24 text-white [background-image:radial-gradient(rgba(16,185,129,0.12)_1px,transparent_1px)] [background-size:28px_28px]">
        <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/4 rounded-full bg-emerald-600/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-10">
          <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-10 lg:col-span-2">
              <button type="button"  onClick={resetToHome} className="text-left">
                <div className="mb-2 flex items-center gap-2">
                  <Zap size={28} className="text-emerald-400" fill="currentColor" fillOpacity={0.2} />
                </div>
                <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">
                  OZ<span className="text-emerald-500">MOZ</span>
                </h2>
                <span className="text-[8px] font-bold uppercase tracking-[0.35em] text-slate-500">
                  Revival Labs
                </span>
              </button>
              <p className="max-w-md text-base font-medium italic leading-snug text-slate-400">
                Global infrastructure for digital archeology. Elite developers refactor abandoned legacy
                systems into high-impact digital products. Built for the decentralized era.
              </p>
              <div className="flex gap-10 text-slate-500">
                <a
                  href="mailto:admin@ozmoz.lab"
                  aria-label="Email Ozmoz"
                  className="transition hover:text-emerald-400"
                >
                  <Mail size={24} />
                </a>
                <button
                  type="button"
                  aria-label="RSS briefing feed"
                  onClick={() => showToast("RSS feed URL will be in your next briefing email.")}
                  className="transition hover:text-emerald-400"
                >
                  <Rss size={24} />
                </button>
                <button
                  type="button"
                  aria-label="Share Ozmoz"
                  onClick={() => void handleShareSite()}
                  className="transition hover:text-emerald-400"
                >
                  <Share2 size={24} />
                </button>
                <a
                  href="https://ozmoz.lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ozmoz web"
                  className="transition hover:text-emerald-400"
                >
                  <Globe size={24} />
                </a>
              </div>
            </div>

            <div className="space-y-8 text-left">
              <h4 className="text-[12px] font-black uppercase italic tracking-[0.35em] text-emerald-500">
                Protocols
              </h4>
              <ul className="list-none space-y-5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
                <li>
                  <button type="button"  onClick={resetToHome} className="italic transition hover:translate-x-1 hover:text-white">
                    Operations Hub
                  </button>
                </li>
                <li>
                  <button type="button"  onClick={() => setCurrentPage("leaderboards")} className="italic transition hover:translate-x-1 hover:text-white">
                    Elite Rankings
                  </button>
                </li>
                <li>
                  <button type="button"  onClick={() => setCurrentPage("auth")} className="italic transition hover:translate-x-1 hover:text-white">
                    Access Portal
                  </button>
                </li>
                <li>
                  <button type="button"  onClick={() => setCurrentPage("faq")} className="italic transition hover:translate-x-1 hover:text-white">
                    FAQ Database
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-8 text-left">
              <h4 className="text-[12px] font-black uppercase italic tracking-[0.35em] text-emerald-500">
                Telemetry
              </h4>
              <ul className="list-none space-y-4 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">
                <li>
                  <button
                    type="button"
                    onClick={() => showToast(`Edge latency sample: ${latency}ms (rolling 60s window).`)}
                    className="flex w-full items-center gap-3 text-left transition hover:text-emerald-300"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                    System Latency: {latency}ms
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => showToast(`Active mesh nodes: ${(nodes / 1000).toFixed(1)}k (global).`)}
                    className="flex w-full items-center gap-3 text-left transition hover:text-emerald-300"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    Node Discovery: {(nodes / 1000).toFixed(1)}k
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => showToast(`Orchestrator CPU: ${cpuLoad}% (non-critical workloads).`)}
                    className="flex w-full items-center gap-3 text-left transition hover:text-emerald-300"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                    CPU Load: {cpuLoad}%
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => showToast(`Telemetry heap usage: ${memoryUsage}% of allocated pool.`)}
                    className="flex w-full items-center gap-3 text-left transition hover:text-emerald-300"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    Memory: {memoryUsage}%
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => showToast("Protocol v.2.6.4 — changelog available in Lab Reports.")}
                    className="flex w-full items-center gap-3 text-left text-emerald-400/90 transition hover:text-emerald-300"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    Protocol: v.2.6.4 Stable
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-8 text-left">
              <h4 className="text-[12px] font-black uppercase italic tracking-[0.35em] text-emerald-500">
                Briefing
              </h4>
              <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-slate-500 italic">
                Subscribe to high-end revival briefing.
              </p>
              <form onSubmit={handleBriefingSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="ARCHITECT@LAB.COM"
                  value={briefingEmail}
                  onChange={(e) => setBriefingEmail(e.target.value)}
                  className="w-full rounded-2xl border-2 border-white/10 bg-white/5 px-6 py-5 pr-14 text-[10px] font-black italic outline-none transition focus:border-emerald-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to briefing"
                  className="absolute right-2 top-2 bottom-2 rounded-xl bg-emerald-600 px-4 transition hover:bg-emerald-500"
                >
                  <ArrowRight size={16} className="text-white" />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-10 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 italic md:flex-row">
            <div className="flex items-center gap-4">
              <Shield size={18} className="animate-pulse text-emerald-500" />
              <span>© 2026 OZMOZ LABS — SECURED BY NEURAL ENCRYPTION</span>
            </div>
            <div className="flex flex-wrap gap-10 opacity-70">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("faq");
                  showToast("Privacy summary: data minimization, encryption at rest, EU/US regions.");
                }}
                className="cursor-pointer underline decoration-emerald-500/30 transition hover:text-white"
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={() =>
                  showToast("Governance: mission rules and bounty arbitration — policy PDF in Q2.")
                }
                className="cursor-pointer underline decoration-emerald-500/30 transition hover:text-white"
              >
                Governance
              </button>
              <button
                type="button"
                onClick={() => showToast("Public mission registry syncs hourly from the operations API.")}
                className="cursor-pointer underline decoration-emerald-500/30 transition hover:text-white"
              >
                Registry
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence mode="sync">
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-none fixed bottom-24 left-1/2 z-[250] max-w-md -translate-x-1/2 px-4"
          >
            <div className="pointer-events-auto rounded-xl border border-emerald-500/40 bg-[#0a1628]/95 px-5 py-3 text-center text-[11px] font-medium leading-snug text-emerald-100 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
