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
    console.log('this.instance', this.instance)
    this.instance.unmount()
    console.log('works destroy')
  }
}
