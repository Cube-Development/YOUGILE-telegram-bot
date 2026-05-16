import type {
	CreateTaskDto,
	TaskChatSubscribersDto,
	TaskDto,
	TaskListDto,
	UpdateTaskDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const ZADACHI_PATHS = {
	taskcontrollerSearch: {
		url: "/api-v2/task-list",
		method: "GET",
		summary: "Получить список задач",
		_types: {} as {
			body: void;
			query: {
				includeDeleted?: boolean;
				limit?: number;
				offset?: number;
				title?: string;
				columnId?: string;
				assignedTo?: string;
				stickerId?: string;
				stickerStateId?: string;
			};
			response: TaskListDto;
		}
	} as const,
	taskcontrollerSearchreversed: {
		url: "/api-v2/tasks",
		method: "GET",
		summary: "Получить список задач в обратном порядке",
		_types: {} as {
			body: void;
			query: {
				includeDeleted?: boolean;
				limit?: number;
				offset?: number;
				title?: string;
				columnId?: string;
				assignedTo?: string;
				stickerId?: string;
				stickerStateId?: string;
			};
			response: TaskListDto;
		}
	} as const,
	taskcontrollerCreate: {
		url: "/api-v2/tasks",
		method: "POST",
		summary: "Создать",
		_types: {} as { body: CreateTaskDto; query: void; response: WithIdDto }
	} as const,
	taskcontroller: (id: string) =>
		({
			url: `/api-v2/tasks/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as { body: void; query: void; response: TaskDto }
		}) as const,
	taskcontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/tasks/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateTaskDto;
				query: void;
				response: WithIdDto;
			}
		}) as const,
	taskcontrollerGetchatsubscribers: (id: string) =>
		({
			url: `/api-v2/tasks/${id}/chat-subscribers`,
			method: "GET",
			summary: "Получить список участников чата задачи",
			_types: {} as { body: void; query: void; response: string[] }
		}) as const,
	taskcontrollerUpdatechatsubscribers: (id: string) =>
		({
			url: `/api-v2/tasks/${id}/chat-subscribers`,
			method: "PUT",
			summary: "Изменить список участников чата задачи",
			_types: {} as {
				body: TaskChatSubscribersDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
