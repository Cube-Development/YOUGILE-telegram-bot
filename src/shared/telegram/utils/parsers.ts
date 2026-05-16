/** Поля задачи, извлечённые из текста reply-сообщения (/task_list формат) */
export interface ReplyTaskFields {
	taskId: string;
	title: string;
	description: string;
	assigned: string;
	messageLink: string;
}

/** Извлекает поля задачи из текста reply-сообщения */
export function parseReplyTaskFields(text: string): ReplyTaskFields | null {
	const taskIdMatch = text.match(/task_id:\s+([a-fA-F0-9\-]+)/);
	if (!taskIdMatch) return null;

	const titleMatch = text.match(/title:\s+(.+)/);
	const descMatch = text.match(/description:\s+(.+)/);
	const assignedMatch = text.match(/assigned:\s+(.+)/);
	const linkMatch = text.match(/https:\/\/t\.me\/c\/\d+\/\d+/);

	return {
		taskId: taskIdMatch[1],
		title: titleMatch ? titleMatch[1].trim() : "Без названия",
		description: descMatch ? descMatch[1].trim() : "",
		assigned: assignedMatch ? assignedMatch[1].trim() : "",
		messageLink: linkMatch ? linkMatch[0] : ""
	};
}

/** Генерирует ссылку на Telegram-сообщение */
export function buildMessageLink(chatId: number, messageId: number): string {
	const rawChatId = String(chatId).replace(/^-100/, "");
	return `https://t.me/c/${rawChatId}/${messageId}`;
}

/** Поля, извлечённые из текста команды (все опциональные) */
export interface ParsedCommandFields {
	columnName?: string;
	title?: string;
	description?: string;
	assigned?: string[];
}

/**
 * Универсальный парсер полей из текста команды.
 *
 * @param text — полный текст сообщения
 * @param commandPattern — regex для удаления команды из первой строки
 *   (например /^\/new(?:@\w+)?\s*$/i)
 *
 * Логика:
 * 1. Первая строка: удаляет commandPattern, ищет `#ColumnName`
 * 2. Остальные строки: title:, description:, assigned:, column: / #Column
 */
export function parseCommandFields(
	text: string,
	commandPattern?: RegExp
): ParsedCommandFields {
	const lines = text
		.trim()
		.split("\n")
		.map((l) => l.trim());

	let columnName: string | undefined;
	let startIndex = 0;

	// Извлекаем колонку из первой строки (после команды)
	if (commandPattern) {
		const firstLine = lines[0].replace(commandPattern, "").trim();
		const hashMatch = firstLine.match(/^#(.+)$/);
		if (hashMatch) {
			columnName = hashMatch[1].trim();
			startIndex = 1;
		} else if (firstLine) {
			// Первая строка не содержит #Column — пропускаем только команду
			startIndex = 1;
		}
	}

	let title: string | undefined;
	let description: string | undefined;
	let assigned: string[] | undefined;

	for (const line of lines.slice(startIndex)) {
		const lower = line.toLowerCase();
		if (lower.startsWith("title:")) {
			title = line.slice("title:".length).trim();
		} else if (lower.startsWith("description:")) {
			description = line.slice("description:".length).trim();
		} else if (lower.startsWith("assigned:")) {
			const raw = line.slice("assigned:".length).trim();
			assigned = raw
				.split(/\s+/)
				.map((u) => u.replace(/^@/, "").trim())
				.filter(Boolean);
		} else if (lower.startsWith("column:")) {
			columnName = line
				.slice("column:".length)
				.trim()
				.replace(/^#/, "")
				.trim();
		} else if (line.match(/^#(.+)$/)) {
			columnName = line.match(/^#(.+)$/)![1].trim();
		}
	}

	return { columnName, title, description, assigned };
}

export interface ParsedTaskList {
	columnName: string;
	assignedUsername?: string;
}

/** Парсит команду /task_list #Column @username */
export function parseTaskListMessage(text: string): ParsedTaskList | null {
	const lines = text
		.trim()
		.split("\n")
		.map((l) => l.trim());
	let firstLine = lines[0];

	firstLine = firstLine.replace(/^\/task[_-]list(?:@\w+)?\s*/i, "");

	if (!firstLine.startsWith("#")) return null;

	const match = firstLine.match(/^#(.+?)(?:\s+@([a-zA-Z0-9_]+))?$/);
	if (!match) return null;

	return {
		columnName: match[1].trim(),
		assignedUsername: match[2]?.trim()
	};
}
