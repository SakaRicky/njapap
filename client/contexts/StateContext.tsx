import React, { createContext, useContext, useReducer } from "react";
import { Alert, LoggedUser, Modal, Post, User } from "../types";
import { Action, reducer } from "./reducer";

export type State = {
	user: User | null;
	loggedUser: LoggedUser | null;
	alert: Alert | null;
};

const initialState: State = {
	user: null,
	loggedUser: null,
	alert: null
};
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
	initialState,
	() => initialState
]);

type StateProp = {
	children: React.ReactElement;
};

export const StateProvider: React.FC<StateProp> = ({ children }: StateProp) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateValue = () => useContext(StateContext);
