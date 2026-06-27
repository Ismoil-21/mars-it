/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'mars-orange':   '#ff6a13',
        'mars-orange-2': '#ff8c3a',
        'mars-navy':     '#1a1f5e',
      },
    },
  },
  plugins: [],
}
