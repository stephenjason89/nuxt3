import gql from 'graphql-tag'
import { orderFragment } from './Fragment.js'

// export const ordersPaginate = gql`
//     query (
//         $first: Int!
//         $page: Int
//         $status: Mixed
//         $returns: Mixed
//         $orderBy: [QueryOrdersPaginateOrderByOrderByClause!]
//     ) {
//         ordersPaginate(
//             first: $first
//             page: $page
//             where: { OR: [{ column: STATUS, value: $status }, { column: STATUS, value: $returns }] }
//             orderBy: $orderBy
//         ) {
//             data {
//                 ...order
//             }

//             paginatorInfo {
//                 lastPage
//                 total
//             }
//         }
//     }
//     ${orderFragment}
// `

export const ordersPaginate = gql`
    query (
        $first: Int!
        $page: Int
        $status: Mixed = [1]
        $orderBy: [QueryOrdersPaginateOrderByOrderByClause!]
    ) {
        ordersPaginate(
            first: $first
            page: $page
            where: { column: STATUS, operator: IN, value: $status }
            orderBy: $orderBy
        ) {
            data {
                ...order
            }

            paginatorInfo {
                lastPage
                total
            }
        }
    }
    ${orderFragment}
`

export const upsertOrder = gql`
    mutation ($input: OrderInput) {
        upsertOrder(input: $input) {
            ...order
        }
    }
    ${orderFragment}
`

export const UpsertUserProject = gql`
    mutation ($input: OrderInput) {
        UpsertUserProject(input: $input) {
            ...order
        }
    }
    ${orderFragment}
`

export const ordersTotal = gql`
    query monthlySalesChartData($filters: OrdersTotalInput) {
        orders(
            monthlyTotal: $filters
            orderBy: [{ column: YEAR, order: DESC }, { column: MONTH, order: ASC }]
        ) {
            total
            year
            month
            branch_name
        }
    }
`
