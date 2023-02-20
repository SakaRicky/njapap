import multer from "multer";
import path from "path";
import DatauriParser from "datauri/parser";
import { RequestWithToken } from "./middleware";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const parser = new DatauriParser();

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const bufferToDataURI = (fileFormat: string, buffer: Buffer) =>
	parser.format(fileFormat, buffer);

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array("files", 4);
const multerUtils = { multerUploads, bufferToDataURI };
export default multerUtils;
