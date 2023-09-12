import { getBaseUrl } from "@scripts/modules/url";

export const networkData = [
  {
    title: 'Request URL',
    desc: () => getBaseUrl()
  },
  {
    title: 'Request Method',
    desc: 'GET'
  },
  {
    title: 'Status Code',
    desc: '200 OK'
  },
]