module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        purple: '#8c239e',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
