import React from "react";
import Card from "../components/Card";
import Pill from "../components/Pill";
import { COLORS } from "../constants/colors";
import { CATEGORIES } from "../constants/categories";
import { useAuth } from "../context/AuthContext";
import { statusColor, overallStatus } from "../utils/status";

export default function Compliance() {
  const { members: allMembers } = useAuth();
  const members = allMembers.filter((m) => m.memberStatus === "active");

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 sm:p-5" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-lg">Compliance scorecard</h2>
        <p className="text-xs mt-1" style={{ color: COLORS.muted }}>Green means eligible for bereavement assistance today.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr style={{ color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` }} className="text-xs uppercase text-left">
              <th className="px-5 py-3 font-medium">Member</th>
              {CATEGORIES.map((c) => (
                <th key={c} className="px-3 py-3 font-medium">{c.split(" ")[0]}</th>
              ))}
              <th className="px-5 py-3 font-medium">Overall</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td className="px-5 py-3 whitespace-nowrap">{m.name}</td>
                {CATEGORIES.map((c) => (
                  <td key={c} className="px-3 py-3">
                    <span style={{ background: statusColor(m.status[c]) }} className="w-2.5 h-2.5 rounded-full inline-block" />
                  </td>
                ))}
                <td className="px-5 py-3 whitespace-nowrap"><Pill status={overallStatus(m)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
