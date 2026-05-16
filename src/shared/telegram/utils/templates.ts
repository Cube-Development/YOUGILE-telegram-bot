import { escapeHTML } from "./html";

export interface TaskMessageFields {
	taskId: string;
	title: string;
	description?: string;
	assigned?: string;
	column?: string;
	messageLink?: string;
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

	return lines.join("\n");
}

/** Извлекает сообщение об ошибке из API-ответа */
export function extractApiError(error: any): string {
	return error?.response?.data?.message ?? error.message;
}
