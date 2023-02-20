const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const usersRouter = express.Router();

const createJWTToken = user => {
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

usersRouter.get("/get", async (req, res) => {
	console.log("req.user ID in user/get", req.user);
	const user = await prisma.user.findUnique({
		where: {
			id: req.user
		}
	});

	const { token, userForToken } = createJWTToken(user);

	return res.status(200).send({
		...userForToken,
		token: token
	});
});

usersRouter.get("/logout", function (req, res) {
	console.log("logging out");

	req.session.destroy(function (err) {
		if (err) {
			console.error(err);
			res.send("Error logging out");
		} else {
			res.sendStatus(200);
		}
	});
});

usersRouter.post("/signup", async (req, res) => {
	try {
		const newUser = req.body;

		const existingUser = await prisma.user.findUnique({
			where: {
				email: newUser.email
			}
		});
		console.log("existingUser: ", existingUser);

		if (existingUser) {
			return res.status(401).json({
				error: "a user with this email already exists"
			});
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

		const savedUser = await prisma.user.create({
			data: {
				username: newUser.username,
				email: newUser.email,
				passwordHash: passwordHash
			}
		});

		return res.send(savedUser);
	} catch (error) {
		console.log(error);
	}
});

module.exports = usersRouter;
