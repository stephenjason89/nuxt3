import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildDir: '_nuxt',
    srcDir: 'client/',
    css: ['vuetify/lib/styles/main.sass'],
    typescript: {
        strict: true,
        tsConfig: {
            compilerOptions: {
                lib: ['ESNext', 'ESNext.AsyncIterable', 'DOM', 'webworker'],
                types: [
                    '@pinia/nuxt',
                    '@types/node',
                    '@nuxt/types',
                    '@nuxtjs/axios',
                    '@nuxt/image',
                    '@types/offscreencanvas',
                ],
            },
        },
    },
    build: {
        transpile: [
            'vuetify',
            '@apollo/client',
            '@vue/apollo-composable',
            '@vue/apollo-option',
            'ts-invariant/process',
            'tslib',
        ],
    },
    modules: ['@pinia/nuxt'],
    runtimeConfig: {
        public: {
            nuxtURL: process.env.NUXT_URL,
            graphqlEndpoint: process.env.GRAPHQL_URL,
            pusherKey: process.env.PUSHER_APP_KEY,
            wsHostname: process.env.WS_HOSTNAME,
            wsPort: process.env.WS_PORT,
        },
    },
})
