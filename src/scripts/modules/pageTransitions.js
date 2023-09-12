import { profileData } from "@constants/profile";
import Typed from "typed.js";
import shuffleLetters from "shuffle-letters";
import { networkData } from "@constants/networkData";
import { shuffle } from "txt-shuffle";

export const LEAVE_DURATION = 0.4; // 400ms秒間アニメーションしたあとページ遷移する

const glyphs =
  "!IMJIMJ#$&%()*+0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuüvwxyz{|}~@@@▓<▒▒▓█▓█▒";

const titleTextArray = ["Anna", "Komakine"];
const titleElms = document.querySelectorAll('[data-typed-output="title"]');
const jsonElm = document.querySelector('[data-typed-output="json"]');
const networkTitleElm = document.querySelectorAll(
  '[data-typed-output="network-title"]'
);
const networkDescElm = document.querySelectorAll(
  '[data-typed-output="network-desc"]'
);

const state = {
  title: [],
  json: undefined,
  network: undefined,
};

const CONTROLLER = {
  instance: {
    title: [],
    json: undefined,
    network: []
  },
  state: {
    counter: {
      title: 0,
      json: 0,
      network: 0,
    },
    completeCount: {
      title: titleElms.length,
      json: 1,
      network: networkTitleElm.length * 2,
    },
    update(name) {
      this.counter[name]++
    },
    resetAllState() {
      // 全ての完了状態をリセット
      Object.keys(this.counter).forEach((key) => {
        this.counter[key] = 0
      })
    },
    isCompleted(name) {
      return this.completeCount
    }
  }
}

function resetAll() {
  CONTROLLER.state.resetAllState()
}

export const transitionOnEnter = (page) => {
  CONTROLLER.instance.title = showTitle();
  CONTROLLER.instance.json = showJsonData();
  setTimeout(() => {
    console.log('showHeaderInfo', showHeaderInfo())
  }, 100);

  // titleのタイピングアニメーション
  function showTitle() {
    return Array.from(titleElms).map((elm, i) => {
      return shuffleLetters(elm, {
        text: titleTextArray[i],
        iterations: 14,
        fps: 30,
        onComplete: (el) => {
          if (i === titleElms.length - 1) {
          }
        },
      })
    })
  }

  function showJsonData() {
    const commonOptions = {
      typeSpeed: 27,
      backSpeed: 15,
    };

    if (page === "top") {
      return new Typed(jsonElm, {
        ...commonOptions,
        strings: profileData,
        loop: true,
        backDelay: 900,
      });
    }

    // TOPページ以外の処理
    return new Typed(jsonElm, {
      ...commonOptions,
      strings: [`{ page: '${page.charAt(0).toUpperCase()}${page.slice(1)}' }`],
      loop: false,
      onComplete: ({ el }) => {
        el.closest(".data").classList.add("is-typed-complete");
      },
    });
  }

  function showHeaderInfo() {
    return Array.from(networkTitleElm).map((elm, i) => {
      return shuffleLetters(elm, {
        text: networkData[i].title,
        iterations: 3,
        fps: 35,
        onComplete: (el) => {
          const descText =
            typeof networkData[i].desc === "function"
              ? networkData[i].desc()
              : networkData[i].desc;
          return shuffleLetters(el.nextElementSibling, {
            text: descText,
            iterations: 3,
            fps: 35,
          });
        },
      });
    })
  }
};

export const transitionOnLeave = () => {
  import.meta.env.DEV && console.log("transitionOnLeave");

  const duration = 0.4;

  // タイトルの文字列を非表示にする
  titleTextArray.forEach((text, i) => {
    shuffle({
      text,
      duration: LEAVE_DURATION,
      fps: 40,
      glyphs,
      animation: "hide",
      onUpdate: (output) => {
        titleElms[i].innerHTML = output;
      },
    });
  });

  CONTROLLER.instance.json.stop();
  const currentJsonText = jsonElm.innerHTML.trim();

  // jsonの文字列を非表示にする
  shuffle({
    text: currentJsonText,
    duration: LEAVE_DURATION,
    fps: 40,
    glyphs,
    animation: "hide",
    onUpdate: (output) => {
      jsonElm.innerHTML = output;
    },
    onComplete: () => {
      CONTROLLER.instance.json.destroy();
    },
  });

  // header情報を非表示にする
  networkDescElm.forEach((elm, i) => {
    const descText =
      typeof networkData[i].desc === "function"
        ? networkData[i].desc()
        : networkData[i].desc;
    shuffle({
      text: descText,
      duration: LEAVE_DURATION,
      fps: 40,
      glyphs,
      animation: "hide",
      onUpdate: (output) => {
        elm.innerHTML = output;
      },
    });
    shuffle({
      text: networkData[i].title,
      duration,
      fps: 40,
      glyphs,
      animation: "hide",
      onUpdate: (output) => {
        networkTitleElm[i].innerHTML = output;
      },
    });
  });
};
