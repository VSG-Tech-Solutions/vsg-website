"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  ListFilter,
  Truck,
  ShoppingCart,
  FileText,
  Sparkles,
  Route as RouteIcon,
  History,
  BarChart3,
  LineChart,
  Users,
  Settings,
  Bell,
  Search,
  Download,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Inbox,
  User,
  SlidersHorizontal,
  ChevronDown,
  Sun,
  Package,
  PackageX,
  Plus,
  Upload,
  Eye,
  Brain,
  RefreshCw,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Star,
  Shield,
  Gauge,
  DollarSign,
  X,
  Check,
  Activity,
  Mail,
  Calendar,
  Filter,
  Zap,
  PieChart,
  Award,
  Target,
  Database,
  Pencil,
  Workflow,
  Trash2,
  MoreVertical,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// Interactive clickable prototype of the real Vantage product.
// Twelve views across 5 sections — every sidebar item is live and renders
// the real screen. All data is representative, not real customer data.

type ViewKey =
  | "dashboard"
  | "queue"
  | "receive"
  | "purchase"
  | "documents"
  | "insights"
  | "ai-routing"
  | "ask-history"
  | "reports"
  | "benchmarking"
  | "supplier-portal"
  | "settings";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  viewKey?: ViewKey;
  section: "overview" | "transactions" | "intelligence" | "reports" | "admin";
};

const NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, viewKey: "dashboard", section: "overview" },
  { id: "queue", label: "Work Queue", icon: ListFilter, viewKey: "queue", section: "overview" },
  { id: "receive", label: "Receive", icon: Truck, viewKey: "receive", section: "transactions" },
  { id: "purchase", label: "Purchase", icon: ShoppingCart, viewKey: "purchase", section: "transactions" },
  { id: "documents", label: "Documents", icon: FileText, viewKey: "documents", section: "intelligence" },
  { id: "insights", label: "Insights", icon: Sparkles, viewKey: "insights", section: "intelligence" },
  { id: "ai-routing", label: "AI Routing", icon: RouteIcon, viewKey: "ai-routing", section: "intelligence" },
  { id: "ask-history", label: "Ask History", icon: History, viewKey: "ask-history", section: "intelligence" },
  { id: "reports", label: "Reports", icon: BarChart3, viewKey: "reports", section: "reports" },
  { id: "benchmarking", label: "Benchmarking", icon: LineChart, viewKey: "benchmarking", section: "reports" },
  { id: "supplier-portal", label: "Supplier Portal", icon: Users, viewKey: "supplier-portal", section: "admin" },
  { id: "settings", label: "Settings", icon: Settings, viewKey: "settings", section: "admin" },
];

const SECTION_LABELS: Record<NavItem["section"], string> = {
  overview: "Overview",
  transactions: "Transactions",
  intelligence: "Intelligence",
  reports: "Reports & Data",
  admin: "Administration",
};

const BREADCRUMB: Record<ViewKey, string> = {
  dashboard: "Dashboard",
  queue: "Work Queue",
  receive: "Receive",
  purchase: "Purchase",
  documents: "Document Intelligence",
  insights: "Predictions",
  "ai-routing": "AI Insights",
  "ask-history": "Ask History",
  reports: "Reports",
  benchmarking: "Benchmarking",
  "supplier-portal": "Supplier Portal",
  settings: "Settings",
};

