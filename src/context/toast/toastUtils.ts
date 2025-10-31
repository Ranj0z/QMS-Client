// src/context/toast/toastUtils.ts

export type ToastType = "success" | "error";

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  ttl?: number;
};

export function makeToast(id: string, type: ToastType, message: string, ttl = 5000): ToastItem {
  return { id, type, message, ttl };
}
