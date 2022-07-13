import { rememberTour, isRememberTour } from '~/assets/js/utils'

export default {
    data() {
        return {
            tourName: 'Units',
            tourState: {},
            tourSteps: [
                {
                    target: 'h5',
                    header: {
                        title: 'Tour guide',
                    },
                    content: `Let's discover <strong>Units</strong>.`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: 'h5',
                    header: {
                        title: 'Units',
                    },
                    content: `
                        <p style="text-align: left">
                            <strong>Units</strong> are measurements used for products.
                        </p>
                        <p style="text-align: left">
                            Adding a product will give you an option to add a unit.
                        </p>
                        `,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: 'tbody',
                    content: 'This is the <strong>Units Table</strong> where all the units are displayed.',
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: 'thead th:nth-child(2)',
                    header: {
                        title: 'Name column',
                    },
                    content: 'The name of the product unit.',
                },
                {
                    target: 'thead th:nth-child(3)',
                    header: {
                        title: 'Description column',
                    },
                    content: 'Information describing a unit.',
                },
                {
                    target: 'thead th:nth-child(5)',
                    header: {
                        title: 'Actions column',
                    },
                    content: 'Modification of a unit can be done in actions column.',
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
                    content: `Continue to use <strong>Units</strong>`,
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
                    this.tourSteps[3].target = `.v-data-table__mobile-table-row td:nth-child(2)`
                    this.tourSteps[4].target = `.v-data-table__mobile-table-row td:nth-child(3)`
                    this.tourSteps[5].target = `.v-data-table__mobile-table-row td:nth-child(5)`
                    return
                }

                this.tourSteps[3].target = `thead th:nth-child(2)`
                this.tourSteps[4].target = `thead th:nth-child(3)`
                this.tourSteps[5].target = `thead th:nth-child(5)`
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
