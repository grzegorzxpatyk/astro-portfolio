/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
			  sans: ['Geist Sans', defaultTheme.fontFamily.sans],
		  },
			backgroundImage: {
				'gradient-landing': 'linear-gradient(270deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%)'
			}
	  },
	},
	plugins: [require('@tailwindcss/typography')],
};
