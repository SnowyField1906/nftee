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
				"welcome-picture-1": "url('./assets/images/welcome-picture.png')",
				"home-picture-1": "url('./assets/images/home-picture-1.jpg')",
				"nft-sample-1": "url('./assets/images/nft-sample-1.jpg')",
			},
		},
	},
	plugins: [
		require(
			"flowbite/plugin",
			"tailwind-scrollbar"
		)
	],
};
