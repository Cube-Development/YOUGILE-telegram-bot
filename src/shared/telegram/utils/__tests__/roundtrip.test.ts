import { formatSuccessMessage, formatTaskCard, parseReplyTaskFields } from "..";
import { describe, expect, it } from "vitest";

/**
 * Интеграционные roundtrip-тесты.
 *
 * В Telegram: бот отправляет HTML → Telegram рендерит → при reply приходит plain text.
 * Поэтому перед парсингом стрипаем HTML-теги, имитируя поведение Telegram.
 */
function stripHTML(html: string): string {
	return html.replace(/<[^>]+>/g, "");
}

describe("roundtrip: formatTaskCard → parseReplyTaskFields", () => {
	it("карточка из task_list парсится обратно", () => {
		const card = formatTaskCard(1, {
			taskId: "aabb0011-2233-4455-6677-8899aabbccdd",
			title: "Fix login",
			description: "Cannot sign in",
			assigned: "@codesleeprepeat",
			column: "Backlog"
		});

		const parsed = parseReplyTaskFields(stripHTML(card));
		expect(parsed).not.toBeNull();
		expect(parsed!.taskId).toBe("aabb0011-2233-4455-6677-8899aabbccdd");
		expect(parsed!.title).toBe("Fix login");
		expect(parsed!.description).toBe("Cannot sign in");
		expect(parsed!.assigned).toBe("@codesleeprepeat");
	});

	it("карточка без опциональных полей парсится", () => {
		const card = formatTaskCard(1, {
			taskId: "aabb0011-2233-4455-6677-8899aabbccdd",
			title: "Simple task"
		});

		const parsed = parseReplyTaskFields(stripHTML(card));
		expect(parsed).not.toBeNull();
		expect(parsed!.taskId).toBe("aabb0011-2233-4455-6677-8899aabbccdd");
		expect(parsed!.title).toBe("Simple task");
		expect(parsed!.description).toBe("");
		expect(parsed!.assigned).toBe("");
	});
});

describe("roundtrip: formatSuccessMessage → parseReplyTaskFields", () => {
	it("success-сообщение create парсится для reply-команд", () => {
		const msg = formatSuccessMessage("Create", {
			taskId: "11aa22bb-cc33-dd44-ee55-ff6677889900",
			title: "New task",
			description: "Some desc",
			assigned: "@user",
			messageLink: "https://t.me/c/123456/789"
		});

		const parsed = parseReplyTaskFields(stripHTML(msg));
		expect(parsed).not.toBeNull();
		expect(parsed!.taskId).toBe("11aa22bb-cc33-dd44-ee55-ff6677889900");
		expect(parsed!.messageLink).toBe("https://t.me/c/123456/789");
	});

	it("success-сообщение move с column парсится", () => {
		const msg = formatSuccessMessage("Move", {
			taskId: "aabb0011-2233-4455-6677-8899aabbccdd",
			title: "Moved task",
			column: "Done"
		});

		const parsed = parseReplyTaskFields(stripHTML(msg));
		expect(parsed).not.toBeNull();
		expect(parsed!.taskId).toBe("aabb0011-2233-4455-6677-8899aabbccdd");
	});
});
