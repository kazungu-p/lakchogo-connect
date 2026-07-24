import React from "react";
import { COLORS } from "../constants/colors";

export default function Card({ children, className = "", style = {} }) {
  return (
    <div
      style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, ...style }}
      className={`rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}
