export const getBaseUrl = () => {
  const currentURL = new URL(location.href)
  // クエリパラメータを除去
  currentURL.search = ''
  return currentURL.toString()
}