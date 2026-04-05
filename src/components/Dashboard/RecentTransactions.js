import React from "react";
import { ArrowLeftRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatCurrency, formatShortDate } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/transactions";

export default function RecentTransactions() {
  const { state, dispatch } = useApp();
  const recent = state.transactions.slice(0, 6);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Recent Transactions</div>
          <div className="card-subtitle">Last 6 transactions</div>
        </div>
        <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}
          onClick={() => dispatch({ type: "SET_TAB", payload: "transactions" })}>
          View All
        </button>
      </div>
      <div className="card-body" style={{ paddingTop: 16 }}>
        {recent.length === 0 ? (
          <div className="empty-state">
            <ArrowLeftRight size={32} />
            <span className="empty-state-title">No transactions yet</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {recent.map((t) => {
              const color = CATEGORY_COLORS[t.category] || "#94a3b8";
              return (
                <div key={t.id}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderRadius: 8, transition: "background 0.15s", cursor: "default" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-elevated)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}1a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
                    {t.type === "income" ? "↑" : "↓"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.description}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 6, alignItems: "center", marginTop: 1 }}>
                      <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
                      {t.category} · {formatShortDate(t.date)}
                    </div>
                  </div>
                  <div className={`tx-amount ${t.type}`} style={{ fontSize: 13 }}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(Math.abs(t.amount))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}