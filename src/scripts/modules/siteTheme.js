import anime from 'animejs/lib/anime.es.js'

const circleButtonElm = document.querySelector('[data-color-change="button"]')
const circleElem = document.querySelector('[data-color-change="circle"]')

export const siteTheme = {
  animeInstance: undefined,
  currentIndex: 0,
  colorChangeInterval: 1000 * 5, // 10秒ごとに色を変更
  colors: [
    'white',
    'pink',
    'yellow',
    'green',
    'purple',
  ],
  isResetting: false,
  setAnime() {
    this.animeInstance = anime({
      targets: circleElem,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: this.colorChangeInterval,
      easing: 'linear',
      loop: true,
      endDelay: 1100,
      loopBegin: () => {
        this.isResetting = false
        circleButtonElm.classList.remove('is-reset')
      },
      changeComplete: () => {
        this.isResetting = true
        circleButtonElm.classList.add('is-reset')
        this.currentIndex = (this.currentIndex + 1) % this.colors.length
        this.changeColor(this.currentIndex)
      }
    })
  },
  changeColor(index) {
    document.documentElement.style.setProperty('--color-theme-current', `var(--color-theme-${this.colors[index]})`)
  },
  attach() {
    circleButtonElm.addEventListener('click', () => {
      // 次のループが開始するまでのリセット期間中は無視する
      if (!this.animeInstance || this.isResetting) return

      if (this.animeInstance.paused) {
        this.animeInstance.play()
        circleButtonElm.setAttribute('aria-label', 'サイトのテーマカラー自動切り替えをストップする')
      } else {
        this.animeInstance.pause()
        circleButtonElm.setAttribute('aria-label', 'サイトのテーマカラー自動切り替えを再開する')
      }
    })
  },
  set() {
    this.changeColor(this.currentIndex) // 初期値をset
    this.setAnime()
    this.attach()
  }
}