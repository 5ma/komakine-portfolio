import { siteTheme } from "@scripts/modules/siteTheme"
import { barbaContainer } from "@scripts/modules/dom"
import { pjax } from "@scripts/modules/pjax"
import { setUpJs } from "@scripts/modules/setUpJs"

if (barbaContainer) {
  const page = barbaContainer.dataset.barbaNamespace
  setUpJs.set(page)
}

pjax()
siteTheme.set()