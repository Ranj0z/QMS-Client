// // src/pages/Agent/PausedCount.tsx
// import { useEffect, useState } from "react";
// import { useToast } from "../../context/toast/useToast";
// import { agentAPI } from "../../api/agentAPI";
// import PausedTicketsModal from "./PausedTicketsModal";

// type PausedCountProps = {
//   agentId: number;
//   branchId: number;
//   onActionComplete: () => void;
// };

// export default function PausedCount({
//   agentId,
//   branchId,
//   onActionComplete,
// }: PausedCountProps) {
//   const { showToast } = useToast();
//   const [count, setCount] = useState<number>(0);
//   const [showModal, setShowModal] = useState(false);

//   // ✅ Fetch paused ticket count
//   const fetchPausedCount = async () => {
//     try {
//       const res = await agentAPI.getPausedCount(agentId, branchId);
//       if (res.success) {
//         setCount(res.data.count);
//       } else {
//         showToast("error", res.message || "Failed to fetch paused tickets count");
//       }
//     } catch {
//       showToast("error", "Error fetching paused tickets count");
//     }
//   };

//   // ✅ Load count on mount + whenever parent triggers refresh
//   useEffect(() => {
//     fetchPausedCount();
//   }, [onActionComplete]);

//   const handleModalClose = () => {
//     setShowModal(false);
//     fetchPausedCount(); // refresh after closing
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setShowModal(true)}
//         className="border rounded px-4 py-2"
//       >
//         Paused: {count}
//       </button>

//       {showModal && (
//         <PausedTicketsModal
//           agentId={agentId}
//           branchId={branchId}
//           onClose={handleModalClose}
//           onActionComplete={onActionComplete}
//         />
//       )}
//     </div>
//   );
// }

