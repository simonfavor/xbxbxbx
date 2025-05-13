/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D9488', // Teal
        secondary: '#F59E0B', // Gold
        neutral: {
          dark: '#1F2937', // Dark gray
          light: '#F3F4F6', // Light gray
        },
      },
    },
  },
  plugins: [],
}