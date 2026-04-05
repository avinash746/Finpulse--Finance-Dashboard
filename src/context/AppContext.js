import React, { createContext, useContext, useReducer, useEffect } from "react";
import { transactions as initialTransactions } from "../data/transactions";

const AppContext = createContext(null);
const STORAGE_KEY = "finance_dashboard_state";

const initialState = {
  transactions: initialTransactions,
  role: "viewer",
  theme: "dark",
  filters: {
    search: "",
    category: "all",
    type: "all",
    sortBy: "date",
    sortDir: "desc",
  },
  activeTab: "dashboard",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":        return { ...state, role: action.payload };
    case "SET_THEME":       return { ...state, theme: action.payload };
    case "SET_FILTER":      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_TAB":         return { ...state, activeTab: action.payload };
    case "ADD_TRANSACTION": return { ...state, transactions: [action.payload, ...state.transactions] };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default: return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...init,
          role: parsed.role || init.role,
          theme: parsed.theme || init.theme,
          transactions: parsed.transactions
            ? parsed.transactions.map((t) => ({ ...t, date: new Date(t.date) }))
            : init.transactions,
        };
      }
    } catch (e) {}
    return init;
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        role: state.role,
        theme: state.theme,
        transactions: state.transactions,
      })
    );
  }, [state.role, state.theme, state.transactions]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function useFilteredTransactions() {
  const { state } = useApp();
  const { transactions, filters } = state;
  let filtered = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }
  if (filters.category !== "all") {
    filtered = filtered.filter((t) => t.category === filters.category);
  }
  if (filters.type !== "all") {
    filtered = filtered.filter((t) => t.type === filters.type);
  }

  filtered.sort((a, b) => {
    let aVal, bVal;
    if (filters.sortBy === "date") {
      aVal = new Date(a.date).getTime();
      bVal = new Date(b.date).getTime();
    } else if (filters.sortBy === "amount") {
      aVal = Math.abs(a.amount);
      bVal = Math.abs(b.amount);
    } else {
      aVal = a[filters.sortBy];
      bVal = b[filters.sortBy];
    }
    return filters.sortDir === "desc" ? bVal - aVal : aVal - bVal;
  });

  return filtered;
}