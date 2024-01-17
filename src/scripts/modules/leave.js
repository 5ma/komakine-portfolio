import { PHOTOS } from "@scripts/page/photos"
import { TOP } from "@scripts/page/top"
import { WORKS } from "@scripts/page/works"

export const LEAVE = {
  top() {
    TOP.leave()
  },
  works() {
    WORKS.leave()
  },
  photos() {
    PHOTOS.leave()
  }
}