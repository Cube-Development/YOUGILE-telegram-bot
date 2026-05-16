import type {
	CreateDepartmentDto,
	DepartmentDto,
	DepartmentListDto,
	UpdateDepartmentDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const OTDELY_PATHS = {
	departmentcontrollerSearch: {
		url: "/api-v2/departments",
		method: "GET",
		summary: "Получить список",
		_types: {} as {
			body: void;
			query: {
				includeDeleted?: boolean;
				limit?: number;
				offset?: number;
				title?: string;
				parentId?: string;
			};
			response: DepartmentListDto;
		}
	} as const,
	departmentcontrollerCreate: {
		url: "/api-v2/departments",
		method: "POST",
		summary: "Создать",
		_types: {} as {
			body: CreateDepartmentDto;
			query: void;
			response: WithIdDto;
		}
	} as const,
	departmentcontroller: (id: string) =>
		({
			url: `/api-v2/departments/${id}`,
			method: "GET",
			summary: "Получить по ID",
			_types: {} as { body: void; query: void; response: DepartmentDto }
		}) as const,
	departmentcontrollerUpdate: (id: string) =>
		({
			url: `/api-v2/departments/${id}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateDepartmentDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
