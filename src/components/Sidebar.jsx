import React from "react";
import { Home, Users, Wallet, HeartHandshake, ShieldCheck, Calendar, X } from "lucide-react";
import { COLORS } from "../constants/colors";
import NavItem from "./NavItem";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "members", label: "Members", icon: Users },
  { key: "payments", label: "Payments", icon: Wallet },
  { key: "bereavement", label: "Bereavement Fund", icon: HeartHandshake },
  { key: "compliance", label: "Compliance", icon: ShieldCheck },
  { key: "meetings", label: "Meetings", icon: Calendar },
];

// Renders as a fixed left column on md+ screens, and as a slide-over drawer
// (with backdrop) on smaller screens, controlled by `mobileOpen`.
export default function Sidebar({ view, setView, overdueCount, mobileOpen, onClose }) {
  const content = (
    <>
      <div className="flex items-center justify-between px-5 pb-5 mb-2" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div>
          <div style={{ fontFamily: "Fraunces, serif", color: COLORS.gold }} className="text-xl font-semibold leading-tight">
            Lak Chogo
          </div>
          <div className="text-xs tracking-widest uppercase" style={{ color: COLORS.muted }}>
            Connect
          </div>
        </div>
        <button onClick={onClose} className="md:hidden" style={{ color: COLORS.muted }}>
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-col gap-1 px-2">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={view === item.key}
            onClick={() => {
              setView(item.key);
              onClose?.();
            }}
            badge={item.key === "compliance" ? overdueCount : undefined}
          />
        ))}
      </nav>

      <div className="mt-auto px-5 pt-4" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="text-xs" style={{ color: COLORS.muted }}>Ramogi Sacco</div>
        <div className="text-sm">Welfare Subsidiary</div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        style={{ background: COLORS.surface, borderRight: `1px solid ${COLORS.border}` }}
        className="hidden md:flex w-60 shrink-0 flex-col py-5"
      >
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside
            style={{ background: COLORS.surface, borderRight: `1px solid ${COLORS.border}` }}
            className="relative w-64 h-full flex flex-col py-5 z-50"
          >
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
}
