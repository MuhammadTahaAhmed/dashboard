import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["www.seonetdigital.com", "seonetdigital.com"],
	},
	turbopack: {
		root: __dirname,
	},
	experimental: {
		optimizePackageImports: ["react", "react-dom"],
	},
};

export default nextConfig;
