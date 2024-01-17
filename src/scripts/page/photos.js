import { createPhotosApp } from "@scripts/modules/createPhotosApp"

export const PHOTOS = {
  instance: undefined,
  initVue() {
    if (document.getElementById('v-photos')) {
      this.instance = createPhotosApp()
      this.instance.mount('#v-photos')
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
