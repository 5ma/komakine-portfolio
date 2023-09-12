import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch';
import { setUpJs } from '@scripts/modules/setUpJs';
import { container } from '@scripts/modules/dom';
import { LEAVE_DURATION, transitionOnEnter, transitionOnLeave } from '@scripts/modules/pageTransitions';

export const setPjax = () => {
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
          const nextPage = next.namespace
          container.setAttribute('data-page', nextPage)
          container.classList.add('barba-enter')

          setUpJs.set(nextPage)
          transitionOnEnter(nextPage)
        },
        afterEnter() {
          import.meta.env.DEV && console.log('pjax after enter')
          container.classList.add('barba-after-enter')
          container.classList.remove('barba-leave-active', 'is-enter')
        },
        leave() {
          import.meta.env.DEV && console.log('pjax leave')
          container.classList.add('barba-leave-active')
          transitionOnLeave()

          return new Promise((resolve) => {
            setTimeout(() => {
              resolve()
              // 50msバッファを持たせて遷移する
            }, LEAVE_DURATION * 1000 + 50)
          });
        },
        afterLeave({ current }) {
          import.meta.env.DEV && console.log('pjax afterLeave')
          setUpJs.reset(current.namespace)
        }
      }
    ],
  })
}