import React, { useState } from "react";
import { X, ReceiptText } from "lucide-react";
import { COLORS } from "../constants/colors";
import { CATEGORIES } from "../constants/categories";
import { SUGGESTED_AMOUNTS } from "../data/payments";
import { useAuth } from "../context/AuthContext";

const METHODS = ["Cash", "Bank Transfer", "M-Pesa (manual entry)", "Airtel Money (manual entry)"];

// Used by Admins/Treasurer to log a payment made outside the app (e.g. cash
// handed to the Treasurer at a meeting) against any member's ledger.
export default function RecordPaymentModal({ presetMemberId, onClose }) {
  const { members, recordPayment } = useAuth();
  const activeMembers = members.filter((m) => m.memberStatus !== "removed");

  const [memberId, setMemberId] = useState(presetMemberId || activeMembers[0]?.id || "");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState(SUGGESTED_AMOUNTS[CATEGORIES[0]]);
  const [method, setMethod] = useState(METHODS[0]);
  const [error, setError] = useState("");

  function handleCategoryChange(c) {
    setCategory(c);
    setAmount(SUGGESTED_AMOUNTS[c] || 0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!memberId || !amount || Number(amount) <= 0) {
      setError("Choose a member and enter a valid amount.");
      return;
    }
    recordPayment({ memberId, category, amount: Number(amount), method });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
        className="relative w-full max-w-md rounded-xl p-5 max-h-[90vh] overflow-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-lg flex items-center gap-2">
            <ReceiptText size={18} style={{ color: COLORS.gold }} /> Record a payment
          </h2>
          <button onClick={onClose} style={{ color: COLORS.muted }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs" style={{ color: COLORS.muted }}>Member</label>
            <select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              disabled={!!presetMemberId}
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none disabled:opacity-70"
            >
              {activeMembers.map((m) => (
                <option key={m.id} value={m.id}>{m.name} · {m.id}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs" style={{ color: COLORS.muted }}>Category</label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs" style={{ color: COLORS.muted }}>Amount (KES)</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none"
              />
            </div>
            <div>
              <label className="text-xs" style={{ color: COLORS.muted }}>Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none"
              >
                {METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {error ? <div style={{ color: COLORS.red }} className="text-xs">{error}</div> : null}

          <button
            type="submit"
            style={{ background: COLORS.gold, color: "#14231F" }}
            className="w-full text-sm font-medium rounded-lg py-2.5 mt-2 hover:opacity-90"
          >
            Record payment
          </button>
          <p className="text-[11px] text-center" style={{ color: COLORS.muted }}>
            Marks this category "Paid" immediately and adds it to the ledger.
          </p>
        </form>
      </div>
    </div>
  );
}