export const VantagePrototype: React.FC = () => {
  const [view, setView] = useState<ViewKey>("dashboard");
  const [activeNav, setActiveNav] = useState<string>("dashboard");

  const breadcrumb = BREADCRUMB[view];

  const onNavClick = (item: NavItem) => {
    setActiveNav(item.id);
    if (item.viewKey) setView(item.viewKey);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-6xl"
    >
      {/* Glow behind */}
      <div
        className="absolute -inset-8 blur-3xl -z-10"
        style={{
          background:
            "linear-gradient(to top right, var(--accent-glow), var(--accent-soft), transparent)",
        }}
      />

      {/* Browser chrome */}
      <div
        className="relative rounded-2xl border overflow-hidden themed-rounded"
        style={{
          borderColor: "var(--card-border)",
          background: "var(--bg)",
          boxShadow: "0 30px 80px -20px var(--accent-glow)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 border-b"
          style={{
            borderColor: "var(--card-border)",
            background: "color-mix(in oklab, var(--bg) 60%, transparent)",
          }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--card-border)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--card-border)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--card-border)" }} />
          </div>
          <div
            className="flex-1 mx-3 px-3 py-1 rounded-md border text-[10px] font-mono truncate"
            style={{
              background: "color-mix(in oklab, var(--bg) 70%, transparent)",
              borderColor: "var(--card-border)",
              color: "var(--muted-2)",
            }}
          >
            app.vsgtech.co.za/vantage/{view}
          </div>
          <div
            className="hidden sm:flex items-center gap-1.5 text-[10px]"
            style={{ color: "#22c55e", fontFamily: "var(--font-body)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            LIVE
          </div>
          <div
            className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] ml-2 px-2 py-0.5 rounded-full border"
            style={{
              borderColor: "color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
              background: "color-mix(in oklab, var(--accent-2) 10%, transparent)",
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            Interactive demo
          </div>
        </div>

        {/* App shell */}
        <div
          className="grid grid-cols-1 md:grid-cols-[220px_1fr]"
          style={{ background: "var(--bg)" }}
        >
          {/* Sidebar */}
          <aside
            className="hidden md:flex flex-col border-r min-h-[600px]"
            style={{
              borderColor: "var(--card-border)",
              background: "color-mix(in oklab, var(--bg) 92%, black)",
            }}
          >
            {/* Brand */}
            <div
              className="flex items-center gap-2.5 px-4 py-4 border-b"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(145deg, var(--accent-2), color-mix(in oklab, var(--accent-2) 70%, black))",
                  boxShadow: "0 0 14px var(--accent-glow)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--bg)" }} strokeWidth={2.4} />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-sm font-bold tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                >
                  VANTAGE
                </span>
                <span
                  className="mt-1 text-[8px] tracking-[0.3em]"
                  style={{ color: "var(--accent-2)", fontFamily: "var(--font-body)" }}
                >
                  BY&nbsp;VSG
                </span>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 text-[12px]" style={{ fontFamily: "var(--font-body)" }}>
              {(Object.keys(SECTION_LABELS) as NavItem["section"][]).map((section) => {
                const items = NAV.filter((n) => n.section === section);
                return (
                  <div key={section} className="px-3 mb-3">
                    <div
                      className="px-2 pt-2 pb-1.5 text-[9px] uppercase tracking-[0.2em]"
                      style={{ color: "var(--muted-2)" }}
                    >
                      {SECTION_LABELS[section]}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.id;
                        const isReal = !!item.viewKey;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => onNavClick(item)}
                            className="group flex items-center gap-2 px-2 py-1.5 rounded-md transition-all text-left cursor-pointer"
                            style={
                              isActive
                                ? {
                                    background:
                                      "color-mix(in oklab, var(--accent-2) 15%, transparent)",
                                    color: "var(--fg)",
                                    border:
                                      "1px solid color-mix(in oklab, var(--accent-2) 35%, var(--card-border))",
                                  }
                                : {
                                    color: isReal ? "var(--muted)" : "var(--muted-2)",
                                    border: "1px solid transparent",
                                  }
                            }
                            title={!isReal ? "Preview — click Dashboard / Work Queue / Receive" : undefined}
                          >
                            <Icon
                              className="w-3.5 h-3.5 shrink-0"
                              style={{
                                color: isActive ? "var(--accent-2)" : "currentColor",
                              }}
                              strokeWidth={1.8}
                            />
                            <span className="truncate">{item.label}</span>
                            {isReal && !isActive && (
                              <span
                                className="ml-auto text-[8px] px-1 py-0.5 rounded"
                                style={{
                                  color: "var(--accent-2)",
                                  background:
                                    "color-mix(in oklab, var(--accent-2) 10%, transparent)",
                                }}
                              >
                                try
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* User footer */}
            <div
              className="border-t px-3 py-3 flex items-center gap-2.5"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  background:
                    "linear-gradient(145deg, var(--accent-2), color-mix(in oklab, var(--accent) 80%, black))",
                  color: "var(--bg)",
                }}
              >
                SE
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-body)" }}
                >
                  Admin User
                </span>
                <span
                  className="text-[9px]"
                  style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
                >
                  Admin
                </span>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex flex-col min-h-[600px]">
            {/* Topbar */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 py-3 border-b"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div
                className="flex items-center gap-2 text-[11px]"
                style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Home</span>
                <span style={{ color: "var(--muted-2)" }}>›</span>
                <span style={{ color: "var(--fg)", fontWeight: 600 }}>{breadcrumb}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border text-[11px]"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--bg-elev)",
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search…</span>
                  <span
                    className="ml-4 px-1.5 py-0.5 rounded border text-[9px] font-mono"
                    style={{ borderColor: "var(--card-border)" }}
                  >
                    ⌘K
                  </span>
                </div>
                <button
                  type="button"
                  className="w-8 h-8 rounded-md border flex items-center justify-center"
                  style={{ borderColor: "var(--card-border)", color: "var(--muted)" }}
                  aria-label="Theme"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-md border flex items-center justify-center relative"
                  style={{ borderColor: "var(--card-border)", color: "var(--muted)" }}
                  aria-label="Notifications"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span
                    className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent-2)" }}
                  />
                </button>
              </div>
            </div>

            {/* View area */}
            <div className="flex-1 p-4 sm:p-6">
              <AnimatePresence mode="wait">
                {view === "dashboard" && <DashboardView key="dash" />}
                {view === "queue" && <QueueView key="queue" />}
                {view === "receive" && <ReceiveView key="receive" />}
                {view === "purchase" && <PurchaseView key="purchase" />}
                {view === "documents" && <DocumentsView key="documents" />}
                {view === "insights" && <InsightsView key="insights" />}
                {view === "ai-routing" && <AIRoutingView key="ai-routing" />}
                {view === "ask-history" && <AskHistoryView key="ask-history" />}
                {view === "reports" && <ReportsView key="reports" />}
                {view === "benchmarking" && <BenchmarkingView key="benchmarking" />}
                {view === "supplier-portal" && <SupplierPortalView key="supplier-portal" />}
                {view === "settings" && <SettingsView key="settings" />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Helper caption */}
      <div
        className="mt-4 text-center text-[11px] px-4"
        style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
      >
        Every sidebar link is live — Dashboard, Work Queue, Receive, Purchase,
        Documents, Insights, AI Routing, Ask History, Reports, Benchmarking,
        Supplier Portal and Settings (Users · Workflows · Automation). This is
        the real product shell, running on representative data.
      </div>
    </motion.div>
  );
};

/* ========================= DASHBOARD VIEW ========================= */

const DashboardView: React.FC = () => {
  const [tab, setTab] = useState<"my" | "manager" | "exec">("my");

  const kpis = [
    { label: "Assigned to Me", sub: "Active items in your queue", value: 7, icon: ClipboardList, tone: "accent" },
    { label: "Overdue", sub: "Past their due date", value: 2, icon: AlertTriangle, tone: "warn" },
    { label: "Resolved Today", sub: "Completed today", value: 11, icon: CheckCircle2, tone: "good" },
    { label: "Awaiting Approval", sub: "Pending your review", value: 3, icon: Clock, tone: "pending" },
  ];

  const activity = [
    { t: "12 min ago", who: "Vantage AI", what: "Proposed rule: auto-approve AP mismatches < R2k from top-10 suppliers", kind: "ai" },
    { t: "38 min ago", who: "Sandra M.", what: "Resolved invoice mismatch · Cape Chemical Supplies · PO-2026-0003", kind: "resolve" },
    { t: "1h ago", who: "System", what: "Escalated receiving shortfall · Supplier 422 · 2 days open", kind: "escalate" },
    { t: "2h ago", who: "Ethan B.", what: "Approved expense · R48,200 · out-of-policy exception cleared", kind: "approve" },
  ];

  const prompts = [
    "Which supplier is costing us the most?",
    "What items are overdue right now?",
    "How is the team performing?",
    "Give me an operational summary",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Tab switcher */}
      <div className="flex items-center gap-1 mb-5">
        {([
          { id: "my", label: "My View", icon: User },
          { id: "manager", label: "Manager", icon: BarChart3 },
          { id: "exec", label: "Executive", icon: LineChart },
        ] as const).map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer"
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(180deg, var(--bg-elev), color-mix(in oklab, var(--bg-elev) 60%, transparent))",
                      border:
                        "1px solid color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }
                  : {
                      border: "1px solid transparent",
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }
              }
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Greeting */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Good morning, Sandra
          </h3>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            Here&apos;s what&apos;s happening in your queue today
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-[11px] font-semibold"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--bg-elev)",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          const toneColor =
            k.tone === "warn"
              ? "#facc15"
              : k.tone === "good"
                ? "#22c55e"
                : k.tone === "pending"
                  ? "#fb923c"
                  : "var(--accent-2)";
          return (
            <motion.div
              key={k.label}
              whileHover={{ y: -2 }}
              className="relative rounded-xl border p-3.5 overflow-hidden themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
                >
                  {k.label}
                </div>
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${toneColor} 15%, transparent)`,
                    color: toneColor,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </div>
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
              >
                {k.value}
              </div>
              <div
                className="mt-0.5 text-[10px]"
                style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
              >
                {k.sub}
              </div>
              {/* sparkline */}
              <svg
                className="absolute bottom-0 right-0 w-16 h-8 opacity-50"
                viewBox="0 0 80 30"
                preserveAspectRatio="none"
              >
                <polyline
                  points={k.tone === "warn" ? "0,18 12,14 24,20 36,12 48,16 60,8 72,14 80,10" : "0,22 12,18 24,14 36,16 48,10 60,12 72,6 80,8"}
                  fill="none"
                  stroke={toneColor}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          );
        })}
      </div>

      {/* Activity + Ask Vantage */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-3">
        {/* Recent Activity */}
        <div
          className="rounded-xl border p-4 themed-rounded"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--card-bg)",
          }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            <LineChart className="w-3.5 h-3.5" /> Recent Activity
          </div>
          <ul className="space-y-2.5">
            {activity.map((a, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 text-[12px]"
              >
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background:
                      a.kind === "ai"
                        ? "var(--accent-2)"
                        : a.kind === "escalate"
                          ? "#facc15"
                          : a.kind === "approve"
                            ? "#22c55e"
                            : "#22c55e",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className="flex items-center justify-between gap-2"
                    style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
                  >
                    <span className="font-semibold" style={{ color: "var(--fg)" }}>
                      {a.who}
                    </span>
                    <span className="text-[10px] tabular-nums">{a.t}</span>
                  </div>
                  <div
                    className="mt-0.5 leading-snug truncate"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                  >
                    {a.what}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Ask Vantage */}
        <div
          className="relative rounded-xl border p-4 overflow-hidden themed-rounded"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 35%, var(--card-border))",
            background:
              "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg))",
          }}
        >
          <div
            className="pointer-events-none absolute -top-10 -right-10 w-[180px] h-[180px] rounded-full blur-[60px] opacity-50"
            style={{ background: "var(--accent-glow)" }}
          />
          <div className="relative flex items-center justify-between mb-3">
            <div
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-2)", fontFamily: "var(--font-body)" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask Vantage
            </div>
            <div
              className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-full"
              style={{
                background: "color-mix(in oklab, #22c55e 20%, transparent)",
                color: "#22c55e",
                fontFamily: "var(--font-body)",
              }}
            >
              <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              Live
            </div>
          </div>
          <div className="relative flex items-center justify-center py-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "color-mix(in oklab, var(--accent-2) 20%, transparent)",
                border: "1px solid color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "var(--accent-2)" }} strokeWidth={2} />
            </div>
          </div>
          <div
            className="relative text-center text-[11px] mb-2"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            <span className="font-semibold" style={{ color: "var(--fg)" }}>
              Ask anything about your operations
            </span>
            <br />
            Supplier analysis, overdue items, team performance, and more.
          </div>
          <div className="relative grid grid-cols-2 gap-1.5 mt-2">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                className="text-[10px] leading-snug text-left p-2 rounded-md border transition-colors cursor-pointer"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--bg-elev)",
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <div
            className="relative mt-3 flex items-center gap-2 rounded-md border px-3 py-2"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--bg)",
            }}
          >
            <span
              className="flex-1 text-[11px]"
              style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
            >
              Ask about your operations…
            </span>
            <button
              type="button"
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: "var(--accent-2)",
                color: "var(--bg)",
              }}
              aria-label="Send"
            >
              <Send className="w-3 h-3" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ========================= QUEUE VIEW ========================= */

const QueueView: React.FC = () => {
  const [filter, setFilter] = useState<"my" | "team" | "all">("my");

  const rows = [
    {
      id: "EX-2026-0147",
      type: "AP Exception",
      title: "Invoice-PO mismatch · Cape Chemical · R48,240",
      status: "In Review",
      statusColor: "#fb923c",
      owner: "Sandra M.",
      age: "2h",
    },
    {
      id: "EX-2026-0146",
      type: "Receiving Discrepancy",
      title: "Short-ship 12 units · Durban Packaging · PO-2026-0004",
      status: "Escalated",
      statusColor: "#facc15",
      owner: "Sandra M.",
      age: "5h",
    },
    {
      id: "EX-2026-0145",
      type: "Stuck Approval",
      title: "Expense R82k · past SLA · pending Finance Director",
      status: "Overdue",
      statusColor: "#f87171",
      owner: "Ethan B.",
      age: "1d",
    },
    {
      id: "EX-2026-0144",
      type: "QC Non-Conformance",
      title: "NCR · Line 3 · batch variance > 4%",
      status: "In Progress",
      statusColor: "var(--accent-2)",
      owner: "Sandra M.",
      age: "1d",
    },
    {
      id: "EX-2026-0143",
      type: "Customer Complaint",
      title: "Wrong SKU shipped · order 88231 · customer waiting",
      status: "In Review",
      statusColor: "#fb923c",
      owner: "Sandra M.",
      age: "2d",
    },
    {
      id: "EX-2026-0142",
      type: "Supplier Onboarding",
      title: "BEE cert expired · Bloem Agricultural · renewal required",
      status: "Waiting",
      statusColor: "var(--muted-2)",
      owner: "—",
      age: "3d",
    },
  ];

  const filtered =
    filter === "my"
      ? rows.filter((r) => r.owner === "Sandra M.")
      : filter === "team"
        ? rows.filter((r) => r.owner !== "—")
        : rows;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* View tabs */}
      <div className="flex items-center gap-1 mb-5">
        {([
          { id: "all", label: "All Items", icon: Inbox },
          { id: "approvals", label: "Approvals", icon: CheckCircle2 },
        ] as const).map((t, i) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold cursor-pointer"
              style={
                i === 0
                  ? {
                      background:
                        "linear-gradient(180deg, var(--bg-elev), color-mix(in oklab, var(--bg-elev) 60%, transparent))",
                      border:
                        "1px solid color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }
                  : {
                      border: "1px solid transparent",
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }
              }
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Title */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4" style={{ color: "var(--muted)" }} />
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            My Items
          </h3>
        </div>
        <p
          className="mt-1 text-[12px]"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          Items assigned to you and unclaimed work
        </p>
      </div>

      {/* Filter bar */}
      <div
        className="flex items-center gap-2 flex-wrap p-2 rounded-lg border mb-3"
        style={{ borderColor: "var(--card-border)", background: "var(--bg-elev)" }}
      >
        <div className="flex items-center gap-1">
          {([
            { id: "my", label: "My Items", icon: User },
            { id: "team", label: "Team", icon: Users },
            { id: "all", label: "All", icon: Inbox },
          ] as const).map((t) => {
            const Icon = t.icon;
            const isActive = filter === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer"
                style={
                  isActive
                    ? {
                        background: "var(--accent-2)",
                        color: "var(--bg)",
                        fontFamily: "var(--font-body)",
                      }
                    : {
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }
                }
              >
                <Icon className="w-3 h-3" strokeWidth={2} />
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="h-5 w-px" style={{ background: "var(--card-border)" }} />
        <FakeSelect label="All Statuses" />
        <FakeSelect label="All Workflows" />
        <button
          type="button"
          className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[11px]"
          style={{
            borderColor: "var(--card-border)",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          <SlidersHorizontal className="w-3 h-3" />
          Filters
        </button>
      </div>

      {/* Rows */}
      <div
        className="rounded-xl border overflow-hidden themed-rounded"
        style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
      >
        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <Inbox
              className="w-8 h-8 mx-auto mb-3 opacity-50"
              style={{ color: "var(--muted-2)" }}
            />
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
            >
              No items found
            </div>
            <div
              className="mt-1 text-[11px]"
              style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
            >
              Try adjusting your filters.
            </div>
          </div>
        ) : (
          <ul>
            {filtered.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 px-4 py-3 border-b cursor-pointer transition-colors"
                style={{
                  borderColor: "var(--card-border)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span
                  className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono"
                  style={{
                    background: "var(--bg-elev)",
                    color: "var(--muted-2)",
                  }}
                >
                  {r.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded"
                      style={{
                        background:
                          "color-mix(in oklab, var(--accent-2) 10%, transparent)",
                        color: "var(--accent-2)",
                      }}
                    >
                      {r.type}
                    </span>
                  </div>
                  <div
                    className="mt-1 text-[12px] truncate"
                    style={{ color: "var(--fg)" }}
                  >
                    {r.title}
                  </div>
                </div>
                <span
                  className="shrink-0 text-[10px] font-semibold px-2 py-1 rounded-md"
                  style={{
                    background: `color-mix(in oklab, ${r.statusColor} 18%, transparent)`,
                    color: r.statusColor,
                  }}
                >
                  {r.status}
                </span>
                <span
                  className="hidden sm:inline shrink-0 text-[10px] tabular-nums w-10 text-right"
                  style={{ color: "var(--muted-2)" }}
                >
                  {r.age}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

/* ========================= RECEIVE VIEW ========================= */

const ReceiveView: React.FC = () => {
  const kpis = [
    { label: "In Progress", value: 4, icon: Truck, color: "var(--accent-2)" },
    { label: "Pending", value: 0, icon: ClipboardList, color: "#facc15" },
    { label: "Complete", value: 3, icon: Package, color: "#22c55e" },
    { label: "Sync Failed", value: 0, icon: PackageX, color: "#f87171" },
  ];

  const rows = [
    { session: "RCV-2026-0007", po: "PO-2026-0005", supplier: "Bloem Agricultural Supplies", lines: 3, status: "Draft", grv: "—", created: "11 days ago" },
    { session: "RCV-2026-0006", po: "PO-2026-0005", supplier: "Bloem Agricultural Supplies", lines: 3, status: "Draft", grv: "—", created: "11 days ago" },
    { session: "RCV-2026-0005", po: "PO-2026-0004", supplier: "Durban Packaging Co", lines: 3, status: "Draft", grv: "—", created: "11 days ago" },
    { session: "RCV-2026-0004", po: "PO-2026-0003", supplier: "Cape Chemical Supplies", lines: 3, status: "Complete", grv: "GRV-MOCK-0101", created: "11 days ago" },
    { session: "RCV-2026-0003", po: "PO-2026-0003", supplier: "Cape Chemical Supplies", lines: 3, status: "Draft", grv: "—", created: "11 days ago" },
    { session: "RCV-2026-0002", po: "PO-2026-0003", supplier: "Cape Chemical Supplies", lines: 3, status: "Complete", grv: "GRV-MOCK-0101", created: "15 days ago" },
    { session: "RCV-2026-0001", po: "PO-2026-0001", supplier: "Pretoria Office Solutions", lines: 2, status: "Complete", grv: "GRV-MOCK-0101", created: "15 days ago" },
  ];

  const statusColor = (s: string) =>
    s === "Complete" ? "#22c55e" : s === "Draft" ? "var(--muted-2)" : "#facc15";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Title */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Vantage Receive
          </h3>
          <p
            className="mt-1 text-[12px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            GRV capture screen — receive goods against purchase orders
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
            color: "#ffffff",
            boxShadow: "0 0 16px var(--accent-glow)",
            fontFamily: "var(--font-body)",
          }}
        >
          + New Receive Session
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${k.color} 15%, transparent)`,
                    color: k.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </div>
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
              >
                {k.value}
              </div>
              <div
                className="mt-0.5 text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
              >
                {k.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div
        className="rounded-xl border overflow-hidden themed-rounded"
        style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="text-[9px] uppercase tracking-[0.2em]"
                style={{
                  color: "var(--muted-2)",
                  background: "var(--bg-elev)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <th className="text-left px-4 py-2.5">Session</th>
                <th className="text-left px-4 py-2.5">PO Number</th>
                <th className="text-left px-4 py-2.5">Supplier</th>
                <th className="text-right px-4 py-2.5">Lines</th>
                <th className="text-left px-4 py-2.5">Status</th>
                <th className="text-left px-4 py-2.5 hidden md:table-cell">ERP GRV</th>
                <th className="text-right px-4 py-2.5">Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.session}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t cursor-pointer"
                  style={{
                    borderColor: "var(--card-border)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <td
                    className="px-4 py-2.5 text-[11px] font-mono"
                    style={{ color: "var(--fg)" }}
                  >
                    {r.session}
                  </td>
                  <td
                    className="px-4 py-2.5 text-[11px] font-mono"
                    style={{ color: "var(--muted)" }}
                  >
                    {r.po}
                  </td>
                  <td
                    className="px-4 py-2.5 text-[11px]"
                    style={{ color: "var(--fg)" }}
                  >
                    {r.supplier}
                  </td>
                  <td
                    className="px-4 py-2.5 text-[11px] text-right tabular-nums"
                    style={{ color: "var(--fg)" }}
                  >
                    {r.lines}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold"
                      style={{
                        background: `color-mix(in oklab, ${statusColor(r.status)} 18%, transparent)`,
                        color: statusColor(r.status),
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td
                    className="px-4 py-2.5 text-[11px] font-mono hidden md:table-cell"
                    style={{ color: r.grv === "—" ? "var(--muted-2)" : "var(--muted)" }}
                  >
                    {r.grv}
                  </td>
                  <td
                    className="px-4 py-2.5 text-[10px] text-right tabular-nums"
                    style={{ color: "var(--muted-2)" }}
                  >
                    {r.created}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

/* ========================= HELPERS ========================= */

const FakeSelect: React.FC<{ label: string }> = ({ label }) => (
  <div
    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[11px]"
    style={{
      borderColor: "var(--card-border)",
      background: "var(--bg)",
      color: "var(--muted)",
      fontFamily: "var(--font-body)",
    }}
  >
    <span>{label}</span>
    <ChevronDown className="w-3 h-3" style={{ color: "var(--muted-2)" }} />
  </div>
);

/* ========================= PURCHASE VIEW ========================= */

const PurchaseView: React.FC = () => {
  const kpis = [
    { label: "Drafts", value: 3, icon: FileText, color: "var(--accent-2)" },
    { label: "In Progress", value: 1, icon: Clock, color: "#facc15" },
    { label: "Complete", value: 0, icon: CheckCircle2, color: "#22c55e" },
    { label: "Total Value", value: "R 66 250", icon: DollarSign, color: "var(--accent-2)", isString: true },
  ];

  const rows = [
    { id: "PUR-2026-0005", supplier: "Steelworks SA (Pty) Ltd", lines: 1, total: "ZAR 30,000.00", status: "Rejected", erp: "—", created: "6 days ago" },
    { id: "PUR-2026-0004", supplier: "Steelworks SA (Pty) Ltd", lines: 1, total: "ZAR 30,000.00", status: "PendingApproval", erp: "—", created: "6 days ago" },
    { id: "PUR-2026-0003", supplier: "Cape Chemical Supplies", lines: 0, total: "ZAR 0.00", status: "Draft", erp: "—", created: "11 days ago" },
    { id: "PUR-2026-0002", supplier: "Cape Chemical Supplies", lines: 0, total: "ZAR 0.00", status: "Draft", erp: "—", created: "11 days ago" },
    { id: "PUR-2026-0001", supplier: "SUP-002", lines: 1, total: "ZAR 6,250.00", status: "Draft", erp: "—", created: "15 days ago" },
  ];

  const statusColor = (s: string) =>
    s === "Rejected"
      ? "#f87171"
      : s === "PendingApproval"
        ? "#facc15"
        : s === "Complete"
          ? "#22c55e"
          : "var(--muted-2)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Title */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Vantage Purchase
          </h3>
          <p
            className="mt-1 text-[12px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            Procurement capture screen — create, approve, and sync purchase orders
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
            color: "#ffffff",
            boxShadow: "0 0 16px var(--accent-glow)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.2} />
          New Purchase Request
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${k.color} 15%, transparent)`,
                    color: k.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </div>
              </div>
              <div
                className={`mt-2 font-bold tabular-nums ${k.isString ? "text-xl" : "text-2xl"}`}
                style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
              >
                {k.value}
              </div>
              <div
                className="mt-0.5 text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
              >
                {k.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div
        className="rounded-xl border overflow-hidden themed-rounded"
        style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="text-[9px] uppercase tracking-[0.2em]"
                style={{
                  color: "var(--muted-2)",
                  background: "var(--bg-elev)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <th className="text-left px-4 py-2.5">Request #</th>
                <th className="text-left px-4 py-2.5">Supplier</th>
                <th className="text-right px-4 py-2.5">Lines</th>
                <th className="text-right px-4 py-2.5">Total</th>
                <th className="text-left px-4 py-2.5">Status</th>
                <th className="text-left px-4 py-2.5 hidden md:table-cell">ERP PO</th>
                <th className="text-right px-4 py-2.5">Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t cursor-pointer"
                  style={{
                    borderColor: "var(--card-border)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: "var(--fg)" }}>
                    {r.id}
                  </td>
                  <td className="px-4 py-2.5 text-[11px]" style={{ color: "var(--fg)" }}>
                    {r.supplier}
                  </td>
                  <td className="px-4 py-2.5 text-[11px] text-right tabular-nums" style={{ color: "var(--fg)" }}>
                    {r.lines}
                  </td>
                  <td className="px-4 py-2.5 text-[11px] text-right tabular-nums font-mono" style={{ color: "var(--fg)" }}>
                    {r.total}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold"
                      style={{
                        background: `color-mix(in oklab, ${statusColor(r.status)} 18%, transparent)`,
                        color: statusColor(r.status),
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td
                    className="px-4 py-2.5 text-[11px] font-mono hidden md:table-cell"
                    style={{ color: "var(--muted-2)" }}
                  >
                    {r.erp}
                  </td>
                  <td
                    className="px-4 py-2.5 text-[10px] text-right tabular-nums"
                    style={{ color: "var(--muted-2)" }}
                  >
                    {r.created}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

/* ========================= DOCUMENTS VIEW ========================= */

const DocumentsView: React.FC = () => {
  const [tab, setTab] = useState<"review" | "all">("review");

  const kpis = [
    { label: "Total Documents", value: "0", icon: FileText, color: "var(--accent-2)" },
    { label: "Needs Review", value: "0", icon: Eye, color: "#facc15" },
    { label: "Confirmed", value: "0", icon: CheckCircle2, color: "#22c55e" },
    { label: "Avg Confidence", value: "0%", icon: Gauge, color: "var(--accent-2)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Title */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Document Intelligence
          </h3>
          <p
            className="mt-1 text-[12px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            AI-powered document extraction, classification, and review
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
            color: "#ffffff",
            boxShadow: "0 0 16px var(--accent-glow)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Upload className="w-3.5 h-3.5" strokeWidth={2.2} />
          Upload Document
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${k.color} 15%, transparent)`,
                    color: k.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </div>
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
              >
                {k.value}
              </div>
              <div
                className="mt-0.5 text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
              >
                {k.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-3">
        {([
          { id: "review", label: "Review Queue (0)" },
          { id: "all", label: "All Documents" },
        ] as const).map((t) => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer"
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(180deg, var(--bg-elev), color-mix(in oklab, var(--bg-elev) 60%, transparent))",
                      border:
                        "1px solid color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }
                  : {
                      border: "1px solid transparent",
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      <div
        className="rounded-xl border py-16 px-6 flex flex-col items-center justify-center themed-rounded"
        style={{
          borderColor: "var(--card-border)",
          background: "var(--card-bg)",
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{
            background: "color-mix(in oklab, var(--accent-2) 12%, transparent)",
            border: "1px solid color-mix(in oklab, var(--accent-2) 30%, var(--card-border))",
          }}
        >
          <CheckCircle2
            className="w-6 h-6"
            strokeWidth={1.8}
            style={{ color: "var(--accent-2)" }}
          />
        </div>
        <div
          className="text-base font-semibold"
          style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
        >
          Review queue is clear
        </div>
        <div
          className="mt-1 text-[12px] text-center max-w-sm"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          All extractions have been reviewed or are high-confidence.
        </div>
      </div>
    </motion.div>
  );
};

/* ========================= INSIGHTS (PREDICTIVE OPS) VIEW ========================= */

const InsightsView: React.FC = () => {
  const [topTab, setTopTab] = useState<"predictions" | "performance">("predictions");
  const [subTab, setSubTab] = useState<"volume" | "workload" | "readiness">("volume");

  const kpis = [
    {
      label: "Readiness Score",
      value: "20",
      trend: "down",
      icon: Gauge,
      color: "var(--accent-2)",
    },
    { label: "Critical Risk Items", value: "0", icon: AlertTriangle, color: "#f87171" },
    { label: "High Risk Items", value: "0", icon: Shield, color: "#fb923c" },
    { label: "Avg SLA Breach Risk", value: "—", icon: TrendingUp, color: "var(--accent-2)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top tabs */}
      <div className="flex items-center gap-1 mb-5">
        {([
          { id: "predictions", label: "Predictions", icon: Activity },
          { id: "performance", label: "AI Performance", icon: Brain },
        ] as const).map((t) => {
          const Icon = t.icon;
          const isActive = topTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTopTab(t.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer"
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(180deg, var(--bg-elev), color-mix(in oklab, var(--bg-elev) 60%, transparent))",
                      border:
                        "1px solid color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }
                  : {
                      border: "1px solid transparent",
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }
              }
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Title */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Predictive Operations
          </h3>
          <p
            className="mt-1 text-[12px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            AI-powered forecasting, risk scoring, and scenario modelling
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-[11px] font-semibold"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--bg-elev)",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Activity className="w-3.5 h-3.5" strokeWidth={1.8} />
          Run Scenario
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${k.color} 15%, transparent)`,
                    color: k.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </div>
                {k.trend === "down" && (
                  <TrendingDown
                    className="w-3.5 h-3.5"
                    style={{ color: "#f87171" }}
                    strokeWidth={2}
                  />
                )}
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
              >
                {k.value}
              </div>
              <div
                className="mt-0.5 text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
              >
                {k.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub tabs */}
      <div className="flex items-center gap-1 mb-3">
        {([
          { id: "volume", label: "Volume Forecast" },
          { id: "workload", label: "Team Workload" },
          { id: "readiness", label: "Readiness" },
        ] as const).map((t) => {
          const isActive = subTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSubTab(t.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer"
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(180deg, var(--bg-elev), color-mix(in oklab, var(--bg-elev) 60%, transparent))",
                      border:
                        "1px solid color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }
                  : {
                      border: "1px solid transparent",
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Chart panel */}
      <div
        className="rounded-xl border p-5 themed-rounded"
        style={{
          borderColor: "var(--card-border)",
          background: "var(--card-bg)",
        }}
      >
        <div
          className="text-[12px] font-semibold mb-4"
          style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
        >
          {subTab === "volume"
            ? "30-Day Volume Forecast"
            : subTab === "workload"
              ? "Team Workload Distribution"
              : "SLA Readiness by Workflow"}
        </div>
        <div
          className="relative h-48 flex items-end justify-center"
          style={{ color: "var(--muted-2)" }}
        >
          {/* Chart skeleton */}
          <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="vp-forecast" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* baseline grid */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                x2="400"
                y1={40 + i * 30}
                y2={40 + i * 30}
                stroke="var(--card-border)"
                strokeDasharray="2 4"
              />
            ))}
            {/* area */}
            <path
              d="M0,120 L20,110 L40,100 L60,95 L80,90 L100,85 L120,75 L140,70 L160,65 L180,55 L200,60 L220,50 L240,45 L260,40 L280,35 L300,30 L320,45 L340,35 L360,30 L380,25 L400,20 L400,160 L0,160 Z"
              fill="url(#vp-forecast)"
            />
            {/* line */}
            <path
              d="M0,120 L20,110 L40,100 L60,95 L80,90 L100,85 L120,75 L140,70 L160,65 L180,55 L200,60 L220,50 L240,45 L260,40 L280,35 L300,30 L320,45 L340,35 L360,30 L380,25 L400,20"
              fill="none"
              stroke="var(--accent-2)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          className="mt-3 flex items-center justify-between text-[10px]"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          <span>Today</span>
          <span>+7 days</span>
          <span>+14 days</span>
          <span>+21 days</span>
          <span>+30 days</span>
        </div>
        <div
          className="mt-4 pt-4 border-t text-[11px] leading-relaxed"
          style={{
            borderColor: "var(--card-border)",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          <span className="inline-flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-2)" }}
            />
            <strong style={{ color: "var(--fg)" }}>
              Forecast trend:
            </strong>{" "}
            <span>
              Exception volume expected to rise ~34% over the next 30 days —
              driven by month-end AP and supplier renewal cycle.
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ========================= AI ROUTING VIEW ========================= */

type AIReco = {
  id: string;
  title: string;
  owner: string;
  metric: string;
  status: "Approved" | "Pending" | "Rejected";
  icon: LucideIcon;
  iconTone: "star" | "down" | "warn";
  detail: string;
  recommendation: string;
  date: string;
  category: string;
  review?: string;
};

const AIRoutingView: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "Pending" | "Approved" | "Rejected">("all");

  const kpis = [
    { label: "Pending Recommendations", value: "3", icon: Lightbulb },
    { label: "Total Insights Generated", value: "4", icon: Brain },
    { label: "Approved", value: "1", icon: CheckCircle2 },
    { label: "Rejected", value: "0", icon: X },
  ];

  const recos: AIReco[] = [
    {
      id: "r1",
      title: "Fatima Patel specialises in new supplier onboarding",
      owner: "Fatima Patel",
      metric: "4.1 hrs avg · 100% success · 15 items",
      status: "Approved",
      icon: Star,
      iconTone: "star",
      detail:
        "Fatima Patel (Senior Buyer) resolves new_supplier items in 4.1 hours on average with a 100% success rate (15 items, 0 escalations). This is 3.5x faster than any other handler. Her supplier relationship expertise makes her the natural specialist.",
      recommendation:
        "Route all new_supplier classifications to Fatima Patel. Her specialisation significantly reduces cycle time and escalation risk.",
      date: "4/9/2026",
      category: "Procurement",
      review: `Reviewed by Admin User: "Agreed — Fatima is our supplier onboarding expert."`,
    },
    {
      id: "r2",
      title: "Thabo struggling with quality issue items",
      owner: "Thabo Molefe",
      metric: "22.1 hrs avg · 40% success · 5 items",
      status: "Pending",
      icon: TrendingDown,
      iconTone: "down",
      detail:
        "Thabo Molefe averages 22.1 hours on quality_issue items with a 40% success rate (3 escalations out of 5 items). Quality issues require inspection expertise that differs from his strength in quantity/shortage handling.",
      recommendation:
        "Route quality_issue items to Zanele (100% success on damage inspections) or escalate directly to Fatima for supplier quality disputes. Thabo's strength is short deliveries and damaged goods documentation.",
      date: "4/9/2026",
      category: "Receiving",
    },
    {
      id: "r3",
      title: "Lerato Mokoena takes 3x longer on budget exceptions",
      owner: "Lerato Mokoena",
      metric: "18.3 hrs avg · 60% success · 10 items",
      status: "Pending",
      icon: TrendingDown,
      iconTone: "down",
      detail:
        "Lerato Mokoena (AP Clerk) averages 18.3 hours to resolve budget_exceeded items, compared to Fatima Patel's 6.2 hours. Lerato has escalated 4 out of 10 items (40%). Budget exceptions require procurement knowledge that Lerato lacks as an AP clerk.",
      recommendation:
        "Route budget exception items to Fatima Patel (Senior Buyer), who resolves them in 6.2 hours with 91.7% success rate. Lerato should focus on invoice matching and duplicate detection where she excels.",
      date: "4/9/2026",
      category: "Procurement",
    },
    {
      id: "r4",
      title: "Thabo handles most receiving items with limited backup",
      owner: "Thabo Molefe",
      metric: "22 short-delivery items · single-point-of-failure",
      status: "Pending",
      icon: AlertTriangle,
      iconTone: "warn",
      detail:
        "Thabo Molefe (Warehouse Supervisor) has handled 22 short_delivery items while Sipho and Zanele average 6 each. Although Thabo is excellent (95.5% success), the single-point-of-failure risk is significant if he's unavailable.",
      recommendation:
        "Cross-train Sipho on short_delivery handling using Thabo's closed items as training examples. Target a 40/30/30 split across Thabo, Sipho, Zanele.",
      date: "4/9/2026",
      category: "Receiving",
    },
  ];

  const filtered =
    filter === "all" ? recos : recos.filter((r) => r.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Title */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "color-mix(in oklab, var(--accent-2) 18%, transparent)",
              border: "1px solid color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
            }}
          >
            <Brain className="w-4 h-4" style={{ color: "var(--accent-2)" }} strokeWidth={1.9} />
          </div>
          <div>
            <h3
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
            >
              AI Routing Insights
            </h3>
            <p
              className="mt-1 text-[12px] max-w-2xl"
              style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
            >
              Vantage AI monitors team performance and suggests routing
              improvements. Review and approve recommendations before they take
              effect.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-[11px] font-semibold"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--bg-elev)",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.8} />
          Recalculate
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
                >
                  {k.label}
                </div>
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{
                    background:
                      "color-mix(in oklab, var(--accent-2) 14%, transparent)",
                    color: "var(--accent-2)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </div>
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
              >
                {k.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations header + filter */}
      <div
        className="rounded-xl border overflow-hidden themed-rounded"
        style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
      >
        <div
          className="flex items-center justify-between gap-3 flex-wrap px-4 py-3 border-b"
          style={{ borderColor: "var(--card-border)" }}
        >
          <div
            className="flex items-center gap-2 text-[12px] font-semibold"
            style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
          >
            <Lightbulb className="w-4 h-4" style={{ color: "var(--accent-2)" }} strokeWidth={1.8} />
            AI Recommendations
          </div>
          <div className="flex items-center gap-1">
            {(["all", "Pending", "Approved", "Rejected"] as const).map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer"
                  style={
                    isActive
                      ? {
                          background: "var(--accent-2)",
                          color: "var(--bg)",
                          fontFamily: "var(--font-body)",
                        }
                      : {
                          color: "var(--muted)",
                          fontFamily: "var(--font-body)",
                        }
                  }
                >
                  {f === "all" ? "All" : f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommendation list */}
        <ul>
          {filtered.map((r, i) => {
            const Icon = r.icon;
            const iconColor =
              r.iconTone === "star"
                ? "#facc15"
                : r.iconTone === "down"
                  ? "#f87171"
                  : "#fb923c";
            const statusColor =
              r.status === "Approved"
                ? "#22c55e"
                : r.status === "Rejected"
                  ? "#f87171"
                  : "var(--accent-2)";
            return (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-4 border-b last:border-b-0"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: `color-mix(in oklab, ${iconColor} 14%, transparent)`,
                      color: iconColor,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.9} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[12px] font-semibold"
                        style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                      >
                        {r.title}
                      </span>
                      <span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold"
                        style={{
                          background: `color-mix(in oklab, ${statusColor} 18%, transparent)`,
                          color: statusColor,
                        }}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p
                      className="mt-1.5 text-[11px] leading-relaxed"
                      style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                    >
                      {r.detail}
                    </p>
                    <div
                      className="mt-2.5 rounded-md p-2.5 text-[11px] leading-relaxed flex items-start gap-2"
                      style={{
                        background:
                          "color-mix(in oklab, var(--accent-2) 10%, transparent)",
                        border:
                          "1px solid color-mix(in oklab, var(--accent-2) 28%, var(--card-border))",
                      }}
                    >
                      <Lightbulb
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: "var(--accent-2)" }}
                        strokeWidth={2}
                      />
                      <span
                        style={{
                          color: "var(--accent-2)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                        }}
                      >
                        {r.recommendation}
                      </span>
                    </div>
                    <div
                      className="mt-2 flex items-center gap-3 text-[10px]"
                      style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {r.date}
                      </span>
                      <span>·</span>
                      <span>{r.category}</span>
                      {r.review && (
                        <>
                          <span>·</span>
                          <span className="italic truncate">{r.review}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {r.status === "Pending" && (
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-semibold border cursor-pointer"
                        style={{
                          borderColor:
                            "color-mix(in oklab, #f87171 40%, var(--card-border))",
                          background:
                            "color-mix(in oklab, #f87171 10%, transparent)",
                          color: "#f87171",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <X className="w-3 h-3" strokeWidth={2.4} />
                        Reject
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-semibold cursor-pointer"
                        style={{
                          background: "var(--accent-2)",
                          color: "var(--bg)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <Check className="w-3 h-3" strokeWidth={2.4} />
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

/* ========================= ASK HISTORY VIEW ========================= */

const AskHistoryView: React.FC = () => {
  const queries: {
    q: string;
    t: string;
    who: string;
    kind: "READ" | "WRITE";
    detail: string;
  }[] = [
    {
      q: "Which supplier is costing us the most this quarter?",
      t: "2 min ago",
      who: "Sandra M.",
      kind: "READ",
      detail:
        "Returned 4 suppliers ranked by exception cost — Cape Chemical R142k, Steelworks SA R98k, Durban Packaging R64k, Bloem Agricultural R41k.",
    },
    {
      q: "Reassign every overdue AP item from David to Fatima",
      t: "14 min ago",
      who: "Ethan B.",
      kind: "WRITE",
      detail:
        "Proposed change — 7 items. Held for approval. Approved 13:42, executed, audit entry #AU-20894.",
    },
    {
      q: "How is the AP team performing vs last month?",
      t: "48 min ago",
      who: "Sandra M.",
      kind: "READ",
      detail:
        "Resolution time down 22%, SLA adherence 94% (up 6pp), backlog steady at 23 open items.",
    },
    {
      q: "Pause notifications on the Receiving workflow until Monday",
      t: "1h ago",
      who: "Thabo M.",
      kind: "WRITE",
      detail:
        "Proposed rule change. Approved by Nomsa K. 12:08, active until 2026-04-27 00:00.",
    },
    {
      q: "What items breached SLA yesterday and why?",
      t: "3h ago",
      who: "Lerato M.",
      kind: "READ",
      detail:
        "3 breaches — 2 awaiting supplier response > 72h, 1 pending director approval > 48h.",
    },
    {
      q: "Give me an operational summary for this week",
      t: "5h ago",
      who: "Admin User",
      kind: "READ",
      detail:
        "142 items resolved, avg 6.4h cycle time, 94% SLA, 3 AI-proposed rules pending review.",
    },
    {
      q: "Auto-approve AP mismatches under R2k from top-10 suppliers",
      t: "Yesterday",
      who: "Admin User",
      kind: "WRITE",
      detail:
        "AI-proposed rule accepted. Scope 11 suppliers. Est. 60 items/mo auto-cleared. Revertible.",
    },
    {
      q: "Which workflows have the highest breach rate?",
      t: "Yesterday",
      who: "Sandra M.",
      kind: "READ",
      detail:
        "AP Exceptions 8.2%, Supplier Onboarding 6.4%, QC Non-conformance 4.1%, others under 3%.",
    },
  ];

  const kpis = [
    { label: "Queries (24h)", value: "47", icon: History, tone: "accent" },
    { label: "Reads", value: "38", icon: Eye, tone: "good" },
    { label: "Writes approved", value: "6", icon: Pencil, tone: "pending" },
    { label: "Writes rejected", value: "3", icon: X, tone: "warn" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            <History
              className="w-6 h-6"
              style={{ color: "var(--accent-2)" }}
              strokeWidth={2}
            />
            Ask Vantage — Query Log
          </h3>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            Every natural-language question and write-action, with the reply,
            the actor and the audit entry. Reads are free. Writes need approval.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-[11px] font-semibold cursor-pointer"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--bg-elev)",
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold cursor-pointer"
            style={{
              background: "var(--accent-2)",
              color: "var(--bg)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Send className="w-3.5 h-3.5" /> New query
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          const toneColor =
            k.tone === "warn"
              ? "#f87171"
              : k.tone === "good"
                ? "#22c55e"
                : k.tone === "pending"
                  ? "#fb923c"
                  : "var(--accent-2)";
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {k.label}
                </span>
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${toneColor} 15%, transparent)`,
                    color: toneColor,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </span>
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg)",
                }}
              >
                {k.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div
          className="flex items-center justify-between mb-3 text-[11px]"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          <span className="uppercase tracking-[0.2em]">Recent queries</span>
          <span>{queries.length} shown · last 24h</span>
        </div>
        <ul className="flex flex-col gap-2.5">
          {queries.map((q, i) => {
            const isWrite = q.kind === "WRITE";
            const badgeColor = isWrite ? "#fb923c" : "#22c55e";
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-xl border p-3.5 themed-rounded"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--card-bg)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background:
                        "color-mix(in oklab, var(--accent-2) 12%, transparent)",
                      color: "var(--accent-2)",
                    }}
                  >
                    {isWrite ? (
                      <Database className="w-3.5 h-3.5" strokeWidth={2} />
                    ) : (
                      <Search className="w-3.5 h-3.5" strokeWidth={2} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-[0.1em]"
                        style={{
                          background: `color-mix(in oklab, ${badgeColor} 18%, transparent)`,
                          color: badgeColor,
                        }}
                      >
                        {q.kind}
                      </span>
                      <span
                        className="text-[12px] font-semibold"
                        style={{
                          color: "var(--fg)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        &ldquo;{q.q}&rdquo;
                      </span>
                    </div>
                    <p
                      className="mt-1.5 text-[11px] leading-relaxed"
                      style={{
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {q.detail}
                    </p>
                    <div
                      className="mt-2 flex items-center gap-3 text-[10px]"
                      style={{
                        color: "var(--muted-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {q.t}
                      </span>
                      <span>·</span>
                      <span>{q.who}</span>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

/* ========================= REPORTS VIEW ========================= */

const ReportsView: React.FC = () => {
  const [subTab, setSubTab] = useState<"build" | "schedule" | "history">(
    "build"
  );
  const [range, setRange] = useState<"7d" | "30d" | "90d" | "ytd">("30d");
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [metrics, setMetrics] = useState<string[]>([
    "Total Items",
    "Resolved Items",
    "Overdue Items",
    "Avg Resolution Time (hrs)",
  ]);

  const ALL_METRICS = [
    "Total Items",
    "Resolved Items",
    "Overdue Items",
    "Avg Resolution Time (hrs)",
    "SLA Breach Rate %",
    "Exception Rate %",
    "Top Suppliers by Volume",
    "Items by Workflow Type",
  ];

  const toggleMetric = (m: string) =>
    setMetrics((cur) =>
      cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]
    );

  const BARS = [
    { d: "Mon", v: 12 },
    { d: "Tue", v: 18 },
    { d: "Wed", v: 7 },
    { d: "Thu", v: 24 },
    { d: "Fri", v: 15 },
    { d: "Sat", v: 6 },
    { d: "Sun", v: 3 },
  ];
  const maxBar = Math.max(...BARS.map((b) => b.v));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            <BarChart3
              className="w-6 h-6"
              style={{ color: "var(--accent-2)" }}
              strokeWidth={2}
            />
            Report Builder
          </h3>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            Compose a report from any metric, filter and window. Save it,
            schedule it, or export once.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold cursor-pointer"
          style={{
            background: "var(--accent-2)",
            color: "var(--bg)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Plus className="w-3.5 h-3.5" /> New report
        </button>
      </div>

      <div className="flex items-center gap-1 mb-5">
        {(
          [
            { id: "build", label: "Build" },
            { id: "schedule", label: "Schedule" },
            { id: "history", label: "History" },
          ] as const
        ).map((t) => {
          const isActive = subTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSubTab(t.id)}
              className="px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer"
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(180deg, var(--bg-elev), color-mix(in oklab, var(--bg-elev) 60%, transparent))",
                      border:
                        "1px solid color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }
                  : {
                      border: "1px solid transparent",
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
        <div className="flex flex-col gap-4">
          <div
            className="rounded-xl border p-4 themed-rounded"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
            }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.2em] mb-2"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Templates
            </div>
            {[
              "Weekly AP summary",
              "SLA breach report",
              "Top exception sources",
              "Supplier scorecard",
            ].map((t) => (
              <button
                key={t}
                type="button"
                className="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-[11px] text-left cursor-pointer"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span className="truncate">{t}</span>
                <ArrowRight
                  className="w-3 h-3 shrink-0"
                  style={{ color: "var(--muted-2)" }}
                />
              </button>
            ))}
          </div>

          <div
            className="rounded-xl border p-4 themed-rounded"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
            }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.2em] mb-2.5 flex items-center gap-1.5"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              <SlidersHorizontal className="w-3 h-3" /> Metrics
            </div>
            <div className="flex flex-col gap-1.5">
              {ALL_METRICS.map((m) => {
                const on = metrics.includes(m);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleMetric(m)}
                    className="flex items-center gap-2 text-[11px] cursor-pointer text-left"
                    style={{
                      color: on ? "var(--fg)" : "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                      style={{
                        background: on ? "var(--accent-2)" : "transparent",
                        border: `1px solid ${on ? "var(--accent-2)" : "var(--card-border)"}`,
                      }}
                    >
                      {on && (
                        <Check
                          className="w-2.5 h-2.5"
                          style={{ color: "var(--bg)" }}
                          strokeWidth={3}
                        />
                      )}
                    </span>
                    <span>{m}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-xl border p-4 themed-rounded"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
            }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.2em] mb-2.5 flex items-center gap-1.5"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              <Filter className="w-3 h-3" /> Filters
            </div>
            <div
              className="text-[10px] mb-1.5"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Date range
            </div>
            <div className="flex gap-1 flex-wrap mb-3">
              {(["7d", "30d", "90d", "ytd"] as const).map((r) => {
                const on = range === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRange(r)}
                    className="px-2 py-1 rounded text-[10px] font-semibold cursor-pointer uppercase"
                    style={{
                      background: on
                        ? "color-mix(in oklab, var(--accent-2) 15%, transparent)"
                        : "var(--bg-elev)",
                      border: `1px solid ${on ? "var(--accent-2)" : "var(--card-border)"}`,
                      color: on ? "var(--accent-2)" : "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
            <div
              className="text-[10px] mb-1.5"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Chart type
            </div>
            <div className="flex gap-1">
              {(
                [
                  { id: "bar", label: "Bar", icon: BarChart3 },
                  { id: "line", label: "Line", icon: LineChart },
                  { id: "pie", label: "Pie", icon: PieChart },
                ] as const
              ).map((c) => {
                const Icon = c.icon;
                const on = chartType === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setChartType(c.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold cursor-pointer"
                    style={{
                      background: on
                        ? "color-mix(in oklab, var(--accent-2) 15%, transparent)"
                        : "var(--bg-elev)",
                      border: `1px solid ${on ? "var(--accent-2)" : "var(--card-border)"}`,
                      color: on ? "var(--accent-2)" : "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <Icon className="w-3 h-3" /> {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="rounded-xl border p-4 sm:p-5 themed-rounded"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--card-bg)",
          }}
        >
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Preview · last {range.toUpperCase()}
              </div>
              <div
                className="text-base font-semibold"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Resolved items / day · {metrics.length} metric
                {metrics.length === 1 ? "" : "s"}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[10px] font-semibold cursor-pointer"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--bg-elev)",
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Calendar className="w-3 h-3" /> Schedule
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[10px] font-semibold cursor-pointer"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--bg-elev)",
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Download className="w-3 h-3" /> Export
              </button>
            </div>
          </div>

          <div
            className="rounded-lg p-4"
            style={{
              background: "var(--bg-elev)",
              border: "1px solid var(--card-border)",
            }}
          >
            <div className="flex items-end justify-between gap-3 h-40">
              {BARS.map((b) => {
                const h = (b.v / maxBar) * 100;
                return (
                  <div
                    key={b.d}
                    className="flex-1 flex flex-col items-center gap-1.5"
                  >
                    <div
                      className="text-[9px] tabular-nums"
                      style={{
                        color: "var(--muted-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {b.v}
                    </div>
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${h}%`,
                        minHeight: 4,
                        background:
                          "linear-gradient(180deg, var(--accent-2), color-mix(in oklab, var(--accent-2) 40%, transparent))",
                      }}
                    />
                    <div
                      className="text-[9px]"
                      style={{
                        color: "var(--muted-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {b.d}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <div
              className="text-[10px] uppercase tracking-[0.2em] mb-2"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Summary · {metrics.length} metric selected
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {metrics.slice(0, 4).map((m, i) => {
                const values = ["142", "119", "23", "6.4"];
                const deltas = ["+8%", "+12%", "-3%", "-18%"];
                return (
                  <div
                    key={m}
                    className="rounded-lg border p-2.5"
                    style={{
                      borderColor: "var(--card-border)",
                      background: "var(--bg)",
                    }}
                  >
                    <div
                      className="text-[9px] truncate"
                      style={{
                        color: "var(--muted-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {m}
                    </div>
                    <div
                      className="mt-0.5 text-lg font-bold tabular-nums"
                      style={{
                        color: "var(--fg)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {values[i]}
                    </div>
                    <div
                      className="text-[9px] font-semibold"
                      style={{ color: "#22c55e" }}
                    >
                      {deltas[i]} vs prior period
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ========================= BENCHMARKING VIEW ========================= */

const BenchmarkingView: React.FC = () => {
  const KPIS = [
    {
      label: "You vs peers",
      value: "Top 18%",
      sub: "across 47 mid-market ERPs",
      icon: Award,
      tone: "good",
    },
    {
      label: "Cycle time",
      value: "6.4h",
      sub: "peer median 14.2h",
      icon: Clock,
      tone: "good",
    },
    {
      label: "SLA adherence",
      value: "94%",
      sub: "peer median 78%",
      icon: Shield,
      tone: "good",
    },
    {
      label: "Auto-cleared",
      value: "38%",
      sub: "peer median 12%",
      icon: Zap,
      tone: "accent",
    },
  ];

  const BARS = [
    { label: "Cycle time", you: 88, peer: 54, youLabel: "6.4h", peerLabel: "14.2h" },
    { label: "SLA adherence", you: 94, peer: 78, youLabel: "94%", peerLabel: "78%" },
    { label: "AP mismatch rate", you: 82, peer: 61, youLabel: "1.8%", peerLabel: "4.4%" },
    { label: "Exception resolution", you: 86, peer: 58, youLabel: "18.2h", peerLabel: "32.1h" },
    { label: "Cost per exception", you: 74, peer: 49, youLabel: "R142", peerLabel: "R312" },
    { label: "Supplier onboarding", you: 69, peer: 44, youLabel: "3.1d", peerLabel: "7.8d" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            <LineChart
              className="w-6 h-6"
              style={{ color: "var(--accent-2)" }}
              strokeWidth={2}
            />
            Benchmarking — you vs your peers
          </h3>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            Anonymised, aggregated metrics from 47 mid-market manufacturers on
            Syspro, SAP, Sage and NetSuite. Updated weekly.
          </p>
        </div>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-[11px]"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
            background: "color-mix(in oklab, var(--accent-2) 10%, transparent)",
            color: "var(--accent-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Target className="w-3.5 h-3.5" strokeWidth={2} />
          Industry · Manufacturing · ZA
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((k) => {
          const Icon = k.icon;
          const toneColor = k.tone === "good" ? "#22c55e" : "var(--accent-2)";
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {k.label}
                </span>
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${toneColor} 15%, transparent)`,
                    color: toneColor,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </span>
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {k.value}
              </div>
              <div
                className="mt-0.5 text-[10px]"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {k.sub}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div
          className="rounded-xl border p-4 sm:p-5 themed-rounded"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--card-bg)",
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.2em] mb-4"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            Percentile vs peer median
          </div>
          <div className="flex flex-col gap-3.5">
            {BARS.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[12px] font-semibold"
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {b.label}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    You{" "}
                    <strong style={{ color: "var(--accent-2)" }}>
                      {b.youLabel}
                    </strong>{" "}
                    · peer {b.peerLabel}
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="h-3 rounded-full overflow-hidden"
                    style={{
                      background: "var(--bg-elev)",
                      border: "1px solid var(--card-border)",
                    }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${b.peer}%`,
                        background:
                          "color-mix(in oklab, var(--muted-2) 45%, transparent)",
                      }}
                    />
                  </div>
                  <div
                    className="absolute top-0 left-0 h-3 rounded-full"
                    style={{
                      width: `${b.you}%`,
                      background:
                        "linear-gradient(90deg, var(--accent-2), color-mix(in oklab, var(--accent-2) 50%, transparent))",
                      boxShadow: "0 0 12px var(--accent-glow)",
                    }}
                  />
                  <div
                    className="absolute top-[-3px] w-0.5 h-[18px]"
                    style={{
                      left: `${b.peer}%`,
                      background: "var(--muted)",
                    }}
                    title="Peer median"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          className="rounded-xl border p-4 sm:p-5 themed-rounded flex flex-col gap-3"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 30%, var(--card-border))",
            background:
              "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 5%, var(--card-bg)), var(--card-bg))",
          }}
        >
          <div className="flex items-center gap-2">
            <Lightbulb
              className="w-4 h-4"
              style={{ color: "var(--accent-2)" }}
              strokeWidth={2}
            />
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{
                color: "var(--accent-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Vantage observed
            </span>
          </div>
          <p
            className="text-[12px] leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Your cycle time on AP exceptions is{" "}
            <strong style={{ color: "var(--fg)" }}>55% faster</strong> than the
            peer median — the gap widens week-on-week since the Cape Chemical
            rule went live in March.
          </p>
          <p
            className="text-[12px] leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Two areas where peers lead:{" "}
            <strong style={{ color: "var(--fg)" }}>Supplier onboarding</strong>{" "}
            (3.1d vs 2.4d peer P25) and{" "}
            <strong style={{ color: "var(--fg)" }}>QC rework rate</strong>{" "}
            (4.2% vs 3.1% peer P25).
          </p>
          <button
            type="button"
            className="mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold cursor-pointer"
            style={{
              background: "var(--accent-2)",
              color: "var(--bg)",
              fontFamily: "var(--font-body)",
            }}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Open improvement plan
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ========================= SUPPLIER PORTAL VIEW ========================= */

const SupplierPortalView: React.FC = () => {
  const SUPPLIERS: {
    name: string;
    code: string;
    status: "Active" | "Pending" | "Dormant";
    lastLogin: string;
    openInvoices: number;
    openExceptions: number;
    onTime: string;
    health: "good" | "warn" | "bad";
  }[] = [
    {
      name: "Cape Chemical Supplies",
      code: "CHM-042",
      status: "Active",
      lastLogin: "18 min ago",
      openInvoices: 4,
      openExceptions: 1,
      onTime: "96%",
      health: "good",
    },
    {
      name: "Steelworks SA",
      code: "STL-118",
      status: "Active",
      lastLogin: "2h ago",
      openInvoices: 7,
      openExceptions: 2,
      onTime: "91%",
      health: "good",
    },
    {
      name: "Bloem Agricultural",
      code: "AGR-206",
      status: "Active",
      lastLogin: "Yesterday",
      openInvoices: 2,
      openExceptions: 0,
      onTime: "88%",
      health: "warn",
    },
    {
      name: "Durban Packaging Co.",
      code: "PKG-074",
      status: "Pending",
      lastLogin: "Never",
      openInvoices: 0,
      openExceptions: 0,
      onTime: "—",
      health: "warn",
    },
    {
      name: "Gauteng Fasteners",
      code: "FAS-311",
      status: "Active",
      lastLogin: "3d ago",
      openInvoices: 3,
      openExceptions: 4,
      onTime: "74%",
      health: "bad",
    },
    {
      name: "Stellenbosch Logistics",
      code: "LOG-159",
      status: "Dormant",
      lastLogin: "6w ago",
      openInvoices: 0,
      openExceptions: 0,
      onTime: "82%",
      health: "warn",
    },
  ];

  const KPIS = [
    { label: "Active suppliers", value: "42", sub: "of 51 invited", icon: Users, tone: "accent" },
    { label: "Invoices awaiting supplier", value: "16", sub: "3 over 7 days", icon: Inbox, tone: "warn" },
    { label: "Avg response time", value: "4.2h", sub: "SLA 24h", icon: Clock, tone: "good" },
    { label: "Self-service rate", value: "68%", sub: "up 12pp vs Q1", icon: Gauge, tone: "good" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            <Users
              className="w-6 h-6"
              style={{ color: "var(--accent-2)" }}
              strokeWidth={2}
            />
            Supplier Portal
          </h3>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            Suppliers log in here to respond to exceptions, upload documents
            and confirm delivery dates — no email back-and-forth.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-[11px] font-semibold cursor-pointer"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--bg-elev)",
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Mail className="w-3.5 h-3.5" /> Broadcast
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold cursor-pointer"
            style={{
              background: "var(--accent-2)",
              color: "var(--bg)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Plus className="w-3.5 h-3.5" /> Invite supplier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((k) => {
          const Icon = k.icon;
          const toneColor =
            k.tone === "warn"
              ? "#facc15"
              : k.tone === "good"
                ? "#22c55e"
                : "var(--accent-2)";
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {k.label}
                </span>
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${toneColor} 15%, transparent)`,
                    color: toneColor,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </span>
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {k.value}
              </div>
              <div
                className="mt-0.5 text-[10px]"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {k.sub}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-6 rounded-xl border overflow-hidden themed-rounded"
        style={{
          borderColor: "var(--card-border)",
          background: "var(--card-bg)",
        }}
      >
        <div
          className="grid grid-cols-[1.6fr_0.8fr_0.9fr_0.6fr_0.6fr_0.7fr_0.5fr] gap-3 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] border-b"
          style={{
            borderColor: "var(--card-border)",
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
            background: "var(--bg-elev)",
          }}
        >
          <span>Supplier</span>
          <span>Status</span>
          <span>Last login</span>
          <span className="text-right">Open inv.</span>
          <span className="text-right">Exc.</span>
          <span className="text-right">On-time</span>
          <span />
        </div>
        {SUPPLIERS.map((s, i) => {
          const statusColor =
            s.status === "Active"
              ? "#22c55e"
              : s.status === "Pending"
                ? "#facc15"
                : "var(--muted-2)";
          const healthColor =
            s.health === "good"
              ? "#22c55e"
              : s.health === "warn"
                ? "#facc15"
                : "#f87171";
          return (
            <div
              key={s.code}
              className="grid grid-cols-[1.6fr_0.8fr_0.9fr_0.6fr_0.6fr_0.7fr_0.5fr] gap-3 px-4 py-3 items-center text-[12px] border-b last:border-b-0"
              style={{
                borderColor: "var(--card-border)",
                background:
                  i % 2 === 0
                    ? "transparent"
                    : "color-mix(in oklab, var(--bg-elev) 30%, transparent)",
                fontFamily: "var(--font-body)",
                color: "var(--muted)",
              }}
            >
              <div className="min-w-0">
                <div
                  className="font-semibold truncate"
                  style={{ color: "var(--fg)" }}
                >
                  {s.name}
                </div>
                <div
                  className="text-[10px]"
                  style={{ color: "var(--muted-2)" }}
                >
                  {s.code}
                </div>
              </div>
              <div>
                <span
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold"
                  style={{
                    background: `color-mix(in oklab, ${statusColor} 18%, transparent)`,
                    color: statusColor,
                  }}
                >
                  {s.status}
                </span>
              </div>
              <div
                className="truncate text-[11px]"
                style={{ color: "var(--muted-2)" }}
              >
                {s.lastLogin}
              </div>
              <div
                className="text-right tabular-nums"
                style={{ color: "var(--fg)" }}
              >
                {s.openInvoices}
              </div>
              <div
                className="text-right tabular-nums"
                style={{
                  color: s.openExceptions > 2 ? "#f87171" : "var(--fg)",
                }}
              >
                {s.openExceptions}
              </div>
              <div
                className="text-right tabular-nums"
                style={{ color: healthColor, fontWeight: 600 }}
              >
                {s.onTime}
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="w-7 h-7 rounded-md border inline-flex items-center justify-center cursor-pointer"
                  style={{
                    borderColor: "var(--card-border)",
                    color: "var(--muted-2)",
                  }}
                  aria-label="More"
                >
                  <MoreVertical className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ========================= SETTINGS VIEW ========================= */

const SettingsView: React.FC = () => {
  const [tab, setTab] = useState<"users" | "workflows" | "automation">("users");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            <Settings
              className="w-6 h-6"
              style={{ color: "var(--accent-2)" }}
              strokeWidth={2}
            />
            Settings
          </h3>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            Configure users, workflow stages and automation rules. Every change
            is versioned, reversible and audit-logged.
          </p>
        </div>
      </div>

      <div
        className="flex items-center gap-1 mb-5 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        {(
          [
            { id: "users", label: "Users", icon: Users },
            { id: "workflows", label: "Workflows", icon: Workflow },
            { id: "automation", label: "Automation", icon: Zap },
          ] as const
        ).map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-semibold transition-all cursor-pointer relative"
              style={{
                color: isActive ? "var(--accent-2)" : "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
              {t.label}
              {isActive && (
                <motion.span
                  layoutId="settings-tab-underline"
                  className="absolute left-0 right-0 bottom-[-1px] h-[2px]"
                  style={{ background: "var(--accent-2)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {tab === "users" && <UsersTab key="users" />}
        {tab === "workflows" && <WorkflowsTab key="workflows" />}
        {tab === "automation" && <AutomationTab key="automation" />}
      </AnimatePresence>
    </motion.div>
  );
};

/* --- Users tab --- */

const UsersTab: React.FC = () => {
  const USERS: {
    name: string;
    email: string;
    role: "Admin" | "Director" | "Manager" | "Team Lead" | "Operator";
    status: "Active" | "Disabled";
    init: string;
  }[] = [
    { name: "Admin User", email: "admin@vantage.dev", role: "Admin", status: "Active", init: "AU" },
    { name: "David Botha", email: "david@acme.co.za", role: "Director", status: "Active", init: "DB" },
    { name: "Fatima Patel", email: "fatima@acme.co.za", role: "Manager", status: "Active", init: "FP" },
    { name: "Lerato Mokoena", email: "lerato@acme.co.za", role: "Operator", status: "Active", init: "LM" },
    { name: "Nomsa Khumalo", email: "nomsa@acme.co.za", role: "Manager", status: "Active", init: "NK" },
    { name: "Sarah van der Merwe", email: "sarah@acme.co.za", role: "Admin", status: "Active", init: "SV" },
    { name: "Sipho Dlamini", email: "sipho@acme.co.za", role: "Operator", status: "Active", init: "SD" },
    { name: "Thabo Molefe", email: "thabo@acme.co.za", role: "Team Lead", status: "Active", init: "TM" },
    { name: "Zanele Mthembu", email: "zanele@acme.co.za", role: "Operator", status: "Active", init: "ZM" },
  ];

  const roleColor = (r: string) =>
    r === "Admin"
      ? "var(--accent-2)"
      : r === "Director"
        ? "#a78bfa"
        : r === "Manager"
          ? "#22d3ee"
          : r === "Team Lead"
            ? "#facc15"
            : "#94a3b8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div
          className="text-[11px]"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          <strong style={{ color: "var(--fg)" }}>{USERS.length}</strong> users ·{" "}
          {USERS.filter((u) => u.status === "Active").length} active
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold cursor-pointer"
          style={{
            background: "var(--accent-2)",
            color: "var(--bg)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Plus className="w-3.5 h-3.5" /> Add user
        </button>
      </div>

      <div
        className="rounded-xl border overflow-hidden themed-rounded"
        style={{
          borderColor: "var(--card-border)",
          background: "var(--card-bg)",
        }}
      >
        <div
          className="grid grid-cols-[1.6fr_1.4fr_0.8fr_0.7fr_0.9fr] gap-3 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] border-b"
          style={{
            borderColor: "var(--card-border)",
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
            background: "var(--bg-elev)",
          }}
        >
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>
        {USERS.map((u, i) => {
          const rc = roleColor(u.role);
          return (
            <div
              key={u.email}
              className="grid grid-cols-[1.6fr_1.4fr_0.8fr_0.7fr_0.9fr] gap-3 px-4 py-3 items-center text-[12px] border-b last:border-b-0"
              style={{
                borderColor: "var(--card-border)",
                background:
                  i % 2 === 0
                    ? "transparent"
                    : "color-mix(in oklab, var(--bg-elev) 30%, transparent)",
                fontFamily: "var(--font-body)",
                color: "var(--muted)",
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    background: `color-mix(in oklab, ${rc} 30%, var(--bg-elev))`,
                    color: rc,
                  }}
                >
                  {u.init}
                </div>
                <span
                  className="font-semibold truncate"
                  style={{ color: "var(--fg)" }}
                >
                  {u.name}
                </span>
              </div>
              <div className="truncate" style={{ color: "var(--muted-2)" }}>
                {u.email}
              </div>
              <div>
                <span
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold"
                  style={{
                    background: `color-mix(in oklab, ${rc} 18%, transparent)`,
                    color: rc,
                  }}
                >
                  {u.role}
                </span>
              </div>
              <div>
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-semibold"
                  style={{ color: "#22c55e" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#22c55e" }}
                  />
                  {u.status}
                </span>
              </div>
              <div className="flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold border cursor-pointer"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--bg-elev)",
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold border cursor-pointer"
                  style={{
                    borderColor:
                      "color-mix(in oklab, #f87171 35%, var(--card-border))",
                    background:
                      "color-mix(in oklab, #f87171 8%, transparent)",
                    color: "#f87171",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Trash2 className="w-3 h-3" /> Deactivate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* --- Workflows tab --- */

const WorkflowsTab: React.FC = () => {
  const WORKFLOWS: {
    code: string;
    name: string;
    stages: {
      name: string;
      sla?: string;
      tone: "new" | "work" | "wait" | "approve" | "done" | "closed";
    }[];
  }[] = [
    {
      code: "INV",
      name: "AP Exceptions",
      stages: [
        { name: "New", tone: "new" },
        { name: "Assigned", sla: "24h", tone: "work" },
        { name: "Investigating", sla: "48h", tone: "work" },
        { name: "Awaiting Info", sla: "72h", tone: "wait" },
        { name: "Approval Required", sla: "48h", tone: "approve" },
        { name: "Resolved", tone: "done" },
        { name: "Closed", tone: "closed" },
      ],
    },
    {
      code: "RCV",
      name: "Receiving",
      stages: [
        { name: "New", tone: "new" },
        { name: "Inspection", sla: "8h", tone: "work" },
        { name: "Quantity Check", sla: "4h", tone: "work" },
        { name: "QC Hold", sla: "24h", tone: "wait" },
        { name: "Supplier Response", sla: "72h", tone: "wait" },
        { name: "Resolved", tone: "done" },
        { name: "Closed", tone: "closed" },
      ],
    },
  ];

  const toneColor = (tone: string) =>
    tone === "new"
      ? "var(--accent-2)"
      : tone === "work"
        ? "#22d3ee"
        : tone === "wait"
          ? "#facc15"
          : tone === "approve"
            ? "#fb923c"
            : tone === "done"
              ? "#22c55e"
              : "var(--muted-2)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-5"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div
          className="text-[11px]"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          <strong style={{ color: "var(--fg)" }}>Workflow Configuration</strong>{" "}
          · 2 active workflows · last change 3d ago
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold cursor-pointer"
          style={{
            background: "var(--accent-2)",
            color: "var(--bg)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Plus className="w-3.5 h-3.5" /> New workflow
        </button>
      </div>

      {WORKFLOWS.map((w) => (
        <div
          key={w.code}
          className="rounded-xl border themed-rounded overflow-hidden"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--card-bg)",
          }}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 border-b flex-wrap"
            style={{ borderColor: "var(--card-border)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{
                  background:
                    "color-mix(in oklab, var(--accent-2) 15%, transparent)",
                  color: "var(--accent-2)",
                }}
              >
                <Workflow className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <div
                  className="text-[14px] font-semibold"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {w.name}
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  code {w.code} · {w.stages.length} stages
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold"
                style={{
                  background: "color-mix(in oklab, #22c55e 15%, transparent)",
                  color: "#22c55e",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22c55e" }}
                />
                Active
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[10px] font-semibold cursor-pointer"
                style={{
                  borderColor:
                    "color-mix(in oklab, var(--accent-2) 35%, var(--card-border))",
                  background:
                    "color-mix(in oklab, var(--accent-2) 8%, transparent)",
                  color: "var(--accent-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Brain className="w-3 h-3" /> AI Configuration
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[10px] font-semibold cursor-pointer"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--bg-elev)",
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Pencil className="w-3 h-3" /> Edit
              </button>
            </div>
          </div>

          <div className="px-4 py-4 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {w.stages.map((s, i) => {
                const color = toneColor(s.tone);
                return (
                  <div key={s.name} className="flex items-center gap-2">
                    <div
                      className="rounded-lg border px-3 py-2 min-w-[110px]"
                      style={{
                        borderColor: `color-mix(in oklab, ${color} 35%, var(--card-border))`,
                        background: `color-mix(in oklab, ${color} 6%, var(--bg-elev))`,
                      }}
                    >
                      <div
                        className="text-[9px] uppercase tracking-[0.2em]"
                        style={{
                          color,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Stage {i + 1}
                      </div>
                      <div
                        className="text-[12px] font-semibold mt-0.5"
                        style={{
                          color: "var(--fg)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {s.name}
                      </div>
                      <div
                        className="mt-1 text-[9px] tabular-nums"
                        style={{
                          color: "var(--muted-2)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {s.sla ? `SLA ${s.sla}` : "—"}
                      </div>
                    </div>
                    {i < w.stages.length - 1 && (
                      <ArrowRight
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "var(--muted-2)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

/* --- Automation tab --- */

const AutomationTab: React.FC = () => {
  const RULES: {
    name: string;
    trigger: string;
    priority: number;
    version: number;
    status: "Active" | "Disabled";
    layer: 2 | 3;
  }[] = [
    { name: "A4 Smoke Reassign", trigger: "Manual Trigger", priority: 10, version: 1, status: "Active", layer: 3 },
    { name: "Escalate overdue items", trigger: "Item Updated", priority: 10, version: 1, status: "Active", layer: 2 },
    { name: "Notify on urgent procurement items", trigger: "Item Created", priority: 15, version: 1, status: "Disabled", layer: 2 },
    { name: "A4 Smoke Escalate", trigger: "Manual Trigger", priority: 20, version: 1, status: "Active", layer: 3 },
    { name: "Flag high-value items for manager review", trigger: "Item Created", priority: 20, version: 1, status: "Active", layer: 2 },
    { name: "Flag damaged goods for quality review", trigger: "Item Created", priority: 25, version: 1, status: "Disabled", layer: 2 },
  ];

  const [subTab, setSubTab] = useState<"rules" | "log">("rules");

  const KPIS = [
    { label: "Total rules", value: "11", icon: Zap, tone: "accent" },
    { label: "Active", value: "9", icon: CheckCircle2, tone: "good" },
    { label: "Executions (24h)", value: "2", icon: Activity, tone: "pending" },
  ];

  const LAYERS = [
    {
      n: 1,
      name: "AI Auto-Route",
      description:
        "Vantage AI routes new items to the right owner by reading supplier, amount, workflow, historical precedent and current workload.",
      tone: "var(--accent-2)",
      icon: Brain,
    },
    {
      n: 2,
      name: "Pre-built Rules",
      description:
        "Rules we ship in the standard library — escalate overdue, flag high-value, notify urgent. Enable, disable, tune thresholds.",
      tone: "#22d3ee",
      icon: Shield,
    },
    {
      n: 3,
      name: "Custom Rules",
      description:
        "Rules you write in plain English. Every rule is versioned, reviewable and reversible. AI proposes new ones with evidence.",
      tone: "#a78bfa",
      icon: Pencil,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-3 gap-3">
        {KPIS.map((k) => {
          const Icon = k.icon;
          const toneColor =
            k.tone === "good"
              ? "#22c55e"
              : k.tone === "pending"
                ? "#fb923c"
                : "var(--accent-2)";
          return (
            <div
              key={k.label}
              className="rounded-xl border p-3.5 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background:
                  "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {k.label}
                </span>
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${toneColor} 15%, transparent)`,
                    color: toneColor,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </span>
              </div>
              <div
                className="mt-2 text-2xl font-bold tabular-nums"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {k.value}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="rounded-xl border p-4 sm:p-5 themed-rounded"
        style={{
          borderColor:
            "color-mix(in oklab, var(--accent-2) 28%, var(--card-border))",
          background:
            "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 4%, var(--card-bg)), var(--card-bg))",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb
            className="w-4 h-4"
            style={{ color: "var(--accent-2)" }}
            strokeWidth={2}
          />
          <span
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            How automation works — three layers, never autonomous
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {LAYERS.map((l) => {
            const Icon = l.icon;
            return (
              <div
                key={l.n}
                className="rounded-lg border p-3"
                style={{
                  borderColor: `color-mix(in oklab, ${l.tone} 30%, var(--card-border))`,
                  background: "var(--bg-elev)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center"
                    style={{
                      background: `color-mix(in oklab, ${l.tone} 18%, transparent)`,
                      color: l.tone,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                  <div>
                    <div
                      className="text-[9px] uppercase tracking-[0.2em]"
                      style={{
                        color: l.tone,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Layer {l.n}
                    </div>
                    <div
                      className="text-[12px] font-semibold"
                      style={{
                        color: "var(--fg)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {l.name}
                    </div>
                  </div>
                </div>
                <p
                  className="mt-2 text-[11px] leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {l.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            {(
              [
                { id: "rules", label: "Rules" },
                { id: "log", label: "Execution Log" },
              ] as const
            ).map((t) => {
              const isActive = subTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSubTab(t.id)}
                  className="px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(180deg, var(--bg-elev), color-mix(in oklab, var(--bg-elev) 60%, transparent))",
                          border:
                            "1px solid color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
                          color: "var(--fg)",
                          fontFamily: "var(--font-body)",
                        }
                      : {
                          border: "1px solid transparent",
                          color: "var(--muted-2)",
                          fontFamily: "var(--font-body)",
                        }
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold cursor-pointer"
            style={{
              background: "var(--accent-2)",
              color: "var(--bg)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Plus className="w-3.5 h-3.5" /> Create rule
          </button>
        </div>

        {subTab === "rules" && (
          <div
            className="rounded-xl border overflow-hidden themed-rounded"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
            }}
          >
            <div
              className="grid grid-cols-[1.8fr_1fr_0.5fr_0.5fr_0.6fr_0.7fr_0.5fr] gap-3 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] border-b"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
                background: "var(--bg-elev)",
              }}
            >
              <span>Rule</span>
              <span>Trigger</span>
              <span className="text-right">Pri</span>
              <span className="text-right">Ver</span>
              <span>Layer</span>
              <span>Status</span>
              <span />
            </div>
            {RULES.map((r, i) => {
              const active = r.status === "Active";
              const layerColor = r.layer === 2 ? "#22d3ee" : "#a78bfa";
              return (
                <div
                  key={r.name}
                  className="grid grid-cols-[1.8fr_1fr_0.5fr_0.5fr_0.6fr_0.7fr_0.5fr] gap-3 px-4 py-3 items-center text-[12px] border-b last:border-b-0"
                  style={{
                    borderColor: "var(--card-border)",
                    background:
                      i % 2 === 0
                        ? "transparent"
                        : "color-mix(in oklab, var(--bg-elev) 30%, transparent)",
                    fontFamily: "var(--font-body)",
                    color: "var(--muted)",
                  }}
                >
                  <div
                    className="font-semibold truncate"
                    style={{ color: "var(--fg)" }}
                  >
                    {r.name}
                  </div>
                  <div
                    className="truncate text-[11px]"
                    style={{ color: "var(--muted-2)" }}
                  >
                    {r.trigger}
                  </div>
                  <div
                    className="text-right tabular-nums"
                    style={{ color: "var(--fg)" }}
                  >
                    {r.priority}
                  </div>
                  <div
                    className="text-right tabular-nums"
                    style={{ color: "var(--muted-2)" }}
                  >
                    v{r.version}
                  </div>
                  <div>
                    <span
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold"
                      style={{
                        background: `color-mix(in oklab, ${layerColor} 18%, transparent)`,
                        color: layerColor,
                      }}
                    >
                      L{r.layer}
                    </span>
                  </div>
                  <div>
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-semibold"
                      style={{
                        color: active ? "#22c55e" : "var(--muted-2)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: active ? "#22c55e" : "var(--muted-2)",
                        }}
                      />
                      {r.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      className="w-7 h-7 rounded-md border inline-flex items-center justify-center cursor-pointer"
                      style={{
                        borderColor: "var(--card-border)",
                        color: "var(--muted-2)",
                      }}
                      aria-label="More"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {subTab === "log" && (
          <div
            className="rounded-xl border p-6 text-center text-[12px] themed-rounded flex flex-col gap-2"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Activity
              className="w-5 h-5 mx-auto mb-1"
              style={{ color: "var(--accent-2)" }}
            />
            <div
              className="text-[13px] font-semibold"
              style={{ color: "var(--fg)" }}
            >
              2 executions in the last 24 hours
            </div>
            <div>
              13:42 —{" "}
              <strong style={{ color: "var(--fg)" }}>
                Escalate overdue items
              </strong>{" "}
              fired · 7 items escalated to Fatima P.
            </div>
            <div>
              09:08 —{" "}
              <strong style={{ color: "var(--fg)" }}>
                Flag high-value items for manager review
              </strong>{" "}
              fired · 1 item (PO R412k)
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
