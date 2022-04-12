const { resolve } = require('path')

const colors = require('tailwindcss/colors')
const { transformer } = require('vue-wind')

module.exports = {
  content: {
    files: [
      resolve(__dirname, 'index.html'),
      resolve(__dirname, 'App.vue'),
      resolve(__dirname, './pages/**/*.{vue,js,ts,jsx,tsx}'),
      resolve(__dirname, './components/*.{vue,js,ts,jsx,tsx}'),
      resolve(__dirname, './layouts/*.{vue,js,ts,jsx,tsx}'),
      resolve(__dirname, '../node_modules/vue-wind/safe-list.txt'),
    ],
    transform: {
      vue: (content) => {
        const vWindSafeList = transformer(content)

        return [vWindSafeList, content].join('\n\n')
      },
    },
    safelist: [
      {
        pattern: /./,
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: colors.teal[500],
      },
    },
  },
  plugins: [],
}
