import { rememberTour, isRememberTour } from '~/assets/js/utils'

export default {
    data() {
        return {
            tourName: 'ProductBundles',
            tourState: {},
            tourSteps: [
                {
                    target: 'h5',
                    header: {
                        title: 'Tour guide',
                    },
                    content: `Let's discover <strong>Products Bundles</strong>`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: 'h5',
                    header: {
                        title: 'About Products Bundles',
                    },
                    content: `<strong>Product Bundle</strong> is a group of products that creates a new product.`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: 'tbody',
                    header: {
                        title: 'Product Bundle table',
                    },
                    content: `The information about bundles are displayed here.`,
                    params: {
                        enableScrolling: false,
                    },
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
                    content: `You're all set!`,
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

    async mounted() {
        const isRemember = await isRememberTour(this.tourName, this.$auth.userId)

        if (!isRemember) {
            this.$nextTick(() => this.$tours[this.tourName].start())
        }
    },
}
