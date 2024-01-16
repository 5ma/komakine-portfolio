<template>
  <section class="container">
    <h2 class="title" data-change-color-target>Information</h2>
    <template v-if="!isNoData">
      <h3 class="site-title" data-change-color-target>{{ info.title }}</h3>
      <dl class="data">
        <div class="data__item" v-show="info.dev.length" data-change-color-target>
          <dt class="data__title">Dev</dt>
          <dd class="data__detail">
            {{ joinArrayWithComma(info.dev) }}
          </dd>
        </div>
        <div class="data__item" v-show="info.category.length" data-change-color-target>
          <dt class="data__title">Category</dt>
          <dd class="data__detail">
            {{ joinArrayWithComma(info.category) }}
          </dd>
        </div>
        <div class="data__item" v-show="info.url" data-change-color-target>
          <dt class="data__title">URL</dt>
          <dd class="data__detail">
            <a :href="info.url" target="_blank" rel="noopener">{{ info.url }}</a>
          </dd>
        </div>
      </dl>
      <p class="sup" v-if="info.supplement" v-html="formattedText" data-change-color-target></p>
    </template>
    <template v-else>
      <div class="no-data" data-change-color-target>一致する項目はありません。</div>
    </template>
  </section>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
      required: true
    },
    isNoData: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    joinArrayWithComma(arr) {
      // 配列の全要素をカンマと半角スペースで連結
      return arr.join(', ')
    }
  },
  computed: {
    formattedText() {
      // \n を <br> に変換
      return this.info.supplement.replace(/\n/g, '<br>')
    }
  }
}
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @use "@styles/global/" as *;

  .container {
    position: sticky;
    top: 60px;
    display: none;
    max-height: calc(100svh - 120px);
    padding-right: 59px;
    overflow-y: auto;
    transition: color cubic-bezier(0.83, 0, 0.17, 1) 1s;

    @include pc {
      display: block;
    }
  }

  .title {
    font-weight: 600;
    font-size: px-to-rem(12);
    text-transform: uppercase;
  }

  .site-title {
    margin-top: 36px;
    font-size: px-to-rem(24);
    font-feature-settings: "palt";
    @include font-ja;
    line-height: math.div(38, 24);
  }

  .data {
    margin-top: 38px;

    &__item {
      & + & {
        margin-top: 37px;
      }
    }

    &__title {
      font-size: px-to-rem(12);
      font-weight: 600;
      color: var(--color-gray);
      line-height: math.div(22, 12);
      text-transform: uppercase;
    }

    &__detail {
      margin-top: 6px;
      font-size: px-to-rem(16);
      line-height: 1.75;
      line-height: math.div(26, 16);
      letter-spacing: 0.04em;

      a {
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .sup {
    margin-top: 36px;
    font-size: px-to-rem(16);
    @include font-ja;
    line-height: math.div(28, 16);
    letter-spacing: 0.01em;
  }

  .no-data {
    margin-top: 36px;
    @include font-ja;
  }
</style>