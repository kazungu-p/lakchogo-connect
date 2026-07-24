import React from "react";
import Card from "../components/Card";
import { COLORS } from "../constants/colors";
import { RECENT_PAYMENTS } from "../data/payments";

export default function Payments() {
  // Sample data repeated to fill out the ledger — replace with real API data.
  const rows = RECENT_PAYMENTS.concat(RECENT_PAYMENTS);

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 sm:p-5" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-lg">Payment ledger</h2>
        <p className="text-xs mt-1" style={{ color: COLORS.muted }}>All recorded contributions across categories.</p>
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
            {rows.map((p, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
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
    </Card>
  );
}
