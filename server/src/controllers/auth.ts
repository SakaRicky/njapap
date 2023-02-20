/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { PrismaClient, User } from "@prisma/client";
import { createJWTToken } from "../utils/jwt";

const prisma = new PrismaClient();

const authRouter = express.Router();

const successLoginUrl = "http://localhost:3000/login-success";
const errorLoginUrl = "http://localhost:3000/login-error";

// Implement the /auth/google route to initiate the Google authentication flow
authRouter.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: errorLoginUrl,
		successRedirect: successLoginUrl
	})
);

authRouter.get(
	"/facebook",
	passport.authenticate("facebook", { scope: ["profile", "email"] })
);

authRouter.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		failureRedirect: errorLoginUrl,
		successRedirect: successLoginUrl
	})
);

authRouter.get(
	"/linkedin",
	passport.authenticate("linkedin", { scope: ["profile", "email"] })
);

authRouter.get(
	"/linkedin/callback",
	passport.authenticate("linkedin", {
		failureRedirect: errorLoginUrl,
		successRedirect: successLoginUrl
	})
);

authRouter.get("/getuser", async (req, res) => {
	console.log("req.user ID in user/get", req.user);
	const user = await prisma.user.findUnique({
		where: {
			id: req.user?.id
		}
	});

	if (user) {
		const { token, userForToken } = createJWTToken(user);

		return res.status(200).send({
			...userForToken,
			profilePicture: user.profilePicture,
			token: token
		});
	} else {
		return res.status(404).send("User not found");
	}
});

authRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate("local", function (err, user: User, info, status) {
		console.log("info in login: ", info);
		console.log("status in login: ", status);
		console.log("err in status: ", err);
		console.log("user in login: ", user);

		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).send({
				msg: info.message
			});
		} else {
			// If the user is authenticated
			const { token, userForToken } = createJWTToken(user);
			return res.status(200).send({
				...userForToken,
				profilePicture: user.profilePicture,
				token: token
			});
		}
	})(req, res);
});

export default authRouter;
