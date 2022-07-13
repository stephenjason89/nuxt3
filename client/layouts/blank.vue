<template>
    <div>
        <slot />
    </div>
</template>
<script>
export default {
    name: 'BlankLayout',
    middleware: 'auth',
}
</script>
