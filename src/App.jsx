import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LeadManagement from "./pages/LeadManagement";
import Customer360 from "./pages/Customer360";
import LoanOrigination from "./pages/LoanOrigination";
import PropertyAppreciation from "./pages/PropertyAppreciation";
import DPRViability from "./pages/DPRViability";
import Collections from "./pages/Collections";
import AIAdvisor from "./pages/AIAdvisor";
import RiskScoring from "./pages/RiskScoring";
import "./App.css";

const PAGES = {
  dashboard: Dashboard,
  leads: LeadManagement,
  customer360: Customer360,
  loan: LoanOrigination,
  property: PropertyAppreciation,
  dpr: DPRViability,
  collections: Collections,
  advisor: AIAdvisor,
  risk: RiskScoring,
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const PageComponent = PAGES[activePage] || Dashboard;

  return (
    <div className="app-root">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <main className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <PageComponent />
      </main>
    </div>
  );
}
