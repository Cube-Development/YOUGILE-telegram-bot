import { Telegraf } from "telegraf";

import { ZADACHI_PATHS } from "@/shared/api";
import { log } from "@/shared/logger";
import {
	extractApiError,
	formatSuccessMessage,
	formatTimestamp,
	parseReplyTaskFields
} from "@/shared/telegram";

import { yougileApi } from "@/api/yougile";
import { COMMANDS } from "@/constants";

export const setupTaskDeleteCommand = (bot: Telegraf) => {
	bot.command(COMMANDS.TASK_DELETE, async (ctx) => {
		const username = ctx.from?.username;
		log.info(
			{ username, command: COMMANDS.TASK_DELETE, text: ctx.message.text },
			"Command received"
		);

		const replyTo = ctx.message.reply_to_message;

		if (!replyTo || !("text" in replyTo)) {
			await ctx.reply(
				`❌ Команду ${COMMANDS.TASK_DELETE} нужно вызывать как реплай на сообщение с задачей из списка.`
			);
			return;
		}

		const fields = parseReplyTaskFields(replyTo.text);
		if (!fields) {
			await ctx.reply(
				`❌ Не удалось найти task_id в сообщении. Убедись, что это правильное сообщение из ${COMMANDS.TASK_LIST}.`
			);
			return;
		}

		try {
			const endpoint = ZADACHI_PATHS.taskcontrollerUpdate(fields.taskId);
			await yougileApi.put(endpoint.url, { deleted: true });
			log.success(
				{ username, taskId: fields.taskId, title: fields.title },
				"Task deleted"
			);

			await ctx.reply(
				formatSuccessMessage("Delete", {
					taskId: fields.taskId,
					title: fields.title,
					description: fields.description || undefined,
					assigned: fields.assigned || undefined,
					messageLink: fields.messageLink || undefined,
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
				"Task delete failed"
			);
			await ctx.reply(
				`❌ Ошибка при удалении задачи: ${extractApiError(error)}`
			);
		}
	});
};
