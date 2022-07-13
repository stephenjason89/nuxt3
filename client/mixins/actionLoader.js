export default {
    data: () => ({
        actionLoading: {},
    }),
    methods: {
        actionStart(name) {
            this.$set(this.actionLoading, name, true)
            setTimeout(() => (this.actionLoading[name] = false), 350)
        },
    },
}
