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
   API CALLS
=========================================================== */

// ✅ Get all tickets (filter client-side by branch/service)
export async function getAgentTickets(
  agentId: number
): Promise<ApiResponse<AgentTicket[]>> {
  const res = await apiClient.get<ApiResponse<AgentTicket[]>>(`/ticket/all?agent=${agentId}`);
  return res.data;
}

// ✅ Get next ticket for agent
export async function getNextTicket(
  agentId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.get<ApiResponse<AgentTicket>>(`/ticket/next/${agentId}`);
  return res.data;
}

// ✅ Close ticket
export async function closeTicket(
  ticketId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.patch<ApiResponse<AgentTicket>>(`/ticket/close/${ticketId}`);
  return res.data;
}

// ✅ Escalate ticket (adds note)
export async function escalateTicket(
  payload: EscalationNote
): Promise<ApiResponse<NoteResponse>> {
  const res = await apiClient.post<ApiResponse<NoteResponse>>("/note/new", payload);
  return res.data;
}

// ✅ Log activity (for any action)
export async function logAction(
  payload: ActivityLog
): Promise<ApiResponse<ActivityLog>> {
  const res = await apiClient.post<ApiResponse<ActivityLog>>("/activity-log/new", payload);
  return res.data;
}

// ✅ (Optional) Get summary metrics (unserved/missing counts)
export async function getAgentSummary(
  agentId: number
): Promise<ApiResponse<ActivityLog[]>> {
  const res = await apiClient.get<ApiResponse<ActivityLog[]>>(`/activity-log/agent/${agentId}`);
  return res.data;
}

/* ===========================================================
   EXPORTS
=========================================================== */
export const agentAPI = {
  getAgentTickets,
  getNextTicket,
  closeTicket,
  escalateTicket,
  logAction,
  getAgentSummary,
};
