var Pjax = {
  set: function set() {
    barba.use(barbaPrefetch);
    barba.init({
      debug: false,
      timeout: 1000 * 10,
      preventRunning: true,
      prevent: function prevent(_ref) {
        var href = _ref.href,
          el = _ref.el;
        return href === location.pathname || !el.classList.contains('link-pjax') || el.classList.contains('no-pjax') || el.classList.contains('no-barba');
      },
      transitions: [
        {
          name: 'transition',
          sync: true,
          enter: function enter(data) {
            ChangePage(data.next.namespace, $(data.next.container).data('js'));
            Common.getParam();
            Nav.instance.close();

            if (data.next.namespace === 'disco_detail') {
              $(data.next.container).addClass('is-anime-end');
            }

            // 荳ｭ繝壹�繧ｸ縺九ｉtop縺ｸ遘ｻ蜍輔☆繧句�ｴ蜷医＾P繧帝撼陦ｨ遉ｺ
            if (data.next.namespace === 'top') {
              $(data.next.container).find('.p-top__op').hide();
            }
          },
          afterEnter: function afterEnter(data) {
            $('body,html').stop().animate({scrollTop: 0}, 0);
            $(data.next.container).addClass('is-after-enter');

            if (JS.checkLoad()) {
              JS.set(data.next.namespace);
            } else {
              JS.load(data.next.namespace);
            }
          },
          leave: function leave(data) {
            ChangePage(data.next.namespace);

            JS.reset(data.current.namespace);

            return new Promise(function (resolve) {
              setTimeout(function () {
                resolve();
              }, 300);
            });
          },
        },

        {
          name: 'disco-in-transition',
          sync: true,
          from: {
            namespace: ['disco', 'top'],
          },

          to: {
            namespace: ['disco_detail'],
          },

          enter: function enter(data) {
            var $nextContainer = $(data.next.container);

            ChangePage(data.next.namespace, $nextContainer.data('js'));
            Common.getParam();
            Nav.instance.close();

            if (JS.checkLoad()) {
              JS.set(data.next.namespace);
            } else {
              JS.load(data.next.namespace);
            }

            $nextContainer.addClass('is-disco-in');
          },
          leave: function leave(data) {
            var $nextContainer = $(data.next.container);

            $(data.current.container).addClass('is-disco-leave');
            JS.reset(data.current.namespace);

            var $_header = $nextContainer.find('.p-disco__header');
            var $_headerHeight = $_header.outerHeight();

            setTimeout(function () {
              if (data.current.namespace === 'disco') {
                $('.p-disco__bg-img').eq(DISCO.lastActiveIndex).addClass('is-show');
              }
            }, 10);

            return new Promise(function (resolve) {
              var _target = data.current.namespace === 'disco' ? '#v-discoBg' : '.p-top_release__bg';

              anime({
                targets: _target,
                height: $_headerHeight,
                duration: 1100,
                easing: 'cubicBezier(.35,0,.09,1)',
                complete: function complete() {
                  $nextContainer.addClass('is-anime-end');
                  $('body,html').stop().animate({scrollTop: 0}, 0);

                  setTimeout(function () {
                    resolve();
                  }, 100);
                },
              });
            });
          },
        },

        {
          name: 'live-in-transition',
          sync: true,
          from: {
            namespace: ['live'],
          },

          to: {
            namespace: ['live_detail'],
          },

          enter: function enter(data) {
            var $nextContainer = $(data.next.container);

            ChangePage(data.next.namespace, $nextContainer.data('js'));
            Common.getParam();
            Nav.instance.close();

            if (JS.checkLoad()) {
              JS.set(data.next.namespace);
            } else {
              JS.load(data.next.namespace);
            }

            $nextContainer.addClass('is-live-in');
          },
          leave: function leave(data) {
            return new Promise(function (resolve) {
              var $nextContainer = $(data.next.container);

              $(data.current.container).addClass('is-live-leave');
              JS.reset(data.current.namespace);

              var _animateX = pcFlg ? 75 : 25;
              var _animateY = pcFlg ? 75 : 25;

              var $_detailPhoto = $nextContainer.find('.p-live__article-photo');

              var $_detailPhotoWidth = Math.round($_detailPhoto.outerWidth());
              var $_detailPhotoPosX = Math.round($_detailPhoto.offset().left + _animateX);
              var $_detailPhotoPosY = Math.round($_detailPhoto.offset().top - $(data.next.container).offset().top + _animateY);

              var $_trigger = $(data.trigger);
              var $_triggerImg = $_trigger.find('.p-live__list-img img');
              var $_triggerImgWidth = $_triggerImg.outerWidth();
              var $_triggerImgPosX = $_triggerImg.offset().left;
              var $_triggerImgPosY = $_triggerImg.offset().top - $(window).scrollTop();

              var $_dummy = $('.p-dummy');
              var $_imgclone = $_triggerImg.clone();
              if ($_triggerImg.hasClass('default')) {
                var _src = $_imgclone.attr('src').replace('../assets/', '../../assets/');
                $_imgclone.attr('src', _src);
              }
              $_imgclone.appendTo($_dummy);

              $_dummy.css({
                top: ''.concat($_triggerImgPosY, 'px'),
                left: ''.concat($_triggerImgPosX, 'px'),
              });

              var _diffX = $_detailPhotoPosX - $_triggerImgPosX;
              var _diffY = $_detailPhotoPosY - $_triggerImgPosY;

              anime({
                targets: '.p-dummy',
                translateX: [Math.floor(_diffX)],
                translateY: [Math.floor(_diffY)],
                width: [$_triggerImgWidth, $_detailPhotoWidth],
                duration: pcFlg ? 1400 : 1200,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                begin: function begin() {
                  $_trigger.addClass('is-target');
                },
                complete: function complete() {
                  $nextContainer.addClass('is-anime-end');
                  $('body,html').stop().animate({scrollTop: 0}, 0);
                  resolve();
                },
              });
            });
          },
        },
      ],
    });

    barba.hooks.before(function (data) {
      $body.addClass('is-pjax');
    });
    barba.hooks.beforeLeave(function (data) {
      $(data.current.container).addClass('is-leave');
      VueState.reset();
    });
    barba.hooks.afterLeave(function (data) {});
    barba.hooks.enter(function (data) {
      $(data.next.container).css('position', 'fixed');

      setTimeout(function () {
        $(data.next.container).addClass('is-enter');
      }, 50);
    });
    barba.hooks.afterEnter(function (data) {
      $(data.next.container).css('position', 'relative');

      if (Common.scrollEffect.instance) {
        Common.scrollEffect.instance.Refresh();
      } else {
        Common.scrollEffect.init();
      }

      $body.removeClass('is-pjax');

      dataLayer.push({
        newPageUrl: location.pathname + location.search,
        event: 'pageLoaded',
      });
    });
  },
};