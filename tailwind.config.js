/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'hack': ['"Hack Nerd Font"', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}