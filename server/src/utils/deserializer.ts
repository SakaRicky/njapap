import { PrismaClient } from "@prisma/client";

export const deserializeUser = async (
	id: string,
	done: (err: Error | null, user: Express.User | undefined) => void
) => {
	const prisma = new PrismaClient();
	const user = await prisma.user.findUnique({
		where: {
			id: id
		}
	});
	if (user) {
		done(null, user);
	}
};
