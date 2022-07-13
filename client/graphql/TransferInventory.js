import gql from 'graphql-tag'
import { transferInventoryFragment } from './Fragment.js'

export const transferInventoriesPaginate = gql`
    query ($first: Int!, $page: Int, $status: QueryTransferInventoriesPaginateWhereWhereConditions) {
        transferInventoriesPaginate(first: $first, page: $page, where: $status) {
            data {
                ...transferInventory
            }

            paginatorInfo {
                lastPage
                total
            }
        }
    }
    ${transferInventoryFragment}
`

export const upsertTransferInventory = gql`
    mutation ($input: TransferInventoryInput) {
        upsertTransferInventory(input: $input) {
            ...transferInventory
        }
    }
    ${transferInventoryFragment}
`

export const transferInventory = gql`
    mutation ($input: Mixed) {
        transferInventory(input: $input) {
            id
        }
    }
`
export const transferInventorySchedule = gql`
    mutation ($input: Mixed) {
        transferInventorySchedule(input: $input) {
            id
        }
    }
`
