import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useApp } from "../../context/AppContext";
import { getMonthlyData } from "../../data/transactions";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", borderRadius: 10, padding: "12px 16px", fontSize: 13 }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 16, color: p.color, fontWeight: 600, marginBottom: 2 }}>
          <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>{p.name}</span>
          <span>₹{p.value.toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceTrendChart() {
  const { state } = useApp();
  const data = getMonthlyData(state.transactions);

  return (
    <div className="card chart-wrapper">
      <div className="card-header" style={{ marginBottom: 16 }}>
        <div>
          <div className="card-title">Balance Trend</div>
          <div className="card-subtitle">Monthly income vs expenses</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#34d399" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f87171" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#7c6aff" stopOpacity={0.3}  />
              <stop offset="95%" stopColor="#7c6aff" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={52} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12, color: "var(--text-secondary)" }} />
          <Area type="monotone" dataKey="income"  name="Income"   stroke="#34d399" strokeWidth={2.5} fill="url(#incomeGrad)"  dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
          <Area type="monotone" dataKey="expense" name="Expenses" stroke="#f87171" strokeWidth={2.5} fill="url(#expenseGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
          <Area type="monotone" dataKey="balance" name="Balance"  stroke="#7c6aff" strokeWidth={2.5} fill="url(#balanceGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}