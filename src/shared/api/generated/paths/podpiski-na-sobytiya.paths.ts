import type {
	CreateWebhookDto,
	UpdateWebhookDto,
	WebhookDto,
	WithIdDto
} from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const PODPISKI_NA_SOBYTIYA_PATHS = {
	webhookcontrollerSearch: {
		url: "/api-v2/webhooks",
		method: "GET",
		summary: "Получить список подписок",
		_types: {} as {
			body: void;
			query: { includeDeleted?: boolean };
			response: WebhookDto;
		}
	} as const,
	webhookcontrollerCreate: {
		url: "/api-v2/webhooks",
		method: "POST",
		summary: "Создать подписку",
		_types: {} as {
			body: CreateWebhookDto;
			query: void;
			response: WithIdDto;
		}
	} as const,
	webhookcontroller: (id: string) =>
		({
			url: `/api-v2/webhooks/${id}`,
			method: "PUT",
			summary: "Изменить подписку",
			_types: {} as {
				body: UpdateWebhookDto;
				query: void;
				response: WithIdDto;
			}
		}) as const
} as const;
