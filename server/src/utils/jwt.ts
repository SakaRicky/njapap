import config from "./config";
import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const createJWTToken = (user: User) => {
	const userForToken = {
		username: user.username,
		email: user.email,
		id: user.id
	};

	// token expires in 60*60 seconds, that is, in one hour
	const token = jwt.sign(userForToken, config.JWT_SECRET, {
		expiresIn: 60 * 60
	});
	return { token, userForToken };
};
