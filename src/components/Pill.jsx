import React from "react";
import { statusColor, statusLabel, statusSoftBg } from "../utils/status";

export default function Pill({ status }) {
  const color = statusColor(status);
  return (
    <span
      style={{ color, background: statusSoftBg(status), border: `1px solid ${color}55` }}
      className="text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1"
    >
      <span style={{ background: color }} className="w-1.5 h-1.5 rounded-full inline-block" />
      {statusLabel(status)}
    </span>
  );
}
