export const BEREAVEMENT_HISTORY = [
  { month: "Feb", amount: 42000 },
  { month: "Mar", amount: 58000 },
  { month: "Apr", amount: 61000 },
  { month: "May", amount: 79000 },
  { month: "Jun", amount: 88000 },
  { month: "Jul", amount: 104000 },
];

export const BEREAVEMENT_TARGET = 150000;

// Seed payments — memberId ties each entry back to src/data/members.js so
// recording a new payment can update that member's status in one place.
export const INITIAL_PAYMENTS = [
  { id: "PMT-1004", memberId: "LC-014", member: "Achieng Otieno", category: "Bereavement Fund", amount: 500, method: "M-Pesa", time: "Today, 9:14 AM" },
  { id: "PMT-1003", memberId: "LC-031", member: "Anyango Wafula", category: "Development Fund", amount: 1000, method: "M-Pesa", time: "Today, 8:02 AM" },
  { id: "PMT-1002", memberId: "LC-009", member: "Akinyi Osoro", category: "Yearly Subscription", amount: 2000, method: "Cash (Treasurer)", time: "Yesterday, 4:40 PM" },
  { id: "PMT-1001", memberId: "LC-027", member: "Odhiambo Kwach", category: "Constitution Fee", amount: 300, method: "Airtel Money", time: "Yesterday, 2:18 PM" },
];

export const SUGGESTED_AMOUNTS = {
  "Yearly Subscription": 2000,
  "Emergency Fund": 500,
  "Constitution Fee": 300,
  "Development Fund": 1000,
  "Bereavement Fund": 500,
};
