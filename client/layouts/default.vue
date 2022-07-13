<template>
    <!--        <Offline v-if="$nuxt.isOffline" />-->
    <div>
        <v-app>
            <Sidebar v-model="drawer" />
            <v-app-bar :color="themeStore.theme?.appBarTheme" class="v-bar--underline" height="70" flat app>
                <v-app-bar-nav-icon class="ml-1 mr-3" @click="drawer = !drawer" />
                <v-btn text>
                    <v-badge bordered color="red" overlap>
                        <template #badge>
                            <span>5</span>
                        </template>

                        <Icon name="Bell" />
                    </v-badge>
                </v-btn>
                <v-spacer />
                <div @mouseover="profileView = true" @mouseleave="profileView = false">
                    <v-btn :color="themeStore.theme?.profileFontColor" ripple text>
                        {{
                            Object.keys(user ?? {}).length
                                ? user.first_name + ' ' + user.middle_name + ' ' + user.last_name
                                : ''
                        }}
                    </v-btn>
                    <transition name="slide-fade">
                        <ProfileEdit v-if="profileView" />
                    </transition>
                    <v-avatar class="mr-3">
                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                    </v-avatar>
                </div>
            </v-app-bar>

            <v-main class="min-h-screen" :class="themeStore.theme?.bodyTheme">
                <slot />
                <!--            <Modal-->
                <!--                :data="modal.data"-->
                <!--                :server-models="modal.serverModels"-->
                <!--                :loading="modal.loading"-->
                <!--                @cancel="-->
                <!--                    modal.data = { dialog: false }-->
                <!--                    modal.files = 0-->
                <!--                "-->
                <!--                @confirm="modal.callback($event.models, $event.uploader)"-->
                <!--            />-->
            </v-main>
        </v-app>
    </div>
</template>

<script>
import { labels } from '~/graphql/Label'
import { isLoading } from '~/assets/overlayLoaderState'
import { modal } from '~/assets/modalState'
import { useLabels } from '~/store/labels'
import { useAuth } from '~/store/auth'

export default {
    name: 'DefaultLayout',
    setup: () => ({ isLoading, modal, labelsStore: useLabels() }),
    data: () => ({
        drawer: false,
        profileView: false,
        extraHeight: 0,
        themeStore: { theme: {} },
    }),
    computed: {
        user() {
            return useAuth().user
        },
    },

    created() {
        this.$vuetify.theme.dark = ['theme-night', 'theme-winter'].includes(
            this.themeStore.theme?.selectedTheme,
        )
    },
    apollo: {
        labels: {
            query: labels,
            result(result) {
                this.labelsStore.updateLabels(result.data?.labels || [])
            },
        },
    },
}
</script>
