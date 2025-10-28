import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
type ToastType = "success" | "error";

type Toast = {
  id: number;
  type: ToastType;
  message: string;
};

type ToastContextType = {
  showToast: (type: ToastType, message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000); // auto-dismiss after 4s
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* DaisyUI Toast Container */}
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

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
