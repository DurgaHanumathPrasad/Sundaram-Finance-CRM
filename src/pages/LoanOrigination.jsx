import { useState } from "react";

const STEPS = ["Application", "KYC & Docs", "AI Risk Score", "Underwriting", "Approval", "Disbursement"];

export default function LoanOrigination() {
  const [currentStep, setCurrentStep] = useState(2);
  const [activeCase, setActiveCase] = useState("L-2891");

  const CASES = [
    { id: "L-2891", name: "Arjun Mehta", amount: "₹45L", step: 2, type: "Home Loan" },
    { id: "L-2890", name: "Sunita Rao", amount: "₹62L", step: 1, type: "Home Loan" },
    { id: "L-2889", name: "Ravi Constructions", amount: "₹5.2 Cr", step: 3, type: "Builder Loan" },
    { id: "L-2888", name: "Priya Nair", amount: "₹38L", step: 4, type: "Home Loan" },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Loan Origination System (LOS)</h1>
          <p className="page-subtitle">Application → KYC → Underwriting → Approval → Disbursement</p>
        </div>
        <span className="ai-chip">🤖 AI Underwriting Assist</span>
      </div>

      <div className="grid-12">
        {/* Case list */}
        <div>
          <div className="card mb-20">
            <div className="card-title">📋 Active Cases</div>
            {CASES.map(c => (
              <div
                key={c.id}
                onClick={() => { setActiveCase(c.id); setCurrentStep(c.step); }}
                style={{
                  padding: "12px", borderRadius: 8, cursor: "pointer", marginBottom: 8,
                  background: activeCase === c.id ? "#EBF2FF" : "var(--sf-bg)",
                  border: activeCase === c.id ? "1px solid var(--sf-border)" : "1px solid transparent",
                }}
              >
                <div className="flex-between mb-4">
                  <span className="font-bold text-sm text-blue">{c.id}</span>
                  <span className="badge badge-gray">{STEPS[c.step]}</span>
                </div>
                <div className="font-bold">{c.name}</div>
                <div className="text-sm text-muted">{c.type} · {c.amount}</div>
                <div className="progress-bar mt-8">
                  <div className="progress-fill blue" style={{ width: `${((c.step + 1) / STEPS.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LOS workflow */}
        <div>
          {/* Step bar */}
          <div className="card mb-20">
            <div className="step-bar">
              {STEPS.map((s, i) => (
                <div key={s} className={`step ${i < currentStep ? "done" : i === currentStep ? "active" : ""}`}>
                  <div className="step-circle">{i < currentStep ? "✓" : i + 1}</div>
                  <div className="step-name">{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 0: Application */}
          {currentStep === 0 && (
            <div className="card">
              <div className="card-title">📝 Loan Application — Arjun Mehta</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Applicant Name</label>
                  <input className="form-input" defaultValue="Arjun Mehta" />
                </div>
                <div className="form-group">
                  <label className="form-label">Co-Applicant Name</label>
                  <input className="form-input" placeholder="If applicable" />
                </div>
                <div className="form-group">
                  <label className="form-label">Loan Amount (₹)</label>
                  <input className="form-input" defaultValue="4500000" />
                </div>
                <div className="form-group">
                  <label className="form-label">Loan Tenure (Years)</label>
                  <select className="form-input">
                    {[10,15,20,25,30].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select className="form-input">
                    <option>Apartment</option>
                    <option>Independent House</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Property Location</label>
                  <input className="form-input" defaultValue="Whitefield, Bengaluru" />
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setCurrentStep(1)}>Submit Application →</button>
            </div>
          )}

          {/* Step 1: KYC */}
          {currentStep === 1 && (
            <div className="card">
              <div className="card-title">🪪 KYC & Document Collection — AI + OCR</div>
              <div className="alert alert-success">
                🤖 AI OCR engine has automatically extracted data from uploaded documents. Please verify below.
              </div>
              <div className="grid-2">
                {[
                  { doc: "Aadhaar", status: "✅ Verified", detail: "Name: Arjun Mehta, DOB: 12-Mar-1988, Address: Bengaluru" },
                  { doc: "PAN Card", status: "✅ Verified", detail: "PAN: ABCPM1234D, Name matches Aadhaar" },
                  { doc: "ITR 2023-24", status: "✅ Verified", detail: "Gross Income: ₹14,20,000. TDS matched." },
                  { doc: "Bank Statement", status: "⏳ In Review", detail: "Analysing 12-month cash flows and existing EMIs…" },
                ].map(d => (
                  <div key={d.doc} style={{ padding: 14, background: "var(--sf-bg)", borderRadius: 8 }}>
                    <div className="font-bold mb-4">{d.doc}</div>
                    <div className="text-sm mb-4">{d.status}</div>
                    <div className="text-sm text-muted">{d.detail}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-8 mt-16">
                <button className="btn btn-primary" onClick={() => setCurrentStep(2)}>Proceed to AI Risk Scoring →</button>
                <button className="btn btn-secondary">Request Missing Documents</button>
              </div>
            </div>
          )}

          {/* Step 2: AI Risk */}
          {currentStep === 2 && (
            <div className="card">
              <div className="card-title">⚡ AI Risk Score — Arjun Mehta</div>
              <div className="alert alert-success">
                🤖 AI Risk Engine has completed analysis. Score: 82/100 — LOW RISK
              </div>
              <div className="grid-2">
                <div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                    <div className="score-ring" style={{
                      border: "8px solid var(--sf-teal)", background: "#E6F7F5"
                    }}>
                      <span className="score-num" style={{ color: "var(--sf-teal)" }}>82</span>
                      <span className="score-label">/ 100</span>
                    </div>
                  </div>
                  <div className="badge badge-green" style={{ width: "100%", justifyContent: "center", padding: "8px" }}>
                    ✅ LOW RISK — RECOMMEND APPROVAL
                  </div>
                </div>
                <div>
                  {[
                    { label: "Credit Score (CIBIL)", score: 88, note: "742 — Excellent" },
                    { label: "Income Stability", score: 85, note: "7 yrs TCS employment" },
                    { label: "FOIR (Obligations)", score: 75, note: "41% — Within norms" },
                    { label: "LTV Ratio", score: 82, note: "72% — Acceptable" },
                    { label: "Property Quality", score: 78, note: "Grade A builder" },
                  ].map(f => (
                    <div key={f.label} className="mb-12">
                      <div className="flex-between mb-4">
                        <span className="text-sm">{f.label}</span>
                        <span className="text-sm text-muted">{f.note}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill teal" style={{ width: `${f.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary mt-16" onClick={() => setCurrentStep(3)}>Send to Underwriter →</button>
            </div>
          )}

          {/* Step 3: Underwriting */}
          {currentStep === 3 && (
            <div className="card">
              <div className="card-title">📋 Underwriting Decision — Credit Committee</div>
              <div className="grid-2">
                <div>
                  <div className="alert alert-info">🤖 AI recommends: APPROVE at ₹45L, 20yr, 8.75% floating rate</div>
                  <div className="form-group">
                    <label className="form-label">Sanctioned Amount</label>
                    <input className="form-input" defaultValue="₹45,00,000" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rate of Interest</label>
                    <input className="form-input" defaultValue="8.75% (Floating — RLLR + 2.50%)" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Conditions / Remarks</label>
                    <textarea className="form-input" rows={3} defaultValue="Property legal verification pending. Disbursement after registration." />
                  </div>
                  <div className="flex gap-8">
                    <button className="btn btn-success" onClick={() => setCurrentStep(4)}>✅ Approve & Sanction</button>
                    <button className="btn btn-danger">❌ Reject</button>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-12">Underwriter Checklist</div>
                  {[
                    "CIBIL & bureau report reviewed",
                    "Income documents verified by AI",
                    "Property valuation received",
                    "Legal title search completed",
                    "FOIR within policy limits",
                    "LTV within policy (max 80%)",
                    "AI Property Appreciation report reviewed",
                  ].map((c, i) => (
                    <div key={i} className="flex gap-8 mb-8" style={{ alignItems: "center" }}>
                      <input type="checkbox" defaultChecked={i < 5} />
                      <span className="text-sm">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Approval */}
          {currentStep === 4 && (
            <div className="card">
              <div className="card-title">🎉 Loan Sanctioned — Awaiting Disbursement</div>
              <div className="alert alert-success">✅ Loan sanctioned by Credit Committee on 13 Jun 2025. Sanction letter generated.</div>
              <div className="grid-2">
                {[["Sanctioned Amount", "₹45,00,000"], ["ROI", "8.75% p.a. Floating"], ["EMI", "₹39,584/month"], ["Tenure", "20 years"], ["LTV", "71.4%"], ["Sanction Date", "13 Jun 2025"]].map(([l, v]) => (
                  <div key={l} className="flex-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--sf-border)" }}>
                    <span className="text-muted text-sm">{l}</span>
                    <span className="font-bold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-8 mt-16">
                <button className="btn btn-primary" onClick={() => setCurrentStep(5)}>Initiate Disbursement →</button>
                <button className="btn btn-secondary">Download Sanction Letter</button>
              </div>
            </div>
          )}

          {/* Step 5: Disbursement */}
          {currentStep === 5 && (
            <div className="card">
              <div className="card-title">💰 Disbursement</div>
              <div className="alert alert-success">🎉 Loan successfully disbursed! AI Dynamic Risk Model activated for ongoing monitoring.</div>
              <div className="grid-3">
                {[["Amount Disbursed", "₹45,00,000"], ["Bank", "HDFC Bank ****2341"], ["Date", "13 Jun 2025"]].map(([l, v]) => (
                  <div key={l} className="card" style={{ textAlign: "center" }}>
                    <div className="stat-value" style={{ fontSize: 16 }}>{v}</div>
                    <div className="text-sm text-muted mt-4">{l}</div>
                  </div>
                ))}
              </div>
              <div className="alert alert-info mt-16">
                🤖 <strong>AI Dynamic Risk Model activated</strong> — will continuously monitor EMI payments, property value changes, and borrower profile updates post-disbursement.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
