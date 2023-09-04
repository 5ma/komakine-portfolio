<template>
  <div>
    <TransitionGroup name="list" tag="ul" class="finder-content">
      <li
        class="finder-content__item"
        v-for="item in contents"
        :key="item.id"
      >
        <a
          :href="item.url"
          class="finder-content__link"
          target="_blank"
          rel="noopener"
          @mouseenter="updateInfo(item)"
        >
          <div class="finder-content__thumb">
            <img
              class="finder-content__thumb-img"
              :src="item.img.url"
              :width="item.img.width"
              :height="item.img.height"
              loading="lazy"
              alt=""
            >
          </div>
          <div class="finder-content__title">{{ item.title }}</div>
        </a>
      </li>
    </TransitionGroup>
    <div v-show="!contents.length">
      一致する項目はありません
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    updateInfo(item) {
      this.$emit('onHover', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @use "@styles/global/" as *;

  .finder-content {
    position: relative;
    display: grid;
    gap: 35px percentage(math.div(20, 335));
    grid-template-columns: 1fr 1fr;

    @include pc {
      gap: 38px 49px;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    &__link {
      position: relative;
      display: block;
      text-align: center;
      text-decoration: none;
    }

    &__thumb {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 4px;
      aspect-ratio: 1 / 1;
      z-index: 1;

      @include pc {
        margin: 5px;
      }

      &-img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
        box-shadow: 0 0 0 1px var(--color-gray-border), 0 0 0 4px var(--color-white);
        box-sizing: border-box;

        @include pc {
          box-shadow: 0 0 0 1px var(--color-gray-border), 0 0 0 5px var(--color-white);
        }
      }
    }

    &__title {
      margin-top: 13px;
      @include font-ja;
      @include fz-vw(11, 375, 375 * $font_flex_sp, 375);
      line-height: math.div(26, 16);
      letter-spacing: 0.05em;
      overflow-wrap: anywhere;

      @include pc {
        margin-top: 18px;
        font-size: px-to-rem(16);
      }
    }
  }
</style>