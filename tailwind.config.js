/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Switch to class-based dark mode (more reliable than prefers-color-scheme)
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}' // using src directory
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          light: '#1db954', // Spotify green
          dark: '#1aa34a',
        },
        // Backgrounds
        background: {
          light: '#ffffff', // Pure white
          dark: '#121212', 
        },
        // Text
        text: {
          light: '#171717', // Near-black
          dark: '#e5e5e5', // Off-white
        },
        // Grays
        gray: {
          light: '#b3b3b3',
          dark: '#535353',
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', 'Helvetica', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'], // For your btn-primary
      },
    },
  },
}
