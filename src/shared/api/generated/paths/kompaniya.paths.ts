import type { CompanyDto, UpdateCompanyDto, WithIdDto } from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const KOMPANIYA_PATHS = {
	companycontroller: (companyId: string) =>
		({
			url: `/api-v2/companies${companyId}`,
			method: "GET",
			summary: "Получить детали",
			_types: {} as { body: void; query: void; response: CompanyDto }
		}) as const,
	companycontrollerUpdate: (companyId: string) =>
		({
			url: `/api-v2/companies${companyId}`,
			method: "PUT",
			summary: "Изменить",
			_types: {} as {
				body: UpdateCompanyDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
