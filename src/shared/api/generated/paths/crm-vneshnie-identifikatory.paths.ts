import type { CrmDirectoryEntryDto } from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const CRM_VNESHNIE_IDENTIFIKATORY_PATHS = {
	crmexternalidcontrollerFindcontactbyexternalid: {
		url: "/api-v2/crm/contacts/by-external-id",
		method: "GET",
		summary: "Найти контакт по внешнему ID",
		_types: {} as {
			body: void;
			query: { provider: string; chatId: string };
			response: CrmDirectoryEntryDto;
		}
	} as const
} as const;
