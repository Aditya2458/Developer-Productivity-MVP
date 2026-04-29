import React, { useEffect, useState } from "react";

// ─── Status logic (unchanged) ────────────────────────────────────────────────
function getStatus(value, type) {
  if (type === "bug_rate") {
    if (value < 0.1) return { label: "Good", level: "good" };
    if (value < 0.2) return { label: "Moderate", level: "moderate" };
    return { label: "High", level: "bad" };
  }
  if (type === "lead_time" || type === "cycle_time") {
    if (value <= 3) return { label: "Good", level: "good" };
    if (value <= 5) return { label: "Moderate", level: "moderate" };
    return { label: "Slow", level: "bad" };
  }
  if (type === "deployment_frequency") {
    if (value >= 5) return { label: "Good", level: "good" };
    if (value >= 3) return { label: "Moderate", level: "moderate" };
    return { label: "Low", level: "bad" };
  }
  if (type === "pr_throughput") {
    if (value >= 20) return { label: "Good", level: "good" };
    if (value >= 15) return { label: "Moderate", level: "moderate" };
    return { label: "Low", level: "bad" };
  }
}

// ─── Metric config ────────────────────────────────────────────────────────────
const METRIC_CONFIG = [
  { key: "lead_time",            label: "Lead Time",        icon: "⏱", unit: "d",  transform: null },
  { key: "cycle_time",           label: "Cycle Time",       icon: "🔄", unit: "d",  transform: null },
  { key: "bug_rate",             label: "Bug Rate",         icon: "🐛", unit: "%",  transform: v => (v * 100).toFixed(0) },
  { key: "deployment_frequency", label: "Deploy Freq",      icon: "🚀", unit: "×",  transform: null },
  { key: "pr_throughput",        label: "PR Throughput",    icon: "⬆", unit: "",   transform: null },
];

// ─── MetricCard ───────────────────────────────────────────────────────────────
function MetricCard({ config, value }) {
  const display = config.transform ? config.transform(value) : value;
  const { label, level } = getStatus(value, config.key);

  const levelStyles = {
    good:     { bar: "#22d07a", glow: "rgba(34,208,122,0.12)",   text: "#22d07a", badge: "rgba(34,208,122,0.1)"  },
    moderate: { bar: "#f5c842", glow: "rgba(245,200,66,0.12)",   text: "#f5c842", badge: "rgba(245,200,66,0.1)"  },
    bad:      { bar: "#ff4d6a", glow: "rgba(255,77,106,0.12)",   text: "#ff4d6a", badge: "rgba(255,77,106,0.1)"  },
  };
  const s = levelStyles[level];

  return (
    <div style={{
      background: "#111620",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14,
      padding: "22px 20px",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* Top accent bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background: s.bar, borderRadius:"14px 14px 0 0" }} />
      {/* Glow blob */}
      <div style={{ position:"absolute", width:80, height:80, borderRadius:"50%", top:-20, right:-20, background: s.bar, filter:"blur(30px)", opacity:0.18, pointerEvents:"none" }} />

      <div style={{ fontSize:18, width:36, height:36, borderRadius:9, background: s.glow, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
        {config.icon}
      </div>
      <div style={{ fontSize:11, fontFamily:"monospace", letterSpacing:"0.06em", textTransform:"uppercase", color:"#454d63", marginBottom:6 }}>
        {config.label}
      </div>
      <div style={{ fontFamily:"sans-serif", fontSize:32, fontWeight:700, lineHeight:1, color:"#eef0f6", marginBottom:10 }}>
        {display}<sup style={{ fontSize:14, color:"#7b8299", marginLeft:2 }}>{config.unit}</sup>
      </div>
      <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11.5, fontWeight:500, fontFamily:"monospace", padding:"3px 8px", borderRadius:20, color: s.text, background: s.badge }}>
        ● {label}
      </span>
    </div>
  );
}

// ─── PanelItem ────────────────────────────────────────────────────────────────
function PanelItem({ text, dotColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:"flex", alignItems:"flex-start", gap:12,
        padding:"13px 22px",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        fontSize:13.5, color:"#7b8299", lineHeight:1.5,
        background: hovered ? "#171d2c" : "transparent",
        transition:"background 0.15s",
      }}
    >
      <div style={{ width:6, height:6, borderRadius:"50%", background: dotColor, marginTop:7, flexShrink:0 }} />
      <span>{text}</span>
    </div>
  );
}

