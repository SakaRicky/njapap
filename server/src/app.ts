import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import {
	setHeaders,
	tokenExtractor,
	requestLogger,
	unknownEndpoint,
	errorHandler
} from "./utils/middleware";
import config from "./utils/config";
// import cookieParser from "cookie-parser";
// import flash from "express-flash";

import authRouter from "./controllers/auth";
import postsRouter from "./controllers/posts";

import { serializeUser } from "./utils/serializer";
// is called by passport when a user's session needs to be restored after the user has been authenticated. It is used to look up the user in the database based on a serialized representation of the user, which is stored in a cookie or session store.
import { deserializeUser } from "./utils/deserializer";

// Create a new express app
const app = express();

const corsOptions = {
	origin: [
		"http://localhost:5173",
		"http://localhost:3000",
		"http://192.168.100.10:3000"
	],
	credentials: true,
	optionSuccessStatus: 200
};
app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(flash());

app.use(express.json());
app.use(
	session({
		secret: config.SESSION_SECRET,
		resave: true,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

import "./auth/passportGoogleSSO";
import "./auth/passportFacebookSSO";
import "./auth/linkedinPassportSSO";
import "./auth/passportLocalSSO";
// Add headers before the routes are defined
app.use(setHeaders);

passport.serializeUser((user, done) => serializeUser(user, done));
passport.deserializeUser(deserializeUser);
app.use(requestLogger);

app.use("/auth", authRouter);
app.use(tokenExtractor);
app.use("/posts", tokenExtractor, postsRouter);
// app.use("/login/github", loginWithGithubRoute);
// app.use("/user", userRoutes);
// app.use("/media", mediaRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
