/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here
      },
      fontFamily: {
        'poppins': ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
