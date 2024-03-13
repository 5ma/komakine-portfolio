import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('typescript', typescript)
import 'highlight.js/styles/vs2015.css'
import { siteTheme } from "@scripts/modules/siteTheme"
import { barbaContainer } from "@scripts/modules/dom"
import { setPjax } from "@scripts/modules/setPjax"
import { setUpJs } from "@scripts/modules/setUpJs"
import { transitionOnEnter } from "@scripts/modules/pageTransitions"
import { setToggleType } from "@scripts/modules/setToggleType"
import { scroll } from '@scripts/modules/scroll'
import * as party from "party-js";

const page = barbaContainer.dataset.barbaNamespace

// サイト全体で共通の処理を実行
container.setAttribute('data-page', page)
setPjax()
siteTheme.set()
setToggleType()
// コードブロックをハイライト表示する
hljs.highlightAll()
// ページごとに個別の処理を実行
setUpJs.set(page)
transitionOnEnter(page)
// 慣性スクロールのセットアップ
scroll.setUp()

// 03/15日用特別演出
const today = new Date();
// 月と日を取得（月は0から始まるので、+1して調整）
const month = today.getMonth() + 1;
const day = today.getDate();
// 3月15日であるかどうかを判定
if (month === 3 && day === 14) {
  console.log("今日は3月15日です🎉お誕生日おめでとう🥳");
  document.addEventListener('click', (e) => {
    party.confetti(e.target, {
      count: party.variation.range(30, 60),
    });
  });
}