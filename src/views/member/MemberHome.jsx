import React, { useState } from "react";
import { Phone, Calendar, HeartHandshake, ShieldAlert, Smartphone } from "lucide-react";
import Card from "../../components/Card";
import Pill from "../../components/Pill";
import ComplianceRing from "../../components/ComplianceRing";
import PayNowModal from "../../components/PayNowModal";
import { COLORS } from "../../constants/colors";
import { CATEGORIES } from "../../constants/categories";
import { useAuth } from "../../context/AuthContext";
import { BEREAVEMENT_HISTORY, BEREAVEMENT_TARGET } from "../../data/payments";
import { overallStatus } from "../../utils/status";

// A member only ever sees their own profile/compliance and general,
// non-sensitive group info (fund progress, next meeting) — not other
// members' records.
export default function MemberHome() {
  const { currentUser } = useAuth();
  const [payCategory, setPayCategory] = useState(null);
  const status = overallStatus(currentUser);
  const bereavementCurrent = BEREAVEMENT_HISTORY[BEREAVEMENT_HISTORY.length - 1].amount;
  const pct = Math.round((bereavementCurrent / BEREAVEMENT_TARGET) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <h1 style={{ fontFamily: "Fraunces, serif" }} className="text-xl sm:text-2xl font-medium">
          Welcome, {currentUser.name.split(" ")[0]}
        </h1>
        <p style={{ color: COLORS.muted }} className="text-sm mt-1">Your standing with Lak Chogo Welfare Group.</p>
      </div>

      {status === "overdue" ? (
        <div style={{ background: COLORS.redSoft, border: `1px solid ${COLORS.red}55`, color: COLORS.red }} className="rounded-xl p-4 flex items-start gap-3 text-sm">
          <ShieldAlert size={18} className="shrink-0 mt-0.5" />
          <div>
            You have overdue payments in one or more categories. Clear these to remain eligible for bereavement assistance.
          </div>
        </div>
      ) : status === "due" ? (
        <div style={{ background: COLORS.amberSoft, border: `1px solid ${COLORS.amber}55`, color: COLORS.amber }} className="rounded-xl p-4 flex items-start gap-3 text-sm">
          <ShieldAlert size={18} className="shrink-0 mt-0.5" />
          <div>Some payments are due soon — settle them before they lapse.</div>
        </div>
      ) : null}

      <Card className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <ComplianceRing member={currentUser} size={96} />
        <div className="flex-1 w-full">
          <div style={{ fontFamily: "Fraunces, serif" }} className="text-lg text-center sm:text-left">{currentUser.name}</div>
          <div className="text-xs text-center sm:text-left" style={{ color: COLORS.muted }}>
            {currentUser.id} · {currentUser.committeeRole} · joined {currentUser.joined}
          </div>
          <div className="text-sm flex items-center justify-center sm:justify-start gap-2 mt-2" style={{ color: COLORS.muted }}>
            <Phone size={13} /> {currentUser.phone}
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-xs uppercase tracking-wide mb-3" style={{ color: COLORS.muted }}>Your payment categories</div>
        <div className="flex flex-col gap-2.5">
          {CATEGORIES.map((c) => {
            const s = currentUser.status[c];
            const needsPay = s === "due" || s === "overdue";
            return (
              <div key={c} className="flex items-center justify-between text-sm gap-3">
                <span>{c}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <Pill status={s} />
                  {needsPay ? (
                    <button
                      onClick={() => setPayCategory(c)}
                      style={{ background: COLORS.gold, color: "#14231F" }}
                      className="flex items-center gap-1 text-xs font-medium rounded-full px-2.5 py-1 hover:opacity-90"
                    >
                      <Smartphone size={11} /> Pay now
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <HeartHandshake size={15} style={{ color: COLORS.gold }} />
            <span className="text-sm font-medium">Bereavement Fund</span>
          </div>
          <div style={{ fontFamily: "IBM Plex Mono, monospace" }} className="text-xl">KES {bereavementCurrent.toLocaleString()}</div>
          <div className="text-xs mb-2" style={{ color: COLORS.muted }}>{pct}% of {BEREAVEMENT_TARGET.toLocaleString()} target</div>
          <div style={{ background: COLORS.surface2 }} className="w-full h-2 rounded-full overflow-hidden">
            <div style={{ background: COLORS.gold, width: `${pct}%` }} className="h-full rounded-full" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={15} style={{ color: COLORS.gold }} />
            <span className="text-sm font-medium">Next meeting</span>
          </div>
          <div className="text-sm">Sunday, 26 July · 2:00 PM</div>
          <div className="text-xs mt-1" style={{ color: COLORS.muted }}>Lak Chogo Community Hall</div>
        </Card>
      </div>

      <div className="text-center text-sm" style={{ color: COLORS.muted }}>
        Meeting attendance rate: <span style={{ fontFamily: "IBM Plex Mono, monospace", color: COLORS.text }}>{currentUser.attendance}%</span>
      </div>

      {payCategory ? <PayNowModal category={payCategory} onClose={() => setPayCategory(null)} /> : null}
    </div>
  );
}
