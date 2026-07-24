import React from "react";
import Card from "../components/Card";
import { COLORS } from "../constants/colors";

export default function Meetings() {
  return (
    <Card className="p-4 sm:p-6">
      <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-lg mb-1">Next meeting</h2>
      <p className="text-sm" style={{ color: COLORS.muted }}>Sunday, 26 July · 2:00 PM · Lak Chogo Community Hall</p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="p-4" style={{ background: COLORS.surface2 }}>
          <div className="text-xs" style={{ color: COLORS.muted }}>Expected attendance</div>
          <div style={{ fontFamily: "IBM Plex Mono, monospace" }} className="text-xl mt-1">78%</div>
        </Card>
        <Card className="p-4" style={{ background: COLORS.surface2 }}>
          <div className="text-xs" style={{ color: COLORS.muted }}>Agenda items</div>
          <div style={{ fontFamily: "IBM Plex Mono, monospace" }} className="text-xl mt-1">4</div>
        </Card>
        <Card className="p-4" style={{ background: COLORS.surface2 }}>
          <div className="text-xs" style={{ color: COLORS.muted }}>Check-in method</div>
          <div className="text-sm mt-2">QR code</div>
        </Card>
      </div>
      <p className="text-xs mt-6" style={{ color: COLORS.muted }}>
        Full scheduling, QR check-in, and minutes upload will be wired up in the real build.
      </p>
    </Card>
  );
}
