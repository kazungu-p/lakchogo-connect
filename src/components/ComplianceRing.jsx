import React from "react";
import { COLORS, FONTS } from "../constants/colors";
import { CATEGORIES } from "../constants/categories";
import { statusColor } from "../utils/status";

// The signature visual: one beaded segment per payment category, colored by
// status, with the member's attendance rate shown in the center.
export default function ComplianceRing({ member, size = 96 }) {
  const r = size / 2 - 8;
  const cx = size / 2;
  const cy = size / 2;
  const n = CATEGORIES.length;
  const gap = 0.09; // radians of gap between beads
  const seg = (2 * Math.PI) / n;

  const arcs = CATEGORIES.map((cat, i) => {
    const start = i * seg + gap / 2 - Math.PI / 2;
    const end = (i + 1) * seg - gap / 2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const large = end - start > Math.PI ? 1 : 0;
    return {
      d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`,
      color: statusColor(member.status[cat]),
      cat,
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs.map((a) => (
        <path key={a.cat} d={a.d} fill="none" stroke={a.color} strokeWidth={7} strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={cy} r={r - 14} fill={COLORS.surface2} />
      <text x={cx} y={cy - 2} textAnchor="middle" fill={COLORS.text} fontSize="17" fontFamily={FONTS.mono} fontWeight="600">
        {member.attendance}%
      </text>
      <text x={cx} y={cy + 13} textAnchor="middle" fill={COLORS.muted} fontSize="8" fontFamily={FONTS.body} letterSpacing="0.5">
        ATTEND.
      </text>
    </svg>
  );
}
