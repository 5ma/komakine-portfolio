import anime from 'animejs/lib/anime.es.js'

const circleButtonElm = document.querySelector('[data-color-change="button"]')
const circleElem = document.querySelector('[data-color-change="circle"]')

const animation = {
  blinkTwice(targets, delay = 0, onCompleted = undefined) {
    // 2回点滅するアニメーション
    return {
      targets,
      opacity: [1, 0.2, 1, 0.6, 1],
      duration: 400,
      delay,
      loop: 1,
      easing: 'easeOutExpo',
      complete() {
        // none or 空文字の時、何もしない
        if (onCompleted === 'none' || onCompleted === '') return

        // 何も値が渡されなかった時はデフォルトで文字色変更の関数を実行
        if (onCompleted == undefined) {
          onCompletedFunc.color(targets)
          return
        }

        const funcNameArray = onCompleted.split(',')
        funcNameArray.forEach((funcName) => {
          onCompletedFunc[funcName.trim()](targets)
        })
      }
    }
  }
}

// 2回点滅後に実行する関数
// ex: 文字色の適用、背景色の適用、SVGのfillの色適用etc...
const onCompletedFunc = {
  currentColor() {
    return `var(--color-theme-${siteTheme.colors[siteTheme.currentIndex]})`
  },
  color(target) {
    // 文字色を変える
    target.style.color = this.currentColor()
  },
  bg(target) {
    // 背景色を変える
    target.style.backgroundColor = this.currentColor()
  },
  border(target) {
    // ボーダーの色を変える
    target.style.borderColor = this.currentColor()
  },
  childBg(target) {
    // 子要素の背景色を変える
    const changeBgElms = target.querySelectorAll('[data-change-bg]')
    changeBgElms.forEach((changeBgElm) => {
      changeBgElm.style.backgroundColor = this.currentColor()
    })
  },
  childBorder(target) {
    // 子要素のボーダーの色を変える
    const changeBorderElms = target.querySelectorAll('[data-change-border]')
    changeBorderElms.forEach((changeBorderElm) => {
      changeBorderElm.style.borderColor = this.currentColor()
    })
  },
  childFill(target) {
    // 子要素のSVG要素のfillを変える
    const changeSvgElms = target.querySelectorAll('[data-change-fill]')
    changeSvgElms.forEach((changeSvgElm) => {
      changeSvgElm.style.fill = this.currentColor()
    })
  },
  childStroke(target) {
    // 子要素のSVG要素のstrokeを変える
    const changeSvgElms = target.querySelectorAll('[data-change-stroke]')
    changeSvgElms.forEach((changeSvgElm) => {
      changeSvgElm.style.stroke = this.currentColor()
    })
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
    const defaultAddDelay = 60 // ms

    targets.forEach((target) => {
      const addDelay = target.dataset?.changeColorDelay ?? defaultAddDelay
      totalDelay += parseInt(addDelay)
      const functionName = target.dataset?.changeColorFunc
      anime(animation.blinkTwice(target, totalDelay, functionName))
    })
  },
  applyOnlyColor() {
    const targets = document.querySelectorAll('[data-change-color-target]')
    targets.forEach((target) => {
      const functionName = target.dataset?.changeColorFunc
      // none or 空文字の時、何もしない
      if (functionName === 'none' || functionName === '') return

      // 何も値が渡されなかった時はデフォルトで文字色変更の関数を実行
      if (functionName == undefined) {
        onCompletedFunc.color(target)
        return
      }

      const funcNameArray = functionName.split(',')
      funcNameArray.forEach((funcName) => {
        onCompletedFunc[funcName.trim()](target)
      })
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
    this.applyOnlyColor()
    this.setAnime()
    this.attach()
  }
}