import React, { useEffect } from "react";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryResult
} from "@tanstack/react-query";
import { getUsers, updateUser } from "../services/users";
import { Post } from "../types";
import { getPosts } from "../services";
import { getPost } from "../services/posts";

export const UsePosts = () => {
	const query = useQuery<Post[], Error>(["posts"], getPosts, {
		keepPreviousData: true,
		refetchOnWindowFocus: false
	});

	return query;
};

export const UsePost = (postId: string) => {
	const query = useQuery<Post, Error>(["post"], () => getPost(postId), {
		keepPreviousData: true,
		refetchOnWindowFocus: false
	});

	return query;
};

// export const FindingsUpdateMutator = (
// 	userToUpdate: User,
// 	query: UseQueryResult<User, Error>
// ) => {
// 	const mutator = useMutation(() => updateUser(userToUpdate), {
// 		onSuccess: data => {
// 			query.refetch();
// 		},
// 		onError: error => {
// 			alert(error);
// 			console.log("error when mutating: ", error);
// 		}
// 	});

// 	return mutator;
// };
