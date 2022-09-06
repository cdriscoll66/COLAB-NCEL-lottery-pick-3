import { defineStore } from 'pinia'


export const tutorialStore = defineStore("tutorials", {
    state: () => ({
      showtoc: false
    }),
    actions: {
        toggleTOC() {
            this.showtoc = !this.showtoc
        }
    }
})