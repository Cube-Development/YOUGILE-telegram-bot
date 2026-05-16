import type {
	CreateSprintStickerDto,
	SprintStickerWithStatesDto,
	SprintStickerWithStatesListDto,
	UpdateSprintStickerDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const STIKER_SPRINTA_PATHS = {
	sprintstickercontrollerSearch: {
		url: "/api-v2/sprint-stickers",
		method: "GET",
		summary: "Получить список",
		_types: {} as {
			body: void;
			query: {
				includeDeleted?: boolean;
				limit?: number;
				offset?: number;
				name?: string;
				boardId?: string;
			};
			response: SprintStickerWithStatesListDto;
		}
	} as const,
	sprintstickercontrollerCreate: {
		url: "/api-v2/sprint-stickers",
		method: "POST",
		summary: "Создать",
		_types: {} as {
			body: CreateSprintStickerDto;
			query: void;
			response: WithIdDto;
		}
	} as const,
	sprintstickercontrollerGetsticker: (id: string) =>
		({
			url: `/api-v2/sprint-stickers/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as {
				body: void;
				query: void;
				response: SprintStickerWithStatesDto;
			}
		}) as const,
	sprintstickercontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/sprint-stickers/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateSprintStickerDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
