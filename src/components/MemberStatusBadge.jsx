import React from "react";
import { COLORS } from "../constants/colors";

const CONFIG = {
  active: { label: "Active", color: COLORS.green, bg: COLORS.greenSoft },
  suspended: { label: "Suspended", color: COLORS.amber, bg: COLORS.amberSoft },
  removed: { label: "Removed", color: COLORS.red, bg: COLORS.redSoft },
};

export default function MemberStatusBadge({ status }) {
  const c = CONFIG[status] || CONFIG.active;
  return (
    <span
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.color}55` }}
      className="text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1"
    >
      <span style={{ background: c.color }} className="w-1.5 h-1.5 rounded-full inline-block" />
      {c.label}
    </span>
  );
}
