import { useState } from "react";

const DPRS = [
  {
    id: "DPR-041", project: "Greenfield Heights", developer: "Ravi Constructions Pvt Ltd",
    location: "Thiruvanmiyur, Chennai", type: "Residential Apartments",
    units: 240, cost: "₹48 Cr", phase: "Phase 1 (120 units)", status: "Analysed",
    score: 68, grade: "Medium",
    extracted: {
      totalCost: "₹48.2 Cr", unitCost: "₹20.1L/unit", pricing: "₹28L/unit",
      margin: "39.3%", timeline: "36 months", phases: 2,
    },
    flags: [
      { type: "warning", msg: "Pricing 12% above current micromarket average (₹24.9L/unit)" },
      { type: "warning", msg: "3 similar projects launched in 1km radius — supply risk" },
      { type: "info", msg: "Developer has 2 successfully completed projects" },
    ],
    alternatives: ["Thoraipakkam — Lower supply, similar demand dynamics", "Perungudi — Closer to IT corridor, faster absorption"],
    steps: ["DPR Uploaded", "OCR Extraction", "NLP Classification", "Viability Scoring", "Risk Flags Generated"],
    currentStep: 4,
  },
  {
    id: "DPR-040", project: "Metro Skyline", developer: "Tamil Housing Board",
    location: "Madurai North", type: "Affordable Housing",
    units: 600, cost: "₹72 Cr", phase: "Single Phase", status: "Pending",
    score: 0, grade: "Pending",
    extracted: {},
    flags: [],
    alternatives: [],
    steps: ["DPR Uploaded", "OCR Extraction", "NLP Classification", "Viability Scoring", "Risk Flags Generated"],
    currentStep: 1,
  },
];

