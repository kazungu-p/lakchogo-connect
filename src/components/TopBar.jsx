import React, { useState } from "react";
import { Search, Bell, Menu, LogOut, X } from "lucide-react";
import { COLORS } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function TopBar({ query, setQuery, onMenuClick, showSearch = true }) {
  const { currentUser, logout } = useAuth();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const initials = currentUser?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("") || "?";

  return (
    <header className="relative flex items-center gap-3 px-4 md:px-6 py-3 md:py-4" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
      {onMenuClick ? (
        <button onClick={onMenuClick} className="md:hidden" style={{ color: COLORS.muted }}>
          <Menu size={20} />
        </button>
      ) : null}

      {showSearch ? (
        <>
          {/* Desktop search */}
          <div className="relative flex-1 max-w-sm hidden sm:block">
            <Search size={15} style={{ color: COLORS.muted }} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search members by name, phone, or ID"
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="w-full text-sm rounded-lg pl-9 pr-3 py-2 outline-none placeholder:opacity-60"
            />
          </div>

          {/* Mobile search toggle */}
          <button onClick={() => setMobileSearchOpen((v) => !v)} className="sm:hidden" style={{ color: COLORS.muted }}>
            {mobileSearchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
        </>
      ) : (
        <div className="flex-1" />
      )}

      <div className="ml-auto flex items-center gap-3 md:gap-4">
        <button className="relative" style={{ color: COLORS.muted }}>
          <Bell size={18} />
          <span style={{ background: COLORS.red }} className="absolute -top-1 -right-1 w-2 h-2 rounded-full" />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <div style={{ background: COLORS.gold }} className="w-8 h-8 rounded-full flex items-center justify-center text-[#14231F] text-sm font-semibold shrink-0">
            {initials}
          </div>
          <div className="text-sm">
            <div className="leading-tight">{currentUser?.name}</div>
            <div className="text-xs" style={{ color: COLORS.muted }}>{currentUser?.committeeRole}</div>
          </div>
        </div>
        <button onClick={logout} title="Log out" style={{ color: COLORS.muted }} className="hover:text-[#F2ECE0]">
          <LogOut size={18} />
        </button>
      </div>

      {showSearch && mobileSearchOpen ? (
        <div className="absolute left-0 right-0 top-full px-4 py-3 sm:hidden" style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` }}>
          <div className="relative">
            <Search size={15} style={{ color: COLORS.muted }} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search members..."
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="w-full text-sm rounded-lg pl-9 pr-3 py-2 outline-none placeholder:opacity-60"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
