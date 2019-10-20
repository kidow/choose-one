const TITLE = ''
const DESCRIPTION = ''

export default {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'
      }
    ]
  },

  loading: { color: '#fff' },

  css: ['element-ui/lib/theme-chalk/index.css'],

  plugins: ['@/plugins/element-ui'],

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-device-detect',
    ['@nuxtjs/moment', { locales: ['ko'], defaultLocales: 'ko' }]
  ],

  axios: {},
  styleResources: {
    scss: ['node_modules/open-color/open-color.scss', './assets/scss/main.scss']
  },

  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {}
  }
}
