import React from "react";
import { COLORS } from "../constants/colors";

export default function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? COLORS.surface2 : "transparent",
        color: active ? COLORS.gold : COLORS.muted,
        borderLeft: active ? `2px solid ${COLORS.gold}` : "2px solid transparent",
      }}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:text-[#F2ECE0] rounded-r-md"
    >
      <Icon size={17} strokeWidth={2} />
      <span className="flex-1 text-left">{label}</span>
      {badge ? (
        <span style={{ background: COLORS.red }} className="text-[10px] text-white rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
