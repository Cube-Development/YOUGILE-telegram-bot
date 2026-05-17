import { extractApiError, formatSuccessMessage, formatTaskCard } from "..";
import { describe, expect, it } from "vitest";

// ─── formatSuccessMessage ───

describe("formatSuccessMessage", () => {
	it("формирует минимальное сообщение (только обязательные поля)", () => {
		const msg = formatSuccessMessage("Create", {
			taskId: "abc-123",
			title: "Test task"
		});

		expect(msg).toContain("✅");
		expect(msg).toContain("Create Success");
		expect(msg).toContain("<b>task_id:</b> <code>abc-123</code>");
		expect(msg).toContain("<b>title:</b> <code>Test task</code>");
		expect(msg).not.toContain("description:");
		expect(msg).not.toContain("assigned:");
		expect(msg).not.toContain("column:");
	});

	it("включает все опциональные поля", () => {
		const msg = formatSuccessMessage("Edit", {
			taskId: "id-1",
			title: "Title",
			description: "Desc",
			assigned: "@user",
			column: "Backlog"
		});

		expect(msg).toContain("Edit Success");
		expect(msg).toContain("<b>column:</b> <code>Backlog</code>");
		expect(msg).toContain("<b>description:</b> Desc");
		expect(msg).toContain("<b>assigned:</b> @user");
	});

	it("экранирует HTML в полях", () => {
		const msg = formatSuccessMessage("Delete", {
			taskId: "id-2",
			title: "<script>alert(1)</script>"
		});

		expect(msg).toContain("&lt;script&gt;");
		expect(msg).not.toContain("<script>");
	});

	it("column ставится перед task_id", () => {
		const msg = formatSuccessMessage("Move", {
			taskId: "id",
			title: "T",
			column: "Done"
		});

		const colIdx = msg.indexOf("column:");
		const taskIdx = msg.indexOf("task_id:");
		expect(colIdx).toBeLessThan(taskIdx);
	});


});

// ─── formatTaskCard ───

describe("formatTaskCard", () => {
	it("формирует карточку с номером", () => {
		const card = formatTaskCard(3, {
			taskId: "abc",
			title: "My task",
			column: "Todo"
		});

		expect(card).toContain("<b>№ 3</b>");
		expect(card).toContain("<b>column:</b> #Todo");
		expect(card).toContain("<b>task_id:</b> <code>abc</code>");
		expect(card).toContain("<b>title:</b> My task");
	});

	it("обрезает description > 500 символов", () => {
		const longDesc = "A".repeat(600);
		const card = formatTaskCard(1, {
			taskId: "id",
			title: "T",
			description: longDesc
		});

		expect(card).toContain("A".repeat(500) + "...");
		expect(card).not.toContain("A".repeat(501));
	});

	it("не включает отсутствующие поля", () => {
		const card = formatTaskCard(1, {
			taskId: "id",
			title: "T"
		});

		expect(card).not.toContain("column:");
		expect(card).not.toContain("description:");
		expect(card).not.toContain("assigned:");
	});
});

// ─── extractApiError ───

describe("extractApiError", () => {
	it("извлекает message из response.data", () => {
		const error = {
			response: { data: { message: "Not Found" } },
			message: "fallback"
		};
		expect(extractApiError(error)).toBe("Not Found");
	});

	it("фоллбэк на error.message", () => {
		const error = { message: "Network error" };
		expect(extractApiError(error)).toBe("Network error");
	});

	it("обрабатывает null response", () => {
		const error = { response: null, message: "Oops" };
		expect(extractApiError(error)).toBe("Oops");
	});
});
