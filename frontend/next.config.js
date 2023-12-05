/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://rpc.sepolia.org/:path*",
			},
		];
	},
};

module.exports = nextConfig;

module.exports = {};
