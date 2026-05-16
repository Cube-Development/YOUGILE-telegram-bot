import { SETTINGS } from "@/config/settings";

/** Маппинг Telegram username → YouGile user ID, полученный из переменных окружения */
export const TG_TO_YOUGILE_ID: Record<string, string> = (() => {
	const map: Record<string, string> = {};

	// Ожидается формат: username1:id1,username2:id2
	const pairs = SETTINGS.USERS_MAP.split(",");
	for (const pair of pairs) {
		const [username, id] = pair.split(":");
		if (username && id) {
			map[username.trim()] = id.trim();
		}
	}

	// Оставляем дефолтные для совместимости, если в env ничего нет, или убираем?
	// Пока что только из env
	return map;
})();
