import { useAuth } from '~/store/auth'
export default defineNuxtRouteMiddleware((to) => {
    const nuxtApp = useNuxtApp()
    const auth = useAuth(nuxtApp.$pinia)
    const noAuthRoutes = ['login', 'index']
    if (!auth.userId) {
        if (!noAuthRoutes.includes(to.name)) return navigateTo('/login')
    } else {
        if (to.name === 'index') return navigateTo('/dashboard')
        if (process.client) auth.refresh()
    }
})
