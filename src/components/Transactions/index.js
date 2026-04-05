import React, { useState } from "react";
import { Search, Plus, ChevronUp, ChevronDown, Pencil, Trash2, Download, ArrowLeftRight } from "lucide-react";
import { useApp, useFilteredTransactions } from "../../context/AppContext";
import { CATEGORIES, CATEGORY_COLORS } from "../../data/transactions";
import { formatCurrency, formatDate } from "../../utils/helpers";
import TransactionModal from "./TransactionModal";

const SortIcon = ({ field, current, dir }) => {
  if (current !== field) return <ChevronUp size={12} style={{ opacity: 0.3 }} />;
  return dir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />;
};

export default function Transactions() {
  const { state, dispatch } = useApp();
  const filtered = useFilteredTransactions();
  const [modalOpen, setModalOpen]       = useState(false);
  const [editTx, setEditTx]             = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const isAdmin = state.role === "admin";
  const { filters } = state;
  const setFilter = (patch) => dispatch({ type: "SET_FILTER", payload: patch });

  const toggleSort = (field) => {
    if (filters.sortBy === field) setFilter({ sortDir: filters.sortDir === "desc" ? "asc" : "desc" });
    else setFilter({ sortBy: field, sortDir: "desc" });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
    setDeleteConfirm(null);
  };

  const exportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const rows    = filtered.map((t) => [formatDate(t.date), t.description, t.category, t.type, t.amount]);
    const csv     = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob    = new Blob([csv], { type: "text/csv" });
    const url     = URL.createObjectURL(blob);
    const a       = document.createElement("a");
    a.href = url; a.download = "transactions.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const cols = [
    { key: "date",        label: "Date"        },
    { key: "description", label: "Description" },
    { key: "category",    label: "Category"    },
    { key: "type",        label: "Type"        },
    { key: "amount",      label: "Amount"      },
  ];

  return (
    <main className="page-content">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </div>
          <div className="card-subtitle">Showing filtered results</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={exportCSV}><Download size={14} /> Export</button>
          {isAdmin && (
            <button className="btn btn-primary" onClick={() => { setEditTx(null); setModalOpen(true); }}>
              <Plus size={14} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: "16px 20px" }}>
        <div className="filters-bar">
          <div className="search-box">
            <Search size={14} />
            <input placeholder="Search transactions..." value={filters.search} onChange={(e) => setFilter({ search: e.target.value })} />
          </div>
          <select className="filter-select" value={filters.category} onChange={(e) => setFilter({ category: e.target.value })}>
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="filter-select" value={filters.type} onChange={(e) => setFilter({ type: e.target.value })}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {(filters.search || filters.category !== "all" || filters.type !== "all") && (
            <button className="btn btn-secondary" style={{ padding: "8px 12px", fontSize: 12 }}
              onClick={() => setFilter({ search: "", category: "all", type: "all" })}>Clear</button>
          )}
        </div>
      </div>

      <div className="tx-table-wrap">
        <table className="tx-table">
          <thead>
            <tr>
              {cols.map((col) => (
                <th key={col.key} className={filters.sortBy === col.key ? "sorted" : ""} onClick={() => toggleSort(col.key)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {col.label}
                    <SortIcon field={col.key} current={filters.sortBy} dir={filters.sortDir} />
                  </div>
                </th>
              ))}
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={isAdmin ? 6 : 5}>
                <div className="empty-state">
                  <ArrowLeftRight size={32} />
                  <div className="empty-state-title">No transactions found</div>
                  <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
                </div>
              </td></tr>
            ) : (
              filtered.map((t) => {
                const color = CATEGORY_COLORS[t.category] || "#94a3b8";
                return (
                  <tr key={t.id}>
                    <td className="tx-date">{formatDate(t.date)}</td>
                    <td><div className="tx-description">{t.description}</div></td>
                    <td>
                      <span className="tx-category-badge" style={{ background: `${color}18`, color }}>
                        <span className="tx-category-dot" style={{ background: color }} />
                        {t.category}
                      </span>
                    </td>
                    <td><span className={`tx-type-badge ${t.type}`}>{t.type}</span></td>
                    <td>
                      <span className={`tx-amount ${t.type}`}>
                        {t.type === "income" ? "+" : "-"}{formatCurrency(Math.abs(t.amount))}
                      </span>
                    </td>
                    {isAdmin && (
                      <td>
                        <div className="tx-actions">
                          <button className="icon-btn" title="Edit" onClick={() => { setEditTx(t); setModalOpen(true); }}><Pencil size={13} /></button>
                          <button className="icon-btn danger" title="Delete" onClick={() => setDeleteConfirm(t.id)}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <TransactionModal transaction={editTx} onClose={() => { setModalOpen(false); setEditTx(null); }} />
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Delete Transaction?</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 8 }}>
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}