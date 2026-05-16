import type {
	CreateSprintStickerStateDto,
	SprintStickerStateDto,
	UpdateSprintStickerStateDto,
	WithStickerStateIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const SOSTOYANIYA_STIKERA_SPRINTA_PATHS = {
	sprintstickerstatecontroller: (stickerId: string, stickerStateId: string) =>
		({
			url: `/api-v2/sprint-stickers/${stickerId}/states/${stickerStateId}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as {
				body: void;
				query: { includeDeleted?: boolean };
				response: SprintStickerStateDto;
			}
		}) as const,
	sprintstickerstatecontrollerUpdate: (
		stickerId: string,
		stickerStateId: string
	) =>
		({
			url: `/api-v2/sprint-stickers/${stickerId}/states/${stickerStateId}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateSprintStickerStateDto;
				query: void;
				response: WithStickerStateIdDto;
			}
		}) as const,
	sprintstickerstatecontrollerCreate: (stickerId: string) =>
		({
			url: `/api-v2/sprint-stickers/${stickerId}/states`,
			method: "POST",
			summary: "Создать",
			_types: {} as {
				body: CreateSprintStickerStateDto;
				query: void;
				response: WithStickerStateIdDto;
			}
		}) as const
} as const;
