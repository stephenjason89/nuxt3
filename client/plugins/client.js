import { BatchHttpLink } from '@apollo/client/link/batch-http/index.js'
import { InMemoryCache, ApolloClient, ApolloLink } from '@apollo/client/core/index.js'
// import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist'
// import localforage from 'localforage'
import { defineNuxtPlugin, useRequestEvent, useRuntimeConfig } from 'nuxt/app'
import { createApolloProvider } from '@vue/apollo-option'
import { DefaultApolloClient } from '@vue/apollo-composable'
import Pusher from 'pusher-js'
import { onError } from '@apollo/client/link/error/index.js'
import { getSubdomain } from '~/assets/js/utils'
import PusherLink from '~/plugins/graphql/pusher'
import { useAuth } from '~/store/auth'

export default defineNuxtPlugin((nuxtApp) => {
    const auth = useAuth(nuxtApp.$pinia)
    const runtimeConfig = useRuntimeConfig()
    const event = useRequestEvent()
    const cache = new InMemoryCache()

    // if (process.client) {
    //     const persistor = new CachePersistor({
    //         cache,
    //         storage: new LocalForageWrapper(localforage),
    //     })
    //
    //     if (window.navigator.onLine) {
    //         persistor.purge().then(() => console.log('New apollo cache ready'))
    //     } else {
    //         persistor.restore()
    //         console.log('Using old cache for offline mode')
    //     }
    // }

    const authFetch = async (uri, options) => {
        const initialRequest = await fetch(uri, options)
        let expiredToken = false

        for (const query of await initialRequest.clone().json())
            if (query?.errors?.[0]?.message === 'Unauthenticated.') {
                expiredToken = true
                break
            }

        if (expiredToken && auth.isRefreshTokenExpired) {
            console.error('expired token:', expiredToken, auth.isRefreshTokenExpired)
            auth.logout(true)
            return { text: () => Promise.resolve('{"data":{}}') }
        } else if (expiredToken && process.client) {
            await auth.refresh()
            options.headers.Authorization = auth.token
            return fetch(uri, options)
        } else {
            return initialRequest
        }
    }

    const host = process.server ? event?.req?.headers?.host : location?.hostname
    const subdomain = getSubdomain(host)

    const link = ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                )
            if (networkError) console.log(`[Network error]: ${networkError}`)
        }),
        ...(process.client
            ? [
                  new PusherLink({
                      pusher: new Pusher(runtimeConfig.public.pusherKey, {
                          auth: {
                              headers: { 'X-Tenant': subdomain },
                          },
                          wsHost: runtimeConfig.public.wsHostname,
                          wsPort: runtimeConfig.public.wsPort,
                          wssPort: runtimeConfig.public.wsPort,
                          disableStats: true,
                          authEndpoint: `${runtimeConfig.public.graphqlEndpoint}/graphql/subscriptions/auth`,
                          enabledTransports: ['ws', 'wss'],
                      }),
                  }),
              ]
            : []),
        new BatchHttpLink({
            uri: `${runtimeConfig.public.graphqlEndpoint}/graphql`,
            headers: { 'X-Tenant': subdomain, Authorization: auth.token },
            fetch: process.client ? authFetch : fetch,
        }),
    ])

    const apolloClient = new ApolloClient({
        assumeImmutableResults: true,
        link,
        cache,
        defaultHttpLink: false,
    })

    const apolloProvider = createApolloProvider({
        defaultClient: apolloClient,
    })

    nuxtApp.vueApp.use(apolloProvider)
    nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
