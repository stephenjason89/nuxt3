import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    srcDir: 'client/',
    css: ['vuetify/lib/styles/main.sass'],
    build: {
        transpile: ['vuetify', '@apollo/client/core', '@vue/apollo-composable', '@vue/apollo-option', 'ts-invariant/process', 'tslib'],
    },
    runtimeConfig: {
        public:{
            nuxtURL: process.env.NUXT_URL,
            laravelEndpoint: process.env.LARAVEL_URL,
            pusherKey: process.env.PUSHER_APP_KEY,
            wsHostname: process.env.WS_HOSTNAME,
            wsPort: process.env.WS_PORT,
        }
    },
})
