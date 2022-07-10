<template>
  <v-app>
    <v-main>
      <v-container>
          <v-btn color="blue">asd</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import gql from 'graphql-tag'
import {useQuery} from  '@vue/apollo-composable'

export default {
  setup(){
    const { onResult } = useQuery(gql`
        query {
            branches {
                id
                name
            }
        }
    `)
    onResult(({data}) => {
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