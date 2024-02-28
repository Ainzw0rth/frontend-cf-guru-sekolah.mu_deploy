/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        boxShadow: {
            'soft': '0 2px 8px 0 rgba(51, 51, 51, 0.1)',
            'medium': '0 18px 20px 1px rgba(51, 51, 51, 0.1)',
            'hard': '0 8px 10px 1px rgba(51, 51, 51, 0.1)',
        }
    },
  },
  plugins: [],
}