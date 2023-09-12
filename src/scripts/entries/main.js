import { siteTheme } from "@scripts/modules/siteTheme"
import { barbaContainer } from "@scripts/modules/dom"
import { setPjax } from "@scripts/modules/setPjax"
import { setUpJs } from "@scripts/modules/setUpJs"
import { transitionOnEnter } from "@scripts/modules/pageTransitions"
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('typescript', typescript)
import 'highlight.js/styles/vs2015.css'

const page = barbaContainer.dataset.barbaNamespace

// サイト全体で共通の処理を実行
container.setAttribute('data-page', page)
setPjax()
hljs.highlightAll()
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