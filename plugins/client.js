import Pusher from 'pusher-js'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist'
import localforage from 'localforage'
import { InMemoryCache, ApolloClient, ApolloLink } from '@apollo/client/core'
import PusherLink from '~/plugins/graphql/pusher'
import { getSubdomain } from '~/assets/js/utils'
import {defineNuxtPlugin} from "nuxt/app";
import { createApolloProvider } from '@vue/apollo-option'

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()
    const event = useRequestEvent()
    const req = event.req
    // const { req, $auth, $authHelpers } = context
    const $auth={}
    const $authHelpers={}
    const cache = new InMemoryCache()

    if (process.client) {
        const persistor = new CachePersistor({
            cache,
            storage: new LocalForageWrapper(localforage),
        })

        if (window.navigator.onLine) {
            persistor.purge().then(() => console.log('New apollo cache ready'))
        } else {
            persistor.restore()
            console.log('Using old cache for offline mode')
        }
    }

    const authFetch = async (uri, options) => {
        const initialRequest = await fetch(uri, options)
        let expiredToken = false

        for (const query of await initialRequest.clone().json())
            if (query?.errors?.[0]?.message === 'Unauthenticated.') {
                expiredToken = true
                break
            }

        if (expiredToken && $authHelpers.isRefreshTokenExpired()) {
            console.error('expired token:', expiredToken, $authHelpers.isRefreshTokenExpired())
            $authHelpers.logout(true)
            return { text: () => Promise.resolve('{"data":{}}') }
        } else if (expiredToken && process.client) {
            await $authHelpers.refresh()
            options.headers.Authorization = $auth.token
            return fetch(uri, options)
        } else {
            return initialRequest
        }
    }

    const host = process.server ? req.headers.host : location.hostname
    const subdomain = getSubdomain(host)
    const link = process.client
        ? ApolloLink.from([
            new PusherLink({
                pusher: new Pusher(runtimeConfig.pusherKey, {
                    auth: {
                        headers: { 'X-Tenant': subdomain },
                    },
                    wsHost: runtimeConfig.wsHostname,
                    wsPort: runtimeConfig.wsPort,
                    wssPort: runtimeConfig.wsPort,
                    disableStats: true,
                    authEndpoint: runtimeConfig.laravelEndpoint + '/graphql/subscriptions/auth',
                    enabledTransports: ['ws', 'wss'],
                }),
            }),
            new BatchHttpLink({
                uri: runtimeConfig.laravelEndpoint + '/graphql',
                headers: { 'X-Tenant': subdomain },
                fetch: authFetch,
            }),
        ])
        : new BatchHttpLink({
            uri: runtimeConfig.laravelEndpoint + '/graphql',
            headers: { 'X-Tenant': subdomain },
        })

    const apolloClient = new ApolloClient({assumeImmutableResults: true,
        link,
        cache,
        defaultHttpLink: false,})

    const apolloProvider = createApolloProvider({
        defaultClient: apolloClient,
    })

    nuxtApp.vueApp.use(apolloProvider);
})
