import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../../context/AppContext";
import { getCategoryData } from "../../data/transactions";
import { formatCurrency } from "../../utils/helpers";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", borderRadius: 10, padding: "10px 14px", fontSize: 13 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.payload.color }} />
        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.name}</span>
      </div>
      <div style={{ color: item.payload.color, fontWeight: 700 }}>{formatCurrency(item.value)}</div>
    </div>
  );
};

export default function SpendingBreakdownChart() {
  const { state } = useApp();
  const data  = getCategoryData(state.transactions).slice(0, 6);
  const [active, setActive] = useState(null);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="card chart-wrapper">
      <div className="card-header" style={{ marginBottom: 16 }}>
        <div>
          <div className="card-title">Spending Breakdown</div>
          <div className="card-subtitle">Top 6 expense categories</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", width: "100%", height: 200 }}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value"
                onMouseEnter={(_, idx) => setActive(idx)} onMouseLeave={() => setActive(null)}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={entry.color} opacity={active === null || active === index ? 1 : 0.4} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--text-primary)", lineHeight: 1 }}>
              {formatCurrency(total)}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Total Spent</div>
          </div>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
          {data.map((item, idx) => (
            <div key={item.name}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", borderRadius: 8,
                background: active === idx ? "var(--bg-elevated)" : "transparent", transition: "background 0.15s", cursor: "default" }}
              onMouseEnter={() => setActive(idx)} onMouseLeave={() => setActive(null)}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{item.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{((item.value / total) * 100).toFixed(1)}%</span>
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-display)", color: item.color }}>
                  {formatCurrency(item.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}