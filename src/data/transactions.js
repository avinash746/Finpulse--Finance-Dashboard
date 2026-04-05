import { subDays, subMonths, format } from "date-fns";

const today = new Date();

export const CATEGORIES = [
  "Food & Dining", "Transport", "Shopping", "Entertainment",
  "Health", "Utilities", "Salary", "Freelance",
  "Investment", "Rent", "Education", "Travel",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#f97316",
  Transport:       "#3b82f6",
  Shopping:        "#a855f7",
  Entertainment:   "#ec4899",
  Health:          "#22c55e",
  Utilities:       "#eab308",
  Salary:          "#14b8a6",
  Freelance:       "#06b6d4",
  Investment:      "#10b981",
  Rent:            "#ef4444",
  Education:       "#8b5cf6",
  Travel:          "#f59e0b",
};

export const generateTransactions = () => {
  const transactions = [
    { id: "t1",  date: subDays(today, 1),  description: "Grocery Store",      category: "Food & Dining", amount: -2840,  type: "expense" },
    { id: "t2",  date: subDays(today, 2),  description: "Monthly Salary",     category: "Salary",        amount: 95000,  type: "income"  },
    { id: "t3",  date: subDays(today, 3),  description: "Uber Ride",          category: "Transport",     amount: -320,   type: "expense" },
    { id: "t4",  date: subDays(today, 4),  description: "Netflix",            category: "Entertainment", amount: -649,   type: "expense" },
    { id: "t5",  date: subDays(today, 5),  description: "Electricity Bill",   category: "Utilities",     amount: -1850,  type: "expense" },
    { id: "t6",  date: subDays(today, 6),  description: "Freelance Project",  category: "Freelance",     amount: 25000,  type: "income"  },
    { id: "t7",  date: subDays(today, 7),  description: "Amazon Shopping",    category: "Shopping",      amount: -4200,  type: "expense" },
    { id: "t8",  date: subDays(today, 8),  description: "Gym Membership",     category: "Health",        amount: -1500,  type: "expense" },
    { id: "t9",  date: subDays(today, 9),  description: "Metro Pass",         category: "Transport",     amount: -500,   type: "expense" },
    { id: "t10", date: subDays(today, 10), description: "Restaurant Dinner",  category: "Food & Dining", amount: -1250,  type: "expense" },
    { id: "t11", date: subDays(today, 11), description: "Online Course",      category: "Education",     amount: -3999,  type: "expense" },
    { id: "t12", date: subDays(today, 12), description: "Stock Dividend",     category: "Investment",    amount: 8500,   type: "income"  },
    { id: "t13", date: subDays(today, 13), description: "House Rent",         category: "Rent",          amount: -18000, type: "expense" },
    { id: "t14", date: subDays(today, 14), description: "Coffee Shop",        category: "Food & Dining", amount: -450,   type: "expense" },
    { id: "t15", date: subDays(today, 15), description: "Flight Tickets",     category: "Travel",        amount: -12500, type: "expense" },

    { id: "t16", date: subMonths(today, 1),                      description: "Monthly Salary",    category: "Salary",        amount: 95000,  type: "income"  },
    { id: "t17", date: subDays(subMonths(today, 1), 2),          description: "Grocery Store",     category: "Food & Dining", amount: -3200,  type: "expense" },
    { id: "t18", date: subDays(subMonths(today, 1), 5),          description: "House Rent",        category: "Rent",          amount: -18000, type: "expense" },
    { id: "t19", date: subDays(subMonths(today, 1), 8),          description: "Freelance Payment", category: "Freelance",     amount: 15000,  type: "income"  },
    { id: "t20", date: subDays(subMonths(today, 1), 10),         description: "Zomato Orders",     category: "Food & Dining", amount: -2100,  type: "expense" },
    { id: "t21", date: subDays(subMonths(today, 1), 12),         description: "Petrol",            category: "Transport",     amount: -2000,  type: "expense" },
    { id: "t22", date: subDays(subMonths(today, 1), 15),         description: "Clothing Purchase", category: "Shopping",      amount: -5500,  type: "expense" },
    { id: "t23", date: subDays(subMonths(today, 1), 18),         description: "Internet Bill",     category: "Utilities",     amount: -999,   type: "expense" },
    { id: "t24", date: subDays(subMonths(today, 1), 20),         description: "Doctor Visit",      category: "Health",        amount: -800,   type: "expense" },
    { id: "t25", date: subDays(subMonths(today, 1), 22),         description: "Spotify Premium",   category: "Entertainment", amount: -119,   type: "expense" },
    { id: "t26", date: subDays(subMonths(today, 1), 25),         description: "Investment Return", category: "Investment",    amount: 6000,   type: "income"  },

    { id: "t27", date: subMonths(today, 2),                      description: "Monthly Salary",    category: "Salary",        amount: 95000,  type: "income"  },
    { id: "t28", date: subDays(subMonths(today, 2), 3),          description: "House Rent",        category: "Rent",          amount: -18000, type: "expense" },
    { id: "t29", date: subDays(subMonths(today, 2), 6),          description: "Grocery Store",     category: "Food & Dining", amount: -2950,  type: "expense" },
    { id: "t30", date: subDays(subMonths(today, 2), 9),          description: "Weekend Trip",      category: "Travel",        amount: -8000,  type: "expense" },
    { id: "t31", date: subDays(subMonths(today, 2), 12),         description: "Electronics",       category: "Shopping",      amount: -15000, type: "expense" },
    { id: "t32", date: subDays(subMonths(today, 2), 15),         description: "Freelance Design",  category: "Freelance",     amount: 20000,  type: "income"  },
    { id: "t33", date: subDays(subMonths(today, 2), 18),         description: "Electricity Bill",  category: "Utilities",     amount: -1700,  type: "expense" },
    { id: "t34", date: subDays(subMonths(today, 2), 21),         description: "Pharmacy",          category: "Health",        amount: -650,   type: "expense" },
    { id: "t35", date: subDays(subMonths(today, 2), 24),         description: "Movie Tickets",     category: "Entertainment", amount: -800,   type: "expense" },

    { id: "t36", date: subMonths(today, 3),                      description: "Monthly Salary",    category: "Salary",        amount: 95000,  type: "income"  },
    { id: "t37", date: subDays(subMonths(today, 3), 2),          description: "House Rent",        category: "Rent",          amount: -18000, type: "expense" },
    { id: "t38", date: subDays(subMonths(today, 3), 5),          description: "Grocery Store",     category: "Food & Dining", amount: -3100,  type: "expense" },
    { id: "t39", date: subDays(subMonths(today, 3), 8),          description: "Car Service",       category: "Transport",     amount: -3500,  type: "expense" },
    { id: "t40", date: subDays(subMonths(today, 3), 11),         description: "Online Shopping",   category: "Shopping",      amount: -2800,  type: "expense" },
    { id: "t41", date: subDays(subMonths(today, 3), 14),         description: "Stock Dividend",    category: "Investment",    amount: 9500,   type: "income"  },
    { id: "t42", date: subDays(subMonths(today, 3), 17),         description: "Water Bill",        category: "Utilities",     amount: -450,   type: "expense" },
    { id: "t43", date: subDays(subMonths(today, 3), 20),         description: "Gym & Spa",         category: "Health",        amount: -2000,  type: "expense" },
    { id: "t44", date: subDays(subMonths(today, 3), 23),         description: "Concert Tickets",   category: "Entertainment", amount: -2500,  type: "expense" },
    { id: "t45", date: subDays(subMonths(today, 3), 26),         description: "Book Store",        category: "Education",     amount: -750,   type: "expense" },

    { id: "t46", date: subMonths(today, 4),                      description: "Monthly Salary",    category: "Salary",        amount: 95000,  type: "income"  },
    { id: "t47", date: subDays(subMonths(today, 4), 3),          description: "House Rent",        category: "Rent",          amount: -18000, type: "expense" },
    { id: "t48", date: subDays(subMonths(today, 4), 6),          description: "Grocery Store",     category: "Food & Dining", amount: -2700,  type: "expense" },
    { id: "t49", date: subDays(subMonths(today, 4), 9),          description: "Flight Booking",    category: "Travel",        amount: -18000, type: "expense" },
    { id: "t50", date: subDays(subMonths(today, 4), 12),         description: "Freelance Work",    category: "Freelance",     amount: 30000,  type: "income"  },
    { id: "t51", date: subDays(subMonths(today, 4), 15),         description: "Mobile Recharge",   category: "Utilities",     amount: -399,   type: "expense" },
    { id: "t52", date: subDays(subMonths(today, 4), 18),         description: "Clothes",           category: "Shopping",      amount: -3200,  type: "expense" },
    { id: "t53", date: subDays(subMonths(today, 4), 21),         description: "Health Insurance",  category: "Health",        amount: -5000,  type: "expense" },
    { id: "t54", date: subDays(subMonths(today, 4), 24),         description: "Investment Return", category: "Investment",    amount: 12000,  type: "income"  },

    { id: "t55", date: subMonths(today, 5),                      description: "Monthly Salary",    category: "Salary",        amount: 95000,  type: "income"  },
    { id: "t56", date: subDays(subMonths(today, 5), 2),          description: "House Rent",        category: "Rent",          amount: -18000, type: "expense" },
    { id: "t57", date: subDays(subMonths(today, 5), 5),          description: "Grocery Store",     category: "Food & Dining", amount: -3300,  type: "expense" },
    { id: "t58", date: subDays(subMonths(today, 5), 8),          description: "Auto Rickshaw",     category: "Transport",     amount: -280,   type: "expense" },
    { id: "t59", date: subDays(subMonths(today, 5), 11),         description: "Amazon Shopping",   category: "Shopping",      amount: -6800,  type: "expense" },
    { id: "t60", date: subDays(subMonths(today, 5), 14),         description: "Electricity Bill",  category: "Utilities",     amount: -2100,  type: "expense" },
    { id: "t61", date: subDays(subMonths(today, 5), 17),         description: "Dental Checkup",    category: "Health",        amount: -1200,  type: "expense" },
    { id: "t62", date: subDays(subMonths(today, 5), 20),         description: "OTT Subscriptions", category: "Entertainment", amount: -999,   type: "expense" },
    { id: "t63", date: subDays(subMonths(today, 5), 23),         description: "Stock Dividend",    category: "Investment",    amount: 7500,   type: "income"  },
    { id: "t64", date: subDays(subMonths(today, 5), 26),         description: "Workshop Fee",      category: "Education",     amount: -2500,  type: "expense" },
  ];
  return transactions.sort((a, b) => b.date - a.date);
};

export const transactions = generateTransactions();

export const getMonthlyData = (txns) => {
  const months = {};
  txns.forEach((t) => {
    const key = format(t.date, "MMM yyyy");
    if (!months[key]) months[key] = { month: key, income: 0, expense: 0, balance: 0 };
    if (t.type === "income") months[key].income += t.amount;
    else months[key].expense += Math.abs(t.amount);
  });
  return Object.values(months)
    .map((m) => ({ ...m, balance: m.income - m.expense }))
    .reverse();
};

export const getCategoryData = (txns) => {
  const cats = {};
  txns
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!cats[t.category]) cats[t.category] = 0;
      cats[t.category] += Math.abs(t.amount);
    });
  return Object.entries(cats)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || "#94a3b8" }))
    .sort((a, b) => b.value - a.value);
};