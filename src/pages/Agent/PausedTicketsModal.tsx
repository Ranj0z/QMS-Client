// // src/pages/Agent/PausedTicketsModal.tsx
// import { useEffect, useState } from "react";
// import { useToast } from "../../context/toast/useToast";
// import { agentAPI } from "../../api/agentAPI";

// type PausedTicketsModalProps = {
//   agentId: number;
//   branchId: number;
//   onClose: () => void;
//   onActionComplete: () => void;
// };

// type Ticket = {
//   id: number;
//   ticket_number: string;
// };

// export default function PausedTicketsModal({
//   agentId,
//   branchId,
//   onClose,
//   onActionComplete,
// }: PausedTicketsModalProps) {
//   const { showToast } = useToast();
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch paused tickets
//   const fetchTickets = async () => {
//     try {
//       const res = await agentAPI.getPausedTickets(agentId, branchId);
//       if (res.success) {
//         setTickets(res.data);
//       } else {
//         showToast("error", res.message || "Failed to load paused tickets");
//       }
//     } catch {
//       showToast("error", "Error fetching paused tickets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   // ✅ Assign ticket to agent and mark as in_progress
//   const handleAssign = async (ticketId: number) => {
//     try {
//       const res = await agentAPI.assignTicketToAgent(ticketId, agentId);
//       if (res.success) {
//         showToast("success", "Ticket assigned successfully");
//         onActionComplete();
//         onClose();
//       } else {
//         showToast("error", res.message || "Failed to assign ticket");
//       }
//     } catch {
//       showToast("error", "Error assigning ticket");
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-lg p-4 w-80 max-h-[80vh] overflow-y-auto border"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-3">
//           <h2 className="text-lg font-semibold">Paused Tickets</h2>
//           <button onClick={onClose} className="text-gray-600 hover:text-black">
//             ✕
//           </button>
//         </div>

//         {/* Content */}
//         {loading ? (
//           <p>Loading...</p>
//         ) : tickets.length === 0 ? (
//           <p>No paused tickets.</p>
//         ) : (
//           <ul className="space-y-2">
//             {tickets.map((t) => (
//               <li key={t.id}>
//                 <button
//                   onClick={() => handleAssign(t.id)}
//                   className="w-full border rounded px-3 py-2 hover:bg-gray-100"
//                 >
//                   {t.ticket_number}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
