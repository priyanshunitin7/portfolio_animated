"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid,
} from "recharts";

/* ─── Types ─────────────────────────────────────────────── */
interface DashData {
  visits: number;
  github: number;
  linkedin: number;
  cv: number;
  messages: number;
}

/* ─── Helpers ────────────────────────────────────────────── */
function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      if (!mounted.current) return;
      start = Math.min(start + step, target);
      setVal(Math.floor(start));
      if (start >= target) clearInterval(id);
    }, 16);
    return () => { mounted.current = false; clearInterval(id); };
  }, [target, duration]);
  return val;
}

function fmt(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

/* ─── Mini sparkline data (deterministic, not random) ────── */
function makeSpark(peak: number) {
  const base = [0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.65, 0.9, 0.75, 1.0];
  return base.map((v, i) => ({ i, v: Math.round(v * peak) }));
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [data, setData] = useState<DashData | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const router = useRouter();

  /* Hydration-safe mount */
  useEffect(() => { setMounted(true); }, []);

  /* Auth */
  useEffect(() => {
    if (!mounted) return;
    const auth = localStorage.getItem("admin-auth");
    if (!auth) router.push("/login");
    else setIsAuth(true);
  }, [mounted]);

  /* Polling */
  useEffect(() => {
  if (!isAuth) return;

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data: DashData = await res.json();

      setData(data);
      setLastUpdated(new Date().toLocaleTimeString());

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  fetchData(); // initial load

  const id = setInterval(fetchData, 5000);

  return () => clearInterval(id);
}, [isAuth]);

  /* Logout */
  const handleLogout = useCallback(() => {
    localStorage.removeItem("admin-auth");
    router.push("/login");
  }, [router]);

  /* ── Loading states ─────────────────────────────────────── */
  // 1. Still mounting → show loader
if (!mounted) {
  return (
    <div className="loading-screen">
      <style>{loadingCSS}</style>
      <div className="loading-inner">
        <span className="loading-dot" />
        <span className="loading-dot" />
        <span className="loading-dot" />
      </div>
    </div>
  );
}

// 2. Not authenticated → render nothing (redirect already triggered)
if (!isAuth) {
  return null;
}
  if (!data) {
    return (
      <div className="loading-screen">
        <style>{loadingCSS}</style>
        <div className="loading-inner">
          <span className="loading-dot" /><span className="loading-dot" /><span className="loading-dot" />
        </div>
      </div>
    );
  }

  const barData = [
    { name: "Visits",   value: data.visits   },
    { name: "GitHub",   value: data.github   },
    { name: "LinkedIn", value: data.linkedin },
    { name: "CV",       value: data.cv       },
    { name: "Messages", value: data.messages },
  ];

  const convRate = data.visits > 0
    ? ((data.github + data.linkedin) / data.visits * 100).toFixed(1)
    : "0.0";

  return (
    <>
      <style>{css}</style>

      <div className="dash">

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <span className="logo-mark">⬡</span>
            <span className="logo-text">CTRL</span>
          </div>

          <nav className="sidebar-nav">
            {[
              { icon: "◈", label: "Overview",  active: true  },
              
            ].map(item => (
              <div key={item.label} className={`nav-item${item.active ? " active" : ""}`}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.active && <span className="nav-pip" />}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="live-badge">
              <span className="live-dot" />
              <span>LIVE</span>
            </div>
            <div className="update-time">{lastUpdated}</div>
            <button className="logout-btn" onClick={handleLogout}>
              <span>↩</span> Sign out
            </button>
          </div>
        </aside>

        {/* ── Main ─────────────────────────────────────────── */}
        <main className="main">

          {/* Top bar */}
          <header className="topbar">
            <div className="topbar-left">
              <h1 className="page-title">Overview</h1>
              <p className="page-sub">Portfolio analytics · Real-time</p>
            </div>
            <div className="topbar-right">
              <div className="refresh-badge">↻ Auto-refresh 5s</div>
            </div>
          </header>

          {/* ── KPI row ───────────────────────────────────── */}
          <section className="kpi-grid">
            <KpiCard
              label="Total Visits"
              value={data.visits}
              icon="◈"
              accent="#38bdf8"
              sparkData={makeSpark(data.visits)}
              badge="+12%"
              badgeUp
            />
            <KpiCard
              label="GitHub Clicks"
              value={data.github}
              icon="⬡"
              accent="#a78bfa"
              sparkData={makeSpark(data.github)}
              badge="+8%"
              badgeUp
            />
            <KpiCard
              label="LinkedIn Clicks"
              value={data.linkedin}
              icon="◉"
              accent="#34d399"
              sparkData={makeSpark(data.linkedin)}
              badge="+5%"
              badgeUp
            />
            <KpiCard
              label="CV Downloads"
              value={data.cv}
              icon="◎"
              accent="#fb923c"
              sparkData={makeSpark(data.cv)}
              badge="-2%"
              badgeUp={false}
            />
            <KpiCard
              label="Messages"
              value={data.messages}
              icon="⬖"
              accent="#f472b6"
              sparkData={makeSpark(data.messages)}
              badge="+19%"
              badgeUp
            />
            <div className="kpi-card kpi-conv">
              <p className="kpi-label">Conversion Rate</p>
              <div className="conv-ring-wrap">
                <svg viewBox="0 0 80 80" className="conv-ring">
                  <circle cx="40" cy="40" r="32" className="ring-track" />
                  <circle
                    cx="40" cy="40" r="32"
                    className="ring-fill"
                    style={{
                      strokeDasharray: `${Math.min(parseFloat(convRate), 100) * 2.01} 201`,
                    }}
                  />
                </svg>
                <span className="conv-pct">{convRate}%</span>
              </div>
              <p className="kpi-sub">Visitor → Engagement</p>
            </div>
          </section>

          {/* ── Bottom row ───────────────────────────────── */}
          <section className="bottom-grid">

            {/* Bar chart */}
            <div className="panel chart-panel">
              <div className="panel-head">
                <div>
                  <p className="panel-title">Engagement Breakdown</p>
                  <p className="panel-sub">All channels · last sync {lastUpdated}</p>
                </div>
                <div className="chart-legend">
                  <span className="legend-dot" style={{ background: "#38bdf8" }} />
                  <span className="legend-text">Events</span>
                </div>
              </div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barSize={28}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "inherit" }}
                      axisLine={false} tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                      contentStyle={{
                        background: "#111318",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 10,
                        fontSize: 12,
                        fontFamily: "inherit",
                        color: "#f1eeff",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                      }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}
                      fill="url(#barGrad)" />
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Flow panel */}
            <div className="panel flow-panel">
              <div className="panel-head">
                <div>
                  <p className="panel-title">User Flow</p>
                  <p className="panel-sub">Conversion funnel</p>
                </div>
              </div>
              <div className="flow-list">
                {[
                  { label: "Visitor",    value: data.visits,   color: "#38bdf8", icon: "◈" },
                  { label: "GitHub",     value: data.github,   color: "#a78bfa", icon: "⬡" },
                  { label: "LinkedIn",   value: data.linkedin, color: "#34d399", icon: "◉" },
                  { label: "CV Download",value: data.cv,       color: "#fb923c", icon: "◎" },
                ].map((item, i, arr) => {
                  const pct = arr[0].value > 0
                    ? Math.round(item.value / arr[0].value * 100)
                    : 0;
                  return (
                    <div key={item.label} className="flow-row">
                      <div className="flow-row-left">
                        <span className="flow-icon" style={{ color: item.color }}>{item.icon}</span>
                        <div>
                          <p className="flow-label">{item.label}</p>
                          <p className="flow-count">{fmt(item.value)} users</p>
                        </div>
                      </div>
                      <div className="flow-bar-wrap">
                        <div
                          className="flow-bar-fill"
                          style={{ width: `${pct}%`, background: item.color }}
                        />
                        <span className="flow-pct">{pct}%</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flow-connector" style={{ borderColor: item.color + "33" }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </section>
        </main>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   KPI CARD
═══════════════════════════════════════════════════════════ */
function KpiCard({
  label, value, icon, accent, sparkData, badge, badgeUp,
}: {
  label: string; value: number; icon: string; accent: string;
  sparkData: { i: number; v: number }[];
  badge: string; badgeUp: boolean;
}) {
  const display = useCountUp(value);
  return (
    <div className="kpi-card" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="kpi-top">
        <span className="kpi-icon">{icon}</span>
        <span className={`kpi-badge${badgeUp ? " up" : " down"}`}>{badge}</span>
      </div>
      <p className="kpi-value">{fmt(display)}</p>
      <p className="kpi-label">{label}</p>
      <div className="kpi-spark">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData}>
            <defs>
              <linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity={0.3} />
                <stop offset="100%" stopColor={accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone" dataKey="v"
              stroke={accent} strokeWidth={1.5}
              fill={`url(#sg-${label})`}
              dot={false} isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════ */
const loadingCSS = `
  .loading-screen{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#07080f}
  .loading-inner{display:flex;gap:8px}
  .loading-dot{width:8px;height:8px;border-radius:50%;background:#38bdf8;animation:ldot 1.2s ease-in-out infinite}
  .loading-dot:nth-child(2){animation-delay:.2s}
  .loading-dot:nth-child(3){animation-delay:.4s}
  @keyframes ldot{0%,80%,100%{opacity:.2;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
`;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07080f; --surface:#0e0f18; --surface2:#13141f;
  --border:rgba(255,255,255,0.07); --border2:rgba(255,255,255,0.04);
  --text:#f0eeff; --muted:rgba(240,238,255,0.42); --muted2:rgba(240,238,255,0.22);
  --sidebar-w:220px;
}
html,body{height:100%}

/* ── Layout ── */
.dash{
  min-height:100vh; display:flex;
  background:var(--bg);
  font-family:'Instrument Sans',sans-serif;
  color:var(--text);
}

/* ── Sidebar ── */
.sidebar{
  width:var(--sidebar-w); min-height:100vh;
  background:var(--surface);
  border-right:1px solid var(--border);
  display:flex; flex-direction:column;
  padding:28px 16px;
  position:sticky; top:0; height:100vh;
  flex-shrink:0;
}
.sidebar-logo{
  display:flex; align-items:center; gap:10px;
  padding:0 8px; margin-bottom:36px;
}
.logo-mark{font-size:20px;color:#38bdf8}
.logo-text{
  font-family:'Geist Mono',monospace; font-size:13px; font-weight:500;
  letter-spacing:.16em; color:var(--text);
}
.sidebar-nav{display:flex;flex-direction:column;gap:2px;flex:1}
.nav-item{
  display:flex; align-items:center; gap:10px;
  padding:9px 12px; border-radius:9px; cursor:pointer;
  position:relative; transition:background .15s;
  color:var(--muted); font-size:13.5px; font-weight:400;
}
.nav-item:hover{background:rgba(255,255,255,0.04);color:var(--text)}
.nav-item.active{background:rgba(56,189,248,0.08);color:var(--text)}
.nav-icon{font-size:13px;width:18px;text-align:center;flex-shrink:0}
.nav-pip{
  position:absolute; right:10px; width:5px; height:5px;
  border-radius:50%; background:#38bdf8;
  box-shadow:0 0 8px rgba(56,189,248,0.6);
}
.sidebar-footer{
  display:flex; flex-direction:column; gap:10px;
  padding-top:20px; border-top:1px solid var(--border);
}
.live-badge{
  display:flex; align-items:center; gap:6px;
  font-family:'Geist Mono',monospace; font-size:10px;
  letter-spacing:.14em; color:#22c55e;
}
.live-dot{
  width:6px;height:6px;border-radius:50%;background:#22c55e;
  box-shadow:0 0 8px rgba(34,197,94,0.7);
  animation:livePulse 2s ease-in-out infinite;
}
@keyframes livePulse{0%,100%{opacity:1}50%{opacity:.4}}
.update-time{
  font-family:'Geist Mono',monospace; font-size:10px;
  color:var(--muted2); letter-spacing:.04em;
}
.logout-btn{
  display:flex; align-items:center; gap:6px;
  background:transparent; border:1px solid var(--border);
  border-radius:8px; padding:8px 12px; cursor:pointer;
  color:var(--muted); font-size:12px; font-family:inherit;
  transition:all .2s; letter-spacing:.02em;
}
.logout-btn:hover{
  background:rgba(239,68,68,0.08); border-color:rgba(239,68,68,0.3);
  color:#f87171;
}

/* ── Main ── */
.main{
  flex:1; min-width:0;
  padding:32px 36px 48px;
  display:flex; flex-direction:column; gap:28px;
}

/* ── Topbar ── */
.topbar{
  display:flex; align-items:flex-start; justify-content:space-between;
  padding-bottom:8px; border-bottom:1px solid var(--border2);
  animation:fadeIn .5s ease both;
}
.page-title{
  font-family:'Instrument Sans',sans-serif; font-size:24px;
  font-weight:600; letter-spacing:-.02em;
}
.page-sub{font-size:13px;color:var(--muted);margin-top:3px}
.refresh-badge{
  font-family:'Geist Mono',monospace; font-size:10px;
  letter-spacing:.1em; color:var(--muted2);
  background:var(--surface); border:1px solid var(--border);
  border-radius:20px; padding:5px 12px;
}
.topbar-right{display:flex;gap:10px;align-items:center}

/* ── KPI grid ── */
.kpi-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}
.kpi-card{
  background:var(--surface); border:1px solid var(--border);
  border-radius:16px; padding:20px 22px 16px;
  position:relative; overflow:hidden;
  transition:border-color .25s, transform .2s, box-shadow .25s;
  animation:fadeIn .5s ease both;
}
.kpi-card:hover{
  border-color:rgba(255,255,255,0.13);
  transform:translateY(-2px);
  box-shadow:0 12px 40px rgba(0,0,0,0.35);
}
/* Accent glow on hover via CSS var */
.kpi-card::before{
  content:''; position:absolute; inset:0; border-radius:16px;
  background:radial-gradient(circle at 80% 0%, var(--accent,#38bdf8) 0%, transparent 60%);
  opacity:0; transition:opacity .3s;
}
.kpi-card:hover::before{opacity:0.06}

.kpi-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.kpi-icon{font-size:16px;color:var(--accent,#38bdf8)}
.kpi-badge{
  font-family:'Geist Mono',monospace; font-size:10px;
  letter-spacing:.06em; padding:2px 7px; border-radius:20px;
}
.kpi-badge.up{background:rgba(34,197,94,0.1);color:#4ade80}
.kpi-badge.down{background:rgba(239,68,68,0.1);color:#f87171}

.kpi-value{
  font-family:'Geist Mono',monospace; font-size:28px;
  font-weight:500; letter-spacing:-.02em; color:var(--text);
  line-height:1; margin-bottom:4px;
}
.kpi-label{font-size:12px;color:var(--muted);letter-spacing:.02em}
.kpi-spark{height:44px;margin:12px -6px -4px;opacity:.8}

/* Conversion ring card */
.kpi-conv{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
.conv-ring-wrap{position:relative;width:80px;height:80px;margin:4px 0}
.conv-ring{width:100%;height:100%}
.ring-track{fill:none;stroke:rgba(255,255,255,0.06);stroke-width:6}
.ring-fill{
  fill:none; stroke:url(#ringGrad); stroke-width:6;
  stroke-linecap:round;
  transform:rotate(-90deg); transform-origin:center;
  transition:stroke-dasharray .8s cubic-bezier(0.22,1,0.36,1);
}
.conv-pct{
  position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  font-family:'Geist Mono',monospace; font-size:14px; font-weight:500; color:var(--text);
}
.kpi-sub{font-size:11px;color:var(--muted2);letter-spacing:.02em}

/* ── Bottom grid ── */
.bottom-grid{
  display:grid; grid-template-columns:1.6fr 1fr;
  gap:16px; flex:1;
}
.panel{
  background:var(--surface); border:1px solid var(--border);
  border-radius:16px; padding:24px 26px;
  display:flex; flex-direction:column; gap:20px;
  animation:fadeIn .5s ease .1s both;
}
.panel-head{
  display:flex; align-items:flex-start; justify-content:space-between;
}
.panel-title{font-size:15px;font-weight:500;letter-spacing:-.01em}
.panel-sub{font-size:12px;color:var(--muted);margin-top:2px}
.chart-legend{display:flex;align-items:center;gap:6px}
.legend-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.legend-text{font-size:11px;color:var(--muted)}
.chart-wrap{height:240px}

/* ── Flow ── */
.flow-list{display:flex;flex-direction:column;gap:0}
.flow-row{
  position:relative; padding:14px 0;
  border-bottom:1px solid var(--border2);
}
.flow-row:last-child{border-bottom:none}
.flow-row-left{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.flow-icon{font-size:18px;width:22px;text-align:center;flex-shrink:0}
.flow-label{font-size:13px;font-weight:500;color:var(--text)}
.flow-count{font-size:11px;color:var(--muted);font-family:'Geist Mono',monospace;margin-top:1px}
.flow-bar-wrap{
  display:flex; align-items:center; gap:10px;
  background:rgba(255,255,255,0.03); border-radius:4px;
  height:4px; position:relative; overflow:visible;
}
.flow-bar-fill{
  height:4px; border-radius:4px;
  transition:width .8s cubic-bezier(0.22,1,0.36,1);
  box-shadow:0 0 8px currentColor;
}
.flow-pct{
  position:absolute; right:-30px;
  font-family:'Geist Mono',monospace; font-size:10px; color:var(--muted2);
}

/* ── SVG gradient for ring ── */
svg defs { overflow: visible; }

/* ── Animations ── */
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

/* ── Responsive ── */
@media(max-width:900px){
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
  .bottom-grid{grid-template-columns:1fr}
  .main{padding:24px 20px 40px}
}
@media(max-width:600px){
  .dash{flex-direction:column}
  .sidebar{width:100%;min-height:auto;height:auto;position:relative;flex-direction:row;flex-wrap:wrap;padding:16px}
  .sidebar-nav{flex-direction:row}
  .kpi-grid{grid-template-columns:1fr 1fr}
}
`;