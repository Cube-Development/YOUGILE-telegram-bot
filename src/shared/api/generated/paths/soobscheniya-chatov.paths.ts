import type {
	ChatIdDto,
	ChatMessageDto,
	ChatMessageListDto,
	ChatTypingDto,
	CreateChatMessageDto,
	UpdateChatMessageDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const SOOBSCHENIYA_CHATOV_PATHS = {
	chatmessagecontrollerSearch: (chatId: string) =>
		({
			url: `/api-v2/chats/${chatId}/messages`,
			method: "GET",
			summary: "Получить историю сообщений",
			_types: {} as {
				body: void;
				query: {
					includeDeleted?: boolean;
					limit?: number;
					offset?: number;
					fromUserId?: string;
					text?: string;
					label?: string;
					since?: number;
					includeSystem?: boolean;
				};
				response: ChatMessageListDto;
			}
		}) as const,
	chatmessagecontrollerSendmessage: (chatId: string) =>
		({
			url: `/api-v2/chats/${chatId}/messages`,
			method: "POST",
			summary: "Написать в чат",
			_types: {} as {
				body: CreateChatMessageDto;
				query: void;
				response: ChatIdDto;
			}
		}) as const,
	chatmessagecontrollerTyping: (chatId: string) =>
		({
			url: `/api-v2/chats/${chatId}/typing`,
			method: "POST",
			summary: "Показать, что пользователь печатает",
			_types: {} as { body: void; query: void; response: ChatTypingDto }
		}) as const,
	chatmessagecontroller: (chatId: string, id: string) =>
		({
			url: `/api-v2/chats/${chatId}/messages/${id}`,
			method: "GET",
			summary: "Получить сообщение по ID",
			_types: {} as { body: void; query: void; response: ChatMessageDto }
		}) as const,
	chatmessagecontrollerUpdate: (chatId: string, id: string) =>
		({
			url: `/api-v2/chats/${chatId}/messages/${id}`,
			method: "PUT",
			summary: "Изменить сообщение",
			_types: {} as {
				body: UpdateChatMessageDto;
				query: void;
				response: ChatIdDto;
			}
		}) as const
} as const;
