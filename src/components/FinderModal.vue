<template>
  <dialog open class="dialog">
    <div class="dialog__header">
      <button type="button" class="dialog__close"></button>
      <h1 class="dialog__title">CV.txt</h1>
    </div>
    <div class="dialog__content">
      <div class="dialog__text">
        ⬛■勤務先企業名<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
        株式会社Relic<br>
        テキスト<br>
        テキスト<br>
      </div>
    </div>
  </dialog>
</template>

<script>
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @use "@styles/global/" as *;

  .dialog {
    position: fixed;
    inset: 0;
    width: calc(100% - 20px);
    max-width: 750px;
    padding: 0;
    background: var(--color-white);
    border: 0;
    border-radius: 6px;
    box-sizing: border-box;

    &__header {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 6px 5px;
      text-align: center;
      border-bottom: 1px solid var(--color-black);
    }

    &__close {
      position: relative;
      display: block;
      width: 23px;
      height: 23px;
      padding: 0;
      margin: 0;
      background: none;
      border: 0;

      &::before,
      &::after {
        position: absolute;
        content: '';
        top: 0;
        left: 50%;
        width: 1px;
        height: 100%;
        background-color: var(--color-black);
        rotate: 45deg;
      }

      &::after {
        rotate: -45deg;
      }

      &:not(:disabled) {
        cursor: pointer;
      }
    }

    &__title {
      font-size: px-to-rem(14);
      @include font-ja(500);
    }

    &__content {
      position: relative;
      max-height: 82svh;
      padding: 10px;
      font-size: px-to-rem(13);
      line-height: 1.6;
      @include font-ja;
      overflow-x: hidden;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
  }
</style>