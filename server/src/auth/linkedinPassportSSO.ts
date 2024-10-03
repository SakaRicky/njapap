// import passport from "passport";
// import config from "../utils/config";
// import { verifyFunction } from "./verify-function";
// import { Strategy, StrategyOption } from "passport-linkedin-oauth2";

// /// Implement the LinkedIn strategy for passport.js
// const callbackURL =
// 	process.env.NODE_ENV === "dev"
// 		? "http://localhost:3001/auth/linkedin/callback"
// 		: "https://authenticator-ricky.onrender.com/login/linkedin/auth/linkedin/callback";

// export interface StrategyOptionWithRequest extends StrategyOption {
// 	passReqToCallback: true;
// }

// const LinkedInStrategyConfig: StrategyOptionWithRequest = {
// 	clientID: config.LINKEDIN_CLIENT_ID,
// 	clientSecret: config.LINKEDIN_CLIENT_SECRET,
// 	callbackURL: callbackURL,
// 	passReqToCallback: true,
// 	scope: ["r_emailaddress", "r_liteprofile"]
// };

// passport.use(new Strategy(LinkedInStrategyConfig, verifyFunction));
