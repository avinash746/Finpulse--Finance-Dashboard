import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Trophy, TrendingUp, TrendingDown, Flame, Target, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { getCategoryData, getMonthlyData } from "../../data/transactions";
import { formatCurrency } from "../../utils/helpers";
import { subMonths, isThisMonth } from "date-fns";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", borderRadius: 10, padding: "10px 14px", fontSize: 13, boxShadow: "var(--shadow-elevated)" }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 6, color: "var(--text-primary)" }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: ₹{p.value.toLocaleString("en-IN")}
        </div>
      ))}
    </div>
  );
};

export default function Insights() {
  const { state } = useApp();
  const { transactions } = state;

  const catData    = getCategoryData(transactions);
  const monthlyData = getMonthlyData(transactions);

  const topCategory    = catData[0];
  const lowestCategory = catData[catData.length - 1];

  const thisMonthTxns = transactions.filter((t) => isThisMonth(new Date(t.date)));
  const lastMonthTxns = transactions.filter((t) => {
    const d  = new Date(t.date);
    const lm = subMonths(new Date(), 1);
    return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
  });

  const thisMonthExp = thisMonthTxns.filter((t) => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0);
  const lastMonthExp = lastMonthTxns.filter((t) => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0);
  const thisMonthInc = thisMonthTxns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const lastMonthInc = lastMonthTxns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);

  const expDiff            = lastMonthExp > 0 ? ((thisMonthExp - lastMonthExp) / lastMonthExp) * 100 : 0;
  const incDiff            = lastMonthInc > 0 ? ((thisMonthInc - lastMonthInc) / lastMonthInc) * 100 : 0;
  const avgMonthlyExpense  = monthlyData.length > 0 ? monthlyData.reduce((s, m) => s + m.expense, 0) / monthlyData.length : 0;
  const savingsThisMonth   = thisMonthInc - thisMonthExp;

  const insightCards = [
    {
      label: "Top Spending Category",
      value: topCategory?.name || "—",
      desc:  topCategory ? `${formatCurrency(topCategory.value)} spent total` : "No data",
      icon:  Trophy,
      color: "var(--accent-warning)",
      bg:    "rgba(251, 191, 36, 0.12)",
    },
    {
      label: "Monthly Savings",
      value: formatCurrency(Math.abs(savingsThisMonth)),
      desc:  savingsThisMonth >= 0 ? "Positive cash flow this month 🎉" : "Spending exceeded income",
      icon:  savingsThisMonth >= 0 ? TrendingUp : TrendingDown,
      color: savingsThisMonth >= 0 ? "var(--accent-success)" : "var(--accent-danger)",
      bg:    savingsThisMonth >= 0 ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
    },
    {
      label: "Expense vs Last Month",
      value: lastMonthExp > 0 ? `${Math.abs(expDiff).toFixed(1)}%` : "—",
      desc:  lastMonthExp > 0 ? (expDiff > 0 ? `Spent ${expDiff.toFixed(1)}% more than last month` : `Spent ${Math.abs(expDiff).toFixed(1)}% less than last month`) : "No prior month data",
      icon:  expDiff > 0 ? Flame : Target,
      color: expDiff > 0 ? "var(--accent-danger)" : "var(--accent-success)",
      bg:    expDiff > 0 ? "rgba(248,113,113,0.12)" : "rgba(52,211,153,0.12)",
    },
    {
      label: "Avg Monthly Expense",
      value: formatCurrency(avgMonthlyExpense),
      desc:  `Based on ${monthlyData.length} months of data`,
      icon:  Sparkles,
      color: "var(--accent-primary)",
      bg:    "rgba(124,106,255,0.12)",
    },
    {
      label: "Income vs Last Month",
      value: lastMonthInc > 0 ? `${Math.abs(incDiff).toFixed(1)}%` : "—",
      desc:  lastMonthInc > 0 ? (incDiff >= 0 ? `Earned ${incDiff.toFixed(1)}% more than last month` : `Earned ${Math.abs(incDiff).toFixed(1)}% less than last month`) : "No prior month income",
      icon:  incDiff >= 0 ? TrendingUp : TrendingDown,
      color: incDiff >= 0 ? "var(--accent-success)" : "var(--accent-danger)",
      bg:    incDiff >= 0 ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
    },
    {
      label: "Least Spent Category",
      value: lowestCategory?.name || "—",
      desc:  lowestCategory ? `Only ${formatCurrency(lowestCategory.value)} spent` : "No data",
      icon:  Target,
      color: "var(--accent-secondary)",
      bg:    "rgba(79,209,199,0.12)",
    },
  ];

  const comparisonRows = monthlyData.slice(-4).reverse().map((m) => ({
    month:   m.month,
    income:  m.income,
    expense: m.expense,
    balance: m.balance,
  }));

  return (
    <main className="page-content">
      {/* Insight Cards */}
      <div className="insights-grid">
        {insightCards.map(({ label, value, desc, icon: Icon, color, bg }) => (
          <div className="insight-card" key={label}>
            <div className="insight-icon" style={{ background: bg }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <div className="insight-label">{label}</div>
              <div className="insight-value" style={{ color, fontSize: 18, marginTop: 4 }}>{value}</div>
            </div>
            <div className="insight-desc">{desc}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="card chart-wrapper">
        <div className="card-header" style={{ marginBottom: 16 }}>
          <div>
            <div className="card-title">Spending by Category</div>
            <div className="card-subtitle">All-time total by expense category</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={catData.slice(0, 8)} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} interval={0} angle={-30} textAnchor="end" height={50} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={52} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" name="Spent" radius={[6, 6, 0, 0]}>
              {catData.slice(0, 8).map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Comparison Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Monthly Comparison</div>
            <div className="card-subtitle">Last 4 months breakdown</div>
          </div>
        </div>
        <div className="card-body">
          {comparisonRows.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-title">No monthly data available</div>
            </div>
          ) : (
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Income</th>
                  <th>Expenses</th>
                  <th>Net Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => {
                  const prev     = comparisonRows[i + 1];
                  const improved = prev ? row.balance > prev.balance : null;
                  return (
                    <tr key={row.month}>
                      <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{row.month}</td>
                      <td style={{ color: "var(--accent-success)", fontWeight: 600 }}>{formatCurrency(row.income)}</td>
                      <td style={{ color: "var(--accent-danger)",  fontWeight: 600 }}>{formatCurrency(row.expense)}</td>
                      <td style={{ fontWeight: 700, fontFamily: "var(--font-display)", color: row.balance >= 0 ? "var(--accent-success)" : "var(--accent-danger)" }}>
                        {row.balance >= 0 ? "+" : ""}{formatCurrency(row.balance)}
                      </td>
                      <td>
                        {improved !== null && (
                          <span className={`badge ${improved ? "badge-up" : "badge-down"}`}>
                            {improved ? "▲ Better" : "▼ Worse"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}