//src\modal\kiosk\IdleWarningModal.tsx
import { useEffect, useState } from "react";

type IdleWarningModalProps = {
  show: boolean;          // whether to display the modal
  timeout: number;        // total seconds before auto-reset (e.g., 30)
  onTimeout: () => void;  // called when time runs out
  onContinue: () => void; // called if user chooses to continue
};

export default function IdleWarningModal({
  show,
  timeout,
  onTimeout,
  onContinue,
}: IdleWarningModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(timeout);

  useEffect(() => {
    if (!show) return;

    setSecondsLeft(timeout);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, timeout, onTimeout]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div style={{ background: "#fff", padding: 20, borderRadius: 8 }}>
        <h2>Are you still there?</h2>
        <p>
          The kiosk will reset in <strong>{secondsLeft}</strong> seconds.
        </p>
        <button onClick={onContinue}>Continue</button>
      </div>
    </div>
  );
}
