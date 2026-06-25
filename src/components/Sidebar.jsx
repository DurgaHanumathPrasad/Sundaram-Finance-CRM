import "./Sidebar.css";

const NAV_ITEMS = [
  { key: "dashboard", icon: "📊", label: "Dashboard" },
  { key: "leads", icon: "🎯", label: "Lead Management" },
  { key: "customer360", icon: "👤", label: "Customer 360°" },
  { key: "loan", icon: "📋", label: "Loan Origination" },
  { key: "property", icon: "🏠", label: "Property Appreciation AI" },
  { key: "dpr", icon: "📁", label: "DPR Viability Engine" },
  { key: "risk", icon: "⚡", label: "AI Risk Scoring" },
  { key: "collections", icon: "💰", label: "Collections & Service" },
  { key: "advisor", icon: "🤖", label: "AI Financial Advisor" },
];

export default function Sidebar({ activePage, setActivePage, open, setOpen }) {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-header" onClick={() => setOpen(!open)}>
        <div className="sidebar-logo">
          <span className="logo-icon">🏦</span>
          {open && (
            <div>
              <div className="logo-name">Sundaram Finance</div>
              <div className="logo-sub">CRM Platform</div>
            </div>
          )}
        </div>
        <button className="sidebar-toggle">{open ? "◀" : "▶"}</button>
      </div>

      {open && <div className="sidebar-section-label">Main Navigation</div>}

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activePage === item.key ? "active" : ""}`}
            onClick={() => setActivePage(item.key)}
            title={!open ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {open && <span className="nav-label">{item.label}</span>}
            {open && activePage === item.key && <span className="nav-dot" />}
          </button>
        ))}
      </nav>

      {open && (
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">RS</div>
            <div>
              <div className="user-name">Rahul Sharma</div>
              <div className="user-role">Senior RM</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
