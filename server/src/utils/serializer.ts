export const serializeUser = (
	user: Express.User,
	done: (err: Error | null, id: string) => void
) => {
	done(null, user.id);
};
