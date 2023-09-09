import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch';
import { setUpJs } from '@scripts/modules/setUpJs';
import { container } from '@scripts/modules/dom';
import { LEAVE_DURATION, transitionOnEnter, transitionOnLeave } from '@scripts/modules/pageTransitions';

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
        enter({ next }) {
          import.meta.env.DEV && console.log('pjax enter')
          // const { current, next } = data
          const nextPage = next.namespace
          container.setAttribute('data-page', nextPage)
          container.classList.add('is-enter')

          setUpJs.set(nextPage)
          transitionOnEnter(nextPage)
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
          transitionOnLeave()

          return new Promise(function (resolve) {
            setTimeout(() => {
              resolve()
              // 50msバッファを持たせて遷移する
            }, LEAVE_DURATION * 1000 + 50)
          });
        },
      }
    ],
  })
}