import { rememberTour, isRememberTour } from '~/assets/js/utils'

export default {
    data() {
        return {
            tourName: 'categories',
            tourState: {},
            tourSteps: [
                {
                    target: 'h5',
                    header: {
                        title: 'Tour guide',
                    },
                    content: `Let's discover <strong>Categories</strong>`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: 'tbody',
                    header: {
                        title: 'Categories Table',
                    },
                    content: `The information about categories is listed here.`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: `.v-data-table-header th:nth-child(2)`,
                    header: {
                        title: 'Name column',
                    },
                    content: `The name of the category`,
                },
                {
                    target: `.v-data-table-header th:nth-child(3)`,
                    header: {
                        title: 'Parent column',
                    },
                    content: `Some category can have a parent category to it. The information is displayed here.`,
                },
                {
                    target: 'img[alt="Refresh"]',
                    content: 'Use the <strong>Refresh button</strong> to load the new records if needed.',
                    params: {
                        highlight: true,
                    },
                },
                {
                    target: 'h5',
                    header: {
                        title: `You're all set!`,
                    },
                    content: `You may now use <strong>Manage Categories</strong>`,
                },
            ],

            tourCallbacks: {
                onStart: this.tourOnStart,
                onPreviousStep: this.tourOnPreviousStep,
                onNextStep: this.tourOnNextStep,
                onSkip: this.tourOnSkip,
                onFinish: this.tourOnFinish,
            },

            tourOptions: {
                startTimeout: 1750,
            },
        }
    },

    /**
     * @see https://github.com/pulsardev/vue-tour/wiki/Callbacks
     */
    methods: {
        tourOnStart() {
            //
        },

        tourOnPreviousStep() {
            //
        },

        tourOnNextStep() {
            //
        },

        tourOnSkip() {
            this.tourRememberUser()
        },

        tourOnFinish() {
            this.tourRememberUser()
        },

        tourRememberUser() {
            rememberTour(this.tourName, this.$auth.userId, this.tourState)
        },
    },

    watch: {
        '$vuetify.breakpoint.xsOnly': {
            handler(xsOnly) {
                if (xsOnly) {
                    this.tourSteps[2].target = `.v-data-table__mobile-table-row td:nth-child(2)`
                    this.tourSteps[3].target = `.v-data-table__mobile-table-row td:nth-child(3)`
                    return
                }

                this.tourSteps[2].target = `.v-data-table-header th:nth-child(2)`
                this.tourSteps[3].target = `.v-data-table-header th:nth-child(3)`
            },
            immediate: true,
        },
    },

    async mounted() {
        const isRemember = await isRememberTour(this.tourName, this.$auth.userId)

        if (!isRemember) {
            this.$nextTick(() => this.$tours[this.tourName].start())
        }
    },
}
