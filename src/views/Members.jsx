import React, { useMemo, useState } from "react";
import { Phone, UserPlus, ReceiptText, UserX, UserCheck, Trash2 } from "lucide-react";
import Card from "../components/Card";
import Pill from "../components/Pill";
import MemberStatusBadge from "../components/MemberStatusBadge";
import ComplianceRing from "../components/ComplianceRing";
import AddMemberModal from "../components/AddMemberModal";
import RecordPaymentModal from "../components/RecordPaymentModal";
import { COLORS } from "../constants/colors";
import { CATEGORIES } from "../constants/categories";
import { useAuth } from "../context/AuthContext";
import { overallStatus } from "../utils/status";

export default function Members({ query, selectedMember, setSelectedMember }) {
  const { members, setMemberLifecycle } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [filter, setFilter] = useState("active"); // active | all

  const scoped = filter === "active" ? members.filter((m) => m.memberStatus !== "removed") : members;

  const filteredMembers = useMemo(() => {
    if (!query) return scoped;
    const q = query.toLowerCase();
    return scoped.filter(
      (m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.phone.includes(q)
    );
  }, [query, scoped]);

  function confirmRemove(member) {
    if (window.confirm(`Remove ${member.name} from the active roster? Their history is kept, and this can be undone from "All members".`)) {
      setMemberLifecycle(member.id, "removed");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs">
          {[
            { key: "active", label: "Active" },
            { key: "all", label: "All members" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                background: filter === f.key ? COLORS.surface2 : "transparent",
                color: filter === f.key ? COLORS.gold : COLORS.muted,
                border: `1px solid ${filter === f.key ? COLORS.gold : COLORS.border}`,
              }}
              className="rounded-full px-3 py-1.5"
            >
              {f.label}
            </button>
          ))}
          <span className="ml-2" style={{ color: COLORS.muted }}>{filteredMembers.length} shown</span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ background: COLORS.gold, color: "#14231F" }}
          className="flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-2 hover:opacity-90"
        >
          <UserPlus size={14} /> Add member
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 divide-y" style={{ borderColor: COLORS.border }}>
          {filteredMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMember(m)}
              style={{ borderColor: COLORS.border, background: selectedMember?.id === m.id ? COLORS.surface2 : "transparent" }}
              className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left hover:bg-white/5 border-b last:border-b-0"
            >
              <ComplianceRing member={m} size={48} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate flex items-center gap-2">
                  {m.name}
                  {m.memberStatus !== "active" ? <MemberStatusBadge status={m.memberStatus} /> : null}
                </div>
                <div className="text-xs flex items-center gap-1 truncate" style={{ color: COLORS.muted }}>
                  <Phone size={11} className="shrink-0" /> {m.phone} · {m.id}
                </div>
              </div>
              <Pill status={overallStatus(m)} />
            </button>
          ))}
        </Card>

        <Card className="w-full lg:w-80 shrink-0 p-5 h-fit">
          {selectedMember ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <ComplianceRing member={selectedMember} size={68} />
                <div>
                  <div style={{ fontFamily: "Fraunces, serif" }} className="text-lg">{selectedMember.name}</div>
                  <div className="text-xs" style={{ color: COLORS.muted }}>{selectedMember.id} · joined {selectedMember.joined}</div>
                  <div className="text-xs mt-0.5" style={{ color: COLORS.gold }}>{selectedMember.committeeRole}</div>
                </div>
              </div>

              <MemberStatusBadge status={selectedMember.memberStatus} />

              <div className="text-sm flex items-center gap-2" style={{ color: COLORS.muted }}>
                <Phone size={13} /> {selectedMember.phone}
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide mb-2" style={{ color: COLORS.muted }}>Payment categories</div>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((c) => (
                    <div key={c} className="flex items-center justify-between text-sm">
                      <span>{c}</span>
                      <Pill status={selectedMember.status[c]} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <span style={{ color: COLORS.muted }}>Meeting attendance</span>
                <span style={{ fontFamily: "IBM Plex Mono, monospace" }}>{selectedMember.attendance}%</span>
              </div>

              <div className="flex flex-col gap-2 pt-3" style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <div className="text-xs uppercase tracking-wide mb-1" style={{ color: COLORS.muted }}>Manage member</div>

                <button
                  onClick={() => setShowPayModal(true)}
                  disabled={selectedMember.memberStatus === "removed"}
                  style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}` }}
                  className="w-full flex items-center justify-center gap-2 text-xs rounded-lg py-2 hover:bg-white/5 disabled:opacity-40"
                >
                  <ReceiptText size={13} /> Record a payment
                </button>

                {selectedMember.memberStatus === "active" && (
                  <button
                    onClick={() => setMemberLifecycle(selectedMember.id, "suspended")}
                    style={{ background: COLORS.amberSoft, border: `1px solid ${COLORS.amber}55`, color: COLORS.amber }}
                    className="w-full flex items-center justify-center gap-2 text-xs rounded-lg py-2 hover:opacity-90"
                  >
                    <UserX size={13} /> Suspend member
                  </button>
                )}
                {selectedMember.memberStatus === "suspended" && (
                  <button
                    onClick={() => setMemberLifecycle(selectedMember.id, "active")}
                    style={{ background: COLORS.greenSoft, border: `1px solid ${COLORS.green}55`, color: COLORS.green }}
                    className="w-full flex items-center justify-center gap-2 text-xs rounded-lg py-2 hover:opacity-90"
                  >
                    <UserCheck size={13} /> Reactivate member
                  </button>
                )}
                {selectedMember.memberStatus !== "removed" ? (
                  <button
                    onClick={() => confirmRemove(selectedMember)}
                    style={{ background: COLORS.redSoft, border: `1px solid ${COLORS.red}55`, color: COLORS.red }}
                    className="w-full flex items-center justify-center gap-2 text-xs rounded-lg py-2 hover:opacity-90"
                  >
                    <Trash2 size={13} /> Remove member
                  </button>
                ) : (
                  <button
                    onClick={() => setMemberLifecycle(selectedMember.id, "active")}
                    style={{ background: COLORS.greenSoft, border: `1px solid ${COLORS.green}55`, color: COLORS.green }}
                    className="w-full flex items-center justify-center gap-2 text-xs rounded-lg py-2 hover:opacity-90"
                  >
                    <UserCheck size={13} /> Restore member
                  </button>
                )}
                <p className="text-[11px]" style={{ color: COLORS.muted }}>
                  Removing hides them from the active roster and compliance stats, but keeps their history — nothing is deleted.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-center py-10" style={{ color: COLORS.muted }}>
              Select a member to see their full profile.
            </div>
          )}
        </Card>
      </div>

      {showAddModal ? <AddMemberModal onClose={() => setShowAddModal(false)} /> : null}
      {showPayModal && selectedMember ? (
        <RecordPaymentModal presetMemberId={selectedMember.id} onClose={() => setShowPayModal(false)} />
      ) : null}
    </div>
  );
}
