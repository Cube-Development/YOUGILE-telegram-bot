import { Telegraf } from "telegraf";

import { COMMANDS } from "@/constants";

const INSTRUCTIONS_TEXT = `
<b>📖 Инструкция по использованию бота</b>

<b>1. Базовые команды</b>
/start — инициализация работы с ботом (кеширует структуру доски).
/${COMMANDS.COLUMNS_LIST} — загрузить актуальный список колонок проекта в кеш и вывести их ID.

<b>2. Создание задачи</b>
<pre>/${COMMANDS.TASK_NEW} #Column-Name
title: Название задачи
description: Описание (необязательно)
assigned: @user1 @user2 (необязательно)</pre>

• Колонку можно указать по имени или ID.
• Можно указать нескольких исполнителей через пробел.
• Ссылка на исходное сообщение автоматически добавляется в описание.

<b>3. Список задач</b>
<pre>/${COMMANDS.TASK_LIST} #Column-Name @username</pre>

• Фильтр по исполнителю — необязательный.
• Каждая задача приходит отдельным сообщением.

<b>4. Редактирование задачи</b>
Реплай на сообщение задачи из списка:
<pre>/${COMMANDS.TASK_EDIT}
title: Новый заголовок
description: Новое описание
assigned: @new_user1 @new_user2
#New-Column</pre>

• Указывай только поля, которые нужно изменить.
• Можно указать нескольких исполнителей через пробел.

<b>5. Удаление задачи</b>
Реплай на сообщение задачи из списка:
<pre>/${COMMANDS.TASK_DELETE}</pre>

<b>6. Перемещение задачи</b>
Реплай на сообщение задачи из списка:
<pre>/${COMMANDS.TASK_MOVE} #Target-Column</pre>

<b>7. Шаблоны</b>
/${COMMANDS.TEMPLATES} — получить готовые шаблоны для копирования.

<b>8. Эта инструкция</b>
/${COMMANDS.INSTRUCTIONS}
`.trim();

export const setupInstructionsCommand = (bot: Telegraf) => {
	bot.command(COMMANDS.INSTRUCTIONS, async (ctx) => {
		await ctx.reply(INSTRUCTIONS_TEXT, {
			parse_mode: "HTML",
			link_preview_options: { is_disabled: true }
		});
	});
};
