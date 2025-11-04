// src/pages/Agent/CurrentTicketCard.tsx
import { useState } from "react";

type Ticket = {
  id: number;
  ticket_number: string;
  service_name?: string;
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
      <div className="card border border-base-300 shadow-sm bg-base-100">
        <div className="card-body items-center text-center py-6">
          <h2 className="text-lg font-semibold text-gray-500">
            No active ticket currently
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card border border-base-300 shadow-sm bg-base-100">
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold text-primary">
            Ticket #{ticket.ticket_number}
          </h2>
          <p className="text-gray-600 mt-1">
            Service: <span className="font-medium">{ticket.service_name}</span>
          </p>
          <button
            className="btn btn-sm btn-outline btn-primary mt-3"
            onClick={() => setIsModalOpen(true)}
          >
            View More
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal modal-open"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-3">
              Ticket #{ticket.ticket_number}
            </h3>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Service:</span>{" "}
                {ticket.service_name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {ticket.customer_name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {ticket.customer_phone || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {ticket.customer_email || "N/A"}
              </p>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
