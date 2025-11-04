// src/api/agentAPI.ts
import apiClient from "./apiClient";

/* ===========================================================
   TYPES
=========================================================== */
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type AgentTicket = {
  id: number;
  ticket_number: string;
  branch_id: number;
  service_id: number;
  counter_id?: number;
  agent_id?: number;
  status_id: number;
  created_at: string;
  updated_at: string;
};

export type EscalationNote = {
  ticket_id: number;
  user_id: number;
  category: "escalation";
  content: string;
};

export type NoteResponse = {
  id: number;
  ticket_id: number;
  user_id: number;
  category: "escalation";
  content: string;
  created_at: string;
};

export type ActivityLog = {
  id?: number;
  ticket_id: number;
  agent_id?: number;
  action:
    | "created"
    | "next_called"
    | "in_progress"
    | "reassigned"
    | "escalated"
    | "paused"
    | "resumed"
    | "closed"
    | "auto_timeout";
  details?: string;
  created_at?: string;
};

/* ===========================================================
   EXISTING CORE ENDPOINTS
=========================================================== */

// ✅ Get all tickets (filter client-side by branch/service)
export async function getAgentTickets(
  agentId: number
): Promise<ApiResponse<AgentTicket[]>> {
  const res = await apiClient.get<ApiResponse<AgentTicket[]>>(
    `/ticket/all?agent=${agentId}`
  );
  return res.data;
}

// ✅ Get next ticket for agent
export async function getNextTicket(
  agentId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.get<ApiResponse<AgentTicket>>(
    `/ticket/next/${agentId}`
  );
  return res.data;
}

// ✅ Close ticket
export async function closeTicket(
  ticketId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.patch<ApiResponse<AgentTicket>>(
    `/ticket/close/${ticketId}`
  );
  return res.data;
}

// ✅ Escalate ticket (adds note)
export async function escalateTicket(
  payload: EscalationNote
): Promise<ApiResponse<NoteResponse>> {
  const res = await apiClient.post<ApiResponse<NoteResponse>>(
    "/note/new",
    payload
  );
  return res.data;
}

// ✅ Log activity (for any action)
export async function logAction(
  payload: ActivityLog
): Promise<ApiResponse<ActivityLog>> {
  const res = await apiClient.post<ApiResponse<ActivityLog>>(
    "/activity-log/new",
    payload
  );
  return res.data;
}

/* ===========================================================
   NEW AGENT DASHBOARD ENDPOINTS (For Counts & Modals)
=========================================================== */

// ✅ Get all waiting (unserved) tickets
export async function getWaitingTickets(
  agentId: number,
  branchId: number
): Promise<ApiResponse<AgentTicket[]>> {
  const res = await apiClient.get<ApiResponse<AgentTicket[]>>(`/ticket/waiting`, {
    params: { agentId, branchId },
  });
  return res.data;
}

// ✅ Get count of unserved tickets
export async function getUnservedCount(
  agentId: number,
  branchId: number
): Promise<ApiResponse<{ count: number }>> {
  const res = await apiClient.get<ApiResponse<{ count: number }>>(
    `/ticket/waiting`,
    { params: { agentId, branchId } }
  );
  if (res.data.success) {
    const count = Array.isArray(res.data.data)
      ? (res.data.data as AgentTicket[]).length
      : 0;
    return { success: true, data: { count } };
  }
  return { success: false, message: res.data.message || "Failed to fetch count", data: { count: 0 } };
}

// ✅ Get missing tickets
export async function getMissingTickets(
  agentId: number,
  branchId: number
): Promise<ApiResponse<AgentTicket[]>> {
  const res = await apiClient.get<ApiResponse<AgentTicket[]>>(
    `/ticket/all?status=missing`,
    { params: { agentId, branchId } }
  );
  return res.data;
}

// ✅ Get count of missing tickets
export async function getMissingCount(
  agentId: number,
  branchId: number
): Promise<ApiResponse<{ count: number }>> {
  const res = await getMissingTickets(agentId, branchId);
  const count = res.success && Array.isArray(res.data) ? res.data.length : 0;
  return { success: true, data: { count } };
}

// ✅ Get paused tickets
export async function getPausedTickets(
  agentId: number,
  branchId: number
): Promise<ApiResponse<AgentTicket[]>> {
  const res = await apiClient.get<ApiResponse<AgentTicket[]>>(
    `/ticket/paused/${agentId}`,
    { params: { branchId } }
  );
  return res.data;
}

// ✅ Get count of paused tickets
export async function getPausedCount(
  agentId: number,
  branchId: number
): Promise<ApiResponse<{ count: number }>> {
  const res = await getPausedTickets(agentId, branchId);
  const count = res.success && Array.isArray(res.data) ? res.data.length : 0;
  return { success: true, data: { count } };
}

// ✅ Assign ticket to agent and mark as in_progress
export async function assignTicketToAgent(
  ticketId: number,
  agentId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.patch<ApiResponse<AgentTicket>>(
    `/ticket/reassign/${ticketId}`,
    { agent_id: agentId }
  );
  return res.data;
}

// ✅ Mark ticket as missing
export async function markTicketMissing(
  ticketId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.patch<ApiResponse<AgentTicket>>(
    `/ticket/missing/${ticketId}`
  );
  return res.data;
}

// ✅ Pause a ticket
export async function pauseTicket(
  ticketId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.patch<ApiResponse<AgentTicket>>(
    `/ticket/pause/${ticketId}`
  );
  return res.data;
}

/* ===========================================================
   EXPORTS
=========================================================== */
export const agentAPI = {
  // core
  getAgentTickets,
  getNextTicket,
  closeTicket,
  escalateTicket,
  logAction,
  // dashboard
  getWaitingTickets,
  getUnservedCount,
  getMissingTickets,
  getMissingCount,
  getPausedTickets,
  getPausedCount,
  assignTicketToAgent,
  markTicketMissing,
  pauseTicket,
};
