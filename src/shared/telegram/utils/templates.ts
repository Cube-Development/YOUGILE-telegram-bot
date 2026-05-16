import { escapeHTML } from "./html";

/** Смещение UTC+5 в миллисекундах */
const UTC_OFFSET_MS = 5 * 60 * 60 * 1000;

/** Конвертирует UNIX-timestamp (мс) в строку даты UTC+5 */
export function formatTimestamp(ts: number): string {
	const date = new Date(ts + UTC_OFFSET_MS);
	const pad = (n: number) => String(n).padStart(2, "0");
	const y = date.getUTCFullYear();
	const m = pad(date.getUTCMonth() + 1);
	const d = pad(date.getUTCDate());
	const hh = pad(date.getUTCHours());
	const mm = pad(date.getUTCMinutes());
	return `${d}.${m}.${y} ${hh}:${mm} (UTC+5)`;
}

export interface TaskMessageFields {
	taskId: string;
	title: string;
	description?: string;
	assigned?: string;
	column?: string;
	messageLink?: string;
	createdAt?: string;
	createdBy?: string;
}

type ActionLabel = "Create" | "Delete" | "Edit" | "Move";

/** Формирует стандартное HTML-сообщение об успешном действии над задачей */
export function formatSuccessMessage(
	action: ActionLabel,
	fields: TaskMessageFields
): string {
	const lines: string[] = [`✅ <u>${action} Success</u>`, ""];

	if (fields.column) {
		lines.push(`<b>column:</b> <code>${escapeHTML(fields.column)}</code>`);
	}

	lines.push(`<b>task_id:</b> <code>${fields.taskId}</code>`);
	lines.push("");
	lines.push(`<b>title:</b> <code>${escapeHTML(fields.title)}</code>`);

	if (fields.description) {
		lines.push(`<b>description:</b> ${escapeHTML(fields.description)}`);
	}

	if (fields.assigned) {
		lines.push(`<b>assigned:</b> ${escapeHTML(fields.assigned)}`);
	}

	if (fields.createdAt) {
		lines.push(`<b>created:</b> ${escapeHTML(fields.createdAt)}`);
	}

	if (fields.createdBy) {
		lines.push(`<b>created_by:</b> ${escapeHTML(fields.createdBy)}`);
	}

	if (fields.messageLink) {
		lines.push("");
		lines.push(fields.messageLink);
	}

	return lines.join("\n");
}

/** Формирует карточку задачи для /task_list */
export function formatTaskCard(
	index: number,
	fields: TaskMessageFields
): string {
	const lines: string[] = [`<b>№ ${index}</b>`];

	if (fields.column) {
		lines.push(`<b>column:</b> #${escapeHTML(fields.column)}`);
	}

	lines.push(`<b>task_id:</b> <code>${fields.taskId}</code>`);
	lines.push(`<b>title:</b> ${escapeHTML(fields.title)}`);

	if (fields.description) {
		const desc =
			fields.description.length > 500
				? fields.description.slice(0, 500) + "..."
				: fields.description;
		lines.push(`<b>description:</b> ${escapeHTML(desc)}`);
	}

	if (fields.assigned) {
		lines.push(`<b>assigned:</b> ${escapeHTML(fields.assigned)}`);
	}

	if (fields.createdAt) {
		lines.push(`<b>created:</b> ${escapeHTML(fields.createdAt)}`);
	}

	if (fields.createdBy) {
		lines.push(`<b>created_by:</b> ${escapeHTML(fields.createdBy)}`);
	}

	return lines.join("\n");
}

/** Извлекает сообщение об ошибке из API-ответа */
export function extractApiError(error: any): string {
	return error?.response?.data?.message ?? error.message;
}
