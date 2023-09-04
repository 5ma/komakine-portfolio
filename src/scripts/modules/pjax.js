import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch';
import { setUpJs } from '@scripts/modules/setUpJs';
import { container } from './dom';

export const pjax = () => {
  // tell Barba to use the prefetch plugin
  barba.use(barbaPrefetch)

  barba.init({
    debug: import.meta.env.DEV,
    timeout: 1000 * 10, // 10秒
    preventRunning: true, // トランジション実行中にユーザーが対象のリンクをクリックした場合、「強制リロード」を防ぐ
    prevent: ({ el, href }) => {
      return (
        href === location.pathname ||
        !el.classList.contains('link-pjax') ||
        el.classList.contains('no-pjax') ||
        el.classList.contains('no-barba')
      )
    },
    transitions: [
      {
        name: 'transition',
        enter(data) {
          import.meta.env.DEV && console.log('pjax enter', data)
          setUpJs.set(data.next.namespace)
          container.classList.add('is-enter')
        },
        afterEnter(data) {
          import.meta.env.DEV && console.log('pjax after enter', data)
          container.classList.add('is-after-enter')
          container.classList.remove('is-leave', 'is-enter')
        },
        leave(data) {
          import.meta.env.DEV && console.log('pjax leave', data)
          setUpJs.reset(data.current.namespace)
          container.classList.add('is-leave')

          return new Promise(function (resolve) {
            setTimeout(() => {
              resolve()
            }, 100)
          });
        },
      }
    ],
  })
}