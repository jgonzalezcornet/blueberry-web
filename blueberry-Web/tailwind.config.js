/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        varelaround: ['Varela Round', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
};