// src/pages/kiosk/CustomerForm.tsx
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTicket } from "../../api/kioskAPI";
import { useToast } from "../../context/toast/useToast";

export default function CustomerForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { serviceId } = (location.state as { serviceId: number }) || {};

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!serviceId) {
    return (
      <div>
        <h1>No service selected</h1>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await createTicket({
      service_id: serviceId,
      customer_name: name,
      customer_phone: phone,
      email,
      priority: 1,
    });

    setLoading(false);

    if (res.success && res.data) {
      const ticketNumber =
        res.data.ticket_number || res.data.id?.toString() || "N/A";

      showToast("success", `Ticket #${ticketNumber} created successfully!`);
      navigate("/ticket", { state: { ticketNumber } });
    } else {
      showToast("error", res.message || "Failed to create ticket.");
      setError(res.message || "Failed to create ticket. Please try again.");
    }
  };

  return (
    <div>
      <h1>Customer Information</h1>
      <p>Selected Service ID: {serviceId}</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone (required): </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label>Email (optional): </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Name (optional): </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Get Ticket"}
        </button>
      </form>
    </div>
  );
}
