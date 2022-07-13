<template>
    <v-app>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: 'DefaultLayout',
    middleware: 'auth',
}
</script>
