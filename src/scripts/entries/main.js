import { siteTheme } from "@scripts/modules/siteTheme"
import { barbaContainer } from "@scripts/modules/dom"
import { pjax } from "@scripts/modules/pjax"
import { setUpJs } from "@scripts/modules/setUpJs"
import { transitionOnEnter } from "@scripts/modules/pageTransitions"

const page = barbaContainer.dataset.barbaNamespace

// サイト全体で共通の処理を実行
container.setAttribute('data-page', page)
pjax()
if (import.meta.env.PROD) {
  siteTheme.set()
}

// ページごとに個別の処理を実行
if (barbaContainer) {
  setUpJs.set(page)
}


window.addEventListener('load', () => {
  transitionOnEnter(page)
})