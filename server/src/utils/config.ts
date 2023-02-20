import "dotenv/config";

const config = {
	PORT: process.env.PORT || 5000,
	DATABASE_URL: process.env.DATABASE_URL || "",
	SECRET: process.env.SECRET || "",
	SESSION_SECRET: process.env.SESSION_SECRET || "",
	JWT_SECRET: process.env.JWT_SECRET || "",
	CLOUDINARY_CONFIG: {
		CLOUDINARY_URL: process.env.CLOUDINARY_URL || "",
		CLOUDINARY_APIKEY: process.env.CLOUDINARY_APIKEY || "",
		CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || ""
	},
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",

	LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID || "",
	LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET || "",

	FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || "",
	FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || "",

	FACEBOOK_TEST_CLIENT_ID: process.env.FACEBOOK_TEST_CLIENT_ID || "",
	FACEBOOK_TEST_CLIENT_SECRET: process.env.FACEBOOK_TEST_CLIENT_SECRET || ""
};

export default config;
