import { COLORS } from "../constants/colors";

export function statusColor(status) {
  if (status === "paid") return COLORS.green;
  if (status === "due") return COLORS.amber;
  return COLORS.red;
}

export function statusLabel(status) {
  if (status === "paid") return "Paid";
  if (status === "due") return "Due soon";
  return "Overdue";
}

export function statusSoftBg(status) {
  if (status === "paid") return COLORS.greenSoft;
  if (status === "due") return COLORS.amberSoft;
  return COLORS.redSoft;
}

// Overall standing across all payment categories: worst status wins.
export function overallStatus(member) {
  const values = Object.values(member.status);
  if (values.includes("overdue")) return "overdue";
  if (values.includes("due")) return "due";
  return "paid";
}
