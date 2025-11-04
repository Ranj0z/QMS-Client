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

// ✅ Assign a ticket to this agent (manual assignment via modal)
export async function assignTicketToAgent(
  ticketId: number,
  agentId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.patch<ApiResponse<AgentTicket>>(
    `/ticket/assign/${ticketId}`,
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

// ✅ Pause ticket
export async function pauseTicket(
  ticketId: number
): Promise<ApiResponse<AgentTicket>> {
  const res = await apiClient.patch<ApiResponse<AgentTicket>>(
    `/ticket/pause/${ticketId}`
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

// ✅ Log action (for any ticket activity)
export async function logAction(
  payload: ActivityLog
): Promise<ApiResponse<ActivityLog>> {
  const res = await apiClient.post<ApiResponse<ActivityLog>>(
    "/activity-log/new",
    payload
  );
  return res.data;
}

// ✅ Get unserved (waiting) tickets for branch/services
export async function getUnservedCount(
  branchId: number
): Promise<ApiResponse<AgentTicket[]>> {
  const res = await apiClient.get<ApiResponse<AgentTicket[]>>(
    `/ticket/waiting?branch=${branchId}`
  );
  return res.data;
}

// ✅ Get missing tickets for branch
export async function getMissingCount(
  branchId: number
): Promise<ApiResponse<AgentTicket[]>> {
  const res = await apiClient.get<ApiResponse<AgentTicket[]>>(
    `/ticket/missing?branch=${branchId}`
  );
  return res.data;
}

// ✅ Get paused tickets (filtered by agent)
export async function getPausedCount(
  agentId: number
): Promise<ApiResponse<AgentTicket[]>> {
  const res = await apiClient.get<ApiResponse<AgentTicket[]>>(
    `/ticket/paused/${agentId}`
  );
  return res.data;
}

/* ===========================================================
   EXPORT
=========================================================== */
export const agentAPI = {
  getAgentTickets,
  getNextTicket,
  assignTicketToAgent,
  markTicketMissing,
  pauseTicket,
  closeTicket,
  escalateTicket,
  logAction,
  getUnservedCount,
  getMissingCount,
  getPausedCount,
};
