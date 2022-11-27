const WeekMS = 7 * 24 * 60 * 60 * 1000

function isEqualDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
}
/**
 * 判断两天是否在同一星期
 *
 * @param day1
 * @param day2
 */
function isEqualWeek(day1: Date, day2: Date): boolean {
  const d1Time = day1.getTime()
  const d2Time = day2.getTime()


  if (Math.abs(d1Time - d2Time) > WeekMS) {
    return false
  }

  if (isEqualDay(day1, day2)) {
    return true
  }

  if (d1Time > d2Time) {
    return day1.getDay() > day2.getDay()
  }

  if (d1Time < d2Time) {
    return day1.getDay() < day2.getDay()
  }


  return false
}

export default isEqualWeek