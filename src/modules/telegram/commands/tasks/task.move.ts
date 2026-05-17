import { Telegraf } from "telegraf";

import { ZADACHI_PATHS } from "@/shared/api";
import { log } from "@/shared/logger";
import {
	extractApiError,
	formatSuccessMessage,
	formatTimestamp,
	parseReplyTaskFields,
	resolveColumn
} from "@/shared/telegram";

import { yougileApi } from "@/api/yougile";
import { COMMANDS } from "@/constants";

export const setupTaskMoveCommand = (bot: Telegraf) => {
	bot.command(COMMANDS.TASK_MOVE, async (ctx) => {
		const username = ctx.from?.username;
		log.info(
			{ username, command: COMMANDS.TASK_MOVE, text: ctx.message.text },
			"Command received"
		);

		const replyTo = ctx.message.reply_to_message;

		if (!replyTo || !("text" in replyTo)) {
			await ctx.reply(
				"❌ Команду /move нужно вызывать как реплай на сообщение с задачей из списка."
			);
			return;
		}

		// Извлекаем название целевой колонки
		const match =
			ctx.message.text.match(/^\/move(?:@\w+)?\s+#(.+)$/i) ||
			ctx.message.text.match(/^\/move(?:@\w+)?\s+(.+)$/i);
		if (!match) {
			await ctx.reply("❌ Укажи колонку: /move #ColumnName");
			return;
		}

		const targetColumnName = match[1].trim();

		const fields = parseReplyTaskFields(replyTo.text);
		if (!fields) {
			await ctx.reply(
				`❌ Не удалось найти task_id в сообщении. Убедись, что это правильное сообщение из ${COMMANDS.TASK_LIST}.`
			);
			return;
		}

		const column = await resolveColumn(ctx, ctx.chat.id, targetColumnName);
		if (!column) return;

		try {
			const endpoint = ZADACHI_PATHS.taskcontrollerUpdate(fields.taskId);
			await yougileApi.put(endpoint.url, { columnId: column.id });
			log.success(
				{ username, taskId: fields.taskId, targetColumn: column.title },
				"Task moved"
			);

			await ctx.reply(
				formatSuccessMessage("Move", {
					taskId: fields.taskId,
					title: fields.title,
					description: fields.description || undefined,
					assigned: fields.assigned || undefined,
					column: column.title,
					createdAt: formatTimestamp(Date.now()),
					createdBy: username ? `@${username}` : undefined
				}),
				{ parse_mode: "HTML" }
			);
		} catch (error: any) {
			log.error(
				{
					username,
					taskId: fields.taskId,
					error: extractApiError(error)
				},
				"Task move failed"
			);
			await ctx.reply(
				`❌ Ошибка при перемещении задачи: ${extractApiError(error)}`
			);
		}
	});
};
