import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: {
		default: "BrandName | Modern Minimal Website",
		template: "%s | BrandName",
	},
	description: "A modern, minimal, responsive website built with Next.js.",
	metadataBase: new URL("https://example.com"),
	openGraph: {
		title: "BrandName | Modern Minimal Website",
		description: "A modern, minimal, responsive website built with Next.js.",
		type: "website",
		url: "https://example.com",
	},
	icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-black dark:text-white`}>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
