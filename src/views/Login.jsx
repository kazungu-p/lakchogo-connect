import React, { useState } from "react";
import { LogIn, ShieldCheck } from "lucide-react";
import { COLORS } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, authError } = useAuth();
  const [idOrPhone, setIdOrPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login(idOrPhone, password);
  }

  function demoLogin(id, pw) {
    setIdOrPhone(id);
    setPassword(pw);
    login(id, pw);
  }

  return (
    <div
      style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "Inter, sans-serif" }}
      className="w-full min-h-[700px] flex items-center justify-center px-4 py-10 rounded-2xl"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div style={{ fontFamily: "Fraunces, serif", color: COLORS.gold }} className="text-3xl font-semibold">
            Lak Chogo
          </div>
          <div className="text-xs tracking-widest uppercase mt-1" style={{ color: COLORS.muted }}>
            Connect
          </div>
        </div>

        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }} className="rounded-xl p-6">
          <h1 className="text-lg font-medium mb-1">Sign in</h1>
          <p className="text-xs mb-5" style={{ color: COLORS.muted }}>
            Use your member ID or phone number.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-xs" style={{ color: COLORS.muted }}>Member ID or phone</label>
              <input
                value={idOrPhone}
                onChange={(e) => setIdOrPhone(e.target.value)}
                placeholder="LC-014 or 0722 445 013"
                style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                className="w-full text-sm rounded-lg px-3 py-2.5 mt-1 outline-none placeholder:opacity-50"
              />
            </div>
            <div>
              <label className="text-xs" style={{ color: COLORS.muted }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                className="w-full text-sm rounded-lg px-3 py-2.5 mt-1 outline-none placeholder:opacity-50"
              />
            </div>

            {authError ? (
              <div style={{ color: COLORS.red }} className="text-xs">{authError}</div>
            ) : null}

            <button
              type="submit"
              style={{ background: COLORS.gold, color: "#14231F" }}
              className="w-full text-sm font-medium rounded-lg py-2.5 mt-2 flex items-center justify-center gap-2 hover:opacity-90"
            >
              <LogIn size={15} /> Sign in
            </button>
          </form>
        </div>

        <div style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}` }} className="rounded-xl p-4 mt-4">
          <div className="flex items-center gap-2 text-xs mb-3" style={{ color: COLORS.muted }}>
            <ShieldCheck size={13} /> Demo access (prototype only, not real auth)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => demoLogin("LC-014", "admin123")}
              style={{ border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="flex-1 text-xs rounded-lg py-2 hover:bg-white/5"
            >
              Continue as Admin
            </button>
            <button
              onClick={() => demoLogin("LC-027", "member123")}
              style={{ border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              className="flex-1 text-xs rounded-lg py-2 hover:bg-white/5"
            >
              Continue as Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
