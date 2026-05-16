import type {
	CreateGroupChatDto,
	GroupChatDto,
	GroupChatListDto,
	UpdateGroupChatDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const GRUPPOVYE_CHATY_PATHS = {
	groupchatcontrollerSearch: {
		url: "/api-v2/group-chats",
		method: "GET",
		summary: "Получить список чатов",
		_types: {} as {
			body: void;
			query: {
				includeDeleted?: boolean;
				limit?: number;
				offset?: number;
				title?: string;
			};
			response: GroupChatListDto;
		}
	} as const,
	groupchatcontrollerCreate: {
		url: "/api-v2/group-chats",
		method: "POST",
		summary: "Создать чат",
		_types: {} as {
			body: CreateGroupChatDto;
			query: void;
			response: WithIdDto;
		}
	} as const,
	groupchatcontroller: (id: string) =>
		({
			url: `/api-v2/group-chats/${id}`,
			method: "GET",
			summary: "Получить чат по ID",
			_types: {} as { body: void; query: void; response: GroupChatDto }
		}) as const,
	groupchatcontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/group-chats/${id}`,
			method: "PUT",
			summary: "Изменить чат",
			_types: {} as {
				body: UpdateGroupChatDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
