import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default (nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
    })

    nuxtApp.vueApp.use(vuetify)
}