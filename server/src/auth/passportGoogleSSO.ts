import passport from "passport";
import { Strategy, StrategyOptionsWithRequest } from "passport-google-oauth20";
import config from "../utils/config";
import { verifyFunction } from "./verify-function";

// const GoogleStrategy = GoogleAuth.Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = config;

const callbackURL = "http://localhost:3001/auth/google/callback";

const googleStrategyConfig: StrategyOptionsWithRequest = {
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: callbackURL,
	passReqToCallback: true
};

passport.use(new Strategy(googleStrategyConfig, verifyFunction));
