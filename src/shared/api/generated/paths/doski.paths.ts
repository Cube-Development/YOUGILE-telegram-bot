import type {
	BoardDto,
	BoardListDto,
	CreateBoardDto,
	UpdateBoardDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const DOSKI_PATHS = {
	boardcontrollerSearch: {
		url: "/api-v2/boards",
		method: "GET",
		summary: "Получить список",
		_types: {} as {
			body: void;
			query: {
				includeDeleted?: boolean;
				limit?: number;
				offset?: number;
				title?: string;
				projectId?: string;
			};
			response: BoardListDto;
		}
	} as const,
	boardcontrollerCreate: {
		url: "/api-v2/boards",
		method: "POST",
		summary: "Создать",
		_types: {} as { body: CreateBoardDto; query: void; response: WithIdDto }
	} as const,
	boardcontroller: (id: string) =>
		({
			url: `/api-v2/boards/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as { body: void; query: void; response: BoardDto }
		}) as const,
	boardcontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/boards/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateBoardDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
