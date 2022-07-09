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
export default {
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
        console.log(res.data)
      },
    },
  },
}
</script>