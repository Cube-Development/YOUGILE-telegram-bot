import type {
	AuthKeyDto,
	AuthKeyWithDetailsDto,
	CompanyListDto,
	CredentialsWithCompanyDto,
	CredentialsWithCompanyOptionalDto,
	CredentialsWithNameDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const AVTORIZATSIYA_PATHS = {
	getcompanies: {
		url: "/api-v2/auth/companies",
		method: "POST",
		summary: "Получить список компаний",
		_types: {} as {
			body: CredentialsWithNameDto;
			query: { limit?: number; offset?: number };
			response: CompanyListDto;
		}
	} as const,
	authkeycontrollerSearch: {
		url: "/api-v2/auth/keys/get",
		method: "POST",
		summary: "Получить список ключей",
		_types: {} as {
			body: CredentialsWithCompanyOptionalDto;
			query: void;
			response: AuthKeyWithDetailsDto[];
		}
	} as const,
	authkeycontrollerCreate: {
		url: "/api-v2/auth/keys",
		method: "POST",
		summary: "Создать ключ",
		_types: {} as {
			body: CredentialsWithCompanyDto;
			query: void;
			response: AuthKeyDto;
		}
	} as const,
	authkeycontroller: (key: string) =>
		({
			url: `/api-v2/auth/keys/${key}`,
			method: "DELETE",
			summary: "Удалить ключ",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
