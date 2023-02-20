import { Alert, LoggedUser, User } from "../types";
import { State } from "./StateContext";

export type Action =
	| {
			type: "SET_USER";
			payload: User | null;
	  }
	| {
			type: "SET_LOGGED_USER";
			payload: LoggedUser | null;
	  }
	| {
			type: "SET_ALERT";
			payload: Alert | null;
	  };

export const setUser = (user: User | null) => ({
	type: "SET_USER",
	payload: user
});

export const setLoggedUser = (loggedUser: LoggedUser | null) => ({
	type: "SET_LOGGED_USER",
	payload: loggedUser
});

export const setAlert = (alert: Alert | null) => ({
	type: "SET_ALERT",
	payload: alert
});

export const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.payload
			};

		case "SET_LOGGED_USER":
			return {
				...state,
				loggedUser: action.payload
			};

		case "SET_ALERT":
			return {
				...state,
				alert: action.payload
			};

		default:
			return state;
	}
};
