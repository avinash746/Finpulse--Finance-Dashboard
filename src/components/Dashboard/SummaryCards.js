import React from "react";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { getSummary, formatCurrency } from "../../utils/helpers";

export default function SummaryCards() {
  const { state } = useApp();
  const { income, expenses, totalBalance, savingsRate } = getSummary(state.transactions);

  const cards = [
    { key: "balance", label: "Total Balance",     value: formatCurrency(totalBalance),      sub: "All time net balance",       icon: Wallet,      cls: "balance" },
    { key: "income",  label: "Monthly Income",    value: formatCurrency(income),            sub: "This month's earnings",      icon: TrendingUp,  cls: "income"  },
    { key: "expense", label: "Monthly Expenses",  value: formatCurrency(expenses),          sub: "This month's spending",      icon: TrendingDown,cls: "expense" },
    { key: "savings", label: "Savings Rate",      value: `${savingsRate.toFixed(1)}%`,      sub: income > 0 ? `${formatCurrency(income - expenses)} saved` : "No income data", icon: PiggyBank, cls: "savings" },
  ];

  return (
    <div className="summary-grid">
      {cards.map(({ key, label, value, sub, icon: Icon, cls }) => (
        <div key={key} className={`summary-card ${cls}`}>
          <div className="summary-card-top">
            <span className="summary-card-label">{label}</span>
            <div className={`summary-card-icon ${cls}`}><Icon size={18} /></div>
          </div>
          <div className="summary-card-value">{value}</div>
          <div className="summary-card-sub">{sub}</div>
        </div>
      ))}
    </div>
  );
}