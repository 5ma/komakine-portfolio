import { PHOTOS } from "@scripts/page/photos"
import { TOP } from "@scripts/page/top"
import { WORKS } from "@scripts/page/works"

export const ENTER = {
  top() {
    TOP.enter()
  },
  works() {
    WORKS.enter()
  },
  photos() {
    PHOTOS.enter()
  }
}