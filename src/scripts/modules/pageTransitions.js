import { profileData } from '@constants/profile'
import Typed from 'typed.js'
import shuffleLetters from 'shuffle-letters';

export const transitionOnEnter = () => {
  import.meta.env.DEV && console.log('transitionOnEnter')

  // titleのタイピングアニメーション
  const showTitle = () => {
    const titleElms = document.querySelectorAll('[data-typed-output="title"]')
    const titleTextArray = [
      'Anna',
      'Komakine'
    ]

    titleElms.forEach((elm, i) => {
      shuffleLetters(elm, {
        text: titleTextArray[i],
        iterations: 12,
        fps: 35,
        onComplete: el => {
          if (i === titleElms.length -1) {
          }
        }
      })
    })
  }

  const showJsonData = () => {
    return new Typed('[data-typed-output="json"]', {
      strings: profileData,
      typeSpeed: 25,
      backSpeed: 15,
      loop: true,
      backDelay: 800,
      // showCursor: false,
    })
  }

  const showRequestStatus = () => {
    return new Typed('[data-typed-output="json"]', {
      strings: profileData,
      typeSpeed: 30,
      backSpeed: 15,
      loop: true,
      backDelay: 700,
      // showCursor: false,
    })
  }

  showTitle()
  showJsonData()
}

export const transitionOnLeave = () => {
  import.meta.env.DEV && console.log('transitionOnLeave')
}