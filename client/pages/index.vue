<template>
    <v-app>
        <v-main>
            <v-container>
                <h2>APOLLO SYSTEMS WEBSITE</h2>
                <h5>Under Construction</h5>
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

export default {
    name: 'Home',
    setup() {
        const { onResult } = useQuery(gql`
            query {
                company {
                    ceo
                }
            }
        `)
        onResult(({ data }) => {
            console.log(data)
        })
    },
    apollo: {
        roadster: {
            query: gql`
                query {
                    roadster {
                        apoapsis_au
                    }
                }
            `,
            result(res) {
                console.log(res.data)
            },
        },
    },
}
</script>
