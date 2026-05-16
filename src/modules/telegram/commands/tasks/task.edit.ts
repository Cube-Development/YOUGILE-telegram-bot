import { Telegraf } from "telegraf";

import { type UpdateTaskDto, ZADACHI_PATHS } from "@/shared/api";
import { log } from "@/shared/logger";
import {
	extractApiError,
	formatSuccessMessage,
	parseCommandFields,
	parseReplyTaskFields,
	resolveColumn,
	resolveUserToYougileId
} from "@/shared/telegram";

import { yougileApi } from "@/api/yougile";
import { COMMANDS } from "@/constants";

/** Regex для удаления команды /edit из первой строки */
const COMMAND_PATTERN = /^\/edit(?:@\w+)?\s*/i;

export const setupTaskEditCommand = (bot: Telegraf) => {
	bot.command(COMMANDS.TASK_EDIT, async (ctx) => {
		const username = ctx.from?.username;
		log.info(
			{ username, command: COMMANDS.TASK_EDIT, text: ctx.message.text },
			"Command received"
		);

		const replyTo = ctx.message.reply_to_message;

		if (!replyTo || !("text" in replyTo)) {
			await ctx.reply(
				"❌ Команду нужно вызывать как реплай на сообщение с задачей из списка."
			);
			return;
		}

		const oldFields = parseReplyTaskFields(replyTo.text);
		if (!oldFields) {
			await ctx.reply("❌ Не удалось найти task_id в сообщении.");
			return;
		}

		const parsed = parseCommandFields(ctx.message.text, COMMAND_PATTERN);
		const body: UpdateTaskDto = {};

		if (parsed.title) body.title = parsed.title;
		if (parsed.description !== undefined)
			body.description = parsed.description;

		// Обрабатываем column
		if (parsed.columnName) {
			const column = await resolveColumn(
				ctx,
				ctx.chat.id,
				parsed.columnName
			);
			if (!column) return;
			body.columnId = column.id;
		}

		// Обрабатываем assigned
		let resolvedAssigned = oldFields.assigned;
		if (parsed.assigned && parsed.assigned.length > 0) {
			const ids: string[] = [];
			for (const u of parsed.assigned) {
				const yougileId = await resolveUserToYougileId(ctx, u);
				if (!yougileId) return;
				ids.push(yougileId);
			}
			body.assigned = ids;
			resolvedAssigned = parsed.assigned.map((u) => `@${u}`).join(" ");
		}

		if (Object.keys(body).length === 0) {
			await ctx.reply("⚠️ Нет новых данных для обновления задачи.");
			return;
		}

		try {
			const endpoint = ZADACHI_PATHS.taskcontrollerUpdate(
				oldFields.taskId
			);
			await yougileApi.put(endpoint.url, body);
			log.success(
				{
					username,
					taskId: oldFields.taskId,
					changes: Object.keys(body)
				},
				"Task edited"
			);

			await ctx.reply(
				formatSuccessMessage("Edit", {
					taskId: oldFields.taskId,
					title: parsed.title || oldFields.title,
					description:
						(parsed.description !== undefined
							? parsed.description
							: oldFields.description) || undefined,
					assigned: resolvedAssigned || undefined,
					messageLink: oldFields.messageLink || undefined
				}),
				{ parse_mode: "HTML" }
			);
		} catch (error: any) {
			log.error(
				{
					username,
					taskId: oldFields.taskId,
					error: extractApiError(error)
				},
				"Task edit failed"
			);
			await ctx.reply(
				`❌ Ошибка при изменении задачи: ${extractApiError(error)}`
			);
		}
	});
};
