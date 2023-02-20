import { Profile } from "passport";
import {
	createUser,
	findUserByProviderIdOrEmail,
	updateUser
} from "../utils/database";
import { Request } from "express";
import { Params } from "express-serve-static-core";

export type VerifyFunction = (
	accessToken: string,
	refreshToken: string,
	profile: Profile,
	done: (error: any, user?: any, info?: any) => void
) => void;

export type VerifyFunctionWithRequest = (
	req: Request,
	accessToken: string,
	refreshToken: string,
	profile: Profile,
	done: (error: any, user?: any, info?: any) => void,
	param?: Params
) => void;

export const verifyFunction: VerifyFunctionWithRequest = async (
	_req,
	_accessToken: string,
	_refreshToken: string,
	profile: Profile,
	done: (error: any, user?: any, info?: any) => void
): Promise<void> => {
	try {
		console.log("auth with Provider: ", profile.provider);

		const existingUser = await findUserByProviderIdOrEmail(
			profile.id,
			profile.emails?.[0].value
		);
		if (existingUser) {
			existingUser.thirdPartyID = profile.id;
			try {
				const updatedUser = await updateUser(existingUser);
				return done(null, updatedUser);
			} catch (error: any) {
				console.log("error Strategy: ", error);
				return done(error as string);
			}
		} else {
			try {
				const savedUser = await createUser(profile);
				return done(null, savedUser);
			} catch (error: any) {
				return done(error as string);
			}
		}
	} catch (error) {
		console.log("Error when authentifying: ", error);
		done(error);
	}
};
