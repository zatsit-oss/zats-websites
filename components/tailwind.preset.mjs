/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#0f15fd', // Custom Blue
          dark: '#f1be51',  // Custom Orange
        }
      },
      animation: {
        wiggle: 'wiggle 4s ease infinite'
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(-2deg)' },
        }
      }
    },
  },
  plugins: [],
}
