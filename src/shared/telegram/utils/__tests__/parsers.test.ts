import {
	parseCommandFields,
	parseReplyTaskFields,
	parseTaskListMessage
} from "..";
import { describe, expect, it } from "vitest";

// ─── parseReplyTaskFields ───

describe("parseReplyTaskFields", () => {
	const FULL_TEXT = [
		"№ 1",
		"column: #Backlog",
		"task_id: 11aa22bb-cc33-dd44-ee55-ff6677889900",
		"title: Fix login bug",
		"description: Users can't sign in",
		"assigned: @codesleeprepeat"
	].join("\n");

	it("извлекает все поля из полного сообщения task_list", () => {
		const result = parseReplyTaskFields(FULL_TEXT);
		expect(result).toEqual({
			taskId: "11aa22bb-cc33-dd44-ee55-ff6677889900",
			title: "Fix login bug",
			description: "Users can't sign in",
			assigned: "@codesleeprepeat"
		});
	});

	it("возвращает дефолты для отсутствующих полей", () => {
		const minimal = "task_id: aabb0011-2233-4455-6677-8899aabbccdd";
		const result = parseReplyTaskFields(minimal);
		expect(result).toEqual({
			taskId: "aabb0011-2233-4455-6677-8899aabbccdd",
			title: "Без названия",
			description: "",
			assigned: ""
		});
	});

	it("возвращает null если task_id отсутствует", () => {
		expect(parseReplyTaskFields("title: Some task")).toBeNull();
		expect(parseReplyTaskFields("")).toBeNull();
	});
});


// ─── parseCommandFields ───

describe("parseCommandFields", () => {
	const NEW_CMD = /^\/new(?:@\w+)?\s*/i;
	const EDIT_CMD = /^\/edit(?:@\w+)?\s*/i;

	describe("create flow (с commandPattern)", () => {
		it("парсит полную команду /new #Column + все поля", () => {
			const text = [
				"/new #Backlog",
				"title: Fix bug",
				"description: Critical issue",
				"assigned: @john"
			].join("\n");

			expect(parseCommandFields(text, NEW_CMD)).toEqual({
				columnName: "Backlog",
				title: "Fix bug",
				description: "Critical issue",
				assigned: ["john"]
			});
		});

		it("парсит команду с bot mention", () => {
			const text = "/new@mybot #Todo\ntitle: Test";
			expect(parseCommandFields(text, NEW_CMD)).toEqual({
				columnName: "Todo",
				title: "Test",
				description: undefined,
				assigned: undefined
			});
		});

		it("парсит только title без опциональных полей", () => {
			const text = "/new #Done\ntitle: Ship it";
			const result = parseCommandFields(text, NEW_CMD);
			expect(result.columnName).toBe("Done");
			expect(result.title).toBe("Ship it");
			expect(result.description).toBeUndefined();
			expect(result.assigned).toBeUndefined();
		});

		it("убирает @ из assigned", () => {
			const text = "/new #Col\ntitle: T\nassigned: @user";
			expect(parseCommandFields(text, NEW_CMD).assigned).toEqual([
				"user"
			]);
		});

		it("парсит несколько assigned через пробел", () => {
			const text = "/new #Col\ntitle: T\nassigned: @user1 @user2 @user3";
			expect(parseCommandFields(text, NEW_CMD).assigned).toEqual([
				"user1",
				"user2",
				"user3"
			]);
		});

		it("парсит assigned без @", () => {
			const text = "/new #Col\ntitle: T\nassigned: user1 user2";
			expect(parseCommandFields(text, NEW_CMD).assigned).toEqual([
				"user1",
				"user2"
			]);
		});

		it("возвращает undefined если нет #Column в хедере", () => {
			const text = "/new\ntitle: No column";
			const result = parseCommandFields(text, NEW_CMD);
			expect(result.columnName).toBeUndefined();
			expect(result.title).toBe("No column");
		});
	});

	describe("edit flow (без обязательных полей)", () => {
		it("парсит только title", () => {
			const text = "/edit\ntitle: Updated title";
			expect(parseCommandFields(text, EDIT_CMD)).toEqual({
				columnName: undefined,
				title: "Updated title",
				description: undefined,
				assigned: undefined
			});
		});

		it("парсит column: префикс", () => {
			const text = "/edit\ncolumn: NewColumn";
			expect(parseCommandFields(text, EDIT_CMD).columnName).toBe(
				"NewColumn"
			);
		});

		it("парсит column: с #", () => {
			const text = "/edit\ncolumn: #NewColumn";
			expect(parseCommandFields(text, EDIT_CMD).columnName).toBe(
				"NewColumn"
			);
		});

		it("парсит #Column как хэштег в теле", () => {
			const text = "/edit\ntitle: T\n#TargetCol";
			expect(parseCommandFields(text, EDIT_CMD).columnName).toBe(
				"TargetCol"
			);
		});

		it("возвращает все undefined если пустая команда", () => {
			const text = "/edit";
			const result = parseCommandFields(text, EDIT_CMD);
			expect(result.columnName).toBeUndefined();
			expect(result.title).toBeUndefined();
			expect(result.description).toBeUndefined();
			expect(result.assigned).toBeUndefined();
		});
	});

	describe("без commandPattern", () => {
		it("парсит поля без удаления команды", () => {
			const text = "title: Raw\ndescription: Test";
			expect(parseCommandFields(text)).toEqual({
				columnName: undefined,
				title: "Raw",
				description: "Test",
				assigned: undefined
			});
		});
	});

	describe("case insensitive ключи", () => {
		it("Title: и TITLE: тоже работают", () => {
			const text = "/new #Col\nTitle: Upper\nDESCRIPTION: Caps";
			const result = parseCommandFields(text, NEW_CMD);
			expect(result.title).toBe("Upper");
			expect(result.description).toBe("Caps");
		});
	});
});

// ─── parseTaskListMessage ───

describe("parseTaskListMessage", () => {
	it("парсит обычный вызов с колонкой", () => {
		const result = parseTaskListMessage(
			"/task_list #Backlog\nsome other text"
		);
		expect(result).toEqual({
			columnName: "Backlog",
			assignedUsername: undefined
		});
	});

	it("парсит вызов с колонкой и пользователем", () => {
		const result = parseTaskListMessage(
			"/task_list #In-Progress @john_doe"
		);
		expect(result).toEqual({
			columnName: "In-Progress",
			assignedUsername: "john_doe"
		});
	});

	it("парсит с упоминанием бота", () => {
		const result = parseTaskListMessage("/task_list@my_bot #Done @admin");
		expect(result).toEqual({
			columnName: "Done",
			assignedUsername: "admin"
		});
	});

	it("возвращает null если нет #Колонки", () => {
		expect(parseTaskListMessage("/task_list")).toBeNull();
		expect(parseTaskListMessage("/task_list just_text")).toBeNull();
	});

	it("работает с /task-list (через дефис)", () => {
		const result = parseTaskListMessage("/task-list #Bugs");
		expect(result).toEqual({
			columnName: "Bugs",
			assignedUsername: undefined
		});
	});
});
