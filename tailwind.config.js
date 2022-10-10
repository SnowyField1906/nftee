/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"wlc-dark": "url('./images/wlc-dark.jpg')",
			},
		},
	},
  plugins: [
    require("flowbite/plugin")
  ],
};
