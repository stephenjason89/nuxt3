import { BatchHttpLink } from 'apollo-link-batch-http'
import { InMemoryCache, ApolloClient, ApolloLink, Observable } from '@apollo/client/core'
import {defineNuxtPlugin, useRequestEvent, useRuntimeConfig} from "nuxt/app";
import { createApolloProvider } from '@vue/apollo-option'
import { DefaultApolloClient } from "@vue/apollo-composable"

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()

    // Uncomment line 11 and 12 to see that graphql request is not working anymore
    // const event = useRequestEvent()
    // console.log(event.req)

    const cache = new InMemoryCache()

    const link = new BatchHttpLink({
            uri: `${runtimeConfig.public.laravelEndpoint}/graphql`,
        })

    const apolloClient = new ApolloClient({
        link,
        cache,
        })

    const apolloProvider = createApolloProvider({
        defaultClient: apolloClient,
    })

    nuxtApp.vueApp.use(apolloProvider);
    nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
