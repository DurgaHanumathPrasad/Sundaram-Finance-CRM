import { useState } from "react";

const PROPERTIES = [
  {
    id: "P-001", name: "Prestige Sunrise", location: "Whitefield, Bengaluru",
    currentValue: 85, type: "Apartment", builder: "Prestige Group", area: "1,450 sq ft",
    base: { pct: 6.2, value: 152 }, optimistic: { pct: 8.9, value: 184 }, stress: { pct: 2.1, value: 104 },
    reasons: ["🚇 Upcoming Metro Phase 3 (2027)", "💼 IT park expansion — ITPL", "📈 Strong historical appreciation 7.8% CAGR"],
    risks: ["🏗️ Pipeline supply: 4,200 units under construction"],
    confidence: 78,
  },
  {
    id: "P-002", name: "Sobha City", location: "Thrissur Road, Bengaluru",
    currentValue: 72, type: "Apartment", builder: "Sobha Ltd", area: "1,250 sq ft",
    base: { pct: 5.4, value: 122 }, optimistic: { pct: 7.2, value: 142 }, stress: { pct: 1.8, value: 87 },
    reasons: ["🛣️ Outer Ring Road connectivity", "🏫 Good social infrastructure"],
    risks: ["📉 Moderate demand, slower absorption rate"],
    confidence: 65,
  },
];

export default function PropertyAppreciation() {
  const [selected, setSelected] = useState(PROPERTIES[0]);
  const [tenure, setTenure] = useState(20);

  const calcFuture = (pct, years) => Math.round(selected.currentValue * Math.pow(1 + pct / 100, years));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Property Appreciation Engine</h1>
          <p className="page-subtitle">AI-powered forward-looking property value forecasting for retail home loans</p>
        </div>
        <span className="ai-chip">🤖 Time-Series AI Model Active</span>
      </div>

      <div className="alert alert-info mb-20">
        🏠 <strong>How it works:</strong> The AI engine uses historical locality price data, infrastructure signals, seasonality-aware time-series models, and macro variables to forecast property appreciation over the loan tenure — giving borrowers a forward-looking view.
      </div>

      <div className="grid-12">
        {/* Property selector */}
        <div>
          <div className="card mb-20">
            <div className="card-title">🏠 Properties Under Review</div>
            {PROPERTIES.map(p => (
              <div
                key={p.id}
                onClick={() => setSelected(p)}
                style={{
                  padding: 12, borderRadius: 8, cursor: "pointer", marginBottom: 8,
                  background: selected.id === p.id ? "#EBF2FF" : "var(--sf-bg)",
                  border: selected.id === p.id ? "1px solid var(--sf-border)" : "1px solid transparent",
                }}
              >
                <div className="font-bold text-sm">{p.name}</div>
                <div className="text-sm text-muted">{p.location}</div>
                <div className="flex gap-8 mt-4">
                  <span className="badge badge-blue">₹{p.currentValue}L current</span>
                  <span className="badge badge-green">+{p.base.pct}% base</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title">⚙️ Forecast Settings</div>
            <div className="form-group">
              <label className="form-label">Loan Tenure (Years): {tenure}</label>
              <input
                type="range" min={5} max={30} value={tenure}
                onChange={e => setTenure(Number(e.target.value))}
                style={{ width: "100%", marginTop: 8 }}
              />
              <div className="flex-between text-sm text-muted mt-4"><span>5 yrs</span><span>30 yrs</span></div>
            </div>
          </div>
        </div>

        {/* Forecast detail */}
        <div>
          <div className="card mb-20">
            <div className="flex-between mb-16">
              <div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{selected.name}</div>
                <div className="text-sm text-muted">{selected.location} · {selected.builder} · {selected.area}</div>
              </div>
              <div>
                <span className="text-sm text-muted">Current Value</span>
                <div className="stat-value">₹{selected.currentValue}L</div>
              </div>
            </div>

            <div style={{ fontWeight: 600, marginBottom: 12 }}>
              Forecast at {tenure} Years (₹ Lakhs)
            </div>
            <div className="scenario-grid mb-20">
              <div className="scenario-card optimistic">
                <div className="scenario-label" style={{ color: "var(--sf-teal)" }}>Optimistic</div>
                <div className="scenario-val" style={{ color: "var(--sf-teal)" }}>₹{calcFuture(selected.optimistic.pct, tenure)}L</div>
                <div className="scenario-sub" style={{ color: "var(--sf-teal)" }}>+{selected.optimistic.pct}% p.a. CAGR</div>
              </div>
              <div className="scenario-card base">
                <div className="scenario-label" style={{ color: "var(--sf-blue)" }}>Base Case</div>
                <div className="scenario-val" style={{ color: "var(--sf-blue)" }}>₹{calcFuture(selected.base.pct, tenure)}L</div>
                <div className="scenario-sub" style={{ color: "var(--sf-blue)" }}>+{selected.base.pct}% p.a. CAGR</div>
              </div>
              <div className="scenario-card stress">
                <div className="scenario-label" style={{ color: "var(--sf-danger)" }}>Stress / Low</div>
                <div className="scenario-val" style={{ color: "var(--sf-danger)" }}>₹{calcFuture(selected.stress.pct, tenure)}L</div>
                <div className="scenario-sub" style={{ color: "var(--sf-danger)" }}>+{selected.stress.pct}% p.a. CAGR</div>
              </div>
            </div>

            {/* Simulated trend chart using divs */}
            <div style={{ fontWeight: 600, marginBottom: 10 }}>5-Year Appreciation Trend (Historical)</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90, padding: "0 4px" }}>
              {[62, 66, 70, 73, 78, 82, 85].map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontSize: 10, color: "var(--sf-muted)" }}>₹{v}L</div>
                  <div style={{
                    width: "100%",
                    height: `${((v - 55) / 40) * 80}px`,
                    background: i === 6 ? "var(--sf-blue)" : "var(--sf-border)",
                    borderRadius: "4px 4px 0 0",
                    transition: "height 0.3s"
                  }} />
                  <div style={{ fontSize: 10, color: "var(--sf-muted)" }}>
                    {["'19", "'20", "'21", "'22", "'23", "'24", "'25"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reason codes */}
          <div className="grid-2">
            <div className="card">
              <div className="card-title">✅ Growth Drivers</div>
              {selected.reasons.map((r, i) => (
                <div key={i} className="flex gap-8 mb-8" style={{ alignItems: "flex-start" }}>
                  <div style={{ fontSize: 11, background: "#E6F7F5", padding: "3px 8px", borderRadius: 4, color: "var(--sf-teal)", fontWeight: 600 }}>
                    {r}
                  </div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="card-title">⚠️ Risk Factors</div>
              {selected.risks.map((r, i) => (
                <div key={i} className="flex gap-8 mb-8">
                  <div style={{ fontSize: 11, background: "#FFF5E6", padding: "3px 8px", borderRadius: 4, color: "#92400E", fontWeight: 600 }}>
                    {r}
                  </div>
                </div>
              ))}
              <div className="mt-12">
                <div className="text-sm text-muted mb-4">Model Confidence</div>
                <div className="progress-bar">
                  <div className="progress-fill blue" style={{ width: `${selected.confidence}%` }} />
                </div>
                <div className="text-sm font-bold mt-4">{selected.confidence}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
