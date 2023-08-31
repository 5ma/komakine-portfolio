import barba from '@barba/core'
import { setUpJs } from './setUpJs';

export const pjax = () => {
  barba.init({
    debug: import.meta.env.DEV,
    timeout: 1000 * 10, // 10秒
    preventRunning: true, // トランジション実行中にユーザーが対象のリンクをクリックした場合、「強制リロード」を防ぐ
    prevent: ({ el, href }) => {
      return href === location.pathname || !el.classList.contains('link-pjax') || el.classList.contains('no-pjax') || el.classList.contains('no-barba');
    },
    transitions: [
      {
        name: 'transition',
        enter(data) {
          import.meta.env.DEV && console.log('pjax enter', data)
          setUpJs.set(data.next.namespace)
          // ChangePage(data.next.namespace, $(data.next.container).data('js'));
          // Common.getParam();
          // Nav.instance.close();

          // if (data.next.namespace === 'disco_detail') {
          //   $(data.next.container).addClass('is-anime-end');
          // }

          // // 荳ｭ繝壹�繧ｸ縺九ｉtop縺ｸ遘ｻ蜍輔☆繧句�ｴ蜷医＾P繧帝撼陦ｨ遉ｺ
          // if (data.next.namespace === 'top') {
          //   $(data.next.container).find('.p-top__op').hide();
          // }
        },
        afterEnter(data) {
          // $('body,html').stop().animate({scrollTop: 0}, 0);
          // $(data.next.container).addClass('is-after-enter');

          // if (JS.checkLoad()) {
          //   JS.set(data.next.namespace);
          // } else {
          //   JS.load(data.next.namespace);
          // }
        },
        leave(data) {
          import.meta.env.DEV && console.log('pjax leave', data)
          setUpJs.reset(data.current.namespace)
          // ChangePage(data.next.namespace);

          // JS.reset(data.current.namespace);

          // return new Promise(function (resolve) {
          //   setTimeout(function () {
          //     resolve();
          //   }, 300);
          // });
        },
      }
    ],
  })
}