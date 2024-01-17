<template>
  <label class="dropdown" v-show="categories.length" data-change-color-target data-change-color-func="color,childBg,childBorder">
    <span class="dropdown__label">Category</span>
    <div class="dropdown__wrapper">
      <span class="dropdown__triangle" data-change-bg></span>
      <select
        class="dropdown__select"
        :value="selectedCategory"
        @change="updateValue"
        data-category-select
        data-change-border
      >
        <optgroup>
          <option value="all">all</option>
          <option
            v-for="category in categories"
            :key="category"
            class="dropdown__option"
            :value="category"
          >
            {{ category }}
          </option>
        </optgroup>
      </select>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
      required: true
    },
    selectedCategory: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    updateValue($event) {
      this.$emit('update:value', $event.target.value);
    }
  },
}
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @use "@styles/global/" as *;

  .dropdown {
    display: block;

    &__label {
      display: block;
      font-size: px-to-rem(9);
      font-weight: 600;
      text-align: right;
      text-transform: uppercase;

      @include pc {
        font-size: px-to-rem(12);
        letter-spacing: 0.03em;
      }
    }

    &__wrapper {
      position: relative;
      margin-top: 1px;

      @include pc {
        margin-top: 2px;
      }
    }

    &__triangle {
      position: absolute;
      top: 50%;
      right: 5px;
      width: 7px;
      height: 6px;
      background-color: var(--color-theme-white);
      transform: translateY(-50%);
      clip-path: polygon(50% 100%, 0 0, 100% 0);

      @include pc {
        right: 10px;
        width: 10px;
        height: 9px;
      }
    }

    &__select {
      appearance: none;
      display: block;
      width: 100%;
      padding: 5px 21px 5px 4px;
      font-family: inherit;
      font-size: px-to-rem(13);
      border: 0;
      border-bottom: 1px solid var(--color-theme-white);
      background: none;
      cursor: pointer;

      @include pc {
        padding: 5px 30px 5px 10px;
        font-size: px-to-rem(18);
      }
    }
  }
</style>