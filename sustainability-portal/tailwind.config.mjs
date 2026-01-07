/** @type {import('tailwindcss').Config} */
import preset from '../components/tailwind.preset.mjs'

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    '../components/src/**/*.{astro,html,js,jsx,ts,tsx}' // chemin vers le package composants
  ],
  presets: [preset],
}
