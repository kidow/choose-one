const TITLE = '츄즈원 - 하나만 선택하시오'
const DESCRIPTION = '단 하나의 선택지만 골라야 하는 밸런스 게임'

const config = {
  apiKey: 'AIzaSyCy4enlijh3Jzcth6rJWH_4fEvwY5Hv5Xk',
  authDomain: 'choose-one-f75dd.firebaseapp.com',
  databaseURL: 'https://choose-one-f75dd.firebaseio.com',
  projectId: 'choose-one-f75dd',
  storageBucket: 'choose-one-f75dd.appspot.com',
  messagingSenderId: '34063304882',
  appId: '1:34063304882:web:ccb3e7af1a4eb64278a1ab'
}

export default {
  mode: 'universal',
  srcDir: 'app/',
  head: {
    title: TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
        integrity:
          'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay',
        crossorigin: 'anonymous'
      }
    ]
  },

  loading: { color: '#fff' },

  css: ['element-ui/lib/theme-chalk/index.css'],

  plugins: ['@/plugins/element-ui', '@/plugins/vue-clipboard2'],

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-device-detect',
    ['@nuxtjs/moment', { locales: ['ko'], defaultLocales: 'ko' }],
    '@nuxtjs/font-awesome'
  ],

  axios: {},
  styleResources: {
    scss: [
      'node_modules/open-color/open-color.scss',
      './app/assets/scss/main.scss'
    ]
  },

  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {}
  }
}
