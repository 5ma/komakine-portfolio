import anime from 'animejs/lib/anime.es.js'

const circleButtonElm = document.querySelector('[data-color-change="button"]')
const circleElem = document.querySelector('[data-color-change="circle"]')

const animation = {
  blinkTwice(targets, delay = 0, onCompleted = undefined) {
    // 2回点滅するアニメーション
    return {
      targets,
      opacity: [1, 0, 1, 0.4, 1],
      duration: 300,
      delay,
      loop: 1,
      easing: 'steps(5)',
      complete() {
        if (onCompleted) onCompleted()
      }
    }
  }
}

export const siteTheme = {
  animeInstance: undefined,
  currentIndex: 0,
  colorChangeInterval: 1000 * 10, // 10秒ごとに色を変更
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

    // 要素をアニメーションさせながらテーマカラーを適用させていく
    const targets = document.querySelectorAll('[data-change-color-target]')

    let totalDelay = 0
    const defaultAddDelay = 45 // ms

    targets.forEach((target, i) => {
      const addDelay = target.dataset?.changeColorDelay ?? defaultAddDelay
      totalDelay += parseInt(addDelay)
      anime(animation.blinkTwice(target, totalDelay))
    })
  },
  attach() {
    circleButtonElm.addEventListener('click', () => {
      // 次のループが開始するまでのリセット期間中は無視する
      if (!this.animeInstance || this.isResetting) return

      if (this.animeInstance.paused) {
        this.start()
      } else {
        this.pause()
      }
    })
  },
  start() {
    this.animeInstance.play()
    circleButtonElm.setAttribute('aria-label', 'サイトのテーマカラー自動切り替えをストップする')
  },
  pause() {
    this.animeInstance.pause()
    circleButtonElm.setAttribute('aria-label', 'サイトのテーマカラー自動切り替えを再開する')
  },
  set() {
    this.changeColor(this.currentIndex) // 初期値をset
    this.setAnime()
    this.attach()
  }
}