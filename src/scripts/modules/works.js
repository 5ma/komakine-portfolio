import { createApp } from 'vue/dist/vue.esm-bundler'
import { client } from '@scripts/modules/client'
import FinderContentList from '@components/FinderContentList.vue'
import FinderDetailInfo from '@components/FinderDetailInfo.vue'

const selectElm = document.querySelector('[data-category-select]')

export const works = createApp({
  components: {
    FinderContentList,
    FinderDetailInfo
  },
  data() {
    return {
      data: [],
      selectedTags: [], // 選択されているタグ
      selectedCategory: selectElm ? selectElm.value : 'all' // 選択されているカテゴリー
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      client.get({
        endpoint: 'works',
      })
      .then((res) => {
        console.log(res.contents)
        this.data = res.contents
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
    }
  },
  computed: {
    allCategories() {
      return this.getUniqueValues('category')
    },
    tagList() {
      // 表示用にallDevsのデータを加工した配列を作成
      return this.getUniqueValues('dev').map((dev) => {
        return {
          value: dev,
          // スペースをアンダーバー（_）に置換
          displayName: dev.replace(/[\s　]/g, '_')
        }
      })
    }
  }
})