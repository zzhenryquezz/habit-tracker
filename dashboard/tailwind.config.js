const { resolve } = require('path')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    resolve(__dirname, 'index.html'),
    resolve(__dirname, 'safelist.txt'),
    resolve(__dirname, './pages/*.{vue,js,ts,jsx,tsx}'),
    resolve(__dirname, './layouts/*.{vue,js,ts,jsx,tsx}'),
    resolve(__dirname, '..', 'node_modules/vue-wind/dist/index.es.js'),
  ],
  safelist: [
    {
      pattern: /./,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.teal[500],
      },
    },
  },
  plugins: [],
}
