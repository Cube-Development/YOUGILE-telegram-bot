import type {
	CreateUserDto,
	UpdateUserDto,
	UserDto,
	UserListDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const SOTRUDNIKI_PATHS = {
	usercontrollerSearch: {
		url: "/api-v2/users",
		method: "GET",
		summary: "Получить список",
		_types: {} as {
			body: void;
			query: {
				limit?: number;
				offset?: number;
				email?: string;
				projectId?: string;
			};
			response: UserListDto;
		}
	} as const,
	usercontrollerCreate: {
		url: "/api-v2/users",
		method: "POST",
		summary: "Пригласить в компанию",
		_types: {} as { body: CreateUserDto; query: void; response: WithIdDto }
	} as const,
	usercontrollerGetme: {
		url: "/api-v2/users/me",
		method: "GET",
		summary: "Получить текущего пользователя",
		_types: {} as { body: void; query: void; response: UserDto }
	} as const,
	usercontroller: (id: string) =>
		({
			url: `/api-v2/users/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as { body: void; query: void; response: UserDto }
		}) as const,
	usercontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/users/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateUserDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
