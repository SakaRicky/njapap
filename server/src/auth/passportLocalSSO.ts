import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../utils/database";

passport.use(
	new LocalStrategy(
		{ usernameField: "email", passwordField: "password" },
		async function (email, password, done) {
			try {
				console.log("local passport");
				const userFound = await findUserByEmail(email);
				if (userFound) {
					const passwordCorrect =
						userFound === null
							? false
							: await bcrypt.compare(password, userFound.passwordHash || "");

					// If there is no user and no password, auth fail and return message to indicate that
					if (!(userFound && passwordCorrect)) {
						done(null, false, { message: "Incorrect username or password" });
					} else {
						done(null, { ...userFound, passwordHash: undefined });
					}
				} else {
					done(null, false, { message: "User doesn't exist" });
				}
			} catch (error: any) {
				return done(error);
			}
		}
	)
);
