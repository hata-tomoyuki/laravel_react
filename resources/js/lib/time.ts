/**
 * 日付文字列を日本語ロケールでフォーマットする
 * @param dateString - ISO 8601形式などの日付文字列
 * @returns フォーマットされた日付文字列（例: 2025年2月7日 12:00）。空の場合は '-'
 */
export const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * ISO 8601形式の日付文字列を、<input type="datetime-local"> で利用可能な
 * "YYYY-MM-DDTHH:MM" 形式の文字列に変換する
 *
 * @param isoString - 変換したいISO日付文字列（null許容）
 * @returns "YYYY-MM-DDTHH:MM" 形式の文字列。nullや空の場合は空文字列
 */
export const toDateTimeLocal = (isoString: string | null): string => {
    if (!isoString) return '';
    const d = new Date(isoString);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
