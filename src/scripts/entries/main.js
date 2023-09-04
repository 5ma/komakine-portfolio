import { barbaContainer } from "@scripts/modules/dom"
import { pjax } from "@scripts/modules/pjax"
import { setUpJs } from "@scripts/modules/setUpJs"

console.log('main.js')

if (barbaContainer) {
  const page = barbaContainer.dataset.barbaNamespace
  setUpJs.set(page)
}

pjax()