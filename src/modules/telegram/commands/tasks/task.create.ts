import { Telegraf } from "telegraf";

import { type CreateTaskDto, ZADACHI_PATHS } from "@/shared/api";
import { log } from "@/shared/logger";
import {
	buildMessageLink,
	extractApiError,
	formatSuccessMessage,
	parseCommandFields,
	resolveColumn,
	resolveUserToYougileId
} from "@/shared/telegram";

import { yougileApi } from "@/api/yougile";
import { COMMANDS } from "@/constants";

/** Regex для удаления команды /new из первой строки */
const COMMAND_PATTERN = /^\/new(?:@\w+)?\s*/i;

export const setupTaskCreateCommand = (bot: Telegraf) => {
	bot.command(COMMANDS.TASK_NEW, async (ctx) => {
		const username = ctx.from?.username;
		log.info(
			{ username, command: COMMANDS.TASK_NEW, text: ctx.message.text },
			"Command received"
		);

		const parsed = parseCommandFields(ctx.message.text, COMMAND_PATTERN);

		if (!parsed.columnName || !parsed.title) {
			await ctx.reply(
				"❌ Неверный формат. Используй:\n" +
					`/${COMMANDS.TASK_NEW} #ColumnName\n` +
					"title: Название\n" +
					"description: Описание\n" +
					"assigned: @username"
			);
			return;
		}

		const column = await resolveColumn(ctx, ctx.chat.id, parsed.columnName);
		if (!column) return;

		const messageLink = buildMessageLink(
			ctx.chat.id,
			ctx.message.message_id
		);

		const descriptionWithLink = parsed.description
			? `${parsed.description}\n\n${messageLink}`
			: messageLink;

		let assignedIds: string[] | undefined;
		if (parsed.assigned && parsed.assigned.length > 0) {
			assignedIds = [];
			for (const username of parsed.assigned) {
				const yougileId = await resolveUserToYougileId(ctx, username);
				if (!yougileId) return;
				assignedIds.push(yougileId);
			}
		}

		const body: CreateTaskDto = {
			title: parsed.title,
			columnId: column.id,
			description: descriptionWithLink,
			...(assignedIds ? { assigned: assignedIds } : {})
		};

		try {
			const response = await yougileApi.post(
				ZADACHI_PATHS.taskcontrollerCreate.url,
				body
			);
			const taskId: string = response.data?.id;
			log.success(
				{ username, taskId, title: parsed.title },
				"Task created"
			);

			await ctx.reply(
				formatSuccessMessage("Create", {
					taskId,
					title: parsed.title,
					description: parsed.description,
					assigned: parsed.assigned
						? parsed.assigned.map((u) => `@${u}`).join(" ")
						: undefined,
					messageLink
				}),
				{ parse_mode: "HTML" }
			);
		} catch (error: any) {
			log.error(
				{
					username,
					title: parsed.title,
					error: extractApiError(error)
				},
				"Task create failed"
			);
			await ctx.reply(
				`❌ Ошибка при создании задачи: ${extractApiError(error)}`
			);
		}
	});
};
