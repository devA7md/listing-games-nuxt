export default {
  ssr: false,
  head: {
    title: 'Games Listing',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~/assets/css'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
  modules: [
    '@nuxtjs/axios',
    [
      'primevue/nuxt',
      {
        theme: 'saga-purple',
        ripple: true,
        components: [
          'Button',
          'Menu',
          'Message',
          'ProgressSpinner',
          'Card',
          'InputText',
          'Dialog',
        ],
        directives: [],
      },
    ],
  ],
  axios: {},
  build: {},
}
