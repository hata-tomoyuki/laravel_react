/** チケットの共通フィールド（API・フォーム共通） */
interface TicketBase {
    id: number;
    title: string;
    body: string | null;
    priority: string;
    status: string;
    category_id: number | null;
    requester_id: number | null;
    assignee_id: number | null;
    due_at: string | null;
}

/** 一覧・詳細で用いるチケット（リレーション・日時付き） */
export interface Ticket extends TicketBase {
    created_at: string;
    updated_at: string;
    category?: { id: number; name: string };
    requester?: { id: number; name: string };
    assignee?: { id: number; name: string } | null;
}