export default function DPRViability() {
  const [selected, setSelected] = useState(DPRS[0]);
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState("overview");

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">DPR / Project Viability Engine</h1>
          <p className="page-subtitle">AI + OCR + NLP — Detailed Project Report analysis for indirect housing finance</p>
        </div>
        <span className="ai-chip">🤖 NLP Classification Active</span>
      </div>

      <div className="alert alert-info mb-20">
        📁 <strong>Indirect Housing Finance:</strong> Developers, housing boards, and MFIs upload DPRs. The AI engine extracts key metrics using OCR + NLP, scores project viability, flags risks, and suggests better-performing alternatives.
      </div>

      <div className="grid-12">
        {/* DPR list + upload */}
        <div>
          <div className="card mb-20">
            <div className="card-title">📁 Upload DPR</div>
            <div style={{
              border: "2px dashed var(--sf-border)", borderRadius: 8, padding: 20,
              textAlign: "center", cursor: "pointer", background: "var(--sf-bg)"
            }}
              onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1500); }}
            >
              <div style={{ fontSize: 28 }}>📄</div>
              <div className="text-sm font-bold mt-8">Click to upload DPR (PDF / DOCX)</div>
              <div className="text-sm text-muted mt-4">AI will auto-extract and score</div>
              {uploading && <div className="badge badge-orange mt-8" style={{ display: "block" }}>⏳ Processing…</div>}
            </div>
          </div>

          <div className="card">
            <div className="card-title">📁 DPR Queue</div>
            {DPRS.map(d => (
              <div
                key={d.id}
                onClick={() => setSelected(d)}
                style={{
                  padding: 12, borderRadius: 8, cursor: "pointer", marginBottom: 8,
                  background: selected.id === d.id ? "#EBF2FF" : "var(--sf-bg)",
                  border: selected.id === d.id ? "1px solid var(--sf-border)" : "1px solid transparent",
                }}
              >
                <div className="flex-between mb-4">
                  <span className="text-blue font-bold text-sm">{d.id}</span>
                  <span className={`badge ${d.status === "Analysed" ? "badge-green" : "badge-orange"}`}>{d.status}</span>
                </div>
                <div className="font-bold">{d.project}</div>
                <div className="text-sm text-muted">{d.developer}</div>
                <div className="text-sm text-muted">{d.location} · {d.units} units</div>
                {d.score > 0 && (
                  <div className="flex gap-8 mt-8" style={{ alignItems: "center" }}>
                    <div className="progress-bar" style={{ flex: 1 }}>
                      <div className="progress-fill gold" style={{ width: `${d.score}%` }} />
                    </div>
                    <span className="text-sm font-bold">{d.score}/100</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DPR analysis */}
        <div>
          <div className="card mb-20">
            <div className="flex-between mb-16">
              <div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{selected.project}</div>
                <div className="text-sm text-muted">{selected.developer} · {selected.location}</div>
                <div className="flex gap-8 mt-4">
                  <span className="badge badge-gray">{selected.type}</span>
                  <span className="badge badge-gray">{selected.units} units</span>
                  <span className="badge badge-gray">{selected.cost}</span>
                </div>
              </div>
              {selected.score > 0 && (
                <div className="text-center">
                  <div className="score-ring" style={{
                    border: `8px solid ${selected.score >= 70 ? "var(--sf-teal)" : "var(--sf-gold)"}`,
                    background: selected.score >= 70 ? "#E6F7F5" : "#FFF8E5"
                  }}>
                    <span className="score-num" style={{ color: selected.score >= 70 ? "var(--sf-teal)" : "var(--sf-gold)" }}>{selected.score}</span>
                    <span className="score-label">/ 100</span>
                  </div>
                  <div className={`badge mt-8 ${selected.grade === "High" ? "badge-green" : selected.grade === "Medium" ? "badge-orange" : "badge-gray"}`}>
                    {selected.grade} Viability
                  </div>
                </div>
              )}
            </div>

            {/* Processing steps */}
            <div className="step-bar mb-20">
              {selected.steps.map((s, i) => (
                <div key={s} className={`step ${i < selected.currentStep ? "done" : i === selected.currentStep ? "active" : ""}`}>
                  <div className="step-circle">{i < selected.currentStep ? "✓" : i + 1}</div>
                  <div className="step-name" style={{ fontSize: 10 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          {selected.status === "Analysed" && (
            <>
              <div className="tabs">
                {["overview", "flags", "alternatives"].map(t => (
                  <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                    {t === "overview" ? "📊 Extracted Metrics" : t === "flags" ? "⚠️ Risk Flags" : "💡 Alternatives"}
                  </button>
                ))}
              </div>

              {tab === "overview" && (
                <div className="card">
                  <div className="card-title">📊 AI-Extracted Metrics (from DPR)</div>
                  <div className="alert alert-success mb-16">
                    🤖 OCR + NLP extracted the following metrics from the uploaded DPR. Manual verification recommended for final decision.
                  </div>
                  <div className="grid-3">
                    {Object.entries(selected.extracted).map(([k, v]) => (
                      <div key={k} style={{ padding: 14, background: "var(--sf-bg)", borderRadius: 8 }}>
                        <div className="text-sm text-muted">{k.replace(/([A-Z])/g, " $1").trim()}</div>
                        <div className="font-bold mt-4">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "flags" && (
                <div className="card">
                  <div className="card-title">⚠️ AI Risk Intelligence Flags</div>
                  {selected.flags.map((f, i) => (
                    <div key={i} className={`alert alert-${f.type === "warning" ? "warning" : "info"}`}>{f.msg}</div>
                  ))}
                  <div className="card-title mt-16">📊 Comparison vs Micromarket Benchmarks</div>
                  {[
                    { metric: "Unit Pricing", project: "₹28L", benchmark: "₹24.9L", status: "red" },
                    { metric: "Absorption Rate (est.)", project: "2.8%/mo", benchmark: "3.5%/mo", status: "red" },
                    { metric: "Developer Track Record", project: "2 projects", benchmark: "—", status: "gold" },
                    { metric: "RERA Compliance", project: "Registered", benchmark: "Required", status: "green" },
                  ].map(r => (
                    <div key={r.metric} className="flex-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--sf-border)" }}>
                      <span className="text-sm">{r.metric}</span>
                      <span className="text-sm text-muted">{r.benchmark}</span>
                      <span className={`badge badge-${r.status === "red" ? "red" : r.status === "green" ? "green" : r.status === "gold" ? "gold" : "gray"}`}>{r.project}</span>
                    </div>
                  ))}
                </div>
              )}

              {tab === "alternatives" && (
                <div className="card">
                  <div className="card-title">💡 AI-Suggested Alternative Locations</div>
                  <div className="alert alert-info mb-16">
                    Based on historical project performance, demand-supply data, and infrastructure signals, the AI suggests these locations may offer better absorption and lower risk:
                  </div>
                  {selected.alternatives.map((a, i) => (
                    <div key={i} style={{ padding: "14px", background: "#EBF2FF", borderRadius: 8, marginBottom: 10, border: "1px solid var(--sf-border)" }}>
                      <div className="flex gap-8" style={{ alignItems: "center" }}>
                        <span style={{ fontSize: 20 }}>📍</span>
                        <div>
                          <div className="font-bold">{a.split("—")[0]}</div>
                          <div className="text-sm text-muted">{a.split("—")[1]}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-primary mt-12">Request Detailed Comparison Report</button>
                </div>
              )}
            </>
          )}

          {selected.status === "Pending" && (
            <div className="card">
              <div className="alert alert-warning">
                ⏳ OCR extraction in progress. DPR sections being classified by NLP model. Estimated time: 2-3 minutes.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
