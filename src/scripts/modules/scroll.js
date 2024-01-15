import Lenis from '@studio-freight/lenis'

export const scroll = {
  instance: undefined,
  setUp() {
    this.instance = new Lenis({
      lerp: 0.1,
      duration: 0.9
    })

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
  stop() {
    if (this.instance === undefined) return
    this.instance.stop()
  },
  start() {
    if (this.instance === undefined) return
    this.instance.start()
  },
  resize() {
    if (this.instance === undefined) return
    this.instance.resize()
  }
}