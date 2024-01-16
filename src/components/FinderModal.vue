<template>
  <dialog
    class="dialog"
    id="finder-modal"
    :data-type="type"
    ref="dialog"
    aria-labelledby="dialog-title"
  >
    <div class="dialog__header">
      <button
        type="button"
        class="dialog__close"
        aria-label="モーダルを閉じる"
        @click="close"
        :aria-expanded="String(isOpen)"
        aria-controls="finder-modal"
      >
      </button>
      <h1 id="dialog-title" class="dialog__title">{{ title }}</h1>
    </div>
    <div class="dialog__content" data-lenis-prevent>
      <div class="dialog__text" v-if="type === 'text'" v-html="textContents">
      </div>
      <div class="dialog__playlist" v-else-if="type === 'playlist' && isOpen">
        <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;overflow:hidden;border-radius:0;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/playlist/weekly-playlist/pl.u-NepSLlomm1"></iframe>
      </div>
    </div>
  </dialog>
</template>

<script>
import { scroll } from '@scripts/modules/scroll'
import { siteTheme } from "@scripts/modules/siteTheme";

export default {
  data() {
    return {
      isOpen: false, // モーダルの開閉状態
      type: 'text',  // 'text' | 'playlist'
      title: '',     // モーダルのタイトル
      textContents: '',  // typeが 'text' だった場合に表示するコンテンツ部分
    }
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        // モーダルが開いている時は後ろのコンテンツがスクロールしないようにする
        scroll.stop()
        // サイトのテーマカラーを変えるタイマーを一旦STOPする
        siteTheme.pause()
      } else {
        scroll.start()
        // サイトのテーマカラーを変えるタイマーを再開
        siteTheme.start()
      }
    }
  },
  mounted() {
    // data-modal-openをクリックでモーダルを開く
    const modalShowButtons = document.querySelectorAll('[data-modal-open]')
    modalShowButtons.forEach((showButton) => {
      showButton.addEventListener('click', ({ currentTarget }) => {
        const type = currentTarget.dataset.modalOpen
        const title = currentTarget.querySelector('[data-modal-title]')?.textContent
        const templateContent = currentTarget.querySelector('template')?.content ?? null
        const textContents = templateContent?.querySelector('.text')?.innerHTML

        const modalData = {
          type,
          title,
          textContents
        }

        this.setModalData(modalData)
        this.show()
      })
    })

    // 背景のオーバーレイをクリックでモーダルを閉じる
    this.$refs.dialog.addEventListener('click', (e) => {
      if (e.target === this.$refs.dialog) {
        this.close()
      }
    })

    // モーダルが閉じられた時、isOpenをfalseに
    this.$refs.dialog.addEventListener('close', () => {
      this.isOpen = false
    })
  },
  methods: {
    setModalData(data) {
      const { type, title, textContents } = data

      this.type = type
      this.title = title
      this.textContents = textContents
    },
    show() {
      this.isOpen = true
      this.$refs.dialog.showModal()
    },
    close() {
      this.$refs.dialog.close()
    },
  },
}
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
    box-shadow: 0 0 8px 0 rgb(var(--color-black-rgb) / 0.5);

    @include pc {
      border-radius: 10px;
    }

    &::backdrop {
      cursor: pointer;
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
      min-height: min(40svh, 450px);
      max-height: 78vh;
      max-height: 82svh;
      font-size: px-to-rem(13);
      line-height: 1.75;
      @include font-ja;
      overflow-x: hidden;
      overflow-y: auto;
      overscroll-behavior-y: contain;

      @include pc {
        font-size: px-to-rem(16);
        min-height: min(45svh, 450px);
        max-height: 70svh;
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