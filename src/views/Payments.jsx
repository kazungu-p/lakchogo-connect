import React, { useState } from "react";
import { ReceiptText } from "lucide-react";
import Card from "../components/Card";
import RecordPaymentModal from "../components/RecordPaymentModal";
import { COLORS } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function Payments() {
  const { payments } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center justify-between p-4 sm:p-5" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div>
          <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-lg">Payment ledger</h2>
          <p className="text-xs mt-1" style={{ color: COLORS.muted }}>All recorded contributions across categories.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ background: COLORS.gold, color: "#14231F" }}
          className="flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-2 hover:opacity-90 shrink-0"
        >
          <ReceiptText size={14} /> Record payment
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr style={{ color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` }} className="text-xs uppercase text-left">
              <th className="px-5 py-3 font-medium">Member</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Method</th>
              <th className="px-5 py-3 font-medium">Time</th>
              <th className="px-5 py-3 font-medium text-right">Amount (KES)</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td className="px-5 py-3 whitespace-nowrap">{p.member}</td>
                <td className="px-5 py-3 whitespace-nowrap" style={{ color: COLORS.muted }}>{p.category}</td>
                <td className="px-5 py-3 whitespace-nowrap" style={{ color: COLORS.muted }}>{p.method}</td>
                <td className="px-5 py-3 whitespace-nowrap" style={{ color: COLORS.muted }}>{p.time}</td>
                <td className="px-5 py-3 text-right whitespace-nowrap" style={{ fontFamily: "IBM Plex Mono, monospace", color: COLORS.green }}>+{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal ? <RecordPaymentModal onClose={() => setShowModal(false)} /> : null}
    </Card>
  );
}
