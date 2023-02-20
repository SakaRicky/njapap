import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import * as jwt from "jsonwebtoken";
import { MulterError } from "multer";

export const requestLogger = (
	request: Request,
	_response: Response,
	next: NextFunction
) => {
	console.log("Method: ", request.method);
	console.log("Path: ", request.path);
	console.log("Body: ", request.body);
	console.log("---------");
	next();
};

export interface RequestWithToken extends Request {
	token?: string;
}

export const tokenExtractor = (
	req: RequestWithToken,
	res: Response,
	next: NextFunction
) => {
	const authorization = req.headers.authorization;
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		req.token = authorization.substring(7);
	} else {
		console.log("no token");

		res.status(401).json({ error: "token missing or invalid" });
	}
	next();
};

export const setHeaders = function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Website you wish to allow to connect
	if (req.headers.origin) {
		res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
	}

	// Request methods you wish to allow
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", "true");

	// Pass to next layer of middleware
	next();
};

export const unknownEndpoint = (
	_request: Request,
	response: Response,
	_next: NextFunction
) => {
	response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (
	error: Error,
	_request: Request,
	response: Response,
	next: NextFunction
) => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		console.log(
			"error happened in Prisma.PrismaClientKnownRequestError with: ",
			error.code
		);
		response.status(400).send("Email already in use");
	}

	if (error instanceof jwt.TokenExpiredError) {
		return response.status(401).send({ error: "Auth expired, Login" });
	}

	if (error instanceof MulterError) {
		console.log("MulterError happened with code: ", error.code);

		return response.status(400).send({ error: error.code });
	}

	if (error instanceof Error) {
		console.log("Error happened with message: ", error.message);

		return response.status(400).send({ error: error.message });
	}

	// this is node way to handle exception that were not caught. It prevents the server from crashing
	process.on("uncaughtException", error => {
		console.error("There was an uncaught error", error);
		process.exit(1); // mandatory (as per the Node.js docs)
	});

	next(error);
	return null;
};
