import React, { createContext, useContext, useState } from "react";
import { MEMBERS as INITIAL_MEMBERS } from "../data/members";

const AuthContext = createContext(null);

// Holds the "logged in" member and the full member list. In this prototype
// everything lives in memory — swap for real API calls + a session/JWT once
// there's a backend.
export function AuthProvider({ children }) {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
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

  return (
    <AuthContext.Provider
      value={{ members, currentUser, authError, login, logout, addMember, nextMemberId }}
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
