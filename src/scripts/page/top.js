import { createModalApp } from "@scripts/modules/createModalApp"
import { toggleViewMode } from "@scripts/modules/toggleViewMode"

export const TOP = {
  modalInstance: undefined,
  initModalVue() {
    // Vueインスタンスをmount
    if (document.getElementById('v-modal')) {
      this.modalInstance = createModalApp()
      this.modalInstance.mount('#v-modal')
    }
  },
  destroyModalVue() {
    // Vueインスタンスをunmountする
    if (this.modalInstance) this.modalInstance.unmount()
  },
  enter() {
    toggleViewMode()
    this.initModalVue()
  },
  leave() {
    this.destroyModalVue()
  }
}