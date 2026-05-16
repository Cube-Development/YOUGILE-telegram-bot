import { env } from "./schema";

// config.ts
export class SETTINGS {
	static get BOT_TOKEN() {
		return env.BOT_TOKEN;
	}
	static get YOUGILE_BASE_URL() {
		return env.YOUGILE_BASE_URL;
	}
	static get YOUGILE_KEY_COMPANY() {
		return env.YOUGILE_KEY_COMPANY;
	}
	static get YOUGILE_BLOGIX_PROJECT_ID() {
		return env.YOUGILE_BLOGIX_PROJECT_ID;
	}
	static get YOUGILE_BLOGIX_BOARD_ID() {
		return env.YOUGILE_BLOGIX_BOARD_ID;
	}
	static get USERS_MAP() {
		return env.USERS_MAP;
	}
}
