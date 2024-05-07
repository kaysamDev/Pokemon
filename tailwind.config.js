/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#E85382',
        'blue': '#39BADF',
        'yellow': '#E1A725',
        'gray-100': '#7B7B7B',
        'gray-200': '#E1E1E1',
        'gray-300': '#F1F1F1',
      },
      backgroundImage:{
        "noiseImg": "url('/img/noise.png')"
      }
    },
  },
  plugins: [],
}