import { Telegraf } from "telegraf";

import { COMMANDS } from "@/constants";

const TEMPLATES: { title: string; template: string }[] = [
	{
		title: "📝 Создание задачи",
		template:
			`/${COMMANDS.TASK_NEW} #Column-Name\n` +
			`title: Название задачи\n` +
			`description: Описание задачи\n` +
			`assigned: @username`
	},
	{
		title: "📋 Список задач в колонке",
		template: `/${COMMANDS.TASK_LIST} #Column-Name`
	},
	{
		title: "📋 Список задач (фильтр по исполнителю)",
		template: `/${COMMANDS.TASK_LIST} #Column-Name @username`
	},
	{
		title: "✏️ Редактирование задачи (реплай)",
		template:
			`/${COMMANDS.TASK_EDIT}\n` +
			`title: Новый заголовок\n` +
			`description: Новое описание\n` +
			`assigned: @username\n` +
			`#New-Column`
	},
	{
		title: "🗑 Удаление задачи (реплай)",
		template: `/${COMMANDS.TASK_DELETE}`
	},
	{
		title: "📦 Перемещение задачи (реплай)",
		template: `/${COMMANDS.TASK_MOVE} #Target-Column`
	}
];

export const setupTemplatesCommand = (bot: Telegraf) => {
	bot.command(COMMANDS.TEMPLATES, async (ctx) => {
		// Сначала отправляем заголовок
		await ctx.reply(
			"<b>📑 Шаблоны команд</b>\n\nСкопируй нужный шаблон и заполни поля:",
			{ parse_mode: "HTML" }
		);

		// Каждый шаблон — отдельным сообщением для удобного копирования
		for (const { title, template } of TEMPLATES) {
			await new Promise((r) => setTimeout(r, 80));
			await ctx.reply(`<b>${title}</b>\n\n<pre>${template}</pre>`, {
				parse_mode: "HTML"
			});
		}
	});
};
