import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/transactions";
import { generateId } from "../../utils/helpers";
import { format } from "date-fns";

const defaultForm = {
  description: "",
  amount: "",
  category: "Food & Dining",
  type: "expense",
  date: format(new Date(), "yyyy-MM-dd"),
};

export default function TransactionModal({ transaction, onClose }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount:      Math.abs(transaction.amount).toString(),
        category:    transaction.category,
        type:        transaction.type,
        date:        format(new Date(transaction.date), "yyyy-MM-dd"),
      });
    }
  }, [transaction]);

  const validate = () => {
    const e = {};
    if (!form.description.trim())                                      e.description = "Description is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (!form.date)                                                    e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const amt = form.type === "expense" ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount));
    const payload = {
      id:          transaction ? transaction.id : generateId(),
      description: form.description.trim(),
      amount:      amt,
      category:    form.category,
      type:        form.type,
      date:        new Date(form.date),
    };
    dispatch({ type: transaction ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload });
    onClose();
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 className="modal-title" style={{ margin: 0 }}>{transaction ? "Edit Transaction" : "Add Transaction"}</h2>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input className="form-input" placeholder="e.g. Grocery Store" value={form.description} onChange={set("description")} />
          {errors.description && <div style={{ fontSize: 12, color: "var(--accent-danger)", marginTop: 4 }}>{errors.description}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input className="form-input" type="number" placeholder="0" min="0" value={form.amount} onChange={set("amount")} />
            {errors.amount && <div style={{ fontSize: 12, color: "var(--accent-danger)", marginTop: 4 }}>{errors.amount}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-select" value={form.type} onChange={set("type")}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input className="form-input" type="date" value={form.date} onChange={set("date")} />
            {errors.date && <div style={{ fontSize: 12, color: "var(--accent-danger)", marginTop: 4 }}>{errors.date}</div>}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {transaction ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}