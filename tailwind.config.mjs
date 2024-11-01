/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
import defaultTheme from 'tailwindcss/defaultTheme';
import { transform } from 'typescript';
const { scrollbarGutter } = require('tailwind-scrollbar-utilities');

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
				'slide-down': 'slide-down 1s cubic-bezier(0.75,-0.23, 0.34, 1.39)',
				'fade-in': '2s ease-in wait-fade-in 1, 1s ease-in 1s fade-in 1',
				'zip': '2s zip 2s cubic-bezier(0.75,-0.23, 0.34, 1.39) 3, 1s fade-out 8s ease-in 1'
			},
			keyframes: {
				'slide-down': {
					'0%': { transform: 'translateY(-8rem)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				},
				'fade-out': {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 }
				},
				'wait-fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 0 },
				},
				'zip': {
					'0%': { opacity: '1', transform: 'translateY(16rem) rotate(-90deg)' },
					'60%': { opacity: '1', transform: 'translateY(0) rotate(-90deg)' },
					'100%': { opacity: '1', transform: 'translateY(16rem) rotate(-90deg)' },
				},
			},
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
	}),
		scrollbarGutter(), require('tailwindcss-animation-delay'),
		require('tailwind-scrollbar'),
	],
};
