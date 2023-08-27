import { works } from "@scripts/modules/works"

const WORKS = {
  init() {
    if (document.getElementById('v-works')) {
      works.mount('#v-works')
    }
  }
}

WORKS.init()
