<template>
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
</template>
<script>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

export default {
    setup() {
        const { onResult } = useQuery(gql`
            query {
                branches {
                    id
                    name
                }
            }
        `)
        onResult(({ data }) => {
            // console.log(data)
        })
    },
    apollo: {
        labels: {
            query: gql`
                query {
                    labels {
                        id
                        name
                        alias
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
