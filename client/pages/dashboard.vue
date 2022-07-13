<template>
    <v-app>
        <v-main>
            <v-container>
                <h2>WELCOME</h2>
                <v-btn
                    class="justify-center mt-16"
                    x-large
                    dark
                    outlined
                    color="green"
                    @click="useAuth().logout()"
                >
                    Logout
                </v-btn>
            </v-container>
        </v-main>
    </v-app>
</template>
<script setup>
import { useAuth } from '~/store/auth'
</script>
