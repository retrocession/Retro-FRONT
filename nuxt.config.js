import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Retro-FRONT',
    title: 'Retro-FRONT',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'https://retrocession-api.herokuapp.com/',
        endpoints: {
          login: {url: '/api/login'},
          logout: {url: '/api/logout'},
          user: {url: '/api/me'}
        },
        token: {
          property: 'token',
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    localStorage: false
  },
  // proxy: {
  //   '/api/': {
  //     target: 'http://localhost:8000',
  //     pathRewrite: { '^/api': '' }
  //   }
  // },
  axios: {
    baseURL: 'https://retrocession-api.herokuapp.com/api',
    // proxy: true,
    credentials: true,
    withCredentials: true
  },

  router: {
    middleware: ['auth']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#ffb74d' || colors.blue.darken2,
          accent: '#ffae37' || colors.grey.darken3,
          secondary: '#64b5f6' || colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
