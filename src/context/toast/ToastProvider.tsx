// src/context/toast/ToastProvider.tsx
import React, { useState, useCallback } from "react";
import { makeToast, type ToastItem, type ToastType } from "./toastUtils";
import { ToastContext } from "./ToastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((type: ToastType, message: string, ttl?: number) => {
    const id = Date.now().toString();
    setToasts((t) => [...t, makeToast(id, type, message, ttl)]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl ?? 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast toast-top toast-end z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`alert ${t.type === "success" ? "alert-success" : "alert-error"}`}
          >
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
