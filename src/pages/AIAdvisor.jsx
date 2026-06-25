import { useState } from "react";

const QUICK_ACTIONS = [
  "Compare Fixed vs Floating rate for ₹50L loan",
  "Explain EMI for ₹45L at 8.75% for 20 years",
  "What is FOIR and how does it affect my eligibility?",
  "Property A vs B — which has better appreciation?",
  "Explain prepayment benefits on my home loan",
];

const INITIAL_MSGS = [
  {
    role: "bot", text: "👋 Hello! I'm your AI Financial Advisor powered by Sundaram Finance CRM.\n\nI can help you with:\n• EMI calculations and loan eligibility\n• Fixed vs Floating rate comparison\n• Property appreciation forecasts\n• Understanding your loan statement\n• Prepayment impact analysis\n\nWhat would you like to know?"
  }
];

const BOT_RESPONSES = {
  default: "I'll help you with that! Based on the information available, let me analyse this for you.",
  emi: "For a home loan of ₹45 Lakhs at 8.75% p.a. (floating) over 20 years:\n\n💰 Monthly EMI: ₹39,584\n📊 Total Interest: ₹50,00,160\n📈 Total Amount Payable: ₹95,00,160\n\n💡 Tip: Paying one extra EMI per year reduces your tenure by ~2.5 years and saves ₹8.2L in interest.",
  fixed: "📊 Fixed vs Floating Rate Comparison for ₹50L, 20 years:\n\n🔒 Fixed Rate (9.25%):\n• EMI: ₹45,718\n• Total Interest: ₹59.7L\n• Certainty: High — no rate surprises\n\n📈 Floating Rate (8.75%, current):\n• EMI: ₹43,982\n• Total Interest: ₹55.6L\n• Risk: Linked to RLLR — rises if RBI hikes\n\n✅ AI Recommendation: Floating rate is ₹4.1L cheaper over tenure if rates stay stable. Choose fixed if you value predictability.",
  foir: "📋 FOIR (Fixed Obligation to Income Ratio):\n\n• FOIR = (All monthly EMIs / Gross Monthly Income) × 100\n• Sundaram Finance standard: FOIR ≤ 50%\n\n📊 Your profile (Arjun Mehta):\n• Gross Monthly Income: ₹1,18,333\n• Existing EMIs: ₹12,500\n• New Home Loan EMI: ₹39,584\n• Total EMI: ₹52,084\n• FOIR: 44% ✅ Within norms\n\nYou are eligible. Higher FOIR reduces loan amount.",
  property: "🏠 Property Comparison (AI Appreciation Engine):\n\n📍 Prestige Sunrise, Whitefield:\n• Current: ₹85L | 20yr forecast: ₹152L (base)\n• Driver: Metro Phase 3 + IT expansion\n• Confidence: 78%\n\n📍 Sobha City, Thrissur Rd:\n• Current: ₹72L | 20yr forecast: ₹122L (base)\n• Driver: ORR connectivity\n• Confidence: 65%\n\n✅ AI Recommendation: Prestige Sunrise has stronger growth drivers. Higher current value but better long-term appreciation.",
};

function getBotResponse(text) {
  const t = text.toLowerCase();
  if (t.includes("emi") || t.includes("calculate")) return BOT_RESPONSES.emi;
  if (t.includes("fixed") || t.includes("floating")) return BOT_RESPONSES.fixed;
  if (t.includes("foir") || t.includes("eligib")) return BOT_RESPONSES.foir;
  if (t.includes("property") || t.includes("appreciation") || t.includes("compare")) return BOT_RESPONSES.property;
  return BOT_RESPONSES.default + "\n\nPlease ask about EMI calculations, Fixed vs Floating rates, FOIR, or property appreciation forecasts for specific guidance.";
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState(INITIAL_MSGS);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMsg = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { role: "bot", text: getBotResponse(text) }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Financial Advisor</h1>
          <p className="page-subtitle">Conversational AI that explains EMI, rates, property appreciation, and loan options in plain language</p>
        </div>
        <span className="ai-chip">🤖 NLP Advisor Active</span>
      </div>

      <div className="grid-21">
        {/* Chat */}
        <div className="card">
          <div className="card-title">🤖 AI Financial Advisor — Chat</div>
          <div className="chat-container" style={{ minHeight: 360, maxHeight: 460 }}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="chat-avatar" style={{
                  background: m.role === "bot" ? "linear-gradient(135deg,#1A4A8A,#0D7A6F)" : "#e2eaff",
                  color: m.role === "bot" ? "#fff" : "var(--sf-blue)",
                  fontSize: 16
                }}>
                  {m.role === "bot" ? "🤖" : "👤"}
                </div>
                <div className="chat-bubble" style={{ whiteSpace: "pre-line" }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot">
                <div className="chat-avatar" style={{ background: "linear-gradient(135deg,#1A4A8A,#0D7A6F)", color: "#fff", fontSize: 16 }}>🤖</div>
                <div className="chat-bubble" style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sf-muted)", animation: "pulse 1s infinite" }} />
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sf-muted)", animation: "pulse 1s 0.2s infinite" }} />
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sf-muted)", animation: "pulse 1s 0.4s infinite" }} />
                  <style>{`@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input-row">
            <input
              className="form-input"
              placeholder="Ask about EMI, Fixed vs Floating, FOIR, property appreciation…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMsg(input)}
            />
            <button className="btn btn-primary" onClick={() => sendMsg(input)}>Send</button>
          </div>
        </div>

        {/* Quick actions + context */}
        <div>
          <div className="card mb-20">
            <div className="card-title">⚡ Quick Questions</div>
            {QUICK_ACTIONS.map((q, i) => (
              <button
                key={i}
                className="btn btn-secondary w-full mb-8"
                style={{ textAlign: "left", justifyContent: "flex-start", fontSize: 12 }}
                onClick={() => sendMsg(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="card mb-20">
            <div className="card-title">📊 Active Customer Context</div>
            {[
              ["Customer", "Arjun Mehta"],
              ["Loan Type", "Home Loan"],
              ["Loan Amount", "₹45 Lakhs"],
              ["Property", "Prestige Sunrise"],
              ["Stage", "Underwriting"],
            ].map(([l, v]) => (
              <div key={l} className="flex-between" style={{ padding: "7px 0", borderBottom: "1px solid var(--sf-border)" }}>
                <span className="text-sm text-muted">{l}</span>
                <span className="text-sm font-bold">{v}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title">🤖 AI Capabilities</div>
            {[
              "EMI & eligibility calculator",
              "Fixed vs Floating comparison",
              "FOIR & affordability analysis",
              "Property appreciation forecasts",
              "Prepayment impact analysis",
              "Loan statement explanation",
              "Rate reset & re-pricing alerts",
            ].map((c, i) => (
              <div key={i} className="flex gap-8 mb-8" style={{ alignItems: "center" }}>
                <span style={{ color: "var(--sf-teal)" }}>✓</span>
                <span className="text-sm">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
