import gql from 'graphql-tag'

// Queries

export const permissions = gql`
    query ($whereCondition: QueryPermissionsWhereWhereConditions) {
        permissions(where: $whereCondition) {
            id
            name
            category_id
        }
    }
`

export const permissionsPaginate = gql`
    query ($searchFallback: Mixed, $page: Int!, $first: Int!) {
        permissionsPaginate(
            page: $page
            first: $first
            where: {
                OR: [
                    { column: DESCRIPTION, operator: LIKE, value: $searchFallback }
                    { column: NAME, operator: LIKE, value: $searchFallback }
                ]
            }
        ) {
            data {
                id
                name
                description
                created_at
                category {
                    id
                    name
                }
            }
            paginatorInfo {
                lastPage
                total
            }
        }
    }
`

// Mutations

export const upsertPermission = gql`
    mutation ($input: PermissionInput) {
        upsertPermission(input: $input) {
            id
            name
            description
            created_at
            category {
                id
                name
                permissions {
                    id
                    name
                }
            }
        }
    }
`

export const deletePermission = gql`
    mutation ($id: ID!) {
        deletePermission(id: $id) {
            id
        }
    }
`
