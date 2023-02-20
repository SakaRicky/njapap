import { PrismaClient, User } from "@prisma/client";
import { Profile } from "passport";

const prisma = new PrismaClient();

export const findUserByEmail = async (
	email: string | undefined
): Promise<User | null> => {
	const existingUser = await prisma.user.findFirst({
		where: {
			email: email
		}
	});
	if (existingUser) {
		return existingUser;
	}
	return null;
};

export const findUserByProviderIdOrEmail = async (
	id: string,
	email: string | undefined
): Promise<User | null> => {
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ thirdPartyID: id }, { email: email }]
		}
	});
	if (existingUser) {
		return existingUser;
	}
	return null;
};

export const createUser = async (user: User | Profile) => {
	if ("displayName" in user) {
		console.log("user");

		const savedUser = await prisma.user.create({
			data: {
				username: user.displayName,
				firstName: user.name ? user.name.familyName : user.displayName,
				lastName: user.name?.givenName,
				email: user.emails?.[0].value,
				profilePicture: user.photos?.[0].value,
				thirdPartyID: user.id,
				thirdPartyProvider: user.provider
			}
		});

		return savedUser;
	}
	console.log("user: ", user);
	return user;
};

export const updateUser = async (existingUser: User) => {
	const updatedUser = await prisma.user.update({
		where: {
			id: existingUser.id
		},
		data: existingUser
	});

	return updatedUser;
};
