# LakChogo Connect — Prototype

A clickable prototype for the Lak Chogo Welfare Group management app, built
with React + Vite + Tailwind. All data is currently sample data in
`src/data/` — no backend yet.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Login (prototype auth)

There's no real backend yet, so authentication is mocked in
`src/context/AuthContext.jsx` — credentials live in `src/data/members.js`
as plain text. **Never do this in a real build.**

Demo accounts (also available as one-tap buttons on the login screen):

| Role   | ID     | Password   |
|--------|--------|------------|
| Admin  | LC-014 | admin123   |
| Member | LC-027 | member123  |

- **Admins** (Chairperson, Treasurer, Welfare Officer) see the full app:
  dashboard, all members, payments ledger, bereavement fund, compliance
  scorecard, meetings, and can:
  - add new members — including other admins — via "Add member"
  - record a payment for any member (cash, bank, manual M-Pesa/Airtel
    entry) from the Payments page or a member's profile
  - suspend, reactivate, or remove a member from a member's profile.
    Removing is a **soft delete** — the record and history stay, the
    member just drops off the active roster and out of compliance stats.
- **Members** only see their own profile, payment status, and general
  group info (fund progress, next meeting). They can't see other members'
  records, and can pay any due/overdue category themselves via **Pay now**
  — a simulated M-Pesa STK push flow (no real Daraja integration yet,
  since that needs a backend).

## Project structure

```
src/
  constants/
    colors.js       — design tokens (palette, fonts)
    categories.js   — payment category list
  data/
    members.js      — sample member records (incl. role + mock password)
    payments.js     — sample payment/bereavement history
  context/
    AuthContext.jsx — mock login/session + shared member list (in-memory)
  utils/
    status.js       — status color/label/overall-status helpers
  components/
    Card.jsx
    Pill.jsx
    ComplianceRing.jsx   — the signature per-member status ring
    NavItem.jsx
    Sidebar.jsx          — desktop column + mobile slide-over drawer
    TopBar.jsx           — responsive; mobile search toggle, logout
    AddMemberModal.jsx   — admin-only "add member" form
    RecordPaymentModal.jsx — admin/treasurer logs an offline payment
    PayNowModal.jsx      — member self-service (simulated M-Pesa STK push)
    MemberStatusBadge.jsx — active / suspended / removed badge
  views/
    Login.jsx
    Dashboard.jsx
    Members.jsx
    Payments.jsx
    Bereavement.jsx
    Compliance.jsx
    Meetings.jsx
    member/
      MemberHome.jsx     — what an ordinary member sees after login
  App.jsx            — routes between Login / AdminApp / MemberApp by role
  main.jsx           — entry point
  index.css          — Tailwind + font imports
```

## Responsiveness

- Sidebar collapses into a hamburger-triggered slide-over drawer below the
  `md` breakpoint.
- Grids (stat cards, compliance rings, fund contributor list) reflow from
  multi-column to 1–2 columns on small screens.
- Tables (payments ledger, compliance scorecard) scroll horizontally on
  narrow viewports instead of squashing.
- Search collapses to an icon-triggered field on mobile.

Still worth testing on a real device before calling it done — resize the
browser or use dev tools' device toolbar to check the common breakpoints.

## Next steps toward the real build

1. Swap `src/data/*.js` and the mock `AuthContext` for real API calls
   (a `src/api/` folder), once a backend exists — including real password
   hashing and session tokens, never plain-text passwords.
2. Replace the simulated STK push in `PayNowModal.jsx` with a real Daraja
   API call from the backend (this UI already models the expected steps:
   amount → push sent → confirmation).
3. Add `react-router-dom` for real URLs per view instead of in-memory
   `view` state.
4. Wire up Africa's Talking SMS for compliance/welfare-block alerts.
5. Expand roles beyond the current Admin/Member binary if you want
   granular permissions per committee position (e.g. only Treasurer can
   record payments, only Secretary can post minutes).
6. Loans, insurance, and share capital are a materially bigger, SASRA-
   regulated scope — treat as a later phase, likely integrating with
   Ramogi Sacco's core banking system rather than rebuilding inside this
   welfare app.
