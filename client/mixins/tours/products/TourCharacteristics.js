import { rememberTour, isRememberTour } from '~/assets/js/utils'

export default {
    data() {
        return {
            tourName: 'characteristics',
            tourState: {},
            tourSteps: [
                {
                    target: 'h5',
                    header: {
                        title: 'Tour guide',
                    },
                    content: `Let's discover <strong>Characteristics</strong>`,
                    params: {
                        enableScrolling: false,
                    },
                },
                {
                    target: '.tour-tab-characteristics',
                    header: {
                        title: 'Characteristics tab',
                    },
                    content: `
                        <p style="text-align: left">
                            This is where the <strong>characteristics</strong> information are listed.
                        </p>
                        <p style="text-align: left">
                            A <strong>characteristic</strong> may be a quality or appearance that makes itself identify to other characteristics.
                        </p>`,
                },
                {
                    target: '.tour-tab-characteristics-group',
                    header: {
                        title: 'Characteristics Group tab',
                    },
                    content: `
                        <p style="text-align: left">
                            Same as <strong>Characteristics tab</strong>.
                        </p>
                        <p style="text-align: left">
                            The difference is that the characteristic listed here is a parent of many <strong>characteristics</strong>.
                        </p>`,
                },
                {
                    target: '.first-tab tbody',
                    content:
                        'This is the <strong>Characteristics Table</strong> where all of the Characteristics are listed.',
                    params: {
                        enableScrolling: false,
                    },
                    before: () =>
                        new Promise((resolve) => {
                            if (this.tabs !== 0) {
                                this.tabs = 0 // Characteristics tab
                                setTimeout(() => resolve(true), 300)
                                return
                            }

                            resolve(true)
                        }),
                },
                {
                    target: '.second-tab tbody',
                    content:
                        'This is the <strong>Characteristics Group Table</strong> where all of the characteristics has many characteristic relating to it.',
                    params: {
                        enableScrolling: false,
                    },
                    before: () =>
                        new Promise((resolve) => {
                            if (this.tabs !== 1) {
                                this.tabs = 1 // Characteristics group tab
                                setTimeout(() => resolve(true), 300)
                                return
                            }

                            resolve(true)
                        }),
                },
                {
                    target: 'h5',
                    header: {
                        title: `You're all set!`,
                    },
                    content: `You may now use <strong>Characteristics</strong>`,
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
                labels: {
                    buttonSkip: 'Skip tour',
                    buttonPrevious: 'Previous',
                    buttonNext: 'Next',
                    buttonStop: 'Finish tour',
                },
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

    async mounted() {
        const isRemember = await isRememberTour(this.tourName, this.$auth.userId)

        if (!isRemember) {
            this.$nextTick(() => this.$tours[this.tourName].start())
        }
    },
}
