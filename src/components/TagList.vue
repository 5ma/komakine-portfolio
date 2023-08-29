<template>
  <ul class="tag-list" v-show="tags.length">
    <li class="tag-list__item" v-for="tag in tags" :key="tag.displayName">
      <button type="button" class="tag" :class="{ 'is-active' : selectedTags.includes(tag.value) }">
        <span class="tag__text">#{{ tag.displayName }}</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
      required: true
    },
    selectedTags: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @use "@styles/global/" as *;

  .tag-list {
    display: flex;
    gap: 11px 24px;
    flex-wrap: wrap;
    justify-content: center;

    @include pc {
      gap: 11px 34px;
    }
  }

  .tag {
    $_this: &;
    position: relative;
    display: block;
    padding: 0;
    margin: 0;
    font-size: px-to-rem(12);
    line-height: 1.3;
    color: var(--color-gray);
    background: none;
    border: 0;
    box-sizing: border-box;

    @include pc {
      font-size: px-to-rem(18);
    }

    &.is-active {
      color: var(--color-theme-current);
    }

    &:not(:disabled) {
      cursor: pointer;
    }

    &__text {
      vertical-align: baseline;
      background: linear-gradient(transparent 96%, currentColor 96%) no-repeat 100% 0 / 0% 100%;

      #{$_this}.is-active & {
        background-position: 0 100%;
        background-size: 100% 100%;
      }
    }
  }
</style>