/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#262F3D',
        'dark-primary-light': '#3A4553',
        'red-primary': '#A80000',
        'blue-primary': '#5429FF',
        'primary-gray': '#F5F5F5',
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      }
    },
  },
  plugins: [import('tailwindcss-primeui')],
}

