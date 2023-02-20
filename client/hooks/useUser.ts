import React, { useEffect } from "react";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryResult
} from "@tanstack/react-query";
import { getAuthUser, getUsers, updateUser } from "../services/users";
import { LoggedUser, User } from "../types";

export const UseUsers = () => {
	const query = useQuery<User[], Error>(["users"], getUsers, {
		keepPreviousData: true,
		refetchOnWindowFocus: false
	});

	// Prefetch the next page!
	// const queryClient = useQueryClient();
	// useEffect(() => {
	// 	if (query.data?.next) {
	// 		queryClient.prefetchQuery(
	// 			[subscription, numberOfRowsPerPage, offset],
	// 			() =>
	// 				fetchAllFindings(numberOfRowsPerPage, offset + numberOfRowsPerPage)
	// 		);
	// 	}
	// }, [query.data, numberOfRowsPerPage, offset, queryClient]);
	return query;
};

export const UseLoggedUser = () => {
	const query = useQuery<LoggedUser, Error>(["loggedUser"], getAuthUser, {
		keepPreviousData: true,
		refetchOnWindowFocus: false
	});

	return query;
};

export const FindingsUpdateMutator = (
	userToUpdate: User,
	query: UseQueryResult<User, Error>
) => {
	const mutator = useMutation(() => updateUser(userToUpdate), {
		onSuccess: data => {
			query.refetch();
		},
		onError: error => {
			alert(error);
			console.log("error when mutating: ", error);
		}
	});

	return mutator;
};
