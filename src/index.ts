import { log } from "@/shared/logger";

import { startBot } from "./modules/telegram/bot";

async function main() {
	try {
		await startBot();
	} catch (error) {
		log.error(error, "Failed to start application");
		process.exit(1);
	}
}

main();
