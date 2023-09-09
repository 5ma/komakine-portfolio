const profileTextData = [
  "job : 'Frontend Developer'",
  "birthday : '1996-02-28'",
  "age : '27'",
  "blood_type : 'A'",
  "height : '150'",
  "weight : '??? apples'",
  "area : 'Kanagawa'",
]

export const profileData = profileTextData.map((text) => {
  return `{ ${text} }`
})