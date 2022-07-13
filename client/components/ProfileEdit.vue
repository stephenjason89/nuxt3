<template>
    <v-card style="position: absolute" class="mx-auto" max-width="400" tile>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title
                        style="cursor: pointer"
                        @click="showModal(updateModal, update, $auth.user)"
                    >
                        Edit Profile
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item class="py-1">
                <v-list-item-content>
                    <v-list-item-title
                        style="cursor: pointer"
                        @click="showModal(logoutModal, logout)"
                        v-text="'Logout'"
                    />
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<script>
import { upsertUser } from '~/graphql/User'
import actionLoader from '~/mixins/actionLoader'
import { showModal } from '~/mixins/modal'

export default {
    name: 'ProfileEdit',
    mixins: [actionLoader],
    data: () => ({
        logoutModal: {
            title: 'Please confirm',
            message: 'Are you sure you want to logout?',
            positiveBtn: 'Yes',
        },
        updateModal: {
            model: 'User',
            title: 'Update ',
            positiveBtn: 'Update',
            fields: {
                first_name: {
                    type: 'textField',
                    required: true,
                    attrs: {
                        label: 'First Name',
                        type: 'text',
                    },
                },
                middle_name: {
                    type: 'textField',
                    required: true,
                    attrs: {
                        label: 'Middle Name',
                        type: 'text',
                    },
                },
                last_name: {
                    type: 'textField',
                    required: true,
                    attrs: {
                        label: 'Last Name',
                        type: 'text',
                    },
                },
                gender: {
                    type: 'select',
                    required: true,
                    attrs: {
                        label: 'Gender',
                        type: 'text',
                        items: ['M', 'F'],
                    },
                },
                birthday: {
                    type: 'textField',
                    connectionGroup: 'create',
                    required: true,
                    attrs: {
                        label: 'Birthday',
                        type: 'date',
                    },
                },
                nickname: {
                    type: 'textField',
                    required: true,
                    attrs: {
                        label: 'Nickname',
                        type: 'text',
                    },
                },
                roles: {
                    type: 'comboBox',
                    model: 'Role',
                    method: 'rolesFilter',
                    connection: 'sync',
                    attrs: {
                        label: 'Roles*',
                        'item-text': 'name',
                        multiple: true,
                    },
                },
            },
        },
        logoutDialogMenu: false,
    }),
    methods: {
        showModal(...args) {
            showModal(...args)
        },
        update(data) {
            const { input, inputValues, optimisticResponse } = data

            optimisticResponse.name = null
            optimisticResponse.branch = null
            optimisticResponse.branches = null
            optimisticResponse.addresses = null
            optimisticResponse.contact_details = null
            optimisticResponse.roles = { name: null }

            this.$apollo
                .mutate({
                    mutation: upsertUser,
                    variables: { input, ...inputValues },
                    update: (cache, { data }) => {
                        this.$authHelpers.setUser(data.upsertUser)
                    },
                    optimisticResponse: {
                        __typename: 'Mutation',
                        upsertUser: {
                            __typename: 'User',
                            ...optimisticResponse,
                        },
                    },
                })
                .then(() => {
                    this.$iziToast.success({
                        title: 'Updated',
                        message: 'User update successful!',
                    })
                })
                .catch((err) => {
                    console.error(err?.graphQLErrors)
                    this.$iziToast.error({
                        title: 'Update Error',
                        message: err?.graphQLErrors?.[0]?.message,
                    })
                })
        },
        logout() {
            setTimeout(async () => {
                await this.$authHelpers.logout()
                this.$iziToast.success({
                    title: 'OK',
                    message: 'You have been logged out!',
                })
            }, 100)
        },
    },
}
</script>
