import { useState } from "react";

const PORTFOLIOS = [
  { id: "C-1041", name: "Arjun Mehta", loan: "L-2891", amount: "₹45L", disbDate: "13 Jun 2025", score: 82, delta: +3, emi: "On Time", risk: "Low" },
  { id: "C-1040", name: "Sunita Rao", loan: "L-2890", amount: "₹62L", disbDate: "04 Feb 2024", score: 68, delta: -5, emi: "1 Day Late", risk: "Medium" },
  { id: "C-1039", name: "Vikram Singh", loan: "L-2831", amount: "₹38L", disbDate: "12 Sep 2023", score: 54, delta: -12, emi: "32 Days Overdue", risk: "High" },
  { id: "C-1038", name: "Meera Pillai", loan: "L-2744", amount: "₹55L", disbDate: "28 Nov 2022", score: 88, delta: +2, emi: "On Time", risk: "Low" },
  { id: "C-1037", name: "Rahul Dev", loan: "L-2701", amount: "₹29L", disbDate: "15 Mar 2022", score: 41, delta: -18, emi: "68 Days Overdue", risk: "NPA Risk" },
];

export default function RiskScoring() {
  const [selected, setSelected] = useState(PORTFOLIOS[0]);

  const riskColor = r => r === "Low" ? "var(--sf-teal)" : r === "Medium" ? "var(--sf-gold)" : "var(--sf-danger)";
  const badgeClass = r => r === "Low" ? "badge-green" : r === "Medium" ? "badge-orange" : r === "High" ? "badge-red" : "badge-red";

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Risk Scoring Engine</h1>
          <p className="page-subtitle">Pre-sanction scoring + Real-time dynamic risk monitoring post-disbursement</p>
        </div>
        <span className="ai-chip">🤖 Dynamic Risk Model Active</span>
      </div>

      <div className="alert alert-info mb-20">
        ⚡ <strong>Two-stage AI risk model:</strong> (1) Pre-sanction scoring using CIBIL, income, FOIR, LTV, property quality. (2) Post-disbursement continuous monitoring — EMI health, job stability signals, property value changes, bureau alerts.
      </div>

      <div className="grid-4 mb-20">
        {[
          { label: "Portfolio Size", value: "317", sub: "Active borrowers", cls: "blue", icon: "📊" },
          { label: "Low Risk", value: "218", sub: "68.8%", cls: "teal", icon: "✅" },
          { label: "Medium Risk", value: "71", sub: "22.4%", cls: "gold", icon: "⚠️" },
          { label: "High / NPA Risk", value: "28", sub: "8.8%", cls: "red", icon: "🚨" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-change">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-21">
        {/* Portfolio table */}
        <div className="card">
          <div className="card-title">📊 Live Portfolio Risk Monitor</div>
          <table>
            <thead>
              <tr><th>Borrower</th><th>Loan</th><th>Amount</th><th>EMI Status</th><th>AI Score</th><th>Change</th><th>Risk</th></tr>
            </thead>
            <tbody>
              {PORTFOLIOS.map(p => (
                <tr key={p.id} onClick={() => setSelected(p)} style={{ cursor: "pointer", background: selected.id === p.id ? "#F5F8FF" : "" }}>
                  <td className="font-bold">{p.name}</td>
                  <td className="text-blue text-sm">{p.loan}</td>
                  <td>{p.amount}</td>
                  <td>
                    <span className={`badge ${p.emi === "On Time" ? "badge-green" : p.emi.includes("Overdue") ? "badge-red" : "badge-orange"}`}>
                      {p.emi}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-8" style={{ alignItems: "center" }}>
                      <div className="progress-bar" style={{ width: 50 }}>
                        <div style={{ height: "100%", width: `${p.score}%`, background: riskColor(p.risk), borderRadius: 10 }} />
                      </div>
                      <span className="font-bold text-sm">{p.score}</span>
                    </div>
                  </td>
                  <td>
                    <span className={p.delta >= 0 ? "text-success font-bold text-sm" : "text-danger font-bold text-sm"}>
                      {p.delta >= 0 ? "▲" : "▼"} {Math.abs(p.delta)}
                    </span>
                  </td>
                  <td><span className={`badge ${badgeClass(p.risk)}`}>{p.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected borrower detail */}
        <div>
          <div className="card mb-20">
            <div className="card-title">⚡ Borrower Risk Detail</div>
            <div className="text-center mb-16">
              <div className="score-ring" style={{
                margin: "0 auto",
                border: `8px solid ${riskColor(selected.risk)}`,
                background: selected.risk === "Low" ? "#E6F7F5" : selected.risk === "Medium" ? "#FFF8E5" : "#FDECEA"
              }}>
                <span className="score-num" style={{ color: riskColor(selected.risk) }}>{selected.score}</span>
                <span className="score-label">/ 100</span>
              </div>
              <div className="font-bold mt-8">{selected.name}</div>
              <div className="text-sm text-muted">{selected.loan} · {selected.amount}</div>
              <span className={`badge ${badgeClass(selected.risk)} mt-8`}>{selected.risk} Risk</span>
            </div>

            <div className="font-bold text-sm mb-12">Score Breakdown</div>
            {[
              { factor: "CIBIL / Bureau", score: selected.score > 70 ? 85 : 58 },
              { factor: "EMI Payment History", score: selected.emi === "On Time" ? 92 : selected.emi.includes("32") ? 45 : 22 },
              { factor: "Income Stability", score: selected.score > 70 ? 80 : 60 },
              { factor: "Loan-to-Value Ratio", score: selected.score > 70 ? 78 : 65 },
              { factor: "Property Value Trend", score: selected.score > 70 ? 75 : 50 },
            ].map(f => (
              <div key={f.factor} className="mb-10">
                <div className="flex-between mb-4 text-sm">
                  <span>{f.factor}</span>
                  <span className="font-bold">{f.score}</span>
                </div>
                <div className="progress-bar">
                  <div style={{ height: "100%", width: `${f.score}%`, background: f.score >= 70 ? "var(--sf-teal)" : f.score >= 50 ? "var(--sf-gold)" : "var(--sf-danger)", borderRadius: 10 }} />
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title">🤖 AI Recommendations</div>
            {selected.risk === "Low" && (
              <div className="alert alert-success">✅ Borrower is low risk. No action required. EMIs on track.</div>
            )}
            {selected.risk === "Medium" && (
              <>
                <div className="alert alert-warning">⚠️ Score declined 5 points. Proactive check recommended.</div>
                <button className="btn btn-gold btn-sm">Send EMI Reminder</button>
              </>
            )}
            {(selected.risk === "High" || selected.risk === "NPA Risk") && (
              <>
                <div className="alert alert-danger">🚨 {selected.emi} — Immediate collections escalation required.</div>
                <div className="flex gap-8 mt-8">
                  <button className="btn btn-danger btn-sm">Escalate to Collections</button>
                  <button className="btn btn-secondary btn-sm">Schedule Call</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
