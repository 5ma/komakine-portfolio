import { ENTER } from "@scripts/modules/enter"
import { LEAVE } from "@scripts/modules/leave"

export const setUpJs = {
  set(page) {
    if (page in ENTER) ENTER[page]()
  },
  reset(page) {
    if (page in LEAVE) LEAVE[page]()
  }
}