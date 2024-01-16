import { calculateAge } from "@scripts/modules/calculateAge"

const profileTextData = [
  "job : 'Frontend Developer'",
  "birthday : '1996-02-28'",
  `age : ${calculateAge('1996-02-28')}`,
  "blood_type : 'A'",
  "height : 150",
  "weight : '??? apples'",
  "area : 'Kanagawa'",
]

export const profileData = profileTextData.map((text) => {
  return `{ ${text} }`
})