import "dotenv/config";
import { z } from "zod";

import { log } from "@/shared/logger";

/**
 * Zod-схема для валидации env-переменных при старте.
 * Сервер не запустится без обязательных переменных — ошибка будет читаемой.
 */
const envSchema = z.object({
	BOT_TOKEN: z.string(),
	YOUGILE_BASE_URL: z.string(),
	YOUGILE_KEY_COMPANY: z.string(),
	YOUGILE_BLOGIX_PROJECT_ID: z.string(),
	YOUGILE_BLOGIX_BOARD_ID: z.string(),
	USERS_MAP: z.string().optional().default("")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	log.error(parsed.error.issues, "❌ Ошибка валидации env-переменных");
	process.exit(1);
}

export const env = parsed.data;
