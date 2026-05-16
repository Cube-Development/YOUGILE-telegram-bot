import type {
	CreateStringStickerDto,
	StringStickerWithStatesDto,
	StringStickerWithStatesListDto,
	UpdateStringStickerDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const STIKER_S_NABOROM_SOSTOYANIY_PATHS = {
	stringstickercontrollerSearch: {
		url: "/api-v2/string-stickers",
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
			response: StringStickerWithStatesListDto;
		}
	} as const,
	stringstickercontrollerCreate: {
		url: "/api-v2/string-stickers",
		method: "POST",
		summary: "Создать",
		_types: {} as {
			body: CreateStringStickerDto;
			query: void;
			response: WithIdDto;
		}
	} as const,
	stringstickercontroller: (id: string) =>
		({
			url: `/api-v2/string-stickers/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as {
				body: void;
				query: void;
				response: StringStickerWithStatesDto;
			}
		}) as const,
	stringstickercontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/string-stickers/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateStringStickerDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
