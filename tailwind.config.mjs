/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				// sans: ['Inter', 'sans-serif'],
			},
			colors: {
				activeColor: '#38CB89',
				footerColor: '#2B2B2B',
			},
		},
	},
	plugins: [],
}
