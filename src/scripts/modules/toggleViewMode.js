import { container } from "@scripts/modules/dom"

// 表示形式をicon view or list viewに切り替える
export const toggleViewMode = () => {
  const button = document.querySelector('[data-change-view]')
  if (!button) return

  button.addEventListener('click', () => {
    if (container.dataset.viewMode === 'icon') {
      changeView('list')
    } else {
      changeView('icon')
    }
  })

  const changeView = (mode) => {
    container.dataset.viewMode = mode
  }
}