import { Telegraf } from "telegraf";

import { type ColumnListDtoBase, KOLONKI_PATHS } from "@/shared/api/generated";
import { columnsCache } from "@/shared/cache/columns.cache";
import { log } from "@/shared/logger";

import { yougileApi } from "@/api/yougile";
import { SETTINGS } from "@/config/settings";
import { COMMANDS } from "@/constants";

/**
 * Загружает колонки доски из YouGile API и кладёт их в кеш.
 * Ключ кеша — chatId. Вызывается при /start.
 */
export async function loadColumnsToCache(
	chatId: number
): Promise<ColumnListDtoBase[]> {
	const endpoint = KOLONKI_PATHS.columncontrollerSearch;

	const response = await yougileApi.get(endpoint.url, {
		params: { boardId: SETTINGS.YOUGILE_BLOGIX_BOARD_ID, limit: 1000 }
	});

	const columns: ColumnListDtoBase[] = response.data?.content ?? [];
	columnsCache.set(chatId, columns);
	log.success({ chatId, count: columns.length }, "Columns cached");

	return columns;
}

export const setupColumnsListCommand = (bot: Telegraf) => {
	bot.command(COMMANDS.COLUMNS_LIST, async (ctx) => {
		const username = ctx.from?.username;
		log.info(
			{
				username,
				command: COMMANDS.COLUMNS_LIST,
				text: ctx.message.text
			},
			"Command received"
		);

		await ctx.reply("⏳ Загружаю колонки...");
		try {
			const columns = await loadColumnsToCache(ctx.chat.id);
			const names = columns
				.map(
					(c) =>
						`• <code>${c.title}</code>\n  id: <code>${c.id}</code>`
				)
				.join("\n");
			await ctx.reply(
				`✅ Колонки обновлены!\n\nДоступные колонки:\n${names}`,
				{ parse_mode: "HTML" }
			);
		} catch (error: any) {
			const msg =
				error?.response?.data?.message ??
				error?.message ??
				String(error);
			log.error({ username, error: msg }, "Columns load failed");
			await ctx.reply(`❌ Не удалось загрузить колонки:\n${msg}`);
		}
	});
};
