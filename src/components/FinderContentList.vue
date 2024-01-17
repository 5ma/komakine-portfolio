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
          v-if="!isPhotos"
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
        <div class="finder-content__link" @mouseenter="updateInfo(item)" v-else>
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
        </div>
      </li>
    </TransitionGroup>
    <div class="no-data" v-show="!contents.length">
      一致する項目はありません
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPhotos: {
      type: Boolean,
      default: false,
      required: false
    },
    contents: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    updateInfo(item) {
      this.$emit('onHover', item)
    },
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
    transition: color cubic-bezier(0.83, 0, 0.17, 1) 1s;

    @include pc {
      gap: 38px 49px;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      padding-left: 59px;
    }

    &__item {
      @include pc {
        max-width: 500px;
      }
    }

    &__link {
      position: relative;
      display: block;
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

      @include hover {

        &::before {
          position: absolute;
          content: '';
          top: -10px;
          right: -10px;
          bottom: -10px;
          left: -10px;
          border-radius: 5px;
        }

        .finder-content__link:hover & {
          &::before {
            background: rgb(var(--color-selection-blue-rgb) / 0.5);
          }
        }
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
        background: #ccc;
        box-shadow: 0 0 0 1px #272727, 0 0 0 4px var(--color-gray-border);
        box-sizing: border-box;

        @include pc {
          box-shadow: 0 0 0 1px #272727, 0 0 0 5px var(--color-gray-border);
        }
      }
    }

    &__title {
      margin-top: 13px;
      @include font-ja;
      @include fz-vw(11, 375, 375 * $font_flex_sp, 375);
      line-height: math.div(26, 16);
      letter-spacing: 0.05em;
      text-align: center;
      overflow-wrap: anywhere;
      border-radius: 5px;
      transition: color .3s;

      @include pc {
        margin-top: 18px;
        font-size: px-to-rem(16);
      }

      @include hover {
        .finder-content__link:hover & {
          color: var(--color-white);
          background: rgb(var(--color-selection-blue-rgb) / 0.5);
        }
      }
    }
  }

  .no-data {
    @include font-ja;
    font-size: px-to-rem(14);

    @include pc {
      display: none;
    }
  }
</style>