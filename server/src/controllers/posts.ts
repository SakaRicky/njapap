import express, { NextFunction, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithToken } from "../utils/middleware";
import * as jwt from "jsonwebtoken";
import config from "../utils/config";
import multerUtils from "../utils/multer";
import { v2 } from "cloudinary";

const prisma = new PrismaClient();

const postRouter = express.Router();
const { multerUploads, bufferToDataURI } = multerUtils;

const cloudinary = v2;

// Return "https" URLs by setting secure: true
cloudinary.config(config.CLOUDINARY_CONFIG);

postRouter.get(
	"/",
	async (req: RequestWithToken, res: Response, next: NextFunction) => {
		const token = req.token;
		try {
			const decodedToken: jwt.JwtPayload = jwt.verify(
				token || "",
				config.JWT_SECRET
			) as jwt.JwtPayload;
			if (!decodedToken.id) {
				return res.status(401).json({ error: "token missing or invalid" });
			}

			const posts = await prisma.post.findMany({
				include: {
					user: {
						select: {
							id: true,
							username: true,
							email: true,
							profilePicture: true
						}
					}
				},
				orderBy: {
					createdAt: "desc"
				}
			});

			return res.send(posts);
		} catch (error) {
			next(error);
		}
		return;
	}
);

const uploadImage = async (image: string) => {
	// Use the uploaded file's name as the asset's public ID and
	// allow overwriting the asset with new versions
	const options = {
		use_filename: false,
		unique_filename: false,
		overwrite: true,
		folder: "Meetmax"
	};

	try {
		// Upload the image
		const result = await cloudinary.uploader.upload(image, options);
		return result;
	} catch (error: any) {
		throw new Error("Cloudinary Error");
	}
};

postRouter.post(
	"/",
	multerUploads,
	async (req: RequestWithToken, res: Response, next: NextFunction) => {
		const token = req.token;
		const reqFiles = req.files as Express.Multer.File[];

		try {
			const decodedToken: jwt.JwtPayload = jwt.verify(
				token || "",
				config.JWT_SECRET
			) as jwt.JwtPayload;

			if (!decodedToken.id) {
				return res.status(401).json({ error: "token missing or invalid" });
			}

			const user = await prisma.user.findUnique({
				where: {
					id: decodedToken.id
				}
			});

			if (!user) {
				return res
					.status(401)
					.json({ error: "You must be logged in to upload media" });
			}

			if (reqFiles.length === 0) {
				const createdPostWithoutImages = await prisma.post.create({
					data: {
						body: req.body.postText,
						userId: user.id,
						images: []
					}
				});

				return res.status(201).send(createdPostWithoutImages);
			}

			const imagesToSave = reqFiles.map(image => {
				const fileFormat = image.mimetype.split("/")[1];
				const { content } = bufferToDataURI(fileFormat, image.buffer);
				return content;
			});

			const uploadedImagesUrls = await Promise.all(
				imagesToSave.map(async imageToUplaod => {
					if (imageToUplaod) {
						const uploadedFile = await uploadImage(imageToUplaod);
						return uploadedFile.secure_url;
					}
					return;
				})
			);

			const result =
				Array.isArray(uploadedImagesUrls) &&
				uploadedImagesUrls.every(item => typeof item === "string")
					? (uploadedImagesUrls as string[])
					: [""];

			const createdPostWithImages = await prisma.post.create({
				data: {
					body: req.body.postText,
					userId: user.id,
					images: result
				}
			});

			return res.status(201).send(createdPostWithImages); //.send(createdPost)
		} catch (error) {
			next(error);
		}
		return;
	}
);

export default postRouter;
