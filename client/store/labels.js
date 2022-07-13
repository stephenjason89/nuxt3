import { defineStore } from 'pinia'

export const useLabels = defineStore('labels', {
    state: () => ({ aliases: {} }),
    actions: {
        updateLabels(labels) {
            for (const label of labels) this.aliases[label.name] = label.alias
        },
    },
})
