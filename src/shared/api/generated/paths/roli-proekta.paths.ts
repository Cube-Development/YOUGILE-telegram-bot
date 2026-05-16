import type {
	CreateProjectRoleDto,
	ProjectRoleDto,
	ProjectRoleListDto,
	UpdateProjectRoleDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const ROLI_PROEKTA_PATHS = {
	projectrolescontrollerSearch: (projectId: string) =>
		({
			url: `/api-v2/projects/${projectId}/roles`,
			method: "GET",
			summary: "Получить список",
			_types: {} as {
				body: void;
				query: { limit?: number; offset?: number; name?: string };
				response: ProjectRoleListDto;
			}
		}) as const,
	projectrolescontrollerCreate: (projectId: string) =>
		({
			url: `/api-v2/projects/${projectId}/roles`,
			method: "POST",
			summary: "Создать",
			_types: {} as {
				body: CreateProjectRoleDto;
				query: void;
				response: WithIdDto;
			}
		}) as const,
	projectrolescontroller: (projectId: string, id: string) =>
		({
			url: `/api-v2/projects/${projectId}/roles/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as { body: void; query: void; response: ProjectRoleDto }
		}) as const,
	projectrolescontrollerUpdate: (projectId: string, id: string) =>
		({
			url: `/api-v2/projects/${projectId}/roles/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateProjectRoleDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
