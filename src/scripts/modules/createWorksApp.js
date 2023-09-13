import { createApp } from 'vue/dist/vue.esm-bundler'
import { client } from '@scripts/modules/client'
import FinderContentList from '@components/FinderContentList.vue'
import FinderDetailInfo from '@components/FinderDetailInfo.vue'
import TagList from '@components/TagList.vue'
import CategoryDropdown from '@components/CategoryDropdown.vue'

export const createWorksApp = () => {
  let url = new URL(location.href)

  return createApp({
    components: {
      FinderContentList,
      FinderDetailInfo,
      TagList,
      CategoryDropdown
    },
    data() {
      return {
        data: [],
        selectedTags: [], // 選択されているタグ
        selectedCategory: url.searchParams.get('category') ? url.searchParams.get('category') : 'all', // 選択されているカテゴリー
        detail: {
          title: '',
          dev: [],
          category: [],
          url: '',
          supplement: ''
        }
      }
    },
    created() {
      this.getData()
      this.setTagFilterFromQuery()
    },
    methods: {
      getData() {
        client.get({
          endpoint: 'works',
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
      setTagFilterFromQuery() {
        url = new URL(location.href)
        const tags = url.searchParams.getAll('tag')

        // アンダーバー（_）を全て半角スペースに置換
        this.selectedTags = tags.map((tag) => {
          return tag.replace(/_/g, ' ');
        })
      },
      getUniqueValues(propertyName) {
        // 全ての種類の指定されたプロパティの配列を作成
        const values = this.data.flatMap(item => item[propertyName])
        // 重複を除去してユニークな値のみを取得
        return [...new Set(values)]
      },
      filterByCategory(arr) {
        // カテゴリで絞り込み
        if (this.selectedCategory === 'all') return arr
        return arr.filter((item) => {
          return item.category.includes(this.selectedCategory)
        })
      },
      filterByTag(arr) {
        // タグで絞り込み
        if (this.selectedTags.length === 0) return arr
        return arr.filter((item) => {
          return this.selectedTags.every((tag) => item.dev.includes(tag))
        })
      },
      toggleTagFilter(value) {
        const set = new Set(this.selectedTags)

        if (set.has(value)) {
          // 要素が配列に存在する場合、削除
          set.delete(value)
        } else {
          // 要素が配列に存在しない場合、追加する
          set.add(value)
        }

        this.selectedTags = [...set]
      },
      updateDetailInfo(value) {
        this.detail = value
      },
      updateUrl(newUrl) {
        history.pushState(null, '', newUrl);
      }
    },
    watch: {
      selectedTags(newVal) {
        // クエリパラメータを更新
        url.searchParams.delete('tag')

        // スペースをアンダースコアに変換してクエリパラメータに追加
        newVal
          .map(tag => tag.replace(/[\s　]/g, '_'))
          .forEach(cleanTag => url.searchParams.append('tag', cleanTag))

        this.updateUrl(url.toString())
      },
      selectedCategory(newVal) {
        if (newVal === 'all') {
          url.searchParams.delete('category')
        } else {
          url.searchParams.set('category', newVal)
        }

        this.updateUrl(url.toString())
      },
      filteredArray() {
        if (!this.filteredArray.length) return
        // 詳細の情報をupdate
        this.updateDetailInfo(this.filteredArray[0])
      }
    },
    computed: {
      allCategories() {
        return this.getUniqueValues('category')
      },
      allDevs() {
        return this.getUniqueValues('dev')
      },
      tagList() {
        // 表示用にallDevsのデータを加工した配列を作成
        return this.allDevs.map((dev) => {
          return {
            value: dev,
            // スペースをアンダーバー（_）に置換
            displayName: dev.replace(/[\s　]/g, '_')
          }
        })
      },
      filteredArray() {
        // カテゴリとタグで絞り込んだデータ
        return this.filterByTag(this.filterByCategory(this.data))
      }
    }
  })
}