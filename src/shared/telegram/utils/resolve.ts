import type { Context } from "telegraf";

import type { ColumnListDtoBase } from "@/shared/api/generated";
import { columnsCache } from "@/shared/cache/columns.cache";

import { escapeHTML } from "./html";
import { TG_TO_YOUGILE_ID } from "@/constants";

/** Обратный маппинг YouGile ID → TG username */
export const YOUGILE_TO_TG = Object.fromEntries(
	Object.entries(TG_TO_YOUGILE_ID).map(([tg, yg]) => [yg, tg])
);

/**
 * Ищет колонку в кеше по имени или ID.
 * При ошибке отправляет reply и возвращает null.
 */
export async function resolveColumn(
	ctx: Context,
	chatId: number,
	columnName: string
): Promise<ColumnListDtoBase | null> {
	const columns = columnsCache.get(chatId);
	if (!columns || columns.length === 0) {
		await ctx.reply(
			"⚠️ Список колонок не загружен. Нажми /start для обновления кеша."
		);
		return null;
	}

	const column = columns.find(
		(c) =>
			c.title.toLowerCase() === columnName.toLowerCase() ||
			c.id === columnName
	);

	if (!column) {
		const names = columns
			.map((c) => `• <code>${escapeHTML(c.title)}</code>`)
			.join("\n");
		await ctx.reply(
			`❌ Колонка "#${escapeHTML(columnName)}" не найдена.\n\nДоступные колонки:\n${names}`,
			{ parse_mode: "HTML" }
		);
		return null;
	}

	return column;
}

/**
 * Резолвит TG username в YouGile ID (case-insensitive).
 * При ошибке отправляет reply и возвращает null.
 */
export async function resolveUserToYougileId(
	ctx: Context,
	username: string
): Promise<string | null> {
	const key = Object.keys(TG_TO_YOUGILE_ID).find(
		(k) => k.toLowerCase() === username.toLowerCase()
	);

	if (!key) {
		await ctx.reply(`⚠️ Пользователь @${username} не найден в маппинге.`);
		return null;
	}

	return TG_TO_YOUGILE_ID[key];
}
