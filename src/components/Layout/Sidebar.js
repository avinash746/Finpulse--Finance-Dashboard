import React from "react";
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";
import { useApp } from "../../context/AppContext";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard  },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight   },
  { id: "insights",     label: "Insights",     icon: Lightbulb        },
];

export default function Sidebar({ open, onClose }) {
  const { state, dispatch } = useApp();

  return (
    <>
      <div className={`sidebar-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-icon">F</div>
            <span className="logo-text">Fin<span>Pulse</span></span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-label">Navigation</span>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${state.activeTab === id ? "active" : ""}`}
              onClick={() => { dispatch({ type: "SET_TAB", payload: id }); onClose(); }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div style={{ fontSize: 12, color: "var(--text-muted)", padding: "0 4px" }}>
            <div style={{ fontWeight: 600, marginBottom: 2, color: "var(--text-secondary)" }}>
              Current Role
            </div>
            <div style={{
              display: "inline-block", padding: "2px 10px", borderRadius: 999,
              background: state.role === "admin" ? "rgba(124,106,255,0.12)" : "rgba(136,136,170,0.1)",
              color: state.role === "admin" ? "var(--accent-primary)" : "var(--text-muted)",
              fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", marginTop: 4,
            }}>
              {state.role}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}