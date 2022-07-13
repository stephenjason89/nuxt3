<template>
    <v-app>
        <v-main>
            <v-container>
                <h2>APOLLO SYSTEMS WEBSITE</h2>
                <h5>Under Construction {{ store.token }}</h5>
                <v-btn
                    class="justify-center mt-16"
                    x-large
                    dark
                    outlined
                    color="green"
                    @click="$router.push('/login')"
                >
                    Go to login
                </v-btn>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useAuth } from '~/store/auth'
export default {
    name: 'Home',
    setup() {
        const store = useAuth()
        const { onResult } = useQuery(gql`
            query {
                branches {
                    name
                }
            }
        `)
        onResult(({ data }) => {
            // console.log(data)
        })
        return { store }
    },
    apollo: {
        users: {
            query: gql`
                query {
                    users {
                        name
                    }
                }
            `,
            result(res) {
                // console.log(res.data)
            },
        },
    },
}
</script>
