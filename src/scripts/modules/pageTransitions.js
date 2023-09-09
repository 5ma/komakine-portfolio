import { profileData } from "@constants/profile";
import Typed from "typed.js";
import shuffleLetters from "shuffle-letters";
import { networkData } from "@constants/networkData";
import { shuffle } from "txt-shuffle";

const state = {
  title: undefined,
  json: undefined,
  network: undefined,
};

export const LEAVE_DURATION = 0.4; // 400ms秒間アニメーションしたあとページ遷移する

const glyphs = "!IMJIMJ#$&%()*+0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuüvwxyz{|}~@@@▓<▒▒▓█▓█▒"

const titleTextArray = ["Anna", "Komakine"];
const titleElms = document.querySelectorAll('[data-typed-output="title"]');
const jsonElm = document.querySelector('[data-typed-output="json"]')
const networkTitleElm = document.querySelectorAll('[data-typed-output="network-title"]')
const networkDescElm = document.querySelectorAll('[data-typed-output="network-desc"]')

export const transitionOnEnter = (page) => {
  import.meta.env.DEV && console.log("transitionOnEnter");

  // titleのタイピングアニメーション
  const showTitle = () => {

    titleElms.forEach((elm, i) => {
      shuffleLetters(elm, {
        text: titleTextArray[i],
        iterations: 14,
        fps: 30,
        onComplete: (el) => {
          if (i === titleElms.length - 1) {
          }
        },
      });
    });
  };

  const showJsonData = () => {
    if (page === 'top') {
      return new Typed(jsonElm, {
        strings: profileData,
        typeSpeed: 27,
        backSpeed: 15,
        loop: true,
        backDelay: 900,
      });
    } else {
      return new Typed(jsonElm, {
        strings: [`{ page: '${page.charAt(0).toUpperCase()}${page.slice(1)}' }`],
        typeSpeed: 27,
        backSpeed: 15,
        loop: false,
        onComplete: ({ el }) => {
          console.log('JDLSHDJHSJHD!!', el)
          el.closest('.data').classList.add('is-typed-complete')
        },
      });
    }
  };

  const showHeaderInfo = () => {
    networkTitleElm
      .forEach((elm, i) => {
        shuffleLetters(elm, {
          text: networkData[i].title,
          iterations: 3,
          fps: 35,
          onComplete: (el) => {
            shuffleLetters(el.nextElementSibling, {
              text: networkData[i].desc,
              iterations: 3,
              fps: 35,
            });
          },
        });
      });
  };

  state.title = showTitle();
  state.json = showJsonData();
  setTimeout(showHeaderInfo, 100);
};

export const transitionOnLeave = () => {
  import.meta.env.DEV && console.log("transitionOnLeave");

  const duration = 0.4

  // タイトルの文字列を非表示にする
  titleTextArray.forEach((text, i) => {
    shuffle({
      text,
      duration: LEAVE_DURATION,
      fps: 40,
      glyphs,
      animation: 'hide',
      onUpdate: (output) => {
        titleElms[i].innerHTML = output;
      },
    });
  })

  state.json.stop();
  const currentJsonText = jsonElm.innerHTML.trim()
  console.log(jsonElm.innerHTML)

  // jsonの文字列を非表示にする
  shuffle({
    text: currentJsonText,
    duration: LEAVE_DURATION,
    fps: 40,
    glyphs,
    animation: 'hide',
    onUpdate: (output) => {
      jsonElm.innerHTML = output;
    },
    onComplete: () => {
      state.json.destroy()
    }
  })

  // header情報を非表示にする

  networkDescElm.forEach((elm, i) => {
    shuffle({
      text: networkData[i].desc,
      duration: LEAVE_DURATION,
      fps: 40,
      glyphs,
      animation: 'hide',
      onUpdate: (output) => {
        elm.innerHTML = output;
      },
      onComplete: () => {
      }
    })
    shuffle({
      text: networkData[i].title,
      duration,
      fps: 40,
      glyphs,
      animation: 'hide',
      onUpdate: (output) => {
        networkTitleElm[i].innerHTML = output;
      }
    })
  })
};
