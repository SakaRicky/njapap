/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"images.unsplash.com",
			"plus.unsplash.com",
			"res.cloudinary.com",
			"lh3.googleusercontent.com"
		]
	}
};

module.exports = nextConfig;
