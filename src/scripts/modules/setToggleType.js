import { hoverMql } from "@scripts/modules/media-queries"

export const setToggleType = () => {
  const triggers = document.querySelectorAll('[data-type="trigger"]')
  triggers.forEach((elm) => {
    elm.addEventListener('click', (e) => {
      // hover可能なブラウザでは早期リターンする
      if (hoverMql().matches) return

      const targetId = e.currentTarget.dataset.typeTarget
      document.getElementById(targetId).classList.toggle('is-show')
    })
  })
}