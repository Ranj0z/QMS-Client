// src/pages/Agent/MissingCount.tsx
import { useEffect, useState } from "react";
import { useToast } from "../../context/toast/useToast";
import { agentAPI } from "../../api/agentAPI";
import MissingTicketsModal from "./MissingTicketsModal";

type MissingCountProps = {
  agentId: number;
  branchId: number;
  onActionComplete: () => void;
};

export default function MissingCount({
  agentId,
  branchId,
  onActionComplete,
}: MissingCountProps) {
  const { showToast } = useToast();
  const [count, setCount] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch missing ticket count
  const fetchMissingCount = async () => {
    try {
      const res = await agentAPI.getMissingCount(agentId);
      if (res.success) {
        setCount(res.data.count);
      } else {
        showToast("error", res.message || "Failed to fetch missing tickets count");
      }
    } catch {
      showToast("error", "Error fetching missing tickets count");
    }
  };

  // ✅ Load count on mount + whenever parent triggers refresh
  useEffect(() => {
    fetchMissingCount();
  }, [onActionComplete]);

  const handleModalClose = () => {
    setShowModal(false);
    fetchMissingCount(); // refresh count after closing
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="border rounded px-4 py-2"
      >
        Missing: {count}
      </button>

      {showModal && (
        <MissingTicketsModal
          agentId={agentId}
          branchId={branchId}
          onClose={handleModalClose}
          onActionComplete={onActionComplete}
        />
      )}
    </div>
  );
}
