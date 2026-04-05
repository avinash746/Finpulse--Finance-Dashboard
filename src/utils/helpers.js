import { format, isThisMonth } from "date-fns";

export const formatCurrency = (amount, showSign = false) => {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(abs);

  if (showSign) return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  return amount < 0 ? `-${formatted}` : formatted;
};

export const formatDate = (date) => format(new Date(date), "dd MMM yyyy");
export const formatShortDate = (date) => format(new Date(date), "dd MMM");

export const getSummary = (transactions) => {
  const currentMonth = transactions.filter((t) => isThisMonth(new Date(t.date)));
  const income   = currentMonth.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = currentMonth.filter((t) => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalBalance = transactions.reduce((s, t) => s + t.amount, 0);
  const savingsRate  = income > 0 ? ((income - expenses) / income) * 100 : 0;
  return { income, expenses, totalBalance, savingsRate };
};

export const generateId = () => `t${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;