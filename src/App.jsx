import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Members from "./views/Members";
import Payments from "./views/Payments";
import Bereavement from "./views/Bereavement";
import Compliance from "./views/Compliance";
import Meetings from "./views/Meetings";
import MemberHome from "./views/member/MemberHome";
import { COLORS } from "./constants/colors";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { overallStatus } from "./utils/status";

function AdminApp() {
  const { members } = useAuth();
  const [view, setView] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const overdueCount = members.filter((m) => overallStatus(m) === "overdue").length;

  return (
    <div
      style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "Inter, sans-serif", minHeight: "700px" }}
      className="w-full rounded-2xl overflow-hidden flex"
    >
      <Sidebar
        view={view}
        setView={setView}
        overdueCount={overdueCount}
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <TopBar query={query} setQuery={setQuery} onMenuClick={() => setMobileNavOpen(true)} />

        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {view === "dashboard" && <Dashboard setView={setView} setSelectedMember={setSelectedMember} />}
          {view === "members" && (
            <Members query={query} selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
          )}
          {view === "payments" && <Payments />}
          {view === "bereavement" && <Bereavement />}
          {view === "compliance" && <Compliance />}
          {view === "meetings" && <Meetings />}
        </div>
      </main>
    </div>
  );
}

function MemberApp() {
  return (
    <div
      style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "Inter, sans-serif", minHeight: "700px" }}
      className="w-full rounded-2xl overflow-hidden flex flex-col"
    >
      <TopBar showSearch={false} />
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <MemberHome />
      </div>
    </div>
  );
}

function Shell() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Login />;
  return currentUser.role === "admin" ? <AdminApp /> : <MemberApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
