import "dotenv/config";
import { Telegraf } from "telegraf";

import { log } from "@/shared/logger";

import {
	loadColumnsToCache,
	setupColumnsListCommand,
	setupInstructionsCommand,
	setupTaskCreateCommand,
	setupTaskDeleteCommand,
	setupTaskEditCommand,
	setupTaskListCommand,
	setupTaskMoveCommand,
	setupTemplatesCommand
} from "./commands";
import { authMiddleware } from "./middlewares";
import { COMMANDS } from "@/constants";

const token = process.env.BOT_TOKEN;

if (!token) {
	throw new Error("BOT_TOKEN is required in .env");
}

export const bot = new Telegraf(token);

// Middleware авторизации
bot.use(authMiddleware);

// Подключаем команды
setupInstructionsCommand(bot);
setupTemplatesCommand(bot);
setupColumnsListCommand(bot);
setupTaskCreateCommand(bot);
setupTaskListCommand(bot);
setupTaskEditCommand(bot);
setupTaskDeleteCommand(bot);
setupTaskMoveCommand(bot);

bot.start(async (ctx) => {
	const username = ctx.from?.username;
	log.info({ username }, "Command received: /start");

	await ctx.reply("⏳ Инициализация...");
	try {
		await loadColumnsToCache(ctx.chat.id);
		log.success({ username }, "Bot initialized");
		await ctx.reply(
			`✅ Готов к работе!\n\n` +
				`Используй /${COMMANDS.COLUMNS_LIST} для просмотра доступных колонок.\n` +
				`Используй /${COMMANDS.INSTRUCTIONS} для справки.`,
			{ parse_mode: "HTML" }
		);
	} catch (error: any) {
		const msg =
			error?.response?.data?.message ?? error?.message ?? String(error);
		log.error({ username, error: msg }, "Bot init failed");
		await ctx.reply(`❌ Ошибка загрузки данных:\n${msg}`);
	}
});

/** Регистрирует подсказки slash-команд в меню Telegram */
async function registerBotCommands() {
	await bot.telegram.setMyCommands([
		{ command: "start", description: "Запуск бота" },
		{
			command: COMMANDS.COLUMNS_LIST,
			description: "Загрузить и показать колонки"
		},
		{
			command: COMMANDS.INSTRUCTIONS,
			description: "Инструкция по использованию"
		},
		{
			command: COMMANDS.TEMPLATES,
			description: "Шаблоны команд для копирования"
		},
		{ command: COMMANDS.TASK_NEW, description: "Создать задачу в колонке" },
		{ command: COMMANDS.TASK_LIST, description: "Список задач в колонке" },
		{
			command: COMMANDS.TASK_EDIT,
			description: "Редактировать задачу (реплай)"
		},
		{
			command: COMMANDS.TASK_DELETE,
			description: "Удалить задачу (реплай)"
		},
		{
			command: COMMANDS.TASK_MOVE,
			description: "Переместить задачу (реплай)"
		}
	]);
}

export const startBot = async () => {
	await registerBotCommands();
	bot.launch();
	log.success("🤖 Telegram bot started");

	// Обработка сигналов завершения
	process.once("SIGINT", () => bot.stop("SIGINT"));
	process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
