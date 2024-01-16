export const calculateAge = (birthDate: string): number => {
  const today = new Date()
  const birthDay = new Date(birthDate)
  // 今年の誕生日
  const thisYearBirthDay = new Date(today.getFullYear(), birthDay.getMonth(), birthDay.getDate())

  let age = today.getFullYear() - birthDay.getFullYear()

  // 今年まだ誕生日が来ていない場合
  if (today < thisYearBirthDay) {
    age--;
  }

  return age
}