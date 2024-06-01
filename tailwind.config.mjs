/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist Sans', defaultTheme.fontFamily.sans],
			},
			backgroundImage: {
				'gradient-landing': 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'
			},
			animation: {
				'bg-wave': 'bg-wave 20s linear infinite',
			},
			keyframes: {
				'bg-wave': {
					'0%, 100%': { backgroundPosition: '0 0' },
					'50%': { backgroundPosition: '100% 100%' },
				}
			}
		},
	},
	plugins: [require('@tailwindcss/typography'), plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
		const newUtilities = {
			'.horizontal-tb': {
				writingMode: 'horizontal-tb',
			},
			'.vertical-rl': {
				writingMode: 'vertical-rl'
			},
			'.vertical-lr': {
				writingMode: 'vertical-lr'
			}
		}
		addUtilities(newUtilities)
	})],
};
