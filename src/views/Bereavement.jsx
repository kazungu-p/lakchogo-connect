import React from "react";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import Card from "../components/Card";
import Pill from "../components/Pill";
import { COLORS } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { BEREAVEMENT_HISTORY, BEREAVEMENT_TARGET } from "../data/payments";

export default function Bereavement() {
  const { members: allMembers } = useAuth();
  const members = allMembers.filter((m) => m.memberStatus === "active");
  const current = BEREAVEMENT_HISTORY[BEREAVEMENT_HISTORY.length - 1].amount;
  const pct = Math.round((current / BEREAVEMENT_TARGET) * 100);
  const contributingCount = members.filter((m) => m.status["Bereavement Fund"] === "paid").length;

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-lg">Bereavement Fund</h2>
          <TrendingUp size={16} style={{ color: COLORS.gold }} />
        </div>
        <div className="flex flex-wrap items-end gap-x-2 gap-y-0 mb-4">
          <span style={{ fontFamily: "IBM Plex Mono, monospace" }} className="text-2xl sm:text-3xl">KES {current.toLocaleString()}</span>
          <span className="text-sm mb-1" style={{ color: COLORS.muted }}>of {BEREAVEMENT_TARGET.toLocaleString()} target</span>
        </div>
        <div style={{ background: COLORS.surface2 }} className="w-full h-2.5 rounded-full overflow-hidden mb-1">
          <div style={{ background: COLORS.gold, width: `${pct}%` }} className="h-full rounded-full" />
        </div>
        <div className="text-xs" style={{ color: COLORS.muted }}>
          {pct}% funded · {contributingCount} of {members.length} members contributing
        </div>
        <div style={{ height: 200 }} className="mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BEREAVEMENT_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
              <XAxis dataKey="month" stroke={COLORS.muted} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={COLORS.muted} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} width={32} />
              <Tooltip
                contentStyle={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }}
                formatter={(v) => [`KES ${v.toLocaleString()}`, "Collected"]}
              />
              <Bar dataKey="amount" fill={COLORS.gold} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <h3 className="text-sm font-medium mb-4">Contribution status by member</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {members.map((m) => (
            <div key={m.id} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg" style={{ background: COLORS.surface2 }}>
              <span className="truncate">{m.name}</span>
              <Pill status={m.status["Bereavement Fund"]} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
