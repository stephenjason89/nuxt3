<template>
    <v-navigation-drawer
        v-model="drawer[pinned ? 'main' : 'local']"
        color="#424242"
        dark
        lazy-src="/img/nav-bg.jpg"
        src="/img/nav-bg.jpg"
        width="260"
        mini-variant-width="80"
        :mini-variant="pinned ? !drawer.local : false"
        app
        :temporary="!pinned"
        touchless
    >
        <v-list-item class="mb-0 justify-space-between pl-3">
            <v-list-item-avatar class="ma-auto my-4">
                <v-img lazy-src="/img/msi-logo.png" src="/img/msi-logo.png" />
            </v-list-item-avatar>
            <v-btn link text small outlined @click="pin">
                <Icon class="v-icon--link" size="15" :name="pinned ? 'PinOff' : 'Pin'" color="#ccc" />
            </v-btn>
        </v-list-item>
        <v-divider />
        <v-list expand nav>
            <!-- Items -->
            <v-list-item
                v-for="(link, i) in links"
                :key="i"
                :to="link.to"
                exact
                :color="companyInfo.theme.color"
                class="py-1"
                @click="link.action ? link.action(logoutModal, logout) : () => {}"
            >
                <!--                <v-list-item-icon>-->
                <Icon color="white" :name="link.icon" />
                <!--                </v-list-item-icon>-->
                <v-list-item-title v-text="labelsStore.aliases[link.title] ?? link.title" />
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
import OverlayScrollbars from 'overlayscrollbars'
import localforage from 'localforage'
import { showModal } from '~/mixins/modal'
import { sidebarDrawer, sidebarPinned } from '~/assets/sidebarState'
import { useLabels } from '~/store/labels'

export default {
    name: 'SideBar',
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    setup: () => ({ drawer: sidebarDrawer, pinned: sidebarPinned }),
    data: () => ({
        labelsStore: useLabels(),
        companyInfo: {
            theme: {},
        },
        links: [
            {
                title: 'Dashboard',
                icon: 'ChartBar',
                show: true,
                to: '/',
            },
            {
                title: 'Timekeeper',
                icon: 'Fingerprint',
                show: true,
                to: '/timekeeper',
            },
            {
                title: 'Products',
                icon: 'Barcode',
                show: true,
                to: '/dashboard/products',
            },
            {
                title: 'Procurement',
                icon: 'Shopping',
                show: true,
                to: '/dashboard/procurement',
            },
            {
                title: 'Inventories',
                icon: 'FormatListBulletedSquare',
                show: true,
                to: '/dashboard/inventories',
            },
            {
                title: 'Branch',
                icon: 'SourceBranch',
                show: true,
                to: '/dashboard/branch',
            },
            {
                title: 'Client',
                icon: 'AccountGroup',
                show: true,
                to: '/dashboard/client',
            },
            {
                title: 'Users',
                icon: 'Account',
                show: true,
                to: '/dashboard/users',
            },
            {
                title: 'Orders',
                icon: 'Note',
                show: true,
                to: '/dashboard/orders',
            },
            {
                title: 'Sales',
                icon: 'CurrencyPhp',
                show: true,
                to: '/dashboard/sales',
            },
            {
                title: 'Settings',
                icon: 'Cog',
                show: true,
                to: '/dashboard/settings',
            },
            {
                title: 'Apollo',
                icon: 'Key',
                show: true,
                to: '/dashboard/apollo',
            },
            {
                title: 'User Procedure',
                icon: 'Key',
                show: true,
                to: '/dashboard/userProcedure',
            },
            {
                title: 'Logout',
                icon: 'Logout',
                show: true,
                action: showModal,
            },
        ],
        logoutModal: {
            title: 'Please confirm',
            message: 'Are you sure you want to logout?',
            positiveBtn: 'Yes',
        },
    }),
    watch: {
        modelValue() {
            this.drawer.local = this.modelValue
        },
        'drawer.local'() {
            this.$emit('input', this.drawer.local)
        },
    },
    async beforeMount() {
        this.pinned = await localforage.getItem('sidebarPinned')
    },
    async mounted() {
        await this.$nextTick()
        OverlayScrollbars(document.querySelector('.v-navigation-drawer__content'), {
            className: 'os-theme-light',
            scrollbars: {
                autoHide: 'm',
            },
        })
    },
    methods: {
        async logout() {
            await this.$authHelpers.logout()
            this.$iziToast.success({
                title: 'OK',
                message: 'You have been logged out!',
            })
        },
        pin() {
            this.pinned = !this.pinned
            localforage.setItem('sidebarPinned', this.pinned)
        },
    },
}
</script>
