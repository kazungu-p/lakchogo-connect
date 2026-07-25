import React, { createContext, useContext, useState } from "react";
import { MEMBERS as INITIAL_MEMBERS } from "../data/members";
import { INITIAL_PAYMENTS } from "../data/payments";

const AuthContext = createContext(null);

// Holds the "logged in" member, the full member list, and the shared
// payments ledger. In this prototype everything lives in memory — swap for
// real API calls + a session/JWT once there's a backend.
export function AuthProvider({ children }) {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");

  function login(idOrPhone, password) {
    const key = idOrPhone.trim().toLowerCase().replace(/\s/g, "");
    const found = members.find((m) => {
      const idMatch = m.id.toLowerCase() === key;
      const phoneMatch = m.phone.replace(/\s/g, "") === key;
      return (idMatch || phoneMatch) && m.password === password;
    });
    if (found) {
      if (found.memberStatus === "removed") {
        setAuthError("This account has been removed. Contact the committee.");
        return false;
      }
      setCurrentUser(found);
      setAuthError("");
      return true;
    }
    setAuthError("Those details don't match a member record. Check the ID/phone and password.");
    return false;
  }

  function logout() {
    setCurrentUser(null);
  }

  function addMember(newMember) {
    setMembers((prev) => [...prev, newMember]);
  }

  function nextMemberId() {
    const nums = members.map((m) => parseInt(m.id.replace("LC-", ""), 10)).filter((n) => !isNaN(n));
    const next = (Math.max(0, ...nums) + 1).toString().padStart(3, "0");
    return `LC-${next}`;
  }

  // Admin lifecycle action: active | suspended | removed. Never deletes the
  // record — financial/attendance history must stay intact for accounting.
  function setMemberLifecycle(memberId, memberStatus) {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, memberStatus } : m)));
  }

  // Records a payment (by an admin/treasurer on someone's behalf, or by a
  // member paying themselves) and marks that category "paid" for them.
  function recordPayment({ memberId, category, amount, method }) {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;

    const entry = {
      id: `PMT-${Date.now()}`,
      memberId,
      member: member.name,
      category,
      amount,
      method,
      time: "Just now",
    };
    setPayments((prev) => [entry, ...prev]);
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, status: { ...m.status, [category]: "paid" } } : m))
    );

    // Keep currentUser in sync if the member paying is the logged-in user.
    setCurrentUser((prev) =>
      prev && prev.id === memberId ? { ...prev, status: { ...prev.status, [category]: "paid" } } : prev
    );
  }

  return (
    <AuthContext.Provider
      value={{
        members,
        payments,
        currentUser,
        authError,
        login,
        logout,
        addMember,
        nextMemberId,
        setMemberLifecycle,
        recordPayment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
