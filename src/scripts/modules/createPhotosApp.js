import { createApp } from 'vue/dist/vue.esm-bundler'
import { client } from '@scripts/modules/client'
import FinderContentList from '@components/FinderContentList.vue'
import FinderDetailInfo from '@components/FinderDetailInfo.vue'

export const createPhotosApp = () => {

  return createApp({
    components: {
      FinderContentList,
      FinderDetailInfo,
    },
    data() {
      return {
        data: [],
        selectedTags: [], // 選択されているタグ
        detail: {
          title: '',
          date: '',
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        client.get({
          endpoint: 'photos',
          queries: {
            limit: 100
          }
        })
        .then((res) => {
          import.meta.env.DEV && console.log(res.contents)
          this.data = res.contents
          // 一番最初のデータを詳細に表示しておく
          this.detail = this.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
      },
      getUniqueValues(propertyName) {
        // 全ての種類の指定されたプロパティの配列を作成
        const values = this.data.flatMap(item => item[propertyName])
        // 重複を除去してユニークな値のみを取得
        return [...new Set(values)]
      },
      updateDetailInfo(value) {
        this.detail = value
      },
    },
    computed: {
      sortedByDateDesc() {
        return [...this.data].sort((a, b) => {
          return Date.parse(b.date) - Date.parse(a.date)
        })
      }
    }
  })
}