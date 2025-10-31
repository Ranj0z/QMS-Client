// src/api/AllAPIRoutes.ts

/* ===========================================================
   AUTH & USERS
=========================================================== */
/*
---- Auth Routes ----
POST   /api/v2/auth/login                 -> Login user
POST   /api/v2/auth/admin-create          -> Admin creates a user
POST   /api/v2/auth/forgot-password       -> Request password reset code
POST   /api/v2/auth/reset-password        -> Reset password using code

---- User Routes ----
GET    /api/v2/user/all                   -> Get all users
GET    /api/v2/user/active                -> Get active users only
GET    /api/v2/user/:id                   -> Get user by ID (active only)
GET    /api/v2/user/email/:email          -> Get active user by email
PATCH  /api/v2/user/update/:id            -> Update active user details
PATCH  /api/v2/user/make-admin/:id        -> Promote user to admin
DELETE /api/v2/user/:id                   -> Soft delete user
PATCH  /api/v2/user/restore/:id           -> Restore soft-deleted user
*/

/* ===========================================================
   BRANCHES
=========================================================== */
/*
---- Branch Routes ----
POST   /api/v2/branch/new                 -> Create a new branch
GET    /api/v2/branch/all                 -> Get all branches
GET    /api/v2/branch/active              -> Get active branches
GET    /api/v2/branch/:id                 -> Get branch by ID
PATCH  /api/v2/branch/update/:id          -> Update branch details
DELETE /api/v2/branch/:id                 -> Soft delete branch
PATCH  /api/v2/branch/restore/:id         -> Restore soft-deleted branch
*/

/* ===========================================================
   COUNTERS
=========================================================== */
/*
---- Counter Routes ----
POST   /api/v2/counter/new                -> Create new counter
GET    /api/v2/counter/all                -> Get all counters
GET    /api/v2/counter/active             -> Get active counters
GET    /api/v2/counter/:id                -> Get counter by ID
GET    /api/v2/counter/branch/:branchId   -> Get counters by branch ID (active only)
PATCH  /api/v2/counter/update/:id         -> Update counter details
DELETE /api/v2/counter/:id                -> Soft delete counter
PATCH  /api/v2/counter/restore/:id        -> Restore soft-deleted counter
*/

/* ===========================================================
   SERVICES
=========================================================== */
/*
---- Service Routes ----
POST   /api/v2/service/new                -> Create a new service
GET    /api/v2/service/all                -> Get all services
GET    /api/v2/service/active             -> Get active services
GET    /api/v2/service/:id                -> Get service by ID
PATCH  /api/v2/service/update/:id         -> Update service details
DELETE /api/v2/service/:id                -> Soft delete service
PATCH  /api/v2/service/restore/:id        -> Restore soft-deleted service
*/

/* ===========================================================
   STATUSES
=========================================================== */
/*
---- Status Routes ----
POST   /api/v2/status/new                 -> Create a new status
GET    /api/v2/status/all                 -> Get all statuses
GET    /api/v2/status/:id                 -> Get status by ID
PATCH  /api/v2/status/update/:id          -> Update status details
DELETE /api/v2/status/:id                 -> Delete status (hard delete)
*/

/* ===========================================================
   AGENTS
=========================================================== */
/*
---- Agent Routes ----
POST   /api/v2/agent/new                  -> Create a new agent record
GET    /api/v2/agent/all                  -> Get all agents
GET    /api/v2/agent/:id                  -> Get agent by ID
PATCH  /api/v2/agent/update/:id           -> Update agent details
PATCH  /api/v2/agent/availability/:id     -> Update agent availability
DELETE /api/v2/agent/:id                  -> Soft delete agent
PATCH  /api/v2/agent/restore/:id          -> Restore soft-deleted agent
*/

/* ===========================================================
   AGENT SERVICES
=========================================================== */
/*
---- Agent Service Routes ----
POST   /api/v2/agent-services/new         -> Assign service to agent
GET    /api/v2/agent-services/all         -> Get all agent-service links
GET    /api/v2/agent-services/:agentId    -> Get services assigned to an agent
DELETE /api/v2/agent-services/:id         -> Remove agent-service assignment
*/

/* ===========================================================
   TICKETS
=========================================================== */
/*
---- Ticket Routes ----
POST   /api/v2/ticket/new                     -> Create new ticket
GET    /api/v2/ticket/all                     -> Get all tickets
GET    /api/v2/ticket/:ticketId               -> Get ticket by ID
GET    /api/v2/ticket/next/:agentId           -> Get next ticket for agent
PATCH  /api/v2/ticket/reassign/:ticketId      -> Reassign ticket to another counter
PATCH  /api/v2/ticket/close/:ticketId         -> Close ticket
GET    /api/v2/ticket/waiting                 -> Get all waiting tickets
PATCH  /api/v2/ticket/missing/:ticketId       -> Mark ticket as missing
PATCH  /api/v2/ticket/pause/:ticketId         -> Pause ticket
PATCH  /api/v2/ticket/assign/:ticketId        -> Assign ticket to a counter
GET    /api/v2/ticket/paused/:agentId         -> Get today's paused tickets by agent (full details)
*/


/* ===========================================================
   NOTES
=========================================================== */
/*
---- Note Routes ----
POST   /api/v2/note/new                   -> Add new note to ticket
GET    /api/v2/note/all                   -> Get all notes
GET    /api/v2/note/:ticketId             -> Get notes by ticket ID
GET    /api/v2/note/user/:userId          -> Get notes by user ID
PATCH  /api/v2/note/update/:id            -> Update note
*/

/* ===========================================================
   ACTIVITY LOGS
=========================================================== */
/*
---- Activity Log Routes ----
POST   /api/v2/activity-log/new           -> Add generic activity log
POST   /api/v2/activity-log/ticket-created -> Log ticket creation
POST   /api/v2/activity-log/next-called    -> Log next ticket call
POST   /api/v2/activity-log/reassigned     -> Log ticket reassignment
POST   /api/v2/activity-log/closed         -> Log ticket closure
GET    /api/v2/activity-log/all            -> Get all activity logs
GET    /api/v2/activity-log/user/:userId   -> Get logs by user ID
GET    /api/v2/activity-log/agent/:agentId -> Get logs by agent ID
GET    /api/v2/activity-log/ticket/:ticketId -> Get logs by ticket ID
*/

/* ===========================================================
   END OF ROUTE SUMMARY
=========================================================== */
