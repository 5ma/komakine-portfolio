import { createWorksApp } from "@scripts/modules/createWorksApp"

export const WORKS = {
  instance: undefined,
  initVue() {
    if (document.getElementById('v-works')) {
      this.instance = createWorksApp()
      this.instance.mount('#v-works')
    }
  },
  destroyVue() {
    // Vueインスタンスをunmountする
    if (this.instance) this.instance.unmount()
  },
  enter() {
    this.initVue()
  },
  leave() {
    this.destroyVue()
  }
}
