export type User = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	dateOfBirth?: Date;
	profilePicture: string;
};

export type NewUser = Omit<User, "id">;

export type LoggedUser = {
	username: string;
	email: string;
	profilePicture: string;
	token: string;
};

export type Post = {
	id: string;
	title: string;
	body: string;
	images: string[];
	comments: Comment[];
	user: User;
	createdAt: string;
	updatedAt: string;
};

export type NewPost = Omit<Post, "comments" | "id">;

export type Comment = {
	id: string;
	title: string;
	body: string;
	images: string[];
	comments: Comment[];
};

export type Modal = {
	show: boolean;
	content: string;
};

export type Alert = {
	show: boolean;
	title: string;
	message: string;
	type: AlertType;
};

export type AlertType = "success" | "error" | "info" | "warning" | undefined;
