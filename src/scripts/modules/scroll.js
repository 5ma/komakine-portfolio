import Lenis from '@studio-freight/lenis'

export const scroll = {
  instance: undefined,
  setUp() {
    this.instance = new Lenis({})
    console.log('this.instance', this.instance)

    function raf(time) {
      scroll.instance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  },
  scrollTop() {
    if (this.instance === undefined) return
    this.instance.scrollTo(0)
  },
  resize() {
    this.instance.resize()
  }
}