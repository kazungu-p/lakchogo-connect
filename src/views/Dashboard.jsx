import React from "react";
import { Users, Check, Clock, X, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import Card from "../components/Card";
import ComplianceRing from "../components/ComplianceRing";
import { COLORS } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { BEREAVEMENT_HISTORY, BEREAVEMENT_TARGET } from "../data/payments";
import { overallStatus } from "../utils/status";

export default function Dashboard({ setView, setSelectedMember }) {
  const { members: allMembers, payments, currentUser } = useAuth();
  const members = allMembers.filter((m) => m.memberStatus === "active");

  const compliantCount = members.filter((m) => overallStatus(m) === "paid").length;
  const dueCount = members.filter((m) => overallStatus(m) === "due").length;
  const overdueCount = members.filter((m) => overallStatus(m) === "overdue").length;

  const bereavementCurrent = BEREAVEMENT_HISTORY[BEREAVEMENT_HISTORY.length - 1].amount;
  const pct = Math.round((bereavementCurrent / BEREAVEMENT_TARGET) * 100);

  const stats = [
    { label: "Total Members", value: members.length, icon: Users, color: COLORS.gold },
    { label: "Fully Compliant", value: compliantCount, icon: Check, color: COLORS.green },
    { label: "Due Soon", value: dueCount, icon: Clock, color: COLORS.amber },
    { label: "Overdue", value: overdueCount, icon: X, color: COLORS.red },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 style={{ fontFamily: "Fraunces, serif" }} className="text-xl sm:text-2xl font-medium">
          Welcome back, {currentUser?.name?.split(" ")[0]}
        </h1>
        <p style={{ color: COLORS.muted }} className="text-sm mt-1">Here's where the group stands today.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs" style={{ color: COLORS.muted }}>{s.label}</span>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <div style={{ fontFamily: "IBM Plex Mono, monospace" }} className="text-xl sm:text-2xl mt-2">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium">Bereavement Fund — growth</h2>
              <p className="text-xs" style={{ color: COLORS.muted }}>
                KES {bereavementCurrent.toLocaleString()} of {BEREAVEMENT_TARGET.toLocaleString()} target ({pct}%)
              </p>
            </div>
            <button onClick={() => setView("bereavement")} className="text-xs flex items-center gap-1 shrink-0" style={{ color: COLORS.gold }}>
              View <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ height: 180 }}>
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
          <h2 className="text-sm font-medium mb-4">Recent payments</h2>
          <div className="flex flex-col gap-3">
            {payments.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-start justify-between text-sm gap-2">
                <div className="min-w-0">
                  <div className="truncate">{p.member}</div>
                  <div className="text-xs truncate" style={{ color: COLORS.muted }}>{p.category} · {p.method}</div>
                </div>
                <div className="text-right shrink-0">
                  <div style={{ fontFamily: "IBM Plex Mono, monospace", color: COLORS.green }}>+{p.amount}</div>
                  <div className="text-[10px]" style={{ color: COLORS.muted }}>{p.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium">Member compliance, at a glance</h2>
          <button onClick={() => setView("compliance")} className="text-xs flex items-center gap-1 shrink-0" style={{ color: COLORS.gold }}>
            Full scorecard <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {members.map((m) => (
            <button
              key={m.id}
              onClick={() => { setSelectedMember(m); setView("members"); }}
              className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5"
            >
              <ComplianceRing member={m} size={64} />
              <span className="text-xs text-center leading-tight truncate w-full">{m.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
