import type { FileUploadDto } from "../types";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export const FAYLY_PATHS = {
	filecontrollerUploadfile: {
		url: "/api-v2/upload-file",
		method: "POST",
		summary: "Загрузить",
		_types: {} as {
			body: { file?: string };
			query: void;
			response: FileUploadDto;
		}
	} as const
} as const;
