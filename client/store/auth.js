import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import Form from '~/assets/js/forms/Form.js'

export const useAuth = defineStore('auth', {
    state: () => ({
        user: {},
        userId: null,
        token: null,
        tokenExpiration: null,
        refreshToken: null,
        refreshTokenExpiration: null,
    }),
    getters: {
        isTokenExpired: (state) => parseFloat(state.tokenExpiration) < new Date().getTime(),
        isRefreshTokenExpired: (state) => parseFloat(state.refreshTokenExpiration) < new Date().getTime(),
    },
    actions: {
        /* eslint-disable */
        async login(data) {
            const form = data instanceof Form ? data : new Form(data)
            const { token_type, access_token, refresh_token, expires_in, user, error, message } =
                await form.post(useRuntimeConfig().public.graphqlEndpoint + '/api/get-token', true)
            if (!error) {
                const tokenExpiration = new Date().getTime() + expires_in * 1000
                const refreshTokenExpiration = new Date().getTime() + 60 * 60 * 24 * 30 * 1000
                this.user = user
                this.userId = user?.id
                this.token = `${token_type} ${access_token}`
                this.tokenExpiration = tokenExpiration
                this.refreshToken = refresh_token
                this.refreshTokenExpiration = refreshTokenExpiration
                if (useNuxtApp().$router.currentRoute.value.name === 'login')
                    useNuxtApp().$router.push('/dashboard')
            } else {
                console.error(error, message)
                this.logout()
            }
            return form
        },
        /* eslint-enable */
        logout(expired = false) {
            this.$reset()
            if (useNuxtApp().$router.currentRoute.value.name !== 'login')
                useNuxtApp().$router.push({ name: 'login' })
            if (expired)
                useToast().error({
                    title: 'Session Expired',
                    message: 'Please re-login',
                })
        },
        async refresh() {
            if (this.isTokenExpired)
                if (!this.isRefreshTokenExpired) await this.login({ refresh_token: this.refreshToken })
                else this.logout(true)
        },
        setUser(user) {
            console.log(user)
        },
    },
    persist: true,
})
