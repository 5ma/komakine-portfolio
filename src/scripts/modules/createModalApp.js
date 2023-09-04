import { createApp } from 'vue/dist/vue.esm-bundler'
import FinderModal from '@components/FinderModal.vue'

export const createModalApp = () => {
  return createApp({
    components: {
      FinderModal
    }
  })
}