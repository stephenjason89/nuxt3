import gql from 'graphql-tag'

export const courierFilter = gql`
    query {
        couriers {
            id
            name
        }
    }
`
