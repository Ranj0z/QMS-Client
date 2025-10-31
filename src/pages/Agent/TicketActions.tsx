// src/pages/Agent Dashboard/TicketActions.tsx
import { useState, useContext } from "react";
import { agentAPI } from "../../api/agentAPI";
import { ToastContext } from "../../context/toast/ToastContext";

type Ticket = {
  id: number;
  ticket_number: string;
  status?: string;
};

type TicketActionsProps = {
  ticket?: Ticket | null;
  agentId: number;
  onActionComplete: () => void;
};

export default function TicketActions({
  ticket,
  agentId,
  onActionComplete,
}: TicketActionsProps) {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error("TicketActions must be used within a ToastProvider");
  const { showToast } = toast;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  // Utility to apply cooldown after any action
  const startCooldown = () => {
    setIsCoolingDown(true);
    setTimeout(() => setIsCoolingDown(false), 10000); // 10 seconds
  };

  const handleNext = async () => {
    try {
      setIsProcessing(true);
      const res = await agentAPI.getNextTicket(agentId);
      if (res.success) {
        showToast("success", `Next ticket: ${res.data.ticket_number}`);
        setInProgress(true);
        startCooldown();
        onActionComplete();
      } else {
        showToast("error", res.message || "Failed to load next ticket");
      }
    } catch {
      showToast("error", "Error fetching next ticket");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMissing = async () => {
    if (!ticket) return;
    try {
      setIsProcessing(true);
      const res = await agentAPI.closeTicket(ticket.id); // replace with missing API if implemented
      if (res.success) {
        showToast("success", "Ticket marked as missing");
        setInProgress(false);
        startCooldown();
        onActionComplete();
      } else {
        showToast("error", res.message || "Failed to mark ticket missing");
      }
    } catch {
      showToast("error", "Error marking ticket missing");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEscalate = async () => {
    if (!ticket) return;
    try {
      setIsProcessing(true);
      const payload = {
        ticket_id: ticket.id,
        user_id: agentId,
        category: "escalation" as const,
        content: "Ticket escalated by agent.",
      };
      const res = await agentAPI.escalateTicket(payload);
      if (res.success) {
        showToast("success", "Ticket escalated");
        setInProgress(false);
        startCooldown();
        onActionComplete();
      } else {
        showToast("error", res.message || "Failed to escalate ticket");
      }
    } catch {
      showToast("error", "Error escalating ticket");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = async () => {
    if (!ticket) return;
    try {
      setIsProcessing(true);
      const res = await agentAPI.closeTicket(ticket.id);
      if (res.success) {
        showToast("success", "Ticket closed");
        setInProgress(false);
        startCooldown();
        onActionComplete();
      } else {
        showToast("error", res.message || "Failed to close ticket");
      }
    } catch {
      showToast("error", "Error closing ticket");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePause = async () => {
    if (!ticket) return;
    try {
      setIsProcessing(true);
      // placeholder until pause endpoint is live
      showToast("success", "Ticket paused");
      setInProgress(false);
      startCooldown();
      onActionComplete();
    } catch {
      showToast("error", "Error pausing ticket");
    } finally {
      setIsProcessing(false);
    }
  };

  const disableNext = inProgress || isProcessing || isCoolingDown;
  const disableOthers =
    !ticket || isProcessing || isCoolingDown || !inProgress;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={handleNext}
        disabled={disableNext}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>

      <button
        onClick={handleMissing}
        disabled={disableOthers}
        className="px-3 py-1 border rounded"
      >
        Missing
      </button>

      <button
        onClick={handleEscalate}
        disabled={disableOthers}
        className="px-3 py-1 border rounded"
      >
        Escalate
      </button>

      <button
        onClick={handlePause}
        disabled={disableOthers}
        className="px-3 py-1 border rounded"
      >
        Pause
      </button>

      <button
        onClick={handleClose}
        disabled={disableOthers}
        className="px-3 py-1 border rounded"
      >
        Close
      </button>
    </div>
  );
}
