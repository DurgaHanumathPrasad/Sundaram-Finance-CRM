import { useState } from "react";

const CUSTOMERS = [
  { id: "C-1041", name: "Arjun Mehta", phone: "+91 98765 43210", email: "arjun.m@gmail.com", city: "Bengaluru", loans: 1, totalExp: "₹45L", kyc: "Verified", cibil: 742, segment: "Retail" },
  { id: "C-1040", name: "Sunita Rao", phone: "+91 87654 32109", email: "sunita.rao@yahoo.com", city: "Hyderabad", loans: 2, totalExp: "₹1.07 Cr", kyc: "Verified", cibil: 718, segment: "Retail" },
  { id: "C-1039", name: "Ravi Constructions Pvt", phone: "+91 99887 76655", email: "info@raviconstructions.com", city: "Chennai", loans: 0, totalExp: "—", kyc: "Pending", cibil: 685, segment: "Developer" },
];

const TIMELINE = [
  { date: "13 Jun 2025", event: "Loan application submitted via mobile app", type: "blue" },
  { date: "12 Jun 2025", event: "AI KYC verification completed — Aadhaar + PAN matched", type: "green" },
  { date: "10 Jun 2025", event: "Income documents uploaded (ITR 2022-23, 2023-24, salary slips)", type: "green" },
  { date: "08 Jun 2025", event: "Property selected — Prestige Sunrise, Whitefield, Bengaluru", type: "blue" },
  { date: "05 Jun 2025", event: "Lead created via mobile app — referred by Kotak partner", type: "gold" },
  { date: "02 Jun 2025", event: "Initial enquiry via chatbot — asked about HL rates", type: "gray" },
];

const DOCS = [
  { doc: "Aadhaar Card", status: "Verified", ai: "✅ Match confirmed" },
  { doc: "PAN Card", status: "Verified", ai: "✅ Name + DOB match" },
  { doc: "ITR 2023-24", status: "Verified", ai: "✅ Income: ₹14.2L PA" },
  { doc: "ITR 2022-23", status: "Verified", ai: "✅ Income: ₹12.8L PA" },
  { doc: "6 Month Salary Slips", status: "Verified", ai: "✅ Avg Net Salary: ₹98,400/mo" },
  { doc: "Bank Statement (12mo)", status: "Under Review", ai: "⏳ Checking EMI obligations" },
  { doc: "Property Agreement", status: "Pending", ai: "— Awaiting upload" },
];

