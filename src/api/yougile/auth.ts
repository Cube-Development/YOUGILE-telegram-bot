import axios from "axios";

import { log } from "@/shared/logger";

import { SETTINGS } from "@/config/settings";

export const yougileApi = axios.create({
	baseURL: SETTINGS.YOUGILE_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${SETTINGS.YOUGILE_KEY_COMPANY}`
	},
	timeout: 30000
});

yougileApi.interceptors.request.use((config) => {
	log.api(
		{
			method: config.method?.toUpperCase(),
			url: config.url,
			params: config.params
		},
		"API Request"
	);
	return config;
});

yougileApi.interceptors.response.use(
	(response) => {
		log.api(
			{
				method: response.config.method?.toUpperCase(),
				url: response.config.url,
				status: response.status
			},
			"API Response OK"
		);
		return response;
	},
	(error) => {
		log.error(
			{
				method: error.config?.method?.toUpperCase(),
				url: error.config?.url,
				status: error.response?.status,
				data: error.response?.data
			},
			"API Response Error"
		);
		return Promise.reject(error);
	}
);
