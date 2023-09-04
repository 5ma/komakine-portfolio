import { createWorksApp } from "@scripts/modules/createWorksApp"

export const WORKS = {
  instance: undefined,
  enter() {
    if (document.getElementById('v-works')) {
      this.instance = createWorksApp()
      this.instance.mount('#v-works')
    }
  },
  leave() {
    if (this.instance) this.instance.unmount()
  }
}
