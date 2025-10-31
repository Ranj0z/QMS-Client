// src/pages/Agent Dashboard/CurrentTicketCard.tsx
import { useState } from "react";

type Ticket = {
  ticket_number: string;
  service_name: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
};

type CurrentTicketCardProps = {
  ticket?: Ticket | null;
};

export default function CurrentTicketCard({ ticket }: CurrentTicketCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!ticket) {
    return (
      <div className="border p-4 rounded-md text-center">
        <p>No active ticket</p>
      </div>
    );
  }

  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-lg font-semibold">Current Ticket</h2>
      <p>
        <strong>Ticket:</strong> {ticket.ticket_number}
      </p>
      <p>
        <strong>Service:</strong> {ticket.service_name}
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-3 px-3 py-1 border rounded"
      >
        View More
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md min-w-[300px]">
            <h3 className="text-lg font-semibold mb-2">Ticket Details</h3>
            <p>
              <strong>Customer Name:</strong>{" "}
              {ticket.customer_name || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {ticket.customer_phone || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {ticket.customer_email || "N/A"}
            </p>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-3 py-1 border rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
