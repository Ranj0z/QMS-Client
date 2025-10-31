// src/pages/kiosk/ServiceSelect.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServices, type Service } from "../../api/kioskAPI";
import { useToast } from "../../context/toast/ToastContext";

export default function ServiceSelect() {
  const [services, setServices] = useState<Service[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getServices();
        if (!res.success) {
          showToast("error", res.message || "Failed to load services");
          return;
        }
        if (mounted) setServices(res.data || []);
      } catch (err) {
        showToast("error", String(err));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  const handleSelect = (service: Service) => {
    showToast("success", `Selected: ${service.name}`);
    navigate("/customer", { state: { serviceId: service.id } });
  };

  return (
    <div>
      <h1>Select a Service</h1>
      {services.length === 0 ? (
        <p>No active services found.</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <button onClick={() => handleSelect(service)}>
                {service.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
