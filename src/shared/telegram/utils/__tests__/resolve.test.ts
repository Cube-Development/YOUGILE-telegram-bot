import { YOUGILE_TO_TG, resolveColumn, resolveUserToYougileId } from "..";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { columnsCache } from "@/shared/cache/columns.cache";

// ─── Mock context ───

function createMockCtx() {
	return {
		reply: vi.fn()
	} as any;
}

// ─── resolveColumn ───

describe("resolveColumn", () => {
	const CHAT_ID = 12345;

	beforeEach(() => {
		columnsCache.clear();
	});

	it("возвращает null и отправляет reply если кеш пуст", async () => {
		const ctx = createMockCtx();
		const result = await resolveColumn(ctx, CHAT_ID, "Backlog");

		expect(result).toBeNull();
		expect(ctx.reply).toHaveBeenCalledWith(
			expect.stringContaining("не загружен")
		);
	});

	it("находит колонку по имени (case-insensitive)", async () => {
		columnsCache.set(CHAT_ID, [
			{ id: "col-1", title: "Backlog" },
			{ id: "col-2", title: "Done" }
		] as any);

		const ctx = createMockCtx();
		const result = await resolveColumn(ctx, CHAT_ID, "backlog");

		expect(result).toEqual({ id: "col-1", title: "Backlog" });
		expect(ctx.reply).not.toHaveBeenCalled();
	});

	it("находит колонку по ID", async () => {
		columnsCache.set(CHAT_ID, [{ id: "col-1", title: "Backlog" }] as any);

		const ctx = createMockCtx();
		const result = await resolveColumn(ctx, CHAT_ID, "col-1");

		expect(result).toEqual({ id: "col-1", title: "Backlog" });
	});

	it("возвращает null и список доступных при промахе", async () => {
		columnsCache.set(CHAT_ID, [
			{ id: "col-1", title: "Backlog" },
			{ id: "col-2", title: "Done" }
		] as any);

		const ctx = createMockCtx();
		const result = await resolveColumn(ctx, CHAT_ID, "NonExistent");

		expect(result).toBeNull();
		expect(ctx.reply).toHaveBeenCalledWith(
			expect.stringContaining("не найдена"),
			expect.objectContaining({ parse_mode: "HTML" })
		);
		// Проверяем что в сообщении перечислены доступные колонки
		const msg = ctx.reply.mock.calls[0][0];
		expect(msg).toContain("Backlog");
		expect(msg).toContain("Done");
	});
});

// ─── resolveUserToYougileId ───

describe("resolveUserToYougileId", () => {
	it("находит пользователя case-insensitive", async () => {
		const ctx = createMockCtx();
		// "codesleeprepeat" существует в TG_TO_YOUGILE_ID
		const result = await resolveUserToYougileId(ctx, "CodeSleepRepeat");

		expect(result).toBe("056c230c-a113-430b-9d9b-05c636203005");
		expect(ctx.reply).not.toHaveBeenCalled();
	});

	it("возвращает null и reply для неизвестного юзера", async () => {
		const ctx = createMockCtx();
		const result = await resolveUserToYougileId(ctx, "unknown_user");

		expect(result).toBeNull();
		expect(ctx.reply).toHaveBeenCalledWith(
			expect.stringContaining("не найден")
		);
	});
});

// ─── YOUGILE_TO_TG ───

describe("YOUGILE_TO_TG", () => {
	it("содержит обратный маппинг", () => {
		expect(YOUGILE_TO_TG["056c230c-a113-430b-9d9b-05c636203005"]).toBe(
			"codesleeprepeat"
		);
	});
});
