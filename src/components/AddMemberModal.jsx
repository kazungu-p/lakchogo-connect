import React, { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { COLORS } from "../constants/colors";
import { CATEGORIES } from "../constants/categories";
import { useAuth } from "../context/AuthContext";

const COMMITTEE_ROLES = ["Ordinary Member", "Chairperson", "Treasurer", "Secretary", "Welfare Officer"];

export default function AddMemberModal({ onClose }) {
  const { addMember, nextMemberId } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    accessLevel: "member", // "member" | "admin"
    committeeRole: "Ordinary Member",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.password.trim()) {
      setError("Name, phone, and a starting password are required.");
      return;
    }
    const status = {};
    CATEGORIES.forEach((c) => (status[c] = "due"));

    addMember({
      id: nextMemberId(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      joined: String(new Date().getFullYear()),
      attendance: 0,
      role: form.accessLevel,
      committeeRole: form.accessLevel === "admin" && form.committeeRole === "Ordinary Member" ? "Admin" : form.committeeRole,
      password: form.password,
      status,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
        className="relative w-full max-w-md rounded-xl p-5 max-h-[90vh] overflow-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-lg flex items-center gap-2">
            <UserPlus size={18} style={{ color: COLORS.gold }} /> Add member
          </h2>
          <button onClick={onClose} style={{ color: COLORS.muted }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs" style={{ color: COLORS.muted }}>Full name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none"
            />
          </div>
          <div>
            <label className="text-xs" style={{ color: COLORS.muted }}>Phone number</label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="07XX XXX XXX"
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none placeholder:opacity-50"
            />
          </div>
          <div>
            <label className="text-xs" style={{ color: COLORS.muted }}>Starting password</label>
            <input
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="Member will change this after first login"
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none placeholder:opacity-50"
            />
          </div>

          <div>
            <label className="text-xs" style={{ color: COLORS.muted }}>Access level</label>
            <div className="flex gap-2 mt-1">
              {[
                { key: "member", label: "Member" },
                { key: "admin", label: "Admin" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => update("accessLevel", opt.key)}
                  style={{
                    background: form.accessLevel === opt.key ? COLORS.goldSoft : COLORS.surface2,
                    border: `1px solid ${form.accessLevel === opt.key ? COLORS.gold : COLORS.border}`,
                    color: form.accessLevel === opt.key ? COLORS.gold : COLORS.text,
                  }}
                  className="flex-1 text-sm rounded-lg py-2"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] mt-1" style={{ color: COLORS.muted }}>
              Admins can see every member, record payments, and add other members.
            </p>
          </div>

          <div>
            <label className="text-xs" style={{ color: COLORS.muted }}>Committee role</label>
            <select
              value={form.committeeRole}
              onChange={(e) => update("committeeRole", e.target.value)}
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none"
            >
              {COMMITTEE_ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {error ? <div style={{ color: COLORS.red }} className="text-xs">{error}</div> : null}

          <button
            type="submit"
            style={{ background: COLORS.gold, color: "#14231F" }}
            className="w-full text-sm font-medium rounded-lg py-2.5 mt-2 hover:opacity-90"
          >
            Add member
          </button>
        </form>
      </div>
    </div>
  );
}
