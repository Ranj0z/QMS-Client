// src/context/toast/ToastContext.tsx
import { createContext } from "react";
import type { ToastType } from "./toastUtils";

export type ToastContextType = {
  showToast: (type: ToastType, message: string, ttl?: number) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
