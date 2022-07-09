import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass'],
    build: {
        transpile: ['vuetify'],
    },
    buildModules:[
        '@nuxt3/apollo-module',
    ],
    runtimeConfig: {
        nuxtURL: process.env.NUXT_URL,
        laravelEndpoint: process.env.LARAVEL_URL,
        pusherKey: process.env.PUSHER_APP_KEY,
        wsHostname: process.env.WS_HOSTNAME,
        wsPort: process.env.WS_PORT,
    },
    apollo: {
        clientConfigs: {
            default: {
                uri: `${process.env.LARAVEL_URL}/graphql`,
            },

        },
        cookieAttributes: {
            expires: 14,
        },
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
})