export default function Customer360() {
  const [selected, setSelected] = useState(CUSTOMERS[0]);
  const [tab, setTab] = useState("profile");

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Customer 360° View</h1>
          <p className="page-subtitle">Unified profile — documents, interactions, loans, AI insights</p>
        </div>
        <span className="ai-chip">🤖 AI OCR + KYC Active</span>
      </div>

      <div className="grid-12">
        {/* Customer list */}
        <div className="card" style={{ height: "fit-content" }}>
          <div className="card-title">👤 Customers</div>
          <input className="form-input mb-16" placeholder="🔍 Search customer..." />
          {CUSTOMERS.map(c => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              style={{
                padding: "12px", borderRadius: 8, cursor: "pointer",
                background: selected.id === c.id ? "#EBF2FF" : "transparent",
                border: selected.id === c.id ? "1px solid var(--sf-border)" : "1px solid transparent",
                marginBottom: 8,
              }}
            >
              <div className="flex gap-8" style={{ alignItems: "center" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "linear-gradient(135deg,#1A4A8A,#0D7A6F)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 13
                }}>
                  {c.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-sm">{c.name}</div>
                  <div className="text-sm text-muted">{c.id} · {c.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer detail */}
        <div>
          {/* Header card */}
          <div className="card mb-20">
            <div className="flex-between">
              <div className="flex gap-12" style={{ alignItems: "center" }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "linear-gradient(135deg,#1A4A8A,#0D7A6F)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 20
                }}>
                  {selected.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{selected.name}</div>
                  <div className="text-sm text-muted">{selected.id} · {selected.city} · {selected.segment}</div>
                  <div className="flex gap-8 mt-4">
                    <span className="badge badge-green">{selected.kyc} KYC</span>
                    <span className="badge badge-blue">CIBIL: {selected.cibil}</span>
                  </div>
                </div>
              </div>
              <div className="grid-3" style={{ gap: 24 }}>
                {[
                  { label: "Active Loans", value: selected.loans },
                  { label: "Total Exposure", value: selected.totalExp },
                  { label: "CIBIL Score", value: selected.cibil },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div className="stat-value" style={{ fontSize: 18 }}>{s.value}</div>
                    <div className="text-sm text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {["profile", "documents", "interactions", "loans"].map(t => (
              <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                {t === "profile" ? "📋 Profile" : t === "documents" ? "📄 Documents" : t === "interactions" ? "🕐 Timeline" : "💰 Loans"}
              </button>
            ))}
          </div>

          {tab === "profile" && (
            <div className="grid-2">
              <div className="card">
                <div className="card-title">📋 Personal Details</div>
                {[
                  ["Full Name", selected.name],
                  ["Phone", selected.phone],
                  ["Email", selected.email],
                  ["City", selected.city],
                  ["Segment", selected.segment],
                  ["Customer Since", "Jun 2025"],
                ].map(([l, v]) => (
                  <div key={l} className="flex-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--sf-border)" }}>
                    <span className="text-sm text-muted">{l}</span>
                    <span className="text-sm font-bold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="card-title">💼 Financial Profile</div>
                {[
                  ["Gross Annual Income", "₹14.2 L (ITR 2023-24)"],
                  ["Net Monthly Take-home", "₹98,400"],
                  ["Existing EMIs", "₹12,500 / month"],
                  ["FOIR (Obligations/Income)", "41%"],
                  ["Employment", "Salaried — TCS Ltd"],
                  ["Work Experience", "7 years"],
                  ["CIBIL Score", `${selected.cibil} — Good`],
                ].map(([l, v]) => (
                  <div key={l} className="flex-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--sf-border)" }}>
                    <span className="text-sm text-muted">{l}</span>
                    <span className="text-sm font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "documents" && (
            <div className="card">
              <div className="card-title">📄 Document Intelligence — AI + OCR Extraction</div>
              <div className="alert alert-info">
                🤖 AI has automatically verified 5 of 7 documents using OCR + NLP extraction. Data populated directly into customer profile.
              </div>
              <table>
                <thead>
                  <tr><th>Document</th><th>Status</th><th>AI Extraction Result</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {DOCS.map(d => (
                    <tr key={d.doc}>
                      <td className="font-bold">{d.doc}</td>
                      <td>
                        <span className={`badge ${d.status === "Verified" ? "badge-green" : d.status === "Under Review" ? "badge-orange" : "badge-gray"}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="text-sm text-muted">{d.ai}</td>
                      <td>
                        {d.status === "Pending"
                          ? <button className="btn btn-primary btn-sm">Request Upload</button>
                          : <button className="btn btn-secondary btn-sm">View</button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "interactions" && (
            <div className="card">
              <div className="card-title">🕐 Customer Interaction Timeline</div>
              <div className="timeline">
                {TIMELINE.map((t, i) => (
                  <div key={i} className="timeline-item">
                    <div className={`timeline-dot ${t.type}`} />
                    <div className="timeline-title">{t.event}</div>
                    <div className="timeline-sub">{t.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "loans" && (
            <div className="card">
              <div className="card-title">💰 Loan Portfolio</div>
              <div className="alert alert-info">
                This customer has 1 active loan application in progress. Post-disbursement, the AI Dynamic Risk Model will continuously monitor EMI health.
              </div>
              <div style={{ padding: "16px", background: "var(--sf-bg)", borderRadius: 8, marginTop: 8 }}>
                <div className="flex-between mb-12">
                  <div>
                    <div className="font-bold">Home Loan — Prestige Sunrise, Whitefield</div>
                    <div className="text-sm text-muted">Application L-2891 · Submitted 13 Jun 2025</div>
                  </div>
                  <span className="badge badge-orange">Underwriting</span>
                </div>
                <div className="grid-3" style={{ gap: 16 }}>
                  {[["Loan Amount", "₹45 Lakhs"], ["Tenure", "20 Years"], ["Rate (Floating)", "8.75% p.a."]].map(([l, v]) => (
                    <div key={l}>
                      <div className="text-sm text-muted">{l}</div>
                      <div className="font-bold">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
