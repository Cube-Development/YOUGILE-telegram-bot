import type {
	ColumnDto,
	ColumnListDto,
	CreateColumnDto,
	UpdateColumnDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const KOLONKI_PATHS = {
	columncontrollerSearch: {
		url: "/api-v2/columns",
		method: "GET",
		summary: "Получить список",
		_types: {} as {
			body: void;
			query: {
				includeDeleted?: boolean;
				limit?: number;
				offset?: number;
				title?: string;
				boardId?: string;
			};
			response: ColumnListDto;
		}
	} as const,
	columncontrollerCreate: {
		url: "/api-v2/columns",
		method: "POST",
		summary: "Создать",
		_types: {} as {
			body: CreateColumnDto;
			query: void;
			response: WithIdDto;
		}
	} as const,
	columncontroller: (id: string) =>
		({
			url: `/api-v2/columns/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as { body: void; query: void; response: ColumnDto }
		}) as const,
	columncontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/columns/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateColumnDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
