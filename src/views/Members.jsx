import React, { useMemo, useState } from "react";
import { Phone, UserPlus } from "lucide-react";
import Card from "../components/Card";
import Pill from "../components/Pill";
import ComplianceRing from "../components/ComplianceRing";
import AddMemberModal from "../components/AddMemberModal";
import { COLORS } from "../constants/colors";
import { CATEGORIES } from "../constants/categories";
import { useAuth } from "../context/AuthContext";
import { overallStatus } from "../utils/status";

export default function Members({ query, selectedMember, setSelectedMember }) {
  const { members } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredMembers = useMemo(() => {
    if (!query) return members;
    const q = query.toLowerCase();
    return members.filter(
      (m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.phone.includes(q)
    );
  }, [query, members]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: COLORS.muted }}>{filteredMembers.length} member(s)</p>
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
                <div className="text-sm font-medium truncate">{m.name}</div>
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
            </div>
          ) : (
            <div className="text-sm text-center py-10" style={{ color: COLORS.muted }}>
              Select a member to see their full profile.
            </div>
          )}
        </Card>
      </div>

      {showAddModal ? <AddMemberModal onClose={() => setShowAddModal(false)} /> : null}
    </div>
  );
}
