import type {
	CreateProjectDto,
	ProjectDto,
	ProjectListDto,
	UpdateProjectDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const PROEKTY_PATHS = {
	projectcontrollerSearch: {
		url: "/api-v2/projects",
		method: "GET",
		summary: "Получить список",
		_types: {} as {
			body: void;
			query: {
				includeDeleted?: boolean;
				limit?: number;
				offset?: number;
				title?: string;
			};
			response: ProjectListDto;
		}
	} as const,
	projectcontrollerCreate: {
		url: "/api-v2/projects",
		method: "POST",
		summary: "Создать",
		_types: {} as {
			body: CreateProjectDto;
			query: void;
			response: WithIdDto;
		}
	} as const,
	projectcontroller: (id: string) =>
		({
			url: `/api-v2/projects/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as { body: void; query: void; response: ProjectDto }
		}) as const,
	projectcontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/projects/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateProjectDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
