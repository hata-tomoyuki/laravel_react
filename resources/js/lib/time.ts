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
