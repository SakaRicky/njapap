import axios from "axios";
import { PROFILE_PICTURE_DEFAULT_URL } from "../constants/constants";
import { NewUser, User } from "../types";
import api from "./api";

// get 1 user from db
export const getUser = async (id: string): Promise<User> => {
	try {
		const { data: user } = await api.get<User>(`/users`, {
			params: { id },
			withCredentials: true
		});

		return user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

// get collection data
export const getUsers = async (): Promise<User[]> => {
	try {
		const { data: user } = await api.get<User[]>(`/users`, {
			withCredentials: true
		});

		return user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

// create a user
export const createUser = async (newUser: NewUser) => {
	try {
		const { data: user } = await axios.post<User>(`/users`, newUser);

		return user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

// update a user
export const updateUser = async (userToUpdate: User) => {
	try {
		const { data: updatedUser } = await api.put<User>(`/users`, userToUpdate, {
			withCredentials: true
		});

		return updatedUser;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

// get collection data
export const deleteUser = async (userID: string) => {
	try {
		const { data: user } = await axios.delete<User>(`/users`, {
			params: userID,
			withCredentials: true
		});

		return user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
