<template>
    <div class="h-screen">
        <div class="h-full">
            <v-carousel cycle :show-arrows="false" height="100%" hide-delimiter-background>
                <v-carousel-item v-for="i in 6" :key="i" :src="`/img/products/${i}.jpg`" />
            </v-carousel>
        </div>
        <div class="login-form">
            <v-img class="logo" height="160" width="150" src="/img/msi-logo.png" />
            <div v-show="isSocialLogin">
                <v-btn width="100%" @click="login">Login with google</v-btn>
            </div>

            <v-text-field v-model="user.username" label="Email" @keydown="error = ''" />
            <v-text-field v-model="user.password" label="Password" type="password" @keydown="error = ''" />
            <v-btn
                rounded
                color="#00c853"
                width="100%"
                class="mt-5 ma-auto"
                dark
                large
                :loading="loading"
                @click="login"
            >
                Sign In
            </v-btn>
            <v-btn
                class="justify-center mt-16"
                x-large
                dark
                outlined
                color="green"
                @click="$router.push('/')"
            >
                Go to Index
            </v-btn>
            <p class="text-center text-red-600">{{ user.errors.message }}</p>
        </div>
    </div>
</template>

<script>
import { useAuth } from '~/store/auth'

export default {
    name: 'Login',
    layout: 'blank',
    middleware: 'auth',
    data: () => ({
        user: {
            username: 'admin@email.com',
            password: 'password',
            errors: {
                error: '',
                message: '',
            },
        },
        isSocialLogin: false,
        error: '',
        loading: false,
    }),
    methods: {
        async login() {
            this.user = await useAuth().login(this.user)
        },
    },
}
</script>
<style scoped>
body {
    background-color: #1289ff;
}

.logo {
    margin: 0 auto 100px;
}

.login-form {
    width: 450px;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 80px 70px;
    background-color: rgb(255 255 255);
}

@media only screen and (max-width: 812px) {
    .login-form {
        height: 100vh;
        background-color: rgb(255 255 255 / 70%);
        padding: 150px 100px;
    }
}
</style>
