import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { LoggedUser } from "../types";

export const api = axios.create({
	baseURL:
		process.env.NEXT_PUBLIC_WORKING_ENV === "phone"
			? "http://192.168.100.10:3001"
			: "http://localhost:3001"
});

console.log(
	"process.env.NEXT_PUBLIC_WORKING_ENV: ",
	process.env.NEXT_PUBLIC_BACKEND_URL
);

api.interceptors.request.use((config: AxiosRequestConfig) => {
	// Get the token from storage (or wherever you store it)
	const loggedUser: LoggedUser = JSON.parse(
		localStorage.getItem("loggedUser") || "{}"
	);

	if (Object.keys(loggedUser).length !== 0) {
		// Make sure the config object has a headers property
		if (!config.headers) {
			config.headers = {};
		}

		config.withCredentials = true;
		config.headers.Authorization = `bearer ${loggedUser.token}`;
	}

	console.log("config: ", config);

	return config;
});

export default api;
