export interface Ticket {
    id: number;
    title: string;
    body: string | null;
    status: string;
    priority: string;
    category_id: number | null;
    requester_id: number | null;
    assignee_id: number | null;
    due_at: string | null;
    created_at: string;
    updated_at: string;
    category?: { id: number; name: string };
    requester?: { id: number; name: string };
    assignee?: { id: number; name: string } | null;
}
