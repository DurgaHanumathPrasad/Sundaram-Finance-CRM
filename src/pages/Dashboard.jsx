import { useState } from "react";

const PIPELINE = [
  { stage: "New Enquiry", count: 142, value: "₹28.4 Cr", color: "var(--sf-light-blue)", pct: 90 },
  { stage: "Document Collection", count: 87, value: "₹19.2 Cr", color: "var(--sf-gold)", pct: 60 },
  { stage: "Underwriting", count: 45, value: "₹11.5 Cr", color: "#9B59B6", pct: 35 },
  { stage: "Sanctioned", count: 28, value: "₹8.1 Cr", color: "var(--sf-teal)", pct: 20 },
  { stage: "Disbursed", count: 19, value: "₹5.9 Cr", color: "var(--sf-success)", pct: 13 },
];

const RECENT_LEADS = [
  { id: "L-2891", name: "Arjun Mehta", type: "Home Loan", amount: "₹45L", stage: "Underwriting", score: 82, risk: "Low" },
  { id: "L-2890", name: "Sunita Rao", type: "Home Loan", amount: "₹62L", stage: "Document Collection", score: 74, risk: "Medium" },
  { id: "L-2889", name: "Ravi Constructions", type: "Builder Loan", amount: "₹5.2 Cr", stage: "DPR Review", score: 68, risk: "Medium" },
  { id: "L-2888", name: "Priya Nair", type: "Home Loan", amount: "₹38L", stage: "Sanctioned", score: 91, risk: "Low" },
  { id: "L-2887", name: "Deepak Kumar", type: "Plot + Construction", amount: "₹55L", stage: "New Enquiry", score: 61, risk: "High" },
];

const ALERTS = [
  { type: "danger", icon: "⚠️", msg: "3 loans with overdue EMIs for >60 days — escalation needed" },
  { type: "warning", icon: "🕐", msg: "12 applications pending document submission for >7 days" },
  { type: "info", icon: "🤖", msg: "AI Risk Engine updated 28 borrower profiles post-disbursement" },
  { type: "success", icon: "✅", msg: "₹2.1 Cr sanctioned today — 4 cases approved by credit committee" },
];

export default function Dashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Command Dashboard</h1>
          <p className="page-subtitle">AI-Enhanced Housing Finance CRM — Real-time overview</p>
        </div>
        <div className="flex gap-8">
          <span className="ai-chip">🤖 AI Active</span>
          <button className="btn btn-primary">+ New Lead</button>
        </div>
      </div>

      {/* Alerts */}
      {ALERTS.map((a, i) => (
        <div key={i} className={`alert alert-${a.type}`}>
          <span>{a.icon}</span> {a.msg}
        </div>
      ))}

      {/* Stats */}
      <div className="grid-4 mb-20">
        {[
          { icon: "🎯", label: "Total Active Leads", value: "317", change: "↑ 14% this month", cls: "blue" },
          { icon: "💰", label: "Pipeline Value", value: "₹73.1 Cr", change: "₹5.9 Cr disbursed today", cls: "teal" },
          { icon: "⚡", label: "Avg. AI Risk Score", value: "76/100", change: "↑ 3pts vs last month", cls: "gold" },
          { icon: "📉", label: "NPA Rate", value: "1.8%", change: "↓ 0.2% vs last quarter", cls: "red" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-change">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-21 mb-20">
        {/* Pipeline funnel */}
        <div className="card">
          <div className="card-title">📊 Loan Pipeline — Live Funnel</div>
          {PIPELINE.map((p) => (
            <div key={p.stage} className="mb-16">
              <div className="flex-between mb-4">
                <span className="font-bold text-sm">{p.stage}</span>
                <span className="text-sm text-muted">{p.count} cases · {p.value}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${p.pct}%`, background: p.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Team performance */}
        <div className="card">
          <div className="card-title">👥 Team Performance</div>
          {[
            { name: "Rahul Sharma", leads: 42, sanctions: 18, score: 95 },
            { name: "Meena Pillai", leads: 38, sanctions: 15, score: 88 },
            { name: "Suresh Kumar", leads: 35, sanctions: 12, score: 82 },
            { name: "Anitha Nair", leads: 29, sanctions: 10, score: 78 },
          ].map((t) => (
            <div key={t.name} className="flex-between mb-16">
              <div className="flex gap-8" style={{ alignItems: "center" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg,#1A4A8A,#0D7A6F)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 11, fontWeight: 700
                }}>
                  {t.name.split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-sm text-muted">{t.leads} leads · {t.sanctions} sanctioned</div>
                </div>
              </div>
              <div className="badge badge-blue">{t.score}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent leads table */}
      <div className="card">
        <div className="card-title">🎯 Recent Applications</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Loan ID</th><th>Applicant</th><th>Type</th><th>Amount</th>
                <th>Stage</th><th>AI Score</th><th>Risk</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_LEADS.map((l) => (
                <tr key={l.id}>
                  <td className="text-blue font-bold">{l.id}</td>
                  <td className="font-bold">{l.name}</td>
                  <td>{l.type}</td>
                  <td className="font-bold">{l.amount}</td>
                  <td><span className="badge badge-gray">{l.stage}</span></td>
                  <td>
                    <div className="flex gap-8" style={{ alignItems: "center" }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill blue" style={{ width: `${l.score}%` }} />
                      </div>
                      <span className="text-sm font-bold">{l.score}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${l.risk === "Low" ? "badge-green" : l.risk === "Medium" ? "badge-orange" : "badge-red"}`}>
                      {l.risk}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
