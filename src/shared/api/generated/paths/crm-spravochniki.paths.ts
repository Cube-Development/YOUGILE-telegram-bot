import type { ContactPersonEntryDto, CreateContactPersonDto } from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const CRM_SPRAVOCHNIKI_PATHS = {
	crmcontactpersonscontrollerCreate: {
		url: "/api-v2/crm/contact-persons",
		method: "POST",
		summary: "Создать контактное лицо",
		_types: {} as {
			body: CreateContactPersonDto;
			query: void;
			response: ContactPersonEntryDto;
		}
	} as const
} as const;
