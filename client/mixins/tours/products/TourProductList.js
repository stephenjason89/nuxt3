import { rememberTour, isRememberTour } from '~/assets/js/utils'

export default {
    data() {
        return {
            tourName: 'ProductList',
            tourState: {},
            tourSteps: [
                {
                    target: 'h5',
                    header: {
                        title: 'Tour guide',
                    },
                    content: `Let's discover <strong>Manage Products</strong>.`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: 'tbody',
                    content:
                        'This is the <strong>Products Table</strong> where all of the products are listed. You can add, update, delete and search products here.',
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: "th[aria-label='Product ID']",
                    header: {
                        title: 'Product ID',
                    },
                    content: 'The product identification key column.',
                },
                {
                    target: "th[aria-label*='Item Code']",
                    header: {
                        title: 'Product Item Code',
                    },
                    content: 'The product item code column.',
                },
                {
                    target: 'th[aria-label="Actions"]',
                    header: {
                        title: 'Actions column',
                    },
                    content: 'When you need to make changes, make sure to use available actions.',
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
                        title: 'Congratulations!',
                    },
                    content: `You're all set! you can now use <strong>Manage Products</strong>`,
                },
            ],

            tourCallbacks: {
                onStart: this.tourOnStart,
                onPreviousStep: this.tourOnPreviousStep,
                onNextStep: this.tourOnNextStep,
                onSkip: this.tourOnSkip,
                onFinish: this.tourOnFinish,
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
                    this.tourSteps[2].target = `.v-data-table__mobile-table-row td:nth-child(1)`
                    this.tourSteps[3].target = `.v-data-table__mobile-table-row td:nth-child(2)`
                    this.tourSteps[4].target = `.v-data-table__mobile-table-row td:nth-child(6)`
                    return
                }

                this.tourSteps[2].target = `th[aria-label='Product ID']`
                this.tourSteps[3].target = `th[aria-label*='Item Code']`
                this.tourSteps[4].target = `th[aria-label="Actions"]`
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
