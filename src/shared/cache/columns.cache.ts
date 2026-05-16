import { LRUCache } from "lru-cache";

import type { ColumnListDtoBase } from "@/shared/api/generated";

/** Кеш колонок: ключ = chatId (number), значение = массив колонок */
/** Записи живут бессрочно — сбрасываются только при вызове /start */
export const columnsCache = new LRUCache<number, ColumnListDtoBase[]>({
	max: 500
});
