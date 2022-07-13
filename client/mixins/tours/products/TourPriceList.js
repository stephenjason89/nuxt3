import { rememberTour, isRememberTour } from '~/assets/js/utils'

export default {
    data() {
        return {
            tourName: 'PriceList',
            tourState: {},
            tourSteps: [
                {
                    target: 'h5',
                    header: {
                        title: 'Tour guide',
                    },
                    content: `Let's discover <strong>Manage Prices</strong>`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '.tour-tab-price-list',
                    header: {
                        title: 'Price List tab',
                    },
                    content: `This is where the branches with price group information are listed.`,
                },
                {
                    target: '.tour-tab-price-group',
                    header: {
                        title: 'Price Group tab',
                    },
                    content: `The <strong>Price Group</strong> information used by branches are listed here.`,
                },
                {
                    target: '.first-tab tbody',
                    header: {
                        title: 'Price List table',
                    },
                    content: 'The information about branches and price group are displayed.',
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '.first-tab thead th:nth-child(2)',
                    header: {
                        title: 'Name column',
                    },
                    content: 'The identifying name of the branches.',
                },
                {
                    target: '.first-tab thead th:nth-child(3)',
                    header: {
                        title: 'Price Group column',
                    },
                    content:
                        'The price group of the branch it belongs to. See the <strong>Price Group</strong> tab for more information.',
                },
                {
                    target: '.first-tab thead th:nth-child(4)',
                    header: {
                        title: 'Last modified column',
                    },
                    content: 'The previous change to a price list is defined in this column.',
                    before: () =>
                        new Promise((resolve) => {
                            if (this.tabs !== 0) {
                                this.tabs = 0 // Price list tab
                                setTimeout(() => resolve(true), 300)
                                return
                            }

                            resolve(true)
                        }),
                },
                {
                    target: '.second-tab tbody',
                    content:
                        'This is the <strong>Price Group Table</strong>. Information about Price Group is listed here.',
                    params: {
                        enableScrolling: false,
                    },
                    before: () =>
                        new Promise((resolve) => {
                            if (this.tabs !== 1) {
                                this.tabs = 1 // Price group tab
                                setTimeout(() => resolve(true), 300)
                                return
                            }

                            resolve(true)
                        }),
                },
                {
                    target: '.second-tab thead th:nth-child(2)',
                    header: {
                        title: 'Price group column',
                    },
                    content: 'The names of the price group.',
                },
                {
                    target: '.second-tab img[alt="Refresh"]',
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
                    content: `You may now use <strong>Manage Prices</strong>`,
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
            this.tabs = 0
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
                    this.tourSteps[4].target = `.first-tab .v-data-table__mobile-table-row td:nth-child(2)`
                    this.tourSteps[5].target = `.first-tab .v-data-table__mobile-table-row td:nth-child(3)`
                    this.tourSteps[6].target = `.first-tab .v-data-table__mobile-table-row td:nth-child(4)`
                    this.tourSteps[8].target = `.second-tab .v-data-table__mobile-table-row td:nth-child(2)`
                    return
                }

                this.tourSteps[4].target = `.first-tab thead th:nth-child(2)`
                this.tourSteps[5].target = `.first-tab thead th:nth-child(3)`
                this.tourSteps[6].target = `.first-tab thead th:nth-child(4)`
                this.tourSteps[8].target = `.second-tab thead th:nth-child(2)`
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
