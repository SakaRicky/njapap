import axios from "axios";
import { PostError } from "../errors/postError";
import { Post } from "../types";
import api from "./api";

// get collection data
export const getPosts = async (): Promise<Post[]> => {
	try {
		const { data: posts } = await api.get<Post[]>(`/posts`);

		return posts;
	} catch (error: any) {
		console.error("error:", error);

		throw new Error(error.response.data.error);
	}
};

// get collection data
export const getPost = async (id: string): Promise<Post> => {
	try {
		const { data: post } = await api.get<Post>(`/posts`, {
			params: { id }
		});

		return post;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

// create a post
export const createNewPost = async (post: FormData): Promise<Post | void> => {
	try {
		const { data: createdPost } = await api.post<Post>(`/posts`, post, {
			headers: {
				"content-type": "multipart/form-data"
			}
		});

		return createdPost;
	} catch (error: any) {
		console.log("error in createPost: ", error);
		if (
			error.response.status === 400 &&
			error.response.data.error === "LIMIT_UNEXPECTED_FILE"
		) {
			throw new PostError({
				name: "POST_ERROR",
				message: "You tried to upload too many files. Limit is 4"
			});
		}

		if (
			error.response.status === 400 &&
			error.response.data.error === "Cloudinary Error"
		) {
			throw new PostError({
				name: "POST_ERROR",
				message: "Problem occured while hosting images/ Please try again later"
			});
		}
		throw new Error(error.response.data.error);
	}
};
