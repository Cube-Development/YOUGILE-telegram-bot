/** Экранирует HTML-спецсимволы для Telegram parse_mode: "HTML" */
export function escapeHTML(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}
