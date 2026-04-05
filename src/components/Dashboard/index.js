import React from "react";
import SummaryCards from "./SummaryCards";
import BalanceTrendChart from "./BalanceTrendChart";
import SpendingBreakdownChart from "./SpendingBreakdownChart";
import RecentTransactions from "./RecentTransactions";

export default function Dashboard() {
  return (
    <main className="page-content">
      <SummaryCards />
      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
      <RecentTransactions />
    </main>
  );
}