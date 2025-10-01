/** @type {import('tailwindcss').Config} */
module.exports = {
	// Enable class-based dark mode controlled by html.dark
	darkMode: "class",
	content: [
		"./src/app/**/*.{js,jsx}",
		"./src/components/**/*.{js,jsx}"
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#0ea5e9",
					dark: "#0284c7",
					light: "#38bdf8"
				}
				,
				secondary: {
					DEFAULT: "#8b5cf6",
					dark: "#6d28d9",
					light: "#a78bfa"
				},
				accent: {
					DEFAULT: "#ec4899",
					dark: "#db2777",
					light: "#f472b6"
				},
				success: {
					DEFAULT: "#10b981",
					dark: "#059669",
					light: "#34d399"
				},
				warning: {
					DEFAULT: "#f59e0b",
					dark: "#d97706",
					light: "#fbbf24"
				},
				danger: {
					DEFAULT: "#ef4444",
					dark: "#dc2626",
					light: "#f87171"
				}
			}
		}
	},
	plugins: []
};
