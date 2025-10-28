// src/pages/GetServices.tsx
import { useEffect, useState } from "react";

type Service = {
  id: number;
  name: string;
  description: string;
  status: string;
};

export default function GetServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("http://localhost:3010/api/v2/service/all")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data || []);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1>Active Services</h1>
      <ul>
        {services.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> – {s.description} ({s.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
