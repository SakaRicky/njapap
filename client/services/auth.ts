import { LoggedUser } from "../types";
import api from "./api";

export const loginUser = async (values: {
	email: string;
	password: string;
}): Promise<LoggedUser> => {
	try {
		const { data: user } = await api.post<LoggedUser>(`auth`, values);

		return user;
	} catch (error: any) {
		console.log("error: ", error);

		throw new Error(error);
	}
};

export const getAuthUser = async (): Promise<LoggedUser> => {
	try {
		const { data: user } = await api.get<LoggedUser>(`/auth/getuser`, {
			withCredentials: true
		});
		return user;
	} catch (error: any) {
		console.log("error in getUser services/users: ", error);

		throw error.response;
	}
};
