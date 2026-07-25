import React, { useEffect, useState } from "react";
import { X, Smartphone, CheckCircle2 } from "lucide-react";
import { COLORS } from "../constants/colors";
import { SUGGESTED_AMOUNTS } from "../data/payments";
import { useAuth } from "../context/AuthContext";

// Simulated M-Pesa STK push flow for a member paying their own dues.
// There's no backend/Daraja integration yet — this mimics the real UX
// (enter amount -> STK push sent -> enter PIN on phone -> confirmed) so the
// flow can be validated before the real integration is built.
export default function PayNowModal({ category, onClose }) {
  const { currentUser, recordPayment } = useAuth();
  const [step, setStep] = useState("amount"); // amount | pushed | success
  const [amount, setAmount] = useState(SUGGESTED_AMOUNTS[category] || 500);

  useEffect(() => {
    if (step !== "pushed") return;
    const t = setTimeout(() => {
      recordPayment({ memberId: currentUser.id, category, amount: Number(amount), method: "M-Pesa (self-service)" });
      setStep("success");
    }, 2200);
    return () => clearTimeout(t);
  }, [step]);

  function sendPush(e) {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setStep("pushed");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={step === "pushed" ? undefined : onClose} />
      <div
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
        className="relative w-full max-w-sm rounded-xl p-5"
      >
        {step !== "pushed" ? (
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "Fraunces, serif" }} className="text-lg">Pay {category}</h2>
            <button onClick={onClose} style={{ color: COLORS.muted }}>
              <X size={18} />
            </button>
          </div>
        ) : null}

        {step === "amount" && (
          <form onSubmit={sendPush} className="flex flex-col gap-3">
            <div>
              <label className="text-xs" style={{ color: COLORS.muted }}>Amount (KES)</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                className="w-full text-sm rounded-lg px-3 py-2 mt-1 outline-none"
              />
            </div>
            <div className="text-xs" style={{ color: COLORS.muted }}>
              Paying from {currentUser.phone} via M-Pesa.
            </div>
            <button
              type="submit"
              style={{ background: COLORS.gold, color: "#14231F" }}
              className="w-full text-sm font-medium rounded-lg py-2.5 mt-1 flex items-center justify-center gap-2 hover:opacity-90"
            >
              <Smartphone size={15} /> Send STK push
            </button>
          </form>
        )}

        {step === "pushed" && (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="w-10 h-10 rounded-full border-2 animate-spin" style={{ borderColor: `${COLORS.gold}33`, borderTopColor: COLORS.gold }} />
            <div className="text-sm">Check your phone</div>
            <p className="text-xs" style={{ color: COLORS.muted }}>
              Enter your M-Pesa PIN on {currentUser.phone} to complete the KES {amount} payment.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center text-center py-4 gap-3">
            <CheckCircle2 size={40} style={{ color: COLORS.green }} />
            <div className="text-base font-medium">Payment received</div>
            <p className="text-xs" style={{ color: COLORS.muted }}>
              KES {amount} for {category} has been recorded. A receipt has been sent to {currentUser.phone}.
            </p>
            <button
              onClick={onClose}
              style={{ background: COLORS.gold, color: "#14231F" }}
              className="w-full text-sm font-medium rounded-lg py-2.5 mt-2 hover:opacity-90"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
