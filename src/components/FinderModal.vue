<template>
  <dialog open class="dialog" data-type="txt">
    <div class="dialog__header">
      <button type="button" class="dialog__close"></button>
      <h1 class="dialog__title">CV.txt</h1>
    </div>
    <div class="dialog__content">
      <!-- <div class="dialog__text">
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
      </div> -->
      <div class="dialog__playlist">
        <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:100%;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/playlist/fav/pl.u-WAGiREaddr"></iframe>
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
    z-index: 100;
    width: calc(100% - 20px);
    max-width: 750px;
    padding: 0;
    background: var(--color-white);
    border: 0;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 0 0 8px 0 rgb(var(--color-black-rgb) / 0.2);

    @include pc {
      border-radius: 10px;
    }

    &__header {
      display: grid;
      column-gap: 10px;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 6px 5px;
      text-align: center;
      border-bottom: 1px solid var(--color-black);

      @include pc {
        padding: 11px 13px;
      }
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

        @include pc {
          top: 50%;
          height: 82%;
          translate: 0 -50%;
        }
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

      @include pc {
        font-size: px-to-rem(18);
      }
    }

    &__content {
      position: relative;
      min-height: min(40svh, 400px);
      max-height: 78vh;
      max-height: 82svh;
      font-size: px-to-rem(13);
      line-height: 1.75;
      @include font-ja;
      overflow-x: hidden;
      overflow-y: auto;
      overscroll-behavior: contain;

      @include pc {
        font-size: px-to-rem(16);
        min-height: min(45svh, 500px);
      }
    }

    &__text {
      padding: 10px 13px;

      @include pc {
        padding: 22px 28px;
      }
    }
  }
</style>