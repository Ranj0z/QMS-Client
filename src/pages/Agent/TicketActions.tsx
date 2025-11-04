// src/pages/Agent/TicketActions.tsx
import { useState } from "react";
import { agentAPI } from "../../api/agentAPI";
import { useToast } from "../../context/toast/useToast";

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
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  // cooldown utility
  const startCooldown = () => {
    setIsCoolingDown(true);
    setTimeout(() => setIsCoolingDown(false), 10000);
  };

  // handle next ticket
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
        showToast("error", res.message || "Failed to fetch next ticket");
      }
    } catch {
      showToast("error", "Error fetching next ticket");
    } finally {
      setIsProcessing(false);
    }
  };

  // handle pause
  const handlePause = async () => {
    if (!ticket) return;
    try {
      setIsProcessing(true);
      const res = await agentAPI.pauseTicket(ticket.id);
      if (res.success) {
        showToast("success", "Ticket paused");
        setInProgress(false);
        startCooldown();
        onActionComplete();
      } else {
        showToast("error", res.message || "Failed to pause ticket");
      }
    } catch {
      showToast("error", "Error pausing ticket");
    } finally {
      setIsProcessing(false);
    }
  };

  // handle missing
  const handleMissing = async () => {
    if (!ticket) return;
    try {
      setIsProcessing(true);
      const res = await agentAPI.markTicketMissing(ticket.id);
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

  // handle escalate
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

  // handle close
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

  const disableNext = inProgress || isProcessing || isCoolingDown;
  const disableOthers =
    !ticket || isProcessing || isCoolingDown || !inProgress;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      <button
        onClick={handleNext}
        disabled={disableNext}
        className="btn btn-primary btn-sm"
      >
        Next
      </button>
      <button
        onClick={handlePause}
        disabled={disableOthers}
        className="btn btn-warning btn-sm"
      >
        Pause
      </button>
      <button
        onClick={handleMissing}
        disabled={disableOthers}
        className="btn btn-error btn-sm"
      >
        Missing
      </button>
      <button
        onClick={handleEscalate}
        disabled={disableOthers}
        className="btn btn-accent btn-sm"
      >
        Escalate
      </button>
      <button
        onClick={handleClose}
        disabled={disableOthers}
        className="btn btn-success btn-sm"
      >
        Close
      </button>
    </div>
  );
}
