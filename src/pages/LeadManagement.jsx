import { useState } from "react";

const CHANNELS = ["All", "Mobile App", "Website", "Branch Walk-in", "Chatbot", "Partner Referral", "RM Outreach"];
const TYPES = ["All", "Home Loan", "Plot + Construction", "Home Improvement", "Builder Loan", "MFI / Housing Board"];

const LEADS = [
  { id: "L-2891", name: "Arjun Mehta", phone: "+91 98765 43210", channel: "Mobile App", type: "Home Loan", amount: "₹45L", location: "Whitefield, Bengaluru", date: "13 Jun 2025", stage: "Underwriting", source: "Google Ad", score: 82 },
  { id: "L-2890", name: "Sunita Rao", phone: "+91 87654 32109", channel: "Website", type: "Home Loan", amount: "₹62L", location: "Jubilee Hills, Hyderabad", date: "12 Jun 2025", stage: "Document Collection", source: "Organic Search", score: 74 },
  { id: "L-2889", name: "Ravi Constructions Pvt", phone: "+91 99887 76655", channel: "Branch Walk-in", type: "Builder Loan", amount: "₹5.2 Cr", location: "Thiruvanmiyur, Chennai", date: "12 Jun 2025", stage: "DPR Review", source: "Direct", score: 68 },
  { id: "L-2888", name: "Priya Nair", phone: "+91 76543 21098", channel: "Chatbot", type: "Home Loan", amount: "₹38L", location: "Vashi, Navi Mumbai", date: "11 Jun 2025", stage: "Sanctioned", source: "Chatbot", score: 91 },
  { id: "L-2887", name: "Deepak Kumar", phone: "+91 65432 10987", channel: "Partner Referral", type: "Plot + Construction", amount: "₹55L", location: "Sector 56, Gurugram", date: "11 Jun 2025", stage: "New Enquiry", source: "Partner", score: 61 },
  { id: "L-2886", name: "Tamil Housing Board", phone: "+91 44 2345 6789", channel: "RM Outreach", type: "MFI / Housing Board", amount: "₹18 Cr", location: "Madurai", date: "10 Jun 2025", stage: "Application Filed", source: "RM Outreach", score: 78 },
];

export default function LeadManagement() {
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = LEADS.filter(l =>
    (filter === "All" || l.channel === filter) &&
    (typeFilter === "All" || l.type === typeFilter) &&
    (search === "" || l.name.toLowerCase().includes(search.toLowerCase()) || l.id.includes(search))
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Lead & Enquiry Management</h1>
          <p className="page-subtitle">Omnichannel capture — mobile app, web, chatbot, branch, partners</p>
        </div>
        <div className="flex gap-8">
          <span className="ai-chip">🤖 AI Lead Scoring Active</span>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ New Enquiry</button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-20">
          <div className="card-title">📝 New Lead Capture</div>
          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Applicant name" />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input className="form-input" placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" placeholder="email@example.com" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Loan Type</label>
              <select className="form-input">
                <option>Home Loan</option>
                <option>Plot + Construction</option>
                <option>Home Improvement</option>
                <option>Builder Loan (Wholesale)</option>
                <option>MFI / Housing Board</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Loan Amount Required</label>
              <input className="form-input" placeholder="₹ Amount" />
            </div>
            <div className="form-group">
              <label className="form-label">Property Location</label>
              <input className="form-input" placeholder="City / Locality" />
            </div>
            <div className="form-group">
              <label className="form-label">Lead Source / Channel</label>
              <select className="form-input">
                {CHANNELS.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-8 mt-8">
            <button className="btn btn-primary">Save & Assign</button>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid-4 mb-20">
        {[
          { label: "Total Leads (MTD)", value: "317", icon: "🎯" },
          { label: "Converted", value: "89", icon: "✅" },
          { label: "Pending Follow-up", value: "62", icon: "🕐" },
          { label: "Avg. Response Time", value: "1.4 hrs", icon: "⚡" },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div className="stat-value" style={{ fontSize: 20, marginTop: 6 }}>{s.value}</div>
            <div className="text-sm text-muted mt-4">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card mb-20">
        <div className="flex-between mb-16">
          <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
            {CHANNELS.map(c => (
              <button key={c} className={`tab ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-8 mb-16" style={{ flexWrap: "wrap" }}>
          {TYPES.map(t => (
            <button key={t} className={`tab ${typeFilter === t ? "active" : ""}`} onClick={() => setTypeFilter(t)}>{t}</button>
          ))}
        </div>
        <input className="form-input" style={{ maxWidth: 300 }} placeholder="🔍 Search by name or lead ID" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <div className="card-title">🎯 Active Leads ({filtered.length})</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Applicant</th><th>Channel</th><th>Loan Type</th>
                <th>Amount</th><th>Location</th><th>Stage</th><th>AI Score</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id}>
                  <td className="text-blue font-bold">{l.id}</td>
                  <td>
                    <div className="font-bold">{l.name}</div>
                    <div className="text-sm text-muted">{l.phone}</div>
                  </td>
                  <td><span className="badge badge-gray">{l.channel}</span></td>
                  <td>{l.type}</td>
                  <td className="font-bold">{l.amount}</td>
                  <td className="text-muted text-sm">{l.location}</td>
                  <td>
                    <span className={`badge ${l.stage === "Sanctioned" ? "badge-green" : l.stage === "Underwriting" ? "badge-blue" : l.stage === "New Enquiry" ? "badge-orange" : "badge-gray"}`}>
                      {l.stage}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-8" style={{ alignItems: "center" }}>
                      <div className="progress-bar" style={{ width: 50 }}>
                        <div className="progress-fill blue" style={{ width: `${l.score}%` }} />
                      </div>
                      <span className="font-bold text-sm">{l.score}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-secondary btn-sm">View</button>
                      <button className="btn btn-primary btn-sm">Follow Up</button>
                    </div>
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
