// src/pages/kiosk/TicketDisplayWrapper.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TicketDisplay from "./TicketDisplay";

export default function TicketDisplayWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticketNumber = location.state?.ticketNumber;

  useEffect(() => {
    console.log("[TicketDisplayWrapper] Mounted");
    console.log("[TicketDisplayWrapper] Received location.state:", location.state);

    if (!ticketNumber) {
      console.warn("[TicketDisplayWrapper] No ticketNumber found → redirecting to Welcome");
      navigate("/");
    } else {
      console.log("[TicketDisplayWrapper] ticketNumber available:", ticketNumber);
    }
  }, [ticketNumber, location.state, navigate]);

  if (!ticketNumber) return null;

  return (
    <TicketDisplay
      ticketNumber={ticketNumber}   // ✅ now TypeScript knows this prop exists
      onDone={() => {
        console.log("[TicketDisplayWrapper] Done clicked → navigating back to Welcome");
        navigate("/");
      }}
    />
  );
}
