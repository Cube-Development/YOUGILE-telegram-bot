import type {
	CreateStringStickerStateDto,
	StringStickerStateDto,
	UpdateStringStickerStateDto,
	WithStickerStateIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const SOSTOYANIYA_STIKERA_S_NABOROM_SOSTOYANIY_PATHS = {
	stringstickerstatecontroller: (stickerId: string, stickerStateId: string) =>
		({
			url: `/api-v2/string-stickers/${stickerId}/states/${stickerStateId}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as {
				body: void;
				query: { includeDeleted?: boolean };
				response: StringStickerStateDto;
			}
		}) as const,
	stringstickerstatecontrollerUpdate: (
		stickerId: string,
		stickerStateId: string
	) =>
		({
			url: `/api-v2/string-stickers/${stickerId}/states/${stickerStateId}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateStringStickerStateDto;
				query: void;
				response: WithStickerStateIdDto;
			}
		}) as const,
	stringstickerstatecontrollerCreate: (stickerId: string) =>
		({
			url: `/api-v2/string-stickers/${stickerId}/states`,
			method: "POST",
			summary: "Создать",
			_types: {} as {
				body: CreateStringStickerStateDto;
				query: void;
				response: WithStickerStateIdDto;
			}
		}) as const
} as const;