// ─── Panel ────────────────────────────────────────────────────────────────────
function Panel({ title, icon, items, dotColor, emptyText }) {
  return (
    <div style={{ background:"#111620", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"18px 22px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"#171d2c" }}>
        <div style={{ fontSize:16, width:32, height:32, borderRadius:8, background:"rgba(79,127,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {icon}
        </div>
        <span style={{ fontWeight:700, fontSize:15, color:"#eef0f6" }}>{title}</span>
        <span style={{ marginLeft:"auto", fontFamily:"monospace", fontSize:11, color:"#454d63", background:"#0b0e14", border:"1px solid rgba(255,255,255,0.07)", padding:"2px 8px", borderRadius:20 }}>
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>
      <div>
        {items.length > 0
          ? items.map((t, i) => <PanelItem key={i} text={t} dotColor={dotColor} />)
          : <div style={{ padding:"32px 22px", textAlign:"center", color:"#454d63", fontSize:13, fontStyle:"italic" }}>{emptyText}</div>
        }
      </div>
    </div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, fontFamily:"monospace", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"#454d63", marginBottom:16 }}>
      {children}
      <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }} />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/metrics")
      .then(r => r.json())
      .then(data => setMetrics(data));
  }, []);

  const insights    = metrics ? (() => {
    const i = [];
    if (metrics.lead_time > 5)              i.push("Lead time is high → PRs are slow to merge or review.");
    if (metrics.cycle_time > 3)             i.push("Cycle time is high → tasks are taking too long.");
    if (metrics.bug_rate > 0.2)             i.push("Bug rate is high → quality issues in production.");
    if (metrics.deployment_frequency < 3)   i.push("Deployment frequency is low → releases are infrequent.");
    if (metrics.pr_throughput < 15)         i.push("PR throughput is low → fewer code contributions.");
    return i;
  })() : [];

  const suggestions = metrics ? (() => {
    const s = [];
    if (metrics.lead_time > 5)              s.push("Break PRs into smaller chunks and request early reviews.");
    if (metrics.cycle_time > 3)             s.push("Split large tasks into smaller issues.");
    if (metrics.bug_rate > 0.2)             s.push("Improve test coverage and add QA checks.");
    if (metrics.deployment_frequency < 3)   s.push("Automate CI/CD for faster deployments.");
    if (metrics.pr_throughput < 15)         s.push("Increase collaboration and review speed.");
    return s;
  })() : [];

  const appStyle = {
    minHeight: "100vh",
    background: "#0b0e14",
    backgroundImage: "linear-gradient(rgba(79,127,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(79,127,255,0.025) 1px,transparent 1px)",
    backgroundSize: "40px 40px",
    color: "#eef0f6",
    fontFamily: "'DM Sans', system-ui, sans-serif",
  };

  return (
    <div style={appStyle}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={{ maxWidth:1160, margin:"0 auto", padding:"40px 24px 80px" }}>

        {/* ── Header ── */}
        <header style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:48, flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"monospace", fontSize:11, color:"#4f7fff", letterSpacing:"0.12em", textTransform:"uppercase", background:"rgba(79,127,255,0.1)", border:"1px solid rgba(79,127,255,0.2)", padding:"4px 10px", borderRadius:4, marginBottom:12 }}>
              ● Live Dashboard
            </div>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.1 }}>
              Developer <span style={{ color:"#4f7fff" }}>Productivity</span>
            </h1>
            <p style={{ marginTop:8, fontSize:15, color:"#7b8299", fontWeight:300 }}>
              Engineering metrics · Real-time insights · Actionable signals
            </p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#111620", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"10px 16px", fontSize:13, color:"#7b8299", fontFamily:"monospace", alignSelf:"flex-start" }}>
            Updated <strong style={{ color:"#eef0f6", marginLeft:4 }}>just now</strong>
          </div>
        </header>

        {!metrics ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"60vh", gap:16 }}>
            <div style={{ width:36, height:36, border:"2px solid rgba(255,255,255,0.07)", borderTopColor:"#4f7fff", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <span style={{ fontSize:14, color:"#454d63", fontFamily:"monospace" }}>Fetching metrics…</span>
          </div>
        ) : (
          <>
            {/* ── Metrics Grid ── */}
            <SectionLabel>Core Metrics</SectionLabel>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16, marginBottom:32 }}>
              {METRIC_CONFIG.map(cfg => (
                <MetricCard key={cfg.key} config={cfg} value={metrics[cfg.key]} />
              ))}
            </div>

            {/* ── Panels ── */}
            <SectionLabel style={{ marginTop:32 }}>Analysis</SectionLabel>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
              <Panel title="Insights"         icon="🧠" items={insights}    dotColor="#4f7fff" emptyText="No insights — everything looks healthy!" />
              <Panel title="Suggested Actions" icon="⚡" items={suggestions} dotColor="#22d07a" emptyText="No suggestions — keep it up!" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}