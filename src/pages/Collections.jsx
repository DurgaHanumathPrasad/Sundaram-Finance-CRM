import { useState } from "react";

const OVERDUE = [
  { id: "L-2831", name: "Vikram Singh", amount: "₹38L", emi: "₹34,200", overdue: 32, dpd: "30-60 DPD", bucket: "Soft", lastContact: "5 days ago", score: 54 },
  { id: "L-2701", name: "Rahul Dev", amount: "₹29L", emi: "₹26,800", overdue: 68, dpd: "60-90 DPD", bucket: "Hard", lastContact: "12 days ago", score: 41 },
  { id: "L-2654", name: "Anjali Sharma", amount: "₹51L", emi: "₹46,500", overdue: 5, dpd: "1-30 DPD", bucket: "Reminder", lastContact: "2 days ago", score: 72 },
  { id: "L-2621", name: "Mohammed Rafi", amount: "₹44L", emi: "₹39,900", overdue: 95, dpd: ">90 DPD", bucket: "NPA", lastContact: "22 days ago", score: 38 },
];

const TICKETS = [
  { id: "T-1241", type: "Statement Request", customer: "Priya Nair", status: "Open", priority: "Low", date: "13 Jun" },
  { id: "T-1240", type: "Part Payment Request", customer: "Arjun Mehta", status: "In Progress", priority: "Medium", date: "12 Jun" },
  { id: "T-1239", type: "NOC Request", customer: "Meera Pillai", status: "Resolved", priority: "High", date: "11 Jun" },
  { id: "T-1238", type: "EMI Date Change", customer: "Rahul Dev", status: "Open", priority: "Medium", date: "10 Jun" },
];

export default function Collections() {
  const [tab, setTab] = useState("overdue");

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Collections & Service</h1>
          <p className="page-subtitle">Overdue EMI management, service tickets, AI-triggered reminders</p>
        </div>
        <span className="ai-chip">🤖 AI Reminder Engine Active</span>
      </div>

      <div className="grid-4 mb-20">
        {[
          { label: "Overdue Cases", value: "28", icon: "⚠️", cls: "red" },
          { label: "Total Overdue (₹)", value: "₹1.24 Cr", icon: "💰", cls: "gold" },
          { label: "Open Tickets", value: "47", icon: "🎫", cls: "blue" },
          { label: "Resolved Today", value: "12", icon: "✅", cls: "teal" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {["overdue", "tickets"].map(t => (
          <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "overdue" ? "⚠️ Overdue EMIs" : "🎫 Service Tickets"}
          </button>
        ))}
      </div>

      {tab === "overdue" && (
        <>
          <div className="alert alert-info mb-20">
            🤖 AI has sent automated reminders to 18 borrowers in the 1-30 DPD bucket. 3 cases in 60-90 DPD require immediate field visit or legal notice escalation.
          </div>
          <div className="card">
            <div className="card-title">⚠️ Overdue EMI Cases</div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Loan ID</th><th>Borrower</th><th>EMI Amt</th><th>Overdue Days</th><th>DPD Bucket</th><th>Collection Stage</th><th>AI Score</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {OVERDUE.map(o => (
                    <tr key={o.id}>
                      <td className="text-blue font-bold">{o.id}</td>
                      <td>
                        <div className="font-bold">{o.name}</div>
                        <div className="text-sm text-muted">Last contact: {o.lastContact}</div>
                      </td>
                      <td>{o.emi}</td>
                      <td>
                        <span className={`badge ${o.overdue <= 10 ? "badge-orange" : o.overdue <= 60 ? "badge-red" : "badge-red"}`}>
                          {o.overdue} days
                        </span>
                      </td>
                      <td className="text-sm">{o.dpd}</td>
                      <td>
                        <span className={`badge ${o.bucket === "Reminder" ? "badge-orange" : o.bucket === "Soft" ? "badge-gold" : "badge-red"}`}>
                          {o.bucket}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-8" style={{ alignItems: "center" }}>
                          <div className="progress-bar" style={{ width: 40 }}>
                            <div style={{ height: "100%", width: `${o.score}%`, background: o.score >= 70 ? "var(--sf-teal)" : o.score >= 50 ? "var(--sf-gold)" : "var(--sf-danger)", borderRadius: 10 }} />
                          </div>
                          <span className="text-sm font-bold">{o.score}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-8">
                          <button className="btn btn-gold btn-sm">📞 Call</button>
                          <button className="btn btn-danger btn-sm">Escalate</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "tickets" && (
        <div className="card">
          <div className="flex-between mb-16">
            <div className="card-title" style={{ marginBottom: 0 }}>🎫 Service Tickets</div>
            <button className="btn btn-primary btn-sm">+ New Ticket</button>
          </div>
          <table>
            <thead>
              <tr><th>Ticket ID</th><th>Type</th><th>Customer</th><th>Status</th><th>Priority</th><th>Date</th><th>Action</th></tr>
            </thead>
            <tbody>
              {TICKETS.map(t => (
                <tr key={t.id}>
                  <td className="text-blue font-bold">{t.id}</td>
                  <td>{t.type}</td>
                  <td className="font-bold">{t.customer}</td>
                  <td>
                    <span className={`badge ${t.status === "Resolved" ? "badge-green" : t.status === "In Progress" ? "badge-blue" : "badge-orange"}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${t.priority === "High" ? "badge-red" : t.priority === "Medium" ? "badge-orange" : "badge-gray"}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="text-muted text-sm">{t.date}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm">
                      {t.status === "Resolved" ? "View" : "Update"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
