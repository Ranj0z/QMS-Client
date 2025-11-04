
//   const [count, setCount] = useState<number>(0);

// src/pages/Agent/UnservedCount.tsx
import { useEffect, useState } from "react";
import { agentAPI, type AgentTicket } from "../../api/agentAPI";
import UnservedTicketsModal from "./UnservedTicketsModal";
import { useToast } from "../../context/toast/useToast";

type UnservedCountProps = {
  branchId: number;
  agentId: number;
  onActionComplete: () => void;
};

export default function UnservedCount({
  branchId,
  agentId,
  onActionComplete,
}: UnservedCountProps) {
  const { showToast } = useToast();
    const [count, setCount] = useState<number>(0);
    const [tickets, setTickets] = useState<AgentTicket[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUnserved = async () => {
    try {
      setLoading(true);
      const res = await agentAPI.getUnservedCount(branchId);
      if (res.success) {
        setTickets(res.data);
        setCount(res.data.length);
      } else {
        showToast("error", res.message || "Failed to fetch unserved tickets");
      }
    } catch {
      showToast("error", "Error fetching unserved tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnserved();
  }, [branchId]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchUnserved(); // refresh count
  };

  return (
    <>
      <button
        className="btn btn-outline btn-sm border-primary text-primary relative"
        onClick={() => setIsModalOpen(true)}
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <>
            Unserved Tickets
            <div className="badge badge-primary badge-sm ml-2">{count}</div>
          </>
        )}
      </button>

      {isModalOpen && (
        <UnservedTicketsModal
          agentId={agentId}
          tickets={tickets}
          onClose={handleModalClose}
          onActionComplete={onActionComplete}
        />
      )}
    </>
  );
}
