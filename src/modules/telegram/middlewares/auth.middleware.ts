import { Context } from "telegraf";

import { log } from "@/shared/logger";

import { TG_TO_YOUGILE_ID } from "@/constants/users.map";

/**
 * Middleware для проверки прав доступа.
 * Разрешает использование бота только тем пользователям,
 * которые указаны в USERS_MAP (в .env).
 */
export const authMiddleware = async (
	ctx: Context,
	next: () => Promise<void>
) => {
	const username = ctx.from?.username;
	if (!username || !Object.keys(TG_TO_YOUGILE_ID).includes(username)) {
		log.warn(
			{ username: username ?? "unknown", userId: ctx.from?.id },
			"Access denied"
		);
		await ctx.reply("❌ У вас нет доступа к этому боту.");
		return;
	}

	log.debug({ username }, "Access granted");
	await next();
};
