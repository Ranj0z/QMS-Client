// src/pages/kiosk/TicketDisplay.tsx
import { useEffect, useState } from "react";

export type TicketDisplayProps = {
  ticketNumber: string;  // required
  onDone: () => void;    // callback
};

export default function TicketDisplay({ ticketNumber, onDone }: TicketDisplayProps) {
  const [secondsLeft, setSecondsLeft] = useState(15);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onDone();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, onDone]);

  return (
    <div>
      <h1>Your Ticket</h1>
      <h2>{ticketNumber}</h2>
      <p>Returning to start in {secondsLeft} seconds...</p>
      <button onClick={onDone}>Done</button>
    </div>
  );
}
