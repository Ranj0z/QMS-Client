// src/api/kioskAPI.ts
import axios, { AxiosError } from "axios";

/* ===========================================================
   TYPES
=========================================================== */
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type Service = {
  id: number;
  branch_id: number;
  name: string;
  description: string;
  prefix: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type NewTicketRequest = {
  service_id: number;
  customer_name?: string;
  customer_phone: string;
  priority?: number;
  email?: string;
};

export type Ticket = {
  id: number;
  ticket_number: string;
  service_id: number;
  branch_id: number;
  created_at: string;
};

/* ===========================================================
   CONSTANTS
=========================================================== */
const DEFAULT_BRANCH_ID = 1;
const Express_URL = import.meta.env.VITE_EXPRESS_URL;

/* ===========================================================
   API CLIENT
=========================================================== */
const apiClient = axios.create({
  baseURL: Express_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor (for debugging)
apiClient.interceptors.request.use((config) => {
  console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// ✅ Response interceptor — no double wrapping
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = "Network error";
    if (error.response) {
      message = `${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      message = "No response from server";
    } else if (error.message) {
      message = error.message;
    }
    return Promise.reject({ success: false, message });
  }
);

/* ===========================================================
   API CALLS
=========================================================== */

// ✅ Get active services for branch 1
export async function getServices(
  branchId: number = DEFAULT_BRANCH_ID
): Promise<ApiResponse<Service[]>> {
  const res = await apiClient.get<ApiResponse<Service[]>>("/service/active");

  if (!res.data.success) {
    return { success: false, message: res.data.message, data: [] };
  }

  const filtered = (res.data.data || []).filter(
    (s: Service) => s.branch_id === branchId
  );

  return { success: true, data: filtered };
}

// ✅ Create new ticket for branch 1
export async function createTicket(
  payload: NewTicketRequest
): Promise<ApiResponse<Ticket>> {
  const body = {
    branch_id: DEFAULT_BRANCH_ID,
    ...payload,
  };

  const res = await apiClient.post<ApiResponse<Ticket>>("/ticket/new", body);
  return res.data;
}
