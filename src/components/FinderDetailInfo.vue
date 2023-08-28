<template>
  <section class="container">
    <h2 class="title">Information</h2>
    <h3 class="site-title">{{ siteTitle }}</h3>
    <dl class="data">
      <div class="data__item">
        <dt class="data__title">Dev</dt>
        <dd class="data__detail">
          {{ joinArrayWithComma(devs) }}
        </dd>
      </div>
      <div class="data__item">
        <dt class="data__title">Category</dt>
        <dd class="data__detail">
          {{ joinArrayWithComma(categories) }}
        </dd>
      </div>
      <div class="data__item">
        <dt class="data__title">URL</dt>
        <dd class="data__detail">
          <a :href="url" target="_blank" rel="noopener">{{ url }}</a>
        </dd>
      </div>
    </dl>
    <p class="sup" v-show="supplement" v-html="formattedText"></p>
  </section>
</template>

<script>
export default {
  mounted() {
    console.log('mounted', this.devs)
  },
  props: {
    siteTitle: {
      type: String,
      default: '',
      required: true
    },
    devs: {
      type: Array,
      default: () => [],
      required: true
    },
    categories: {
      type: Array,
      default: () => [],
      required: true
    },
    url: {
      type: String,
      default: '',
      required: true
    },
    supplement: {
      type: String,
      default: '',
      required: false
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
      return this.supplement.replace(/\n/g, '<br>')
    },
    displayDevText() {
      return this.joinArrayWithComma(this.devs)
    },
    displayCategoryText() {

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
    overflow-y: auto;

    @include pc {
      display: block;
      @include hover {
      }

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

      :global(a) {
        text-decoration: none;
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
</style>