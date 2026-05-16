import { Telegraf } from "telegraf";

import { type TaskDto, ZADACHI_PATHS } from "@/shared/api";
import { log } from "@/shared/logger";
import {
	YOUGILE_TO_TG,
	escapeHTML,
	extractApiError,
	formatTaskCard,
	parseTaskListMessage,
	resolveColumn,
	resolveUserToYougileId
} from "@/shared/telegram";

import { yougileApi } from "@/api/yougile";
import { COMMANDS } from "@/constants";

export const setupTaskListCommand = (bot: Telegraf) => {
	bot.command(COMMANDS.TASK_LIST, async (ctx) => {
		const username = ctx.from?.username;
		log.info(
			{ username, command: COMMANDS.TASK_LIST, text: ctx.message.text },
			"Command received"
		);

		const parsed = parseTaskListMessage(ctx.message.text);
		if (!parsed) {
			await ctx.reply(
				`❌ Неверный формат. Используй:\n${COMMANDS.TASK_LIST} #Column-Name [@username]`
			);
			return;
		}

		const column = await resolveColumn(ctx, ctx.chat.id, parsed.columnName);
		if (!column) return;

		let assignedId: string | undefined;
		if (parsed.assignedUsername) {
			const id = await resolveUserToYougileId(
				ctx,
				parsed.assignedUsername
			);
			if (!id) return;
			assignedId = id;
		}

		try {
			const params: any = { columnId: column.id, limit: 50 };
			if (assignedId) params.assignedTo = assignedId;

			const response = await yougileApi.get(
				ZADACHI_PATHS.taskcontrollerSearch.url,
				{ params }
			);
			const tasks: TaskDto[] = response.data?.content ?? [];
			log.success(
				{ username, column: column.title, count: tasks.length },
				"Task list fetched"
			);

			if (tasks.length === 0) {
				await ctx.reply(
					`В колонке <code>${escapeHTML(column.title)}</code> нет задач.`,
					{ parse_mode: "HTML" }
				);
				return;
			}

			const assignedFilterMsg = parsed.assignedUsername
				? ` | <b>assigned:</b> @${escapeHTML(parsed.assignedUsername)}`
				: "";
			await ctx.reply(
				`<b>Column:</b> #${escapeHTML(column.title)} | <b>Tasks:</b> ${tasks.length}${assignedFilterMsg}`,
				{ parse_mode: "HTML" }
			);

			for (let i = 0; i < tasks.length; i++) {
				const task = tasks[i];
				const assigned = task.assigned
					?.map((id) => {
						const username = YOUGILE_TO_TG[id];
						return username ? `@${username}` : id;
					})
					.join(", ");

				const msg = formatTaskCard(i + 1, {
					taskId: task.id,
					title: task.title,
					description: task.description,
					assigned: assigned || undefined,
					column: column.title
				});

				await new Promise((resolve) => setTimeout(resolve, 100));
				await ctx.reply(msg, {
					parse_mode: "HTML",
					link_preview_options: { is_disabled: true }
				});
			}
		} catch (error: any) {
			log.error(
				{
					username,
					column: column.title,
					error: extractApiError(error)
				},
				"Task list failed"
			);
			await ctx.reply(
				`❌ Ошибка при получении задач: ${extractApiError(error)}`
			);
		}
	});
};
