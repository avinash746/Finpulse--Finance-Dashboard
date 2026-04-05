import React from "react";
import { Sun, Moon, Menu } from "lucide-react";
import { useApp } from "../../context/AppContext";

const TAB_TITLES = {
  dashboard:    "Dashboard",
  transactions: "Transactions",
  insights:     "Insights",
};

export default function Topbar({ onMenuClick }) {
  const { state, dispatch } = useApp();

  const toggleTheme = () => {
    const next = state.theme === "dark" ? "light" : "dark";
    dispatch({ type: "SET_THEME", payload: next });
    document.documentElement.setAttribute("data-theme", next);
  };

  const setRole = (role) => dispatch({ type: "SET_ROLE", payload: role });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={18} />
        </button>
        <h1 className="topbar-title">{TAB_TITLES[state.activeTab]}</h1>
      </div>

      <div className="topbar-right">
        <div className="role-switcher">
          <span className="role-label">Role:</span>
          <button className={`role-btn ${state.role === "viewer" ? "active" : ""}`} onClick={() => setRole("viewer")}>Viewer</button>
          <button className={`role-btn ${state.role === "admin"  ? "active" : ""}`} onClick={() => setRole("admin")}>Admin</button>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {state.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}